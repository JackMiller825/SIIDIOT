import { useState } from 'react'
import { brain } from '../copy'
import { images } from '../lib/images'
import { cx } from '../lib/cx'
import { SmartImage } from './ui'

export function BrainScan() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="section section-dark" id="brain-scan" tabIndex={-1} aria-labelledby="brain-title">
      <div className="wrap">
        <p className="eyebrow">{brain.kicker}</p>
        <h2 id="brain-title">{brain.heading}</h2>
        <p className="lede on-dark">
          Focus a numbered marker, or read the same notes beside the portrait. Nothing important is hidden behind a hover.
        </p>
        <div className="scan-layout">
          <div className="sheet">
            <figure className="scan-figure">
              <SmartImage
                image={images.profile}
                alt="Inspection portrait of Superintelligent Idiot sitting and holding a keyboard."
              />
              {brain.notes.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  className={cx('hotspot', active === note.id && 'is-active')}
                  style={{ left: note.x, top: note.y }}
                  aria-pressed={active === note.id}
                  aria-describedby={`note-${note.id}`}
                  onClick={() => setActive(note.id)}
                  onFocus={() => setActive(note.id)}
                >
                  <span className="sr-only">{note.text}</span>
                  <span aria-hidden="true">{note.n}</span>
                </button>
              ))}
            </figure>
            <p className="module-stamp">{brain.stamp}</p>
          </div>
          <ol className="annotations">
            {brain.notes.map((note) => (
              <li key={note.id} id={`note-${note.id}`} className={cx(active === note.id && 'is-active')}>
                {note.text}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
