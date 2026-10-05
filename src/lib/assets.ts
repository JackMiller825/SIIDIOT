/** Prefix a site-root path with Vite's base so GitHub project-page deploys resolve. */
export function publicUrl(path: string): string {
  const rawBase = import.meta.env.BASE_URL || '/'
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`
  return `${base}${path.replace(/^\//, '')}`
}
