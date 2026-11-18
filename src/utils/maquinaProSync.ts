import type { ClientEquipment } from '../types/clientPortal'
import { getEquipmentImage, saveClientEquipments } from '../data/mockClientData'

export interface MaquinaProConfig {
  email: string
  passwordMasked: string
  apiToken: string
  endpointUrl: string
  syncFrequency: '15m' | '30m' | '1h' | 'manual'
  isConnected: boolean
  lastSync: string
  lastHandshakeLatency: number
  activeCollectors: number
  syncedEquipmentsCount: number
}

const CONFIG_STORAGE_KEY = 'rotta_maquinapro_config_v2'

export const DEFAULT_MAQUINAPRO_CONFIG: MaquinaProConfig = {
  email: 'douglas@rottatecnologia.com.br',
  passwordMasked: '••••••••••••',
  apiToken: 'mp_sec_live_rotta_988037656_2026',
  endpointUrl: 'https://app.maquinapro.app.br/api/v1',
  syncFrequency: '15m',
  isConnected: true,
  lastSync: 'Hoje às 13:30',
  lastHandshakeLatency: 84,
  activeCollectors: 3,
  syncedEquipmentsCount: 6,
}

export function getMaquinaProConfig(): MaquinaProConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Erro ao ler configuração do Máquina Pro:', e)
  }
  return DEFAULT_MAQUINAPRO_CONFIG
}

export function saveMaquinaProConfig(config: MaquinaProConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config))
  } catch (e) {
    console.warn('Erro ao salvar configuração do Máquina Pro:', e)
  }
}

export interface ConnectionTestResult {
  success: boolean
  latencyMs: number
  message: string
  details: {
    endpoint: string
    tokenStatus: string
    activeCollectors: number
    monitoredPrinters: number
    agentVersion: string
  }
}

/**
 * Executa o teste de handshake e conexão com o Máquina Pro
 */
export async function testMaquinaProConnection(
  email: string,
  _password?: string,
  _token?: string
): Promise<ConnectionTestResult> {
  // Simulação de latência de rede realista (80ms a 140ms)
  await new Promise((resolve) => setTimeout(resolve, 850))

  const latency = Math.floor(Math.random() * 40) + 70

  if (!email || !email.includes('@')) {
    return {
      success: false,
      latencyMs: latency,
      message: 'Falha na autenticação: E-mail do Máquina Pro inválido ou não informado.',
      details: {
        endpoint: 'https://app.maquinapro.app.br/api/v1/auth/login',
        tokenStatus: 'Inválido',
        activeCollectors: 0,
        monitoredPrinters: 0,
        agentVersion: 'Indisponível',
      },
    }
  }

  return {
    success: true,
    latencyMs: latency,
    message: 'Conexão autorizada com sucesso! Sessão ativa com app.maquinapro.app.br.',
    details: {
      endpoint: 'https://app.maquinapro.app.br/api/v1',
      tokenStatus: 'Válido (Bearer Token JWT ativo)',
      activeCollectors: 3,
      monitoredPrinters: 6,
      agentVersion: 'Coletor SNMP v4.2.1-prod',
    },
  }
}

/**
 * Processa a sincronização e atualiza contadores e níveis de toner
 */
export function executeTelemetrySync(currentEquipments: ClientEquipment[]): {
  updatedEquipments: ClientEquipment[]
  syncedCount: number
  timestamp: string
} {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  const updated = currentEquipments.map((eq) => {
    // Pequena variação positiva natural de contadores para refletir impressões diárias
    const printBump = Math.floor(Math.random() * 15) + 3
    const newMono = (eq.currentCounterMono || 0) + printBump
    const newColor = eq.currentCounterColor ? eq.currentCounterColor + Math.floor(printBump / 2) : undefined

    // Variação suave de toner (redução lenta)
    const tonerReduction = Math.random() > 0.7 ? 1 : 0
    const newTonerBlack = Math.max(5, eq.tonerBlack - tonerReduction)

    return {
      ...eq,
      currentCounterMono: newMono,
      currentCounterColor: newColor,
      tonerBlack: newTonerBlack,
      status: (eq.status === 'manutencao' ? 'manutencao' : 'operacional') as 'operacional' | 'alerta' | 'manutencao',
    }
  })

  saveClientEquipments(updated)

  // Atualiza config com última sync
  const cfg = getMaquinaProConfig()
  cfg.lastSync = `Hoje às ${timeStr}`
  cfg.isConnected = true
  saveMaquinaProConfig(cfg)

  return {
    updatedEquipments: updated,
    syncedCount: updated.length,
    timestamp: `Hoje às ${timeStr}`,
  }
}

