import { hoard } from '../copy'
import { publicUrl } from '../lib/assets'
import { images } from '../lib/images'
import { useLightbox } from './useLightbox'
import { SmartImage } from './ui'

export function Hoard() {
  const { open, lightbox } = useLightbox()
  return (
    <section className="section section-dark" id="hoard" tabIndex={-1} aria-labelledby="hoard-title">
      <div className="wrap hoard-grid">
        <figure className="hoard-figure">
          <SmartImage
            image={images.hoard}
            alt="Superintelligent Idiot sitting in a laboratory room buried in piles of keyboards."
          />
        </figure>
        <div className="report hoard-report">
          <p className="eyebrow">{hoard.kicker}</p>
          <h2 id="hoard-title">{hoard.heading}</h2>
          <p className="punch">{hoard.punchline}</p>
          <p>{hoard.body}</p>
          <button
            type="button"
            className="btn btn-ink"
            aria-haspopup="dialog"
            onClick={() =>
              open({
                src: publicUrl(images.hoard.file),
                alt: 'Superintelligent Idiot sitting in a laboratory room buried in piles of keyboards.',
                label: 'Keyboard hoard',
              })
            }
          >
            {hoard.button}
          </button>
        </div>
      </div>
      {lightbox}
    </section>
  )
}
