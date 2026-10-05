export function isHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false
  const trimmed = value.trim()
  if (!trimmed) return false
  try {
    const url = new URL(trimmed)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isEthAddress(value: string | null | undefined): value is string {
  if (!value) return false
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim())
}
