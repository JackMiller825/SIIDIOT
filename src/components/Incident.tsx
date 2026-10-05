import { incident } from '../copy'
import { images } from '../lib/images'
import { SmartImage } from './ui'

export function Incident() {
  return (
    <section className="section section-paper" id="incident" tabIndex={-1} aria-labelledby="incident-title">
      <div className="wrap incident-grid">
        <article className="report">
          <p className="eyebrow">{incident.kicker}</p>
          <h2 id="incident-title">{incident.heading}</h2>
          <p>{incident.body}</p>
          <blockquote>
            <p>{incident.quote}</p>
            <footer>Lab engineer</footer>
          </blockquote>
        </article>
        <figure className="origin-figure">
          <SmartImage
            image={images.origin}
            alt="A startled engineer in a lab coat reaches for the keyboard while Superintelligent Idiot bites it."
          />
          <figcaption>{incident.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
