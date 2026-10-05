import react from '@vitejs/plugin-react'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build, defineConfig } from 'vite'
import type { Plugin } from 'vite'

const root = dirname(fileURLToPath(import.meta.url))

function readDomain(): string | null {
  const source = readFileSync(resolve(root, 'src/config.ts'), 'utf8')
  const match = source.match(/^\s*domain:\s*(null|"([^"]*)"|'([^']*)')\s*,/m)
  if (!match || match[1] === 'null') return null
  const value = (match[2] ?? match[3] ?? '').trim()
  if (!/^https?:\/\/\S+$/.test(value)) return null
  return value.replace(/\/$/, '')
}

function joinUrl(origin: string, base: string, path = ''): string {
  const normalized = base.startsWith('/') ? base : `/${base}`
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`
  if (!path) return `${origin}${withSlash}`
  return `${origin}${withSlash}${path.replace(/^\//, '')}`
}

function sitePlugin(): Plugin {
  let base = '/'
  let outDir = resolve(root, 'dist')
  let isSsr = false

  return {
    name: 'siidiot-site',
    configResolved(config) {
      base = config.base
      outDir = config.build.outDir
      isSsr = Boolean(config.build.ssr)
    },
    transformIndexHtml(html) {
      const domain = readDomain()
      if (!domain) return html
      const canonical = joinUrl(domain, base)
      const image = joinUrl(domain, base, 'images/siidiot-banner-wide.png')
      return {
        html,
        tags: [
          { tag: 'link', attrs: { rel: 'canonical', href: canonical }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: canonical }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
          {
            tag: 'meta',
            attrs: { property: 'og:image:alt', content: 'Superintelligent Idiot wide banner' },
            injectTo: 'head',
          },
          { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
        ],
      }
    },
    async closeBundle() {
      if (isSsr) return
      const ssrDir = resolve(root, 'node_modules/.tmp/ssr')
      await build({
        configFile: false,
        root,
        base,
        plugins: [react()],
        logLevel: 'warn',
        build: {
          ssr: resolve(root, 'src/entry-ssr.tsx'),
          outDir: ssrDir,
          emptyOutDir: true,
        },
      })
      const entry = readdirSync(ssrDir).find((file) => /^entry-ssr\.(js|mjs)$/.test(file))
      if (!entry) throw new Error('SSR bundle was not emitted')
      const loaded = (await import(`${pathToFileURL(resolve(ssrDir, entry)).href}?t=${Date.now()}`)) as {
        render: () => string
      }
      const markup = loaded.render()
      if (markup.length < 200) throw new Error('Prerender produced empty markup')
      const indexPath = resolve(outDir, 'index.html')
      const html = readFileSync(indexPath, 'utf8')
      const needle = '<div id="root"></div>'
      if (!html.includes(needle)) throw new Error('Built index.html is missing the root placeholder')
      writeFileSync(indexPath, html.split(needle).join(`<div id="root">${markup}</div>`))
    },
  }
}

export default defineConfig({
  plugins: [react(), sitePlugin()],
  server: {
    host: '0.0.0.0',
    port: 4731,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4732,
    strictPort: true,
  },
})
