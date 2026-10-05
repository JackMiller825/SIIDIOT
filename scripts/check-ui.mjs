import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const base = process.env.CHECK_URL ?? 'http://127.0.0.1:4731'
const outDir = '/tmp/siidiot-shots'
mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: '/usr/local/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const failures = []
function check(name, ok, detail = '') {
  if (ok) {
    console.log(`ok  ${name}`)
  } else {
    failures.push(`${name}${detail ? `: ${detail}` : ''}`)
    console.log(`FAIL ${name}${detail ? `: ${detail}` : ''}`)
  }
}

async function overflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement
    const wide = []
    for (const el of document.querySelectorAll('body *')) {
      if (!(el instanceof HTMLElement)) continue
      const style = getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden') continue
      if (el.scrollWidth > el.clientWidth + 8 && el.clientWidth > 0 && el.scrollWidth > 0) {
        const text = (el.innerText || el.getAttribute('aria-label') || el.tagName).replace(/\s+/g, ' ').slice(0, 80)
        if (text) wide.push(`${el.tagName}.${el.className.toString().slice(0, 40)}:${text}`)
      }
    }
    return {
      page: doc.scrollWidth - doc.clientWidth,
      samples: wide.slice(0, 8),
    }
  })
}

async function shoot(page, name) {
  await page.screenshot({ path: `${outDir}/${name}.png` })
}

async function scrollTo(page, selector) {
  await page.evaluate((target) => {
    document.querySelector(target)?.scrollIntoView({ block: 'center', behavior: 'instant' })
  }, selector)
  await new Promise((resolve) => setTimeout(resolve, 80))
}

const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })
await page.goto(base, { waitUntil: 'networkidle0' })

await page.evaluate(async () => {
  const images = [...document.images]
  for (const img of images) {
    img.loading = 'eager'
    if (!img.complete) {
      const next = img.getAttribute('src')
      if (next) {
        img.removeAttribute('src')
        img.src = next
      }
    }
  }
  await Promise.race([
    Promise.all(
      images.map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true })
                img.addEventListener('error', () => resolve(), { once: true })
              }),
      ),
    ),
    new Promise((resolve) => setTimeout(resolve, 8000)),
  ])
})
const images = await page.evaluate(() =>
  [...document.images].map((img) => ({
    alt: img.alt,
    src: img.currentSrc || img.src,
    ok: img.complete && img.naturalWidth > 0,
  })),
)
check('images loaded', images.every((img) => img.ok), images.filter((img) => !img.ok).map((img) => img.src).join(','))
check('hero background is decorative', images.some((img) => img.src.includes('siidiot-lab-background') && img.alt === ''))
check('contract pending', (await page.$eval('body', (el) => el.innerText)).includes('Contract address pending'))
check('buy disabled', (await page.$('button.btn-pending')) !== null)
check('no fake hash links', await page.evaluate(() => [...document.querySelectorAll('a')].every((a) => a.getAttribute('href') !== '#')))
check('zip link present', await page.evaluate(() => [...document.querySelectorAll('a')].some((a) => a.getAttribute('download') === 'siidiot-meme-kit.zip')))

const zip = await page.evaluate(async (url) => {
  const response = await fetch(url)
  const bytes = new Uint8Array(await response.arrayBuffer())
  return { status: response.status, sig: String.fromCharCode(bytes[0], bytes[1]), size: bytes.length }
}, new URL('downloads/siidiot-meme-kit.zip', base).href)
check('zip download', zip.status === 200 && zip.sig === 'PK' && zip.size > 1000, JSON.stringify(zip))

await page.evaluate(() => document.querySelector('.motion-toggle')?.click())
await page.evaluate(() => window.scrollTo(0, 0))
await shoot(page, 'desktop-hero')
await scrollTo(page, '#brain-scan')
await shoot(page, 'desktop-brain')
const scan = await page.$('.scan-figure')
if (scan) await scan.screenshot({ path: `${outDir}/scan-figure.png` })
await scrollTo(page, '#failed-tests')
await shoot(page, 'desktop-tests')
await scrollTo(page, '#find-esc')
await shoot(page, 'desktop-game')
await scrollTo(page, '#token')
await shoot(page, 'desktop-token')
await scrollTo(page, '#meme-kit')
await shoot(page, 'desktop-meme')

const desk = await overflow(page)
check('desktop overflow', desk.page <= 1, JSON.stringify(desk))

const opener = await page.$('#failed-tests .shot-button')
await opener.focus()
await opener.click()
await page.waitForSelector('[role="dialog"]')
const trapped = await page.evaluate(() => document.activeElement?.textContent?.includes('Close'))
check('lightbox focuses close', trapped)
await page.keyboard.press('Escape')
await page.waitForSelector('[role="dialog"]', { hidden: true })
const returned = await page.evaluate(() => document.activeElement?.classList.contains('shot-button'))
check('lightbox returns focus', returned)

