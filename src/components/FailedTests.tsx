import { experiments } from '../copy'
import { publicUrl } from '../lib/assets'
import { images } from '../lib/images'
import { useLightbox } from './useLightbox'
import { SmartImage } from './ui'

export function FailedTests() {
  const { open, lightbox } = useLightbox()

  return (
    <section className="section section-paper" id="failed-tests" tabIndex={-1} aria-labelledby="tests-title">
      <div className="wrap">
        <p className="eyebrow">{experiments.kicker}</p>
        <h2 id="tests-title">{experiments.heading}</h2>
        <div className="experiment-list">
          {experiments.shots.map((shot) => {
            const image = images[shot.file]
            return (
              <figure key={shot.id} className={`shot ${shot.tilt}`}>
                <div className="print">
                  <span className="tape tape-a" aria-hidden="true" />
                  <button
                    type="button"
                    className="shot-button"
                    aria-haspopup="dialog"
                    onClick={() =>
                      open({
                        src: publicUrl(image.file),
                        alt: shot.alt,
                        label: shot.caption,
                      })
                    }
                  >
                    <SmartImage image={image} alt={shot.alt} />
                    <span className="sr-only">Enlarge photograph.</span>
                  </button>
                </div>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            )
          })}
        </div>
      </div>
      {lightbox}
    </section>
  )
}
