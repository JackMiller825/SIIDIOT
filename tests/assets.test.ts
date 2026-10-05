import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { site } from '../src/config'

const requiredDownloads = [
  'siidiot-share-poster.png',
  'siidiot-logo.png',
  'siidiot-hero-mascot.png',
  'siidiot-reaction-thinking.png',
  'siidiot-reaction-confused.png',
  'siidiot-reaction-proud.png',
  'siidiot-reaction-sleeping.png',
  'siidiot-banner-wide.png',
  'siidiot-banner-1100x520.png',
  'siidiot-meme-kit.zip',
]

function pngSize(path: string) {
  const buf = readFileSync(path)
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), color: buf[25] }
}

describe('supplied artwork', () => {
  it('lists real downloadable files, including a non-empty zip', () => {
    expect(site.downloads.map((item) => item.filename)).toEqual(requiredDownloads)
    for (const item of site.downloads) {
      const bytes = readFileSync(`public/${item.path}`)
      expect(bytes.byteLength).toBeGreaterThan(1000)
    }
    const listing = execFileSync(
      'python3',
      [
        '-c',
        `
import zipfile
z = zipfile.ZipFile('public/downloads/siidiot-meme-kit.zip')
names = z.namelist()
print('\\n'.join(names))
assert names, 'empty zip'
for info in z.infolist():
    assert info.file_size > 1000, info.filename
`,
      ],
      { encoding: 'utf8' },
    )
    for (const name of requiredDownloads.filter((file) => file.endsWith('.png'))) {
      expect(listing).toContain(name)
    }
    expect(listing).toContain('siidiot-fail-door.png')
    expect(listing).toContain('siidiot-lab-background.png')
  })

  it('keeps the telegram banner at 1100×520 and cutouts transparent', () => {
    expect(pngSize('public/images/siidiot-banner-1100x520.png')).toMatchObject({ width: 1100, height: 520 })
    for (const file of [
      'siidiot-logo.png',
      'siidiot-icon.png',
      'siidiot-hero-mascot.png',
      'siidiot-reaction-thinking.png',
      'siidiot-reaction-confused.png',
      'siidiot-reaction-proud.png',
      'siidiot-reaction-sleeping.png',
    ]) {
      expect(pngSize(`public/images/${file}`).color).toBe(6)
    }
  })
})
