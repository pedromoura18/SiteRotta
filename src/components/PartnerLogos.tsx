type LogoProps = {
  className?: string
}

export function BrotherLogo({ className = 'h-7 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} fill="currentColor" role="img" aria-label="Brother">
      <text
        x="100"
        y="35"
        textAnchor="middle"
        fontFamily="'Montserrat', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="3"
        fill="currentColor"
      >
        brother
      </text>
    </svg>
  )
}

export function EpsonLogo({ className = 'h-7 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 200 50" className={className} fill="currentColor" role="img" aria-label="Epson">
      <text
        x="100"
        y="35"
        textAnchor="middle"
        fontFamily="'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="32"
        letterSpacing="2"
        fill="#002D72"
      >
        EPSON
      </text>
    </svg>
  )
}

export function HpLogo({ className = 'h-8 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" role="img" aria-label="HP">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#0096D6" strokeWidth="6" />
      <g transform="skewX(-18) translate(8, 0)">
        <path d="M42 22H32V78H42V56H52V78H62V22H52V46H42V22Z" fill="#0096D6" />
        <path d="M68 22H58V78H68V58H78C86 58 92 52 92 40C92 28 86 22 78 22H68ZM68 32H76C80 32 82 35 82 40C82 45 80 48 76 48H68V32Z" fill="#0096D6" />
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
        fontSize="36"
        letterSpacing="4"
        fill="#0076CE"
      >
        DELL
      </text>
    </svg>
  )
}

export function ZebraLogo({ className = 'h-7 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 220 50" className={className} fill="currentColor" role="img" aria-label="Zebra Technologies">
      <text
        x="110"
        y="35"
        textAnchor="middle"
        fontFamily="'Montserrat', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="3"
        fill="#000000"
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
        fontSize="28"
        letterSpacing="2"
        fill="#005CA9"
      >
        ELGIN
      </text>
    </svg>
  )
}

export function BematechLogo({ className = 'h-7 w-auto' }: LogoProps) {
  return (
    <svg viewBox="0 0 220 50" className={className} fill="currentColor" role="img" aria-label="Bematech">
      <text
        x="110"
        y="34"
        textAnchor="middle"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="1"
        fill="#E31837"
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
        fill="#EE3124"
      >
        Honeywell
      </text>
    </svg>
  )
}

export const partnerBrandList = [
  { id: 'brother', name: 'Brother', Component: BrotherLogo },
  { id: 'epson', name: 'Epson', Component: EpsonLogo },
  { id: 'dell', name: 'Dell', Component: DellLogo },
  { id: 'hp', name: 'HP', Component: HpLogo },
  { id: 'zebra', name: 'Zebra', Component: ZebraLogo },
  { id: 'elgin', name: 'Elgin', Component: ElginLogo },
  { id: 'bematech', name: 'Bematech', Component: BematechLogo },
  { id: 'honeywell', name: 'Honeywell', Component: HoneywellLogo },
]

export function PartnerLogos() {
  const brandsDoubled = [...partnerBrandList, ...partnerBrandList]

  return (
    <div className="relative w-full py-4">
      <div className="brand-marquee">
        <div className="brand-track">
          {brandsDoubled.map((brand, idx) => {
            const LogoComp = brand.Component
            return (
              <div
                key={`${brand.id}-${idx}`}
                className="brand-item"
              >
                <LogoComp className="h-7 sm:h-8 w-auto transition-transform hover:scale-105" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
