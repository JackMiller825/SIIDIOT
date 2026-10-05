import { useEffect, useRef, useState } from 'react'
import { site } from '../config'
import { meme } from '../copy'
import { publicUrl } from '../lib/assets'
import { images } from '../lib/images'
import { copyText } from '../lib/clipboard'
import { resolveProject, shareCaption, xIntentUrl } from '../lib/project'
import { SmartImage } from './ui'

const caption = shareCaption(site)
const links = resolveProject(site)

export function MemeKit() {
  const [notice, setNotice] = useState('')
  const [manual, setManual] = useState(false)
  const manualRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!manual) return
    manualRef.current?.focus()
    manualRef.current?.select()
  }, [manual])

  async function onCopy() {
    const ok = await copyText(caption)
    if (ok) {
      setManual(false)
      setNotice('Caption copied.')
    } else {
      setManual(true)
      setNotice('Could not copy the caption. Select the caption text below.')
    }
  }

  return (
    <section className="section section-paper" id="meme-kit" tabIndex={-1} aria-labelledby="meme-title">
      <div className="wrap meme-grid">
        <figure className="poster-frame">
          <SmartImage image={images.poster} alt="Share poster for Superintelligent Idiot, drawn as a lab incident report." />
        </figure>
        <div>
          <p className="eyebrow">{meme.kicker}</p>
          <h2 id="meme-title">{meme.heading}</h2>
          <p>{meme.body}</p>
          <p className="caption-block">
            <span className="contract-kicker">Caption</span>
            {caption}
          </p>
          <div className="hero-actions">
            {links.domain ? (
              <a className="btn btn-ink" href={xIntentUrl(caption)} target="_blank" rel="noopener noreferrer">
                Share on X
              </a>
            ) : null}
            <button type="button" className="btn btn-primary" onClick={onCopy}>
              Copy caption
            </button>
          </div>
          <p className="contract-notice" role="status" aria-live="polite">
            {notice}
          </p>
          {manual ? (
            <textarea ref={manualRef} className="manual-caption" readOnly value={caption} rows={3} aria-label="Caption to copy" />
          ) : null}
          <ul className="manifest">
            {site.downloads.map((item) => (
              <li key={item.path}>
                <span>
                  <strong>{item.label}</strong>
                  <span className="filename">{item.filename}</span>
                </span>
                <a href={publicUrl(item.path)} download={item.filename}>
                  Download {item.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
