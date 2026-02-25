export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'supravisor_theme'

export function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export function setStoredTheme(mode: ThemeMode): void {
  localStorage.setItem(STORAGE_KEY, mode)
}

export function applyTheme(mode: ThemeMode): void {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.classList.toggle('light', mode === 'light')
}
