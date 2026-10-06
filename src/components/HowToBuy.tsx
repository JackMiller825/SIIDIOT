export function HowToBuy() {
  return (
    <div className="how-to-buy">
      <h2 id="how-to-buy-title">How To Buy</h2>
      <ol className="how-steps">
        <li>
          <span className="how-num" aria-hidden="true">
            1
          </span>
          <div>
            <h3>Create a Wallet</h3>
            <p>
              Download MetaMask or your wallet of choice from the App Store or Google Play Store for free. Desktop users,
              download the Google Chrome extension by going to{' '}
              <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">
                metamask.io
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        </li>
        <li>
          <span className="how-num" aria-hidden="true">
            2
          </span>
          <div>
            <h3>Get Some ETH</h3>
            <p>
              Have ETH in your wallet to switch to $SIIDIOT. If you don’t have any ETH, you can buy directly on MetaMask,
              transfer from another wallet, or buy on another exchange and send it to your wallet.
            </p>
          </div>
        </li>
        <li>
          <span className="how-num" aria-hidden="true">
            3
          </span>
          <div>
            <h3>Go to Uniswap</h3>
            <p>
              Connect to Uniswap. Go to{' '}
              <a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer">
                app.uniswap.org
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{' '}
              in Google Chrome or on the browser inside your MetaMask app. Connect your wallet. Paste the $SIIDIOT token
              address into Uniswap, select $SIIDIOT, and confirm. When MetaMask prompts you for a wallet signature, review
              the swap and sign only if it matches.
            </p>
          </div>
        </li>
        <li>
          <span className="how-num" aria-hidden="true">
            4
          </span>
          <div>
            <h3>Switch ETH for $SIIDIOT</h3>
            <p>
              Switch ETH for $SIIDIOT. We have zero taxes, so you don’t need to worry about buying with a specific
              slippage, although you may need to use slippage during times of market volatility.
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}
