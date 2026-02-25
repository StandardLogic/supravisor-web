export function SupravisorLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 310 52"
      className={className}
      aria-label="Supravisor"
    >
      <text
        x="0"
        y="40"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontSize="36"
        fontWeight="700"
        letterSpacing="2"
        fill="currentColor"
      >
        SUPRAVISOR
      </text>
    </svg>
  )
}
