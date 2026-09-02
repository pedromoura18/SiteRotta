type LogoProps = {
  className?: string
}

export function HpLogo({ className = 'h-8 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" role="img" aria-label="HP">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="6" />
      <g transform="skewX(-18) translate(8, 0)">
        <path d="M42 22H32V78H42V56H52V78H62V22H52V46H42V22Z" fill="currentColor" />
        <path d="M68 22H58V78H68V58H78C86 58 92 52 92 40C92 28 86 22 78 22H68ZM68 32H76C80 32 82 35 82 40C82 45 80 48 76 48H68V32Z" fill="currentColor" />
      </g>
    </svg>
  )
}

export function DellLogo({ className = 'h-6 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} fill="currentColor" role="img" aria-label="Dell">
      <text
        x="100"
        y="42"
        textAnchor="middle"
        fontFamily="'Montserrat', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="38"
        letterSpacing="4"
        fill="currentColor"
      >
        DELL
      </text>
    </svg>
  )
}

export function LenovoLogo({ className = 'h-6 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 180 50" className={className} fill="currentColor" role="img" aria-label="Lenovo">
      <rect x="2" y="4" width="176" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="180" />
      <text
        x="90"
        y="34"
        textAnchor="middle"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="900"
        fontSize="24"
        letterSpacing="2"
        fill="currentColor"
      >
        lenovo
      </text>
    </svg>
  )
}

export function ZebraLogo({ className = 'h-7 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 220 50" className={className} fill="currentColor" role="img" aria-label="Zebra Technologies">
      {/* Zebra Icon Stripes */}
      <g transform="translate(10, 8)">
        <path d="M0 0L8 16L16 0H22L12 20L22 34H16L8 18L0 34H-6L4 18L-6 0H0Z" fill="currentColor" />
      </g>
      {/* Wordmark */}
      <text
        x="125"
        y="35"
        textAnchor="middle"
        fontFamily="'Montserrat', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="26"
        letterSpacing="3"
        fill="currentColor"
      >
        ZEBRA
      </text>
    </svg>
  )
}

export function ElginLogo({ className = 'h-6 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 160 50" className={className} fill="currentColor" role="img" aria-label="Elgin">
      <text
        x="80"
        y="36"
        textAnchor="middle"
        fontFamily="'Montserrat', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="2"
        fill="currentColor"
      >
        ELGIN
      </text>
    </svg>
  )
}

export function BematechLogo({ className = 'h-7 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 220 50" className={className} fill="currentColor" role="img" aria-label="Bematech">
      {/* Bematech Dual Circles */}
      <circle cx="20" cy="25" r="9" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="36" cy="25" r="9" fill="none" stroke="currentColor" strokeWidth="4" />
      <text
        x="130"
        y="34"
        textAnchor="middle"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="1"
        fill="currentColor"
      >
        bematech
      </text>
    </svg>
  )
}

export function HoneywellLogo({ className = 'h-6 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 220 50" className={className} fill="currentColor" role="img" aria-label="Honeywell">
      <text
        x="110"
        y="36"
        textAnchor="middle"
        fontFamily="'Impact', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="2.5"
        fill="currentColor"
      >
        Honeywell
      </text>
    </svg>
  )
}

export function MicrosoftLogo({ className = 'h-6 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} fill="currentColor" role="img" aria-label="Microsoft">
      <g transform="translate(10, 11)">
        <rect x="0" y="0" width="12" height="12" fill="#F25022" />
        <rect x="15" y="0" width="12" height="12" fill="#7FBA00" />
        <rect x="0" y="15" width="12" height="12" fill="#00A4EF" />
        <rect x="15" y="15" width="12" height="12" fill="#FFB900" />
      </g>
      <text
        x="120"
        y="34"
        textAnchor="middle"
        fontFamily="'Segoe UI', 'Montserrat', sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="0.5"
        fill="currentColor"
      >
        Microsoft
      </text>
    </svg>
  )
}

export const partnerBrandList = [
  { id: 'hp', name: 'HP', Component: HpLogo },
  { id: 'dell', name: 'Dell', Component: DellLogo },
  { id: 'lenovo', name: 'Lenovo', Component: LenovoLogo },
  { id: 'zebra', name: 'Zebra', Component: ZebraLogo },
  { id: 'elgin', name: 'Elgin', Component: ElginLogo },
  { id: 'bematech', name: 'Bematech', Component: BematechLogo },
  { id: 'honeywell', name: 'Honeywell', Component: HoneywellLogo },
  { id: 'microsoft', name: 'Microsoft', Component: MicrosoftLogo },
]
