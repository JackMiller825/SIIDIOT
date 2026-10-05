import { site } from '../config'
import { community } from '../copy'
import { images } from '../lib/images'
import { resolveProject } from '../lib/project'
import { GatedLink, SmartImage } from './ui'

const links = resolveProject(site)

export function Community() {
  return (
    <section className="section section-dark" id="community" tabIndex={-1} aria-labelledby="community-title">
      <div className="wrap community-grid">
        <div>
          <p className="eyebrow">{community.kicker}</p>
          <h2 id="community-title">{community.heading}</h2>
          <p className="lede">{community.body}</p>
          <div className="community-actions">
            <GatedLink
              href={links.xUrl}
              label="X"
              pendingLabel="X pending"
              className="btn btn-ghost"
              pendingClassName="btn btn-pending"
            />
            <GatedLink
              href={links.telegramUrl}
              label="Telegram"
              pendingLabel="Telegram pending"
              className="btn btn-ghost"
              pendingClassName="btn btn-pending"
            />
          </div>
        </div>
        <figure className="community-figure">
          <SmartImage
            image={images.community}
            alt="Four Superintelligent Idiot robots at a laboratory table, eating keyboards together."
          />
        </figure>
      </div>
    </section>
  )
}
