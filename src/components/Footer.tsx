import { site } from '../config'
import { footerCopy } from '../copy'
import { resolveProject } from '../lib/project'
import { GatedLink } from './ui'

const links = resolveProject(site)

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-name">
          {site.name} <span>{site.ticker}</span>
        </p>
        <ul className="footer-links">
          <li>
            <GatedLink
              href={links.xUrl}
              label="X"
              pendingLabel="X pending"
              className="footer-link"
              pendingClassName="footer-link is-pending"
            />
          </li>
          <li>
            <GatedLink
              href={links.telegramUrl}
              label="Telegram"
              pendingLabel="Telegram pending"
              className="footer-link"
              pendingClassName="footer-link is-pending"
            />
          </li>
          <li>
            <GatedLink
              href={links.chartUrl}
              label="Chart"
              pendingLabel="Chart pending"
              className="footer-link"
              pendingClassName="footer-link is-pending"
            />
          </li>
          <li>
            <GatedLink
              href={links.purchaseUrl}
              label="Buy $SIIDIOT"
              pendingLabel="Buy pending"
              className="footer-link"
              pendingClassName="footer-link is-pending"
            />
          </li>
          <li>
            <GatedLink
              href={links.explorerUrl}
              label="Etherscan"
              pendingLabel="Etherscan pending"
              className="footer-link"
              pendingClassName="footer-link is-pending"
            />
          </li>
          {links.domain ? (
            <li>
              <a className="footer-link" href={links.domain} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </li>
          ) : null}
        </ul>
        <p className="disclaimer">{footerCopy.disclaimer}</p>
        <p className="signoff">{footerCopy.signoff}</p>
      </div>
    </footer>
  )
}
