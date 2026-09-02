type BrandMarkProps = {
  className?: string
  variant?: 'symbol' | 'horizontal' | 'vertical'
  theme?: 'gradient' | 'white' | 'dark' | 'cyan'
}

export function BrandMark({
  className = 'h-10 w-auto',
  variant = 'horizontal',
  theme = 'gradient',
}: BrandMarkProps) {
  // Colors based on theme
  const getColors = () => {
    switch (theme) {
      case 'white':
        return {
          symbolPrimary: '#FFFFFF',
          symbolSecondary: '#E2E8F0',
          textRotta: '#FFFFFF',
          textTech: '#2CE3FD',
        }
      case 'dark':
        return {
          symbolPrimary: '#25174E',
          symbolSecondary: '#3568FD',
          textRotta: '#25174E',
          textTech: '#3568FD',
        }
      case 'cyan':
        return {
          symbolPrimary: '#2CE3FD',
          symbolSecondary: '#3568FD',
          textRotta: '#2CE3FD',
          textTech: '#FFFFFF',
        }
      case 'gradient':
      default:
        return {
          symbolPrimary: 'url(#rotta-cyan-gradient)',
          symbolSecondary: 'url(#rotta-blue-gradient)',
          textRotta: 'url(#rotta-text-gradient)',
          textTech: '#2CE3FD',
        }
    }
  }

  const colors = getColors()

  // Símbolo Rotta: 4 cantoneiras/setas nos cantos + anel octogonal central
  const SymbolIcon = () => (
    <g id="rotta-symbol">
      {/* Canto Superior Esquerdo (NW) */}
      <path
        d="M6 30V10C6 7.79 7.79 6 10 6H30L22 14H14V22L6 30Z"
        fill={colors.symbolPrimary}
      />
      {/* Canto Superior Direito (NE) */}
      <path
        d="M94 30V10C94 7.79 92.21 6 90 6H70L78 14H86V22L94 30Z"
        fill={colors.symbolPrimary}
      />
      {/* Canto Inferior Esquerdo (SW) */}
      <path
        d="M6 70V90C6 92.21 7.79 94 10 94H30L22 86H14V78L6 70Z"
        fill={colors.symbolPrimary}
      />
      {/* Canto Inferior Direito (SE) */}
      <path
        d="M94 70V90C94 92.21 92.21 94 90 94H70L78 86H86V78L94 70Z"
        fill={colors.symbolPrimary}
      />

      {/* Anel Octogonal Central (Outsourcing & Automação) */}
      <path
        d="M34 20L20 34V66L34 80H66L80 66V34L66 20H34ZM39 33H61L67 39V61L61 67H39L33 61V39L39 33Z"
        fill={colors.symbolSecondary}
      />
      {/* Núcleo Central */}
      <rect
        x="42"
        y="42"
        width="16"
        height="16"
        rx="2"
        fill={colors.symbolPrimary}
        opacity="0.9"
      />
    </g>
  )

  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Rotta Tecnologia Símbolo"
      >
        <defs>
          <linearGradient id="rotta-cyan-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2CE3FD" />
            <stop offset="1" stopColor="#3568FD" />
          </linearGradient>
          <linearGradient id="rotta-blue-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3568FD" />
            <stop offset="1" stopColor="#25174E" />
          </linearGradient>
        </defs>
        <SymbolIcon />
      </svg>
    )
  }

  if (variant === 'vertical') {
    return (
      <svg
        viewBox="0 0 200 160"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Rotta Tecnologia"
      >
        <defs>
          <linearGradient id="rotta-cyan-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2CE3FD" />
            <stop offset="1" stopColor="#3568FD" />
          </linearGradient>
          <linearGradient id="rotta-blue-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3568FD" />
            <stop offset="1" stopColor="#25174E" />
          </linearGradient>
          <linearGradient id="rotta-text-gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#2CE3FD" />
          </linearGradient>
        </defs>

        <g transform="translate(50, 0)">
          <SymbolIcon />
        </g>

        {/* Wordmark rotta */}
        <text
          x="100"
          y="125"
          textAnchor="middle"
          fill={colors.textRotta}
          fontFamily="'Montserrat', sans-serif"
          fontWeight="900"
          fontSize="32"
          letterSpacing="-1.5"
        >
          rotta
        </text>

        {/* Subtitle TECNOLOGIA */}
        <text
          x="100"
          y="148"
          textAnchor="middle"
          fill={colors.textTech}
          fontFamily="'Montserrat', sans-serif"
          fontWeight="700"
          fontSize="9"
          letterSpacing="6"
        >
          TECNOLOGIA
        </text>
      </svg>
    )
  }

  // Variant Horizontal (Padrão)
  return (
    <svg
      viewBox="0 0 340 90"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rotta Tecnologia"
    >
      <defs>
        <linearGradient id="rotta-cyan-gradient" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2CE3FD" />
          <stop offset="1" stopColor="#3568FD" />
        </linearGradient>
        <linearGradient id="rotta-blue-gradient" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3568FD" />
          <stop offset="1" stopColor="#25174E" />
        </linearGradient>
        <linearGradient id="rotta-text-gradient" x1="90" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.7" stopColor="#F1F5F9" />
          <stop offset="1" stopColor="#2CE3FD" />
        </linearGradient>
      </defs>

      {/* Símbolo à esquerda */}
      <g transform="translate(0, -5) scale(0.95)">
        <SymbolIcon />
      </g>

      {/* Letreiro customizado "rotta" */}
      <g transform="translate(102, 10)">
        {/* r */}
        <path
          d="M0 16H14V24C16.5 18 21 16 28 16V30C26 30 20 30.5 14 36V52H0V16Z"
          fill={colors.textRotta}
        />
        {/* o */}
        <path
          d="M36 24L44 16H66L74 24V44L66 52H44L36 44V24ZM50 28L47 31V37L50 40H60L63 37V31L60 28H50Z"
          fill={colors.textRotta}
        />
        {/* t */}
        <path
          d="M82 4H96V16H110V28H96V42C96 45 98 46 102 46H110V56C103 56 82 58 82 44V28H74V16H82V4Z"
          fill={colors.textRotta}
        />
        {/* t */}
        <path
          d="M118 4H132V16H146V28H132V42C132 45 134 46 138 46H146V56C139 56 118 58 118 44V28H110V16H118V4Z"
          fill={colors.textRotta}
        />
        {/* a */}
        <path
          d="M154 24L162 16H184L192 24V52H178V48C174 51.5 168 53 162 53C152 53 152 44 152 40C152 30 162 28 178 28V27L174 24H164L161 27H154V24ZM178 35C168 35 164 36 164 41C164 45 168 46 173 46C176 46 178 44 178 42V35Z"
          fill={colors.textRotta}
        />

        {/* TECNOLOGIA */}
        <text
          x="1"
          y="72"
          fill={colors.textTech}
          fontFamily="'Montserrat', sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="8.5"
        >
          TECNOLOGIA
        </text>
      </g>
    </svg>
  )
}

