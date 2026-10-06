# Superintelligent Idiot ($SIIDIOT)

A static, illustrated site for Superintelligent Idiot, an independent Ethereum meme project. The laboratory story is fiction. Token fields stay empty until you put verified values in `src/config.ts`.

The site is a React + TypeScript + Vite app. It does not need a server, database, wallet connection, or API key. `npm run build` writes a static `dist/` folder suitable for GitHub Pages.

## Install and run

```bash
npm install
npm run dev
```

The dev server binds to port **4731**. Open [http://127.0.0.1:4731](http://127.0.0.1:4731).

```bash
npm test
npm run lint
npm run build
npm run preview
```

Preview serves the production build on port **4732**.

## Vite base path

Asset and download URLs are prefixed with Vite's `base` (`import.meta.env.BASE_URL`). The default base is `/`, which is correct for local development, a custom domain, or a user site.

## GitHub Pages

The public site is [https://siidiot.site/](https://siidiot.site/). GitHub Pages serves that custom domain from the site root, so the production build keeps Vite's base at `/`. `public/CNAME` keeps the domain attached on each deploy.

Pushes to `main` run `.github/workflows/pages.yml`, which runs `npm run build` and deploys `dist/`. Local `npm run dev` uses the same root base. Anchor links stay on one page, so no SPA fallback is required.

For a project URL such as `https://username.github.io/repository/` instead of a custom domain, build with `--base=/repository/` so asset paths match that prefix.

## Domain and social links

Edit `src/config.ts`.

- `domain` is the public origin, including `https://`, or `null`. Keep it on one line (`domain: null` or `domain: "https://example.com"`). Canonical and Open Graph image URLs are added only when this is a real http(s) origin. Do not put a placeholder domain here.
- `xUrl` and `telegramUrl` turn on the X and Telegram controls when they are valid http(s) URLs.
- The optional “Share on X” action is shown only when `domain` is set. The tweet text is the name, ticker, tagline, and that domain. Copy caption is always available.

## Token facts and trading links

Still in `src/config.ts`:

| Field | What it does |
| --- | --- |
| `contractAddress` | Full `0x` + 40 hex characters. Anything else shows “Coming Soon..”. Copy address copies the full address when it is valid, and copies the coming-soon text until then. |
| `launchStatus` | `"prelaunch"` (default) or `"launched"`. |
| `swapUrl` | Buy links turn on only when status is `"launched"` **and** this is a valid http(s) URL. |
| `chartUrl` | Chart links. |
| `explorerUrl` | Etherscan (or other explorer) links. |
| `totalSupply` | Plain text, or `null`. |
| `allocations` | `{ label, detail }` rows, or `[]`. There is no chart. |
| `taxes` | `{ buy, sell }` strings, or `null`. |
| `liquidity` / `ownership` | `status` text plus `evidence` links. Empty status renders as pending. |
| `downloads` | Site-root paths for the meme kit. Leave the filenames alone unless you replace the files in `public/`. |

A valid contract address does **not** mean the token is launched. Leave `launchStatus` on `"prelaunch"` until the swap page is real.

## What is still pending

Until you replace the nulls, the site shows:

- Contract address shows “Coming Soon..” until a real `0x` address is set. Copy address copies that text, or the full address once one is configured.
- Buy, chart, and Etherscan controls are omitted until those URLs exist
- X is `https://x.com/siidiot_eth` and Telegram is `https://t.me/SuperIntelligentIDIOT`
- Total supply is 1,000,000,000, tax is 0%, and ownership states that LP tokens are burnt and contract ownership is renounced
- Allocation and liquidity stay pending
- Canonical and social preview URLs use `https://siidiot.site`
- Share on X includes that domain (copy caption still works)
- The line “Trading links will appear here when the project is ready.”

Do not invent addresses, tax rates, supply, liquidity burns, renounced ownership, audits, or follower counts.

## Artwork

Illustrations live in `public/images/` under the filenames the page expects. `public/downloads/siidiot-meme-kit.zip` is a real zip of those PNGs. Rebuild it after replacing artwork:

```bash
python3 - << 'PY'
import zipfile
from pathlib import Path
images = sorted(Path('public/images').glob('*.png'))
out = Path('public/downloads/siidiot-meme-kit.zip')
with zipfile.ZipFile(out, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for image in images:
        archive.write(image, arcname=image.name)
PY
```

The wide banner is the social preview image once `domain` is set. The 1100×520 file is the Telegram banner.
