export {}

declare global {
  interface Window {
    __startLoader?: () => void
  }
}
