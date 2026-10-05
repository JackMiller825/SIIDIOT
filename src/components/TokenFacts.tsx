import { site } from '../config'
import { tokenCopy } from '../copy'
import { claimOrPending, resolveProject } from '../lib/project'
import { isHttpUrl } from '../lib/urls'
import { ContractAddress, GatedLink } from './ui'

const links = resolveProject(site)

function Evidence({ items }: { items: { label: string; url: string }[] }) {
  if (items.length === 0) return null
  return (
    <ul className="evidence">
      {items.map((item) => (
        <li key={`${item.label}-${item.url}`}>
          {isHttpUrl(item.url) ? (
            <a href={item.url.trim()} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ) : (
            <span>{item.label} (link unavailable)</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function TokenFacts() {
  return (
    <section className="section section-paper" id="token" tabIndex={-1} aria-labelledby="token-title">
      <div className="wrap">
        <div className="facts">
          <h2 id="token-title">{tokenCopy.heading}</h2>
          <p className="facts-lead">{tokenCopy.lead}</p>
          <dl className="fact-list">
            <div className="fact-row">
              <dt>Name</dt>
              <dd>{site.name}</dd>
            </div>
            <div className="fact-row">
              <dt>Ticker</dt>
              <dd>{site.ticker}</dd>
            </div>
            <div className="fact-row">
              <dt>Chain</dt>
              <dd>{site.chain}</dd>
            </div>
            <div className="fact-row">
              <dt>Launch</dt>
              <dd>{links.launched ? 'Launched' : 'Prelaunch'}</dd>
            </div>
            <div className="fact-row">
              <dt>Total supply</dt>
              <dd>{site.totalSupply?.trim() || 'Pending'}</dd>
            </div>
            <div className="fact-row">
              <dt>Allocation</dt>
              <dd>
                {site.allocations.length === 0 ? (
                  'Pending'
                ) : (
                  <ul className="plain-list">
                    {site.allocations.map((item) => (
                      <li key={item.label}>
                        <strong>{item.label}.</strong> {item.detail}
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
            <div className="fact-row">
              <dt>Taxes</dt>
              <dd>
                {site.taxes === null ? (
                  'Pending'
                ) : (
                  <ul className="plain-list">
                    <li>Buy: {site.taxes.buy?.trim() || 'Pending'}</li>
                    <li>Sell: {site.taxes.sell?.trim() || 'Pending'}</li>
                  </ul>
                )}
              </dd>
            </div>
            <div className="fact-row">
              <dt>Liquidity</dt>
              <dd>
                {claimOrPending(site.liquidity.status, 'Pending')}
                <Evidence items={site.liquidity.evidence} />
              </dd>
            </div>
            <div className="fact-row">
              <dt>Ownership</dt>
              <dd>
                {claimOrPending(site.ownership.status, 'Pending')}
                <Evidence items={site.ownership.evidence} />
              </dd>
            </div>
          </dl>

          <h3>How to buy</h3>
          <ol className="buy-steps">
            {tokenCopy.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {links.launched ? null : <p className="prelaunch-note">{tokenCopy.prelaunch}</p>}
          <div className="facts-actions">
            <GatedLink
              href={links.purchaseUrl}
              label="Buy $SIIDIOT"
              pendingLabel="Buy pending"
              className="btn btn-primary"
              pendingClassName="btn btn-pending"
            />
            <GatedLink
              href={links.chartUrl}
              label="View chart"
              pendingLabel="Chart pending"
              className="btn btn-ghost"
              pendingClassName="btn btn-pending"
            />
            <GatedLink
              href={links.explorerUrl}
              label="View on Etherscan"
              pendingLabel="Etherscan pending"
              className="btn btn-ghost"
              pendingClassName="btn btn-pending"
            />
          </div>
          <ContractAddress tone="dark" />
        </div>
      </div>
    </section>
  )
}
