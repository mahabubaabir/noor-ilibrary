/**
 * Only allow same-origin relative paths as post-login redirect targets.
 * Prevents open redirects (?redirect=https://evil.example, //evil.example, etc).
 */
export function safeInternalPath(
  value: string | null | undefined,
  fallback = '/library',
): string {
  if (!value) return fallback
  const path = value.trim()
  if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/\\')) return fallback
  if (/[\r\n\\]/.test(path)) return fallback
  return path
}
