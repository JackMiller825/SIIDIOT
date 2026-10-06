/**
 * Superintelligent Idiot — project configuration.
 *
 * Edit this file when real launch details exist. Unknown values stay null or
 * empty. Do not invent contract addresses, URLs, supply figures, tax rates,
 * liquidity events, ownership claims, audits, exchange listings, or follower
 * counts.
 *
 * Launch rules used by the site:
 * - `launchStatus` stays "prelaunch" until you deliberately set "launched".
 * - Buy controls turn on only when launchStatus is "launched" AND `swapUrl`
 *   is a valid http(s) URL. A contract address by itself does not enable buying.
 * - Chart, Etherscan, X, and Telegram controls turn on only when that specific
 *   field is a valid http(s) URL.
 * - `domain` is the public origin, including https://, or null. Canonical and
 *   social image URLs are published only when this is set. Do not put a
 *   placeholder domain here. Keep the value on one line as null or a quoted
 *   string so the production build can read it:
 *   domain: null,
 *   domain: "https://example.com",
 *
 * Download paths are relative to the site root (no leading slash). The app
 * prefixes them with Vite's BASE_URL so GitHub project pages keep working.
 */

export type LaunchStatus = 'prelaunch' | 'launched'

export type EvidenceLink = {
  label: string
  url: string
}

export type Allocation = {
  label: string
  detail: string
}

export type TaxInfo = {
  buy: string | null
  sell: string | null
}

export type StatusClaim = {
  status: string | null
  evidence: EvidenceLink[]
}

export type DownloadAsset = {
  /** Site-root path. No leading slash. Prefixed with import.meta.env.BASE_URL at runtime. */
  path: string
  /** Filename used for the download attribute. */
  filename: string
  label: string
}

export type ProjectConfig = {
  name: string
  ticker: string
  chain: string
  domain: string | null
  xUrl: string | null
  telegramUrl: string | null
  contractAddress: string | null
  swapUrl: string | null
  chartUrl: string | null
  explorerUrl: string | null
  totalSupply: string | null
  allocations: Allocation[]
  taxes: TaxInfo | null
  liquidity: StatusClaim
  ownership: StatusClaim
  launchStatus: LaunchStatus
  downloads: DownloadAsset[]
}

export const site: ProjectConfig = {
  name: 'Superintelligent Idiot',
  ticker: '$SIIDIOT',
  chain: 'Ethereum',
  domain: 'https://siidiot.site',
  xUrl: 'https://x.com/siidiot_eth',
  telegramUrl: 'https://t.me/SuperIntelligentIDIOT',
  contractAddress: null,
  swapUrl: null,
  chartUrl: null,
  explorerUrl: null,
  totalSupply: '1,000,000,000',
  allocations: [],
  taxes: { buy: '0%', sell: '0%' },
  liquidity: { status: null, evidence: [] },
  ownership: {
    status: 'LP tokens are burnt and contract ownership is renounced.',
    evidence: [],
  },
  launchStatus: 'prelaunch',
  downloads: [
    {
      path: 'images/siidiot-share-poster.png',
      filename: 'siidiot-share-poster.png',
      label: 'Share poster',
    },
    {
      path: 'images/siidiot-logo.png',
      filename: 'siidiot-logo.png',
      label: 'Logo',
    },
    {
      path: 'images/siidiot-hero-mascot.png',
      filename: 'siidiot-hero-mascot.png',
      label: 'Hero cutout',
    },
    {
      path: 'images/siidiot-reaction-thinking.png',
      filename: 'siidiot-reaction-thinking.png',
      label: 'Reaction: thinking',
    },
    {
      path: 'images/siidiot-reaction-confused.png',
      filename: 'siidiot-reaction-confused.png',
      label: 'Reaction: confused',
    },
    {
      path: 'images/siidiot-reaction-proud.png',
      filename: 'siidiot-reaction-proud.png',
      label: 'Reaction: proud',
    },
    {
      path: 'images/siidiot-reaction-sleeping.png',
      filename: 'siidiot-reaction-sleeping.png',
      label: 'Reaction: sleeping',
    },
    {
      path: 'images/siidiot-banner-wide.png',
      filename: 'siidiot-banner-wide.png',
      label: 'Wide community banner',
    },
    {
      path: 'images/siidiot-banner-1100x520.png',
      filename: 'siidiot-banner-1100x520.png',
      label: 'Telegram banner (1100×520)',
    },
    {
      path: 'downloads/siidiot-meme-kit.zip',
      filename: 'siidiot-meme-kit.zip',
      label: 'All supplied PNGs (ZIP)',
    },
  ],
}
