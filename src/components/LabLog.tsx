import { labLog } from '../copy'
import { images } from '../lib/images'
import { SmartImage } from './ui'

export function LabLog() {
  return (
    <section className="section section-desk" id="lab-log" tabIndex={-1} aria-labelledby="log-title">
      <div className="wrap">
        <p className="fiction-flag">{labLog.fiction}</p>
        <div className="notebook-wrap">
          <article className="notebook">
            <figure className="pin">
              <span className="tape tape-a" aria-hidden="true" />
              <SmartImage image={images.pillow} alt="Superintelligent Idiot asleep on a keyboard beside a cushion." />
            </figure>
            <p className="eyebrow">{labLog.kicker}</p>
            <h2 id="log-title">{labLog.heading}</h2>
            <p className="punch">{labLog.punchline}</p>
            <ol className="log-entries">
              {labLog.entries.map((entry) => (
                <li key={entry.time}>
                  <time dateTime={entry.time}>{entry.time}</time>
                  <span>{entry.text}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  )
}
