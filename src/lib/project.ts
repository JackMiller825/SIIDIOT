import type { ProjectConfig } from '../config'
import { isEthAddress, isHttpUrl } from './urls'

export type ResolvedProject = {
  address: string | null
  purchaseUrl: string | null
  chartUrl: string | null
  explorerUrl: string | null
  xUrl: string | null
  telegramUrl: string | null
  domain: string | null
  launched: boolean
}

export function copyableAddress(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return isEthAddress(trimmed) ? trimmed : null
}

export function resolveProject(config: ProjectConfig): ResolvedProject {
  const swap = isHttpUrl(config.swapUrl) ? config.swapUrl.trim() : null
  const launched = config.launchStatus === 'launched'
  const domain = isHttpUrl(config.domain) ? config.domain.trim().replace(/\/$/, '') : null
  return {
    address: copyableAddress(config.contractAddress),
    purchaseUrl: launched && swap ? swap : null,
    chartUrl: isHttpUrl(config.chartUrl) ? config.chartUrl.trim() : null,
    explorerUrl: isHttpUrl(config.explorerUrl) ? config.explorerUrl.trim() : null,
    xUrl: isHttpUrl(config.xUrl) ? config.xUrl.trim() : null,
    telegramUrl: isHttpUrl(config.telegramUrl) ? config.telegramUrl.trim() : null,
    domain,
    launched,
  }
}

export function shareCaption(config: ProjectConfig): string {
  const resolved = resolveProject(config)
  const base = `${config.name} (${config.ticker}). Super intelligence. Zero common sense.`
  return resolved.domain ? `${base} ${resolved.domain}` : base
}

export function xIntentUrl(caption: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`
}

export function claimOrPending(status: string | null, pending: string): string {
  const trimmed = status?.trim() ?? ''
  return trimmed.length > 0 ? trimmed : pending
}
