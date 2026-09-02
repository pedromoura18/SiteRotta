type BrandPatternProps = {
  className?: string
  opacity?: number
}

export function BrandPattern({ className = '', opacity = 0.15 }: BrandPatternProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 600 200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="rotta-triangle-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Tile of 45-degree triangles based on Rotta brand identity */}
          <polygon points="0,0 50,0 0,50" fill="#2CE3FD" fillOpacity="0.4" />
          <polygon points="50,0 100,0 50,50" fill="#3568FD" fillOpacity="0.6" />
          <polygon points="0,50 50,50 0,100" fill="#25174E" fillOpacity="0.8" />
          <polygon points="50,50 100,50 100,100" fill="#2CE3FD" fillOpacity="0.5" />
          <polygon points="50,0 100,50 50,50" fill="#3568FD" fillOpacity="0.3" />
          <polygon points="0,50 50,100 0,100" fill="#3568FD" fillOpacity="0.7" />
          <polygon points="50,50 50,100 100,100" fill="#25174E" fillOpacity="0.9" />
          <polygon points="0,0 50,50 50,0" fill="#2CE3FD" fillOpacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rotta-triangle-grid)" />
    </svg>
  )
}
