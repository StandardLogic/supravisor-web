export function SupravisorLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 48"
      className={className}
      aria-label="Supravisor"
    >
      {/* Icon mark: a small "S" shield / monitor glyph in accent color */}
      <rect x="0" y="6" width="36" height="36" rx="6" fill="#00d9ff" fillOpacity="0.12" />
      <path
        d="M8 18 C8 14 11 12 18 12 C25 12 28 15 28 18 C28 22 22 24 18 26 C14 28 8 30 8 34 C8 38 11 40 18 40 C25 40 28 37 28 34"
        stroke="#00d9ff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wordmark */}
      <text
        x="48"
        y="34"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize="22"
        fontWeight="700"
        letterSpacing="2"
        fill="currentColor"
      >
        SUPRAVISOR
      </text>
    </svg>
  )
}
