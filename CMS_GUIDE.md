# 🚀 Guia Prático: Gerenciando o SiteRotta pelo Sanity.io CMS

Este guia explica passo a passo como gerenciar todo o conteúdo do site da **Rotta Tecnologia** (produtos, especificações técnicas, telefones, WhatsApp, serviços e depoimentos) através do **Sanity.io**.

---

## 📑 Sumário

1. [Como Funciona a Integração](#1-como-funciona-a-integração)
2. [Passo 1: Criando o Projeto Gratuito no Sanity](#passo-1-criando-o-projeto-gratuito-no-sanity)
3. [Passo 2: Configurando as Credenciais no Projeto](#passo-2-configurando-as-credenciais-no-projeto)
4. [Passo 3: Migração Automática dos Dados Atuais (Seed)](#passo-3-migração-automática-dos-dados-atuais-seed)
5. [Passo 4: Acessando o Painel Administrativo (Studio)](#passo-4-acessando-o-painel-administrativo-studio)
6. [Passo 5: Publicando o Painel na Nuvem Gratuitamente](#passo-5-publicando-o-painel-na-nuvem-gratuitamente)
7. [Camada de Segurança e Fallback](#camada-de-segurança-e-fallback)

---

## 1. Como Funciona a Integração

- **Frontend (Site dos Clientes)**: Continua sendo a aplicação ultrarrápida em React + Vite. Ela se comunica diretamente com a CDN global do Sanity.
- **Painel Administrativo (Sanity Studio)**: Interface visual moderna onde você pode cadastrar novos equipamentos, subir fotos de alta qualidade, alterar telefones e textos.
- **Fallback Seguro**: Se o Sanity estiver fora do ar ou sem internet, o site continua funcionando sem erros utilizando os dados locais de contingência.

---

## Passo 1: Criando o Projeto Gratuito no Sanity

1. Acesse **[sanity.io](https://www.sanity.io)** e clique em **"Get Started"** (pode logar com sua conta do Google ou GitHub).
2. No painel inicial ([sanity.io/manage](https://www.sanity.io/manage)), clique em **"Create project"**.
3. Escolha um nome para o projeto (ex: `Rotta Tecnologia`).
4. Selecione o plano gratuito (**Free tier** - já inclui CDN global, hospedagem de imagens e múltiplos usuários).
5. Copie o seu **Project ID** (um código de ~8 letras/números, ex: `a1b2c3d4`).

---

## Passo 2: Configurando as Credenciais no Projeto

Na raiz da pasta do site (`siterotta`), crie ou edite o arquivo `.env`:

```env
VITE_SANITY_PROJECT_ID=seu_project_id_aqui
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-01
VITE_SANITY_USE_CDN=true
```

> Substitua `seu_project_id_aqui` pelo código copiado no Passo 1.

---

## Passo 3: Migração Automática dos Dados Atuais (Seed)

Para que você não precise cadastrar as mais de 15 impressoras, scanners e dados da empresa do zero, criamos um script de importação automática:

1. Acesse o painel do seu projeto no Sanity:
   `https://www.sanity.io/manage/project/{SEU_PROJECT_ID}/api#tokens`
2. Clique em **"Add API token"**:
   - **Name**: `Seed Script`
   - **Permissions**: Selecione **"Editor"** (para ter permissão de escrita)
   - Clique em **Save** e copie o token gerado.
3. No terminal da pasta do site, rode o comando:

```bash
# No Windows PowerShell:
$env:SANITY_AUTH_TOKEN="seu_token_aqui"
npm run cms:seed
```

> ✨ Pronto! Em poucos segundos, todas as impressoras Brother, Epson, scanners, vantagens de locação e contatos estarão salvos no seu Sanity!

---

## Passo 4: Acessando o Painel Administrativo (Studio)

Para abrir o painel administrativo na sua máquina:

1. Instale as dependências do estúdio (apenas na primeira vez):
   ```bash
   cd studio
   npm install
   cd ..
   ```
2. Abra o estúdio:
   ```bash
   npm run cms:dev
   ```
3. O painel abrirá em `http://localhost:3333`. Faça login com a mesma conta que criou no Sanity.

---

## Passo 5: Publicando o Painel na Nuvem Gratuitamente

Você pode ter o painel online (ex: `https://rotta-tecnologia.sanity.studio`) para acessar do celular ou do escritório sem precisar de servidor:

1. Entre na pasta `studio`:
   ```bash
   cd studio
   npx sanity deploy
   ```
2. Escolha o subdomínio desejado (ex: `rotta-tecnologia`).
3. O Sanity irá compilar e publicar o painel gratuitamente na nuvem da Sanity!
4. **Configurar CORS**: No painel em [sanity.io/manage](https://www.sanity.io/manage), acesse **API > CORS Origins**, clique em **Add CORS origin** e adicione o domínio do seu site (e `http://localhost:5173` para testes) com credenciais habilitadas.

---

## Camada de Segurança e Fallback

O site foi desenvolvido com resiliência:
- Se você clonar o projeto em um novo computador sem o arquivo `.env`, o site **não quebra**: ele exibe o catálogo completo a partir dos dados locais de [`src/data/site.ts`](file:///c:/fundamentos/siterotta/src/data/site.ts).
- Quando as variáveis do Sanity são configuradas, o hook [`useSiteData()`](file:///c:/fundamentos/siterotta/src/context/SiteContext.tsx) busca os dados mais recentes na nuvem e os injeta instantaneamente na interface.