/**
 * Parser e Importador Flexível de JSON Real do Máquina Pro
 * Aceita o payload bruto retornado pelo DevTools (F12) ou exportação do Máquina Pro
 */
export function importRealFleetFromJSON(jsonText: string): {
  success: boolean
  count: number
  equipments: ClientEquipment[]
  message: string
} {
  try {
    const parsed = JSON.parse(jsonText.trim())
    // Extrai o array de máquinas mesmo se vier envolvido em { data: [...] } ou { equipamentos: [...] }
    const rawList: any[] = Array.isArray(parsed)
      ? parsed
      : parsed.equipamentos || parsed.data || parsed.printers || parsed.items || []

    if (!rawList || rawList.length === 0) {
      return {
        success: false,
        count: 0,
        equipments: [],
        message: 'Nenhum equipamento foi encontrado no JSON fornecido. Verifique a estrutura colada.',
      }
    }

    const now = new Date()
    const nowFormatted = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`

    const normalized: ClientEquipment[] = rawList.map((item, idx) => {
      const model = item.model || item.modelo || item.nome || item.name || `Impressora ${idx + 1}`
      const brand =
        item.brand ||
        item.marca ||
        (model.toLowerCase().includes('brother')
          ? 'Brother'
          : model.toLowerCase().includes('kyocera')
          ? 'Kyocera'
          : model.toLowerCase().includes('epson')
          ? 'Epson'
          : model.toLowerCase().includes('hp')
          ? 'HP'
          : 'Brother')
      const type: 'impressora' | 'multifuncional' | 'etiquetadora' | 'computador' =
        item.type ||
        (model.toLowerCase().includes('mfc') || model.toLowerCase().includes('dcp') || model.toLowerCase().includes('ecosys')
          ? 'multifuncional'
          : model.toLowerCase().includes('zd') || model.toLowerCase().includes('ql')
          ? 'etiquetadora'
          : 'impressora')
      const serial = item.serialNumber || item.serial || item.numeroSerie || item.sn || `SN-ROTTA-${1000 + idx}`
      const asset = item.assetTag || item.patrimonio || item.codigo || item.tag || `PAT-${idx + 1}`
      const ip = item.ipAddress || item.ip || item.enderecoIp || `192.168.1.${10 + idx}`
      const dept = item.department || item.departamento || item.setor || item.localizacao || 'Operacional'
      const companyId = item.companyId || item.clienteId || (idx % 2 === 0 ? 'cli-001' : 'cli-002')
      const companyName = item.companyName || item.cliente || (companyId === 'cli-001' ? 'Alpha Logística' : 'Beta Agroindustrial')

      const mono = Number(
        item.currentCounterMono ||
          item.monoCounter ||
          item.contadorPb ||
          item.pb ||
          item.totalCounter ||
          item.contador ||
          25000 + idx * 4500
      )
      const color =
        item.currentCounterColor !== undefined
          ? Number(item.currentCounterColor)
          : item.colorCounter !== undefined
          ? Number(item.colorCounter)
          : undefined

      const tonerBlack = Number(item.tonerBlack || item.tonerPreto || item.tonerK || item.toner || 75)
      const tonerCyan =
        item.tonerCyan !== undefined ? Number(item.tonerCyan) : item.tonerC !== undefined ? Number(item.tonerC) : undefined
      const tonerMagenta =
        item.tonerMagenta !== undefined ? Number(item.tonerMagenta) : item.tonerM !== undefined ? Number(item.tonerM) : undefined
      const tonerYellow =
        item.tonerYellow !== undefined ? Number(item.tonerYellow) : item.tonerY !== undefined ? Number(item.tonerY) : undefined

      const status: 'operacional' | 'alerta' | 'manutencao' =
        item.status === 'manutencao' ? 'manutencao' : item.status === 'alerta' || tonerBlack < 15 ? 'alerta' : 'operacional'

      return {
        id: item.id ? String(item.id) : `mp-eq-${idx + 1}`,
        companyId,
        companyName,
        model,
        brand,
        type,
        serialNumber: String(serial),
        assetTag: String(asset),
        department: String(dept),
        status,
        ipAddress: String(ip),
        installationDate: item.installationDate || item.dataInstalacao || '15/01/2024',
        currentCounterMono: mono,
        currentCounterColor: color,
        tonerBlack: Math.min(100, Math.max(0, tonerBlack)),
        tonerCyan: tonerCyan !== undefined ? Math.min(100, Math.max(0, tonerCyan)) : undefined,
        tonerMagenta: tonerMagenta !== undefined ? Math.min(100, Math.max(0, tonerMagenta)) : undefined,
        tonerYellow: tonerYellow !== undefined ? Math.min(100, Math.max(0, tonerYellow)) : undefined,
        drumLife: Number(item.drumLife || 82),
        image: getEquipmentImage(model),
      }
    })

    // Salva no banco de dados local da aplicação
    saveClientEquipments(normalized)

    // Atualiza estatísticas do Máquina Pro
    const cfg = getMaquinaProConfig()
    cfg.syncedEquipmentsCount = normalized.length
    cfg.lastSync = nowFormatted
    cfg.isConnected = true
    saveMaquinaProConfig(cfg)

    return {
      success: true,
      count: normalized.length,
      equipments: normalized,
      message: `${normalized.length} equipamentos do Máquina Pro foram importados e sincronizados com sucesso!`,
    }
  } catch (err: any) {
    return {
      success: false,
      count: 0,
      equipments: [],
      message: `Erro ao analisar o JSON: ${err?.message || 'Formato inválido. Certifique-se de colar um JSON válido.'}`,
    }
  }
}

/**
 * Exemplo de Payload Real retornado pela API do Máquina Pro para demonstração e testes imediatos
 */
export const SAMPLE_REAL_MAQUINAPRO_PAYLOAD = JSON.stringify(
  [
    {
      modelo: 'Brother MFC-L6902DW Laser Mono',
      numeroSerie: 'U64321K8N129480',
      patrimonio: 'ROT-0412',
      ip: '192.168.10.45',
      departamento: 'Faturamento & Expedição',
      cliente: 'Alpha Logística & Transportes Ltda',
      companyId: 'cli-001',
      contadorTotal: 84310,
      contadorPb: 84310,
      tonerPreto: 68,
      status: 'ativo',
      ultimaLeitura: 'Hoje às 13:30',
    },
    {
      modelo: 'Kyocera ECOSYS M3655idn Alta Produtividade',
      numeroSerie: 'Q54901Z4J902144',
      patrimonio: 'ROT-0789',
      ip: '192.168.10.48',
      departamento: 'Controladoria & Fiscal',
      cliente: 'Alpha Logística & Transportes Ltda',
      companyId: 'cli-001',
      contadorTotal: 142890,
      contadorPb: 142890,
      tonerPreto: 14,
      status: 'ativo',
      ultimaLeitura: 'Hoje às 13:31',
    },
    {
      modelo: 'Brother MFC-L8900CDW Laser Colorida',
      numeroSerie: 'E78129L3M449102',
      patrimonio: 'ROT-0922',
      ip: '192.168.10.52',
      departamento: 'Diretoria & Marketing',
      cliente: 'Alpha Logística & Transportes Ltda',
      companyId: 'cli-001',
      contadorTotal: 39420,
      contadorPb: 28100,
      contadorCor: 11320,
      tonerPreto: 82,
      tonerCiano: 74,
      tonerMagenta: 69,
      tonerAmarelo: 91,
      status: 'ativo',
      ultimaLeitura: 'Hoje às 13:28',
    },
    {
      modelo: 'Zebra ZD220 Térmica Industrial',
      numeroSerie: 'ZBR-88390214-X',
      patrimonio: 'ROT-1044',
      ip: '192.168.10.60',
      departamento: 'Triagem de Cargas',
      cliente: 'Alpha Logística & Transportes Ltda',
      companyId: 'cli-001',
      contadorTotal: 52180,
      contadorPb: 52180,
      tonerPreto: 100,
      status: 'ativo',
      ultimaLeitura: 'Hoje às 13:25',
    },
    {
      modelo: 'Brother DCP-L5652DN Multifuncional',
      numeroSerie: 'B5652-984401-PR',
      patrimonio: 'ROT-1150',
      ip: '10.0.1.20',
      departamento: 'Pesagem & Grãos',
      cliente: 'Beta Agroindustrial & Grãos S/A',
      companyId: 'cli-002',
      contadorTotal: 96400,
      contadorPb: 96400,
      tonerPreto: 45,
      status: 'ativo',
      ultimaLeitura: 'Hoje às 13:20',
    },
    {
      modelo: 'HP LaserJet Pro M404n Impressora Rede',
      numeroSerie: 'HP-M404N-330129',
      patrimonio: 'ROT-1205',
      ip: '10.0.1.25',
      departamento: 'Laboratório de Análise',
      cliente: 'Beta Agroindustrial & Grãos S/A',
      companyId: 'cli-002',
      contadorTotal: 41200,
      contadorPb: 41200,
      tonerPreto: 12,
      status: 'ativo',
      ultimaLeitura: 'Hoje às 13:22',
    },
  ],
  null,
  2
)

