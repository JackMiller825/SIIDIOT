import { describe, expect, it } from 'vitest'
import type { ProjectConfig } from '../src/config'
import { site } from '../src/config'
import { copyText } from '../src/lib/clipboard'
import { copyableAddress, resolveProject, shareCaption } from '../src/lib/project'
import { readBestScore, writeBestScore } from '../src/lib/storage'

const address = `0x${'ab'.repeat(20)}`

function withConfig(patch: Partial<ProjectConfig>): ProjectConfig {
  return { ...site, ...patch }
}

describe('project gates', () => {
  it('ships prelaunch with every unknown field empty', () => {
    expect(site.launchStatus).toBe('prelaunch')
    expect(site.domain).toBe('https://siidiot.site')
    expect(site.contractAddress).toBeNull()
    expect(site.swapUrl).toBeNull()
    expect(site.chartUrl).toBeNull()
    expect(site.explorerUrl).toBeNull()
    expect(site.xUrl).toBeNull()
    expect(site.telegramUrl).toBeNull()
    expect(site.totalSupply).toBeNull()
    expect(site.taxes).toBeNull()
    expect(site.allocations).toEqual([])
    const resolved = resolveProject(site)
    expect(resolved.purchaseUrl).toBeNull()
    expect(resolved.chartUrl).toBeNull()
    expect(resolved.address).toBeNull()
    expect(resolved.launched).toBe(false)
  })

  it('does not enable buying from an address or a prelaunch swap URL', () => {
    const addressed = resolveProject(withConfig({ contractAddress: address }))
    expect(addressed.address).toBe(address)
    expect(addressed.purchaseUrl).toBeNull()

    const drafted = resolveProject(
      withConfig({
        launchStatus: 'prelaunch',
        swapUrl: 'https://swap.example/siidiot',
        contractAddress: address,
      }),
    )
    expect(drafted.purchaseUrl).toBeNull()
  })

  it('enables buying only after launch and a real swap URL', () => {
    const ready = resolveProject(
      withConfig({ launchStatus: 'launched', swapUrl: 'https://swap.example/siidiot' }),
    )
    expect(ready.purchaseUrl).toBe('https://swap.example/siidiot')
    expect(resolveProject(withConfig({ launchStatus: 'launched', swapUrl: 'notaurl' })).purchaseUrl).toBeNull()
    expect(resolveProject(withConfig({ chartUrl: 'https://chart.example/siidiot' })).chartUrl).toBe(
      'https://chart.example/siidiot',
    )
  })

  it('copies the full address and rejects truncated or invalid ones', () => {
    expect(address).toHaveLength(42)
    expect(copyableAddress(address)).toBe(address)
    expect(copyableAddress(`  ${address}  `)).toBe(address)
    expect(copyableAddress(address.slice(0, 20))).toBeNull()
    expect(copyableAddress(`0x${'zz'.repeat(20)}`)).toBeNull()
    expect(copyableAddress('')).toBeNull()
  })

  it('builds a caption without inventing a domain', () => {
    expect(shareCaption(site)).toBe(
      'Superintelligent Idiot ($SIIDIOT). Super intelligence. Zero common sense. https://siidiot.site',
    )
    const withoutDomain = shareCaption(withConfig({ domain: null }))
    expect(withoutDomain).toBe('Superintelligent Idiot ($SIIDIOT). Super intelligence. Zero common sense.')
    expect(withoutDomain).not.toContain('http')
    const withDomain = shareCaption(withConfig({ domain: 'https://lab.example/' }))
    expect(withDomain).toContain('https://lab.example')
    expect(withDomain).not.toContain(address)
  })

  it('survives storage failures', () => {
    const broken = {
      getItem() {
        throw new Error('blocked')
      },
      setItem() {
        throw new Error('blocked')
      },
    }
    expect(readBestScore(broken)).toEqual({ value: 0, ok: false })
    expect(writeBestScore(broken, 4)).toBe(false)
    const memory = new Map<string, string>()
    const store = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value)
      },
    }
    expect(writeBestScore(store, 3)).toBe(true)
    expect(readBestScore(store).value).toBe(3)
  })

  it('exposes copyText for the full string', () => {
    expect(typeof copyText).toBe('function')
  })
})
