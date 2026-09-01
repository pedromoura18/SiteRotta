type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rotta Tecnologia"
    >
      <defs>
        <linearGradient id="rotta-cyan-blue" x1="12" y1="12" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2CE3FD" />
          <stop offset="1" stopColor="#3568FD" />
        </linearGradient>
        <linearGradient id="rotta-navy" x1="30" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25174E" />
          <stop offset="1" stopColor="#0E1332" />
        </linearGradient>
      </defs>

      <g>
        <path d="M12 12H52V52H12V12Z" fill="url(#rotta-cyan-blue)" />
        <path d="M68 12H108V52H68V12Z" fill="url(#rotta-cyan-blue)" />
        <path d="M12 68H52V108H12V68Z" fill="url(#rotta-cyan-blue)" />
        <path d="M68 68H108V108H68V68Z" fill="url(#rotta-cyan-blue)" />

        <path d="M52 12H68V28H52V12Z" fill="url(#rotta-cyan-blue)" />
        <path d="M52 92H68V108H52V92Z" fill="url(#rotta-cyan-blue)" />
        <path d="M12 52H28V68H12V52Z" fill="url(#rotta-cyan-blue)" />
        <path d="M92 52H108V68H92V52Z" fill="url(#rotta-cyan-blue)" />

        <path d="M32 32H88V88H32V32Z" fill="url(#rotta-navy)" />
        <path d="M48 48H72V72H48V48Z" fill="url(#rotta-cyan-blue)" opacity="0.95" />
      </g>
    </svg>
  )
}
