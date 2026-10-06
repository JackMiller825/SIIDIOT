import { site } from '../config'
import { footerCopy } from '../copy'
import { resolveProject } from '../lib/project'

const links = resolveProject(site)

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.94 4.3 18.9 19.02c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.76 8.66-7.82c.38-.34-.08-.52-.58-.19L7.3 13.3 2.7 11.86c-1-.31-1.02-.99.21-1.47L20.5 3.1c.83-.31 1.56.2 1.44 1.2z"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-bar">
        <p className="disclaimer">{footerCopy.disclaimer}</p>
        <div className="footer-social">
          {links.xUrl ? (
            <a href={links.xUrl} target="_blank" rel="noopener noreferrer" aria-label="X">
              <XIcon />
            </a>
          ) : null}
          {links.telegramUrl ? (
            <a href={links.telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <TelegramIcon />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
