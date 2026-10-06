import { site } from '../config'
import { tokenCopy } from '../copy'
import { HowToBuy } from './HowToBuy'
import { ContractAddress } from './ui'

function taxLabel(): string {
  const buy = site.taxes?.buy?.trim()
  const sell = site.taxes?.sell?.trim()
  if (buy && sell && buy === sell) return buy
  if (buy || sell) return [buy && `Buy ${buy}`, sell && `Sell ${sell}`].filter(Boolean).join('. ')
  return 'Pending'
}

export function TokenFacts() {
  return (
    <section className="section section-paper" id="token" tabIndex={-1} aria-labelledby="token-title">
      <div className="wrap">
        <div className="facts">
          <h2 id="token-title">{tokenCopy.heading}</h2>
          <dl className="fact-list">
            <div className="fact-row fact-row-contract">
              <dt>Contract Address</dt>
              <dd>
                <ContractAddress tone="dark" showKicker={false} />
              </dd>
            </div>
            <div className="fact-row">
              <dt>Total Supply</dt>
              <dd>{site.totalSupply?.trim() || 'Pending'}</dd>
            </div>
            <div className="fact-row">
              <dt>Tax</dt>
              <dd>{taxLabel()}</dd>
            </div>
            <div className="fact-row">
              <dt>Ownership</dt>
              <dd>{site.ownership.status?.trim() || 'Pending'}</dd>
            </div>
          </dl>
        </div>
        <HowToBuy />
      </div>
    </section>
  )
}
