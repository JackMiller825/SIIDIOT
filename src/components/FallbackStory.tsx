import { site } from '../config'
import { brain, community, experiments, footerCopy, gameCopy, hero, hoard, incident, labLog, meme, tokenCopy } from '../copy'
import { publicUrl } from '../lib/assets'
import { resolveProject } from '../lib/project'

const links = resolveProject(site)

export function FallbackStory() {
  return (
    <main id="content" className="section section-paper" tabIndex={-1}>
      <div className="wrap">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.headline}</h1>
        <p className="punch">{hero.punchline}</p>
        <p>{hero.description}</p>
        <p>{hero.tagline}</p>
        <p>{links.address ?? 'Contract address pending'}</p>
        <h2>{incident.heading}</h2>
        <p>{incident.body}</p>
        <p>{incident.caption}</p>
        <p>{incident.quote}</p>
        <h2>{brain.heading}</h2>
        <ul>
          {brain.notes.map((note) => (
            <li key={note.id}>{note.text}</li>
          ))}
        </ul>
        <p>{brain.stamp}</p>
        <h2>{experiments.heading}</h2>
        <ul>
          {experiments.shots.map((shot) => (
            <li key={shot.id}>{shot.caption}</li>
          ))}
        </ul>
        <h2>{gameCopy.heading}</h2>
        <p>{gameCopy.description}</p>
        <p>{gameCopy.rest}</p>
        <h2>{hoard.heading}</h2>
        <p>{hoard.punchline}</p>
        <p>{hoard.body}</p>
        <h2>{labLog.heading}</h2>
        <p>{labLog.fiction}</p>
        <p>{labLog.punchline}</p>
        <ul>
          {labLog.entries.map((entry) => (
            <li key={entry.time}>
              {entry.time} — {entry.text}
            </li>
          ))}
        </ul>
        <h2>{tokenCopy.heading}</h2>
        <p>
          {site.chain}. {site.ticker}.
        </p>
        <p>{tokenCopy.prelaunch}</p>
        <ol>
          {tokenCopy.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h2>{community.heading}</h2>
        <p>{community.body}</p>
        <h2>{meme.heading}</h2>
        <p>{meme.body}</p>
        <ul>
          {site.downloads.map((item) => (
            <li key={item.path}>
              <a href={publicUrl(item.path)} download={item.filename}>
                Download {item.filename}
              </a>
            </li>
          ))}
        </ul>
        <p>{footerCopy.disclaimer}</p>
        <p>{footerCopy.signoff}</p>
      </div>
    </main>
  )
}