await scrollTo(page, '#find-esc')
await page.click('#find-esc .btn-primary')
await page.waitForSelector('#find-esc .keycap.is-marked', { timeout: 4000 })
const marked = await page.$eval('#find-esc .keycap.is-marked', (el) => el.getAttribute('data-key'))
await page.waitForFunction(() => document.querySelector('#esc-status')?.textContent?.includes('Pick a keycap'), { timeout: 12000 })
const disabledDuring = await page.$eval('#find-esc .keycap', (el) => el.disabled)
check('answers enabled after shuffle', disabledDuring === false)
await page.evaluate((key) => {
  document.querySelector(`#find-esc .keycap[data-key="${key}"]`)?.click()
}, marked)
const correctText = await page.$eval('#esc-status', (el) => el.textContent ?? '')
check('tracked key is correct', correctText.includes('You found it. He is taking the credit.'), correctText)

await page.click('#find-esc .game-actions .btn-ghost')
await page.waitForSelector('#find-esc .keycap.is-marked', { timeout: 4000 })
const markedAgain = await page.$eval('#find-esc .keycap.is-marked', (el) => el.getAttribute('data-key'))
await page.waitForFunction(() => document.querySelector('#esc-status')?.textContent?.includes('Pick a keycap'), { timeout: 12000 })
const wrongKey = ['0', '1', '2'].find((id) => id !== markedAgain)
await page.evaluate((key) => {
  document.querySelector(`#find-esc .keycap[data-key="${key}"]`)?.click()
}, wrongKey)
const wrongText = await page.$eval('#esc-status', (el) => el.textContent ?? '')
check('other key is incorrect', wrongText.includes('Wrong key. A very confident result.'), wrongText)
check('round advanced', Number(await page.$eval('#find-esc .scoreboard dd', (el) => el.textContent)) >= 2)

await page.evaluate(() => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => { throw new Error('blocked') } },
  })
  document.execCommand = () => false
})
await scrollTo(page, '#meme-kit')
await page.evaluate(() => document.querySelector('#meme-kit .btn-primary')?.click())
await page.waitForSelector('#meme-kit textarea', { timeout: 4000 }).catch(() => null)
const manual = await page.evaluate(() => document.querySelector('#meme-kit textarea')?.value ?? document.querySelector('#meme-kit .contract-notice')?.textContent ?? '')
check('caption fallback', manual.includes('$SIIDIOT') && !manual.includes('http'), manual)

for (const width of [360, 390, 768]) {
  await page.setViewport({ width, height: 800 })
  await page.goto(base, { waitUntil: 'networkidle0' })
  const heroOrder = await page.evaluate(() => {
    const report = document.querySelector('.hero-report')
    const mascot = document.querySelector('.hero-mascot')
    if (!report || !mascot) return 'missing'
    return report.getBoundingClientRect().top <= mascot.getBoundingClientRect().top ? 'text-first' : 'mascot-first'
  })
  check(`${width} hero text above mascot`, width >= 900 || heroOrder === 'text-first', heroOrder)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.evaluate(() => window.scrollTo(0, 0))
  const result = await overflow(page)
  check(`${width} page overflow`, result.page <= 1, JSON.stringify(result))
  await shoot(page, `width-${width}`)
}

await page.setViewport({ width: 390, height: 800 })
await page.goto(base, { waitUntil: 'networkidle0' })
await page.click('.nav-toggle')
const menuOpen = await page.$eval('#mobile-nav', (el) => !el.hasAttribute('hidden'))
check('mobile menu opens', menuOpen)
await page.keyboard.press('Escape')
const menuClosed = await page.$eval('#mobile-nav', (el) => el.hasAttribute('hidden'))
check('mobile menu escape', menuClosed)

await page.evaluate(() => localStorage.clear())
await page.reload({ waitUntil: 'networkidle0' })
await page.click('.motion-toggle')
const motionOff = await page.evaluate(() => ({
  label: document.querySelector('.motion-toggle')?.textContent,
  flag: document.documentElement.dataset.motion,
}))
check('motion toggle off', motionOff.label?.includes('Motion off') && motionOff.flag === 'off', JSON.stringify(motionOff))

await browser.close()

const browser2 = await puppeteer.launch({
  executablePath: '/usr/local/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page2 = await browser2.newPage()
await page2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await page2.evaluateOnNewDocument(() => {
  const original = Storage.prototype.getItem
  Storage.prototype.getItem = function (key) {
    if (key === 'siidiot-esc-best') throw new Error('blocked')
    return original.call(this, key)
  }
})
await page2.setViewport({ width: 1280, height: 800 })
await page2.goto(base, { waitUntil: 'networkidle0' })
const reducedState = await page2.evaluate(() => ({
  label: document.querySelector('.motion-toggle')?.textContent ?? '',
  flag: document.documentElement.dataset.motion ?? '',
  note: document.body.innerText.includes('did not save the best streak'),
}))
check('reduced motion default off', reducedState.label.includes('Motion off') && reducedState.flag === 'off', JSON.stringify(reducedState))
check('storage failure note', reducedState.note, JSON.stringify(reducedState))
await browser2.close()

if (failures.length) {
  console.log(`\n${failures.length} failed`)
  process.exit(1)
}
console.log('\nall checks passed')
