# Every 60 Seconds

Every 60 Seconds is a mobile-first browser game that turns public internet-usage statistics into a one-minute interactive challenge. Players start the clock, tap bright data tiles, and watch each counter build toward its estimated 60-second total.

## How it works

- One 60-second round starts from the main button or the first tile tap.
- One overview tile and 29 source tiles are organized into Social Media, Communication, Create & Publish, AI Tools, Search Engines, and Downloads categories.
- Social Media includes Instagram, Facebook, X, Bluesky, Threads, and Snapchat. Communication includes email, text messages, Slack, Discord, Microsoft Teams, and WhatsApp.
- Search figures cover Google, Bing, Yahoo, Yandex, Baidu, Brave, and DuckDuckGo. Downloads separates non-game apps, mobile games, AI apps, and software packages.
- Each category opens into its own responsive tile grid and keeps a local reveal score alongside the overall round score.
- Each figure is derived from a linked public source. The methodology section explains the date and conversion basis.
- The interface supports touch, keyboard navigation, mobile and desktop layouts, and reduced-motion preferences.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Publishing

The site is published from the `main` branch by GitHub Actions and hosted on GitHub Pages.

Source: https://github.com/JenS246/every-60-seconds

Live site: https://jens246.github.io/every-60-seconds/

## Data notes

Platform figures are snapshots, forecasts, or company-reported totals from different dates. The game converts them into per-minute rates for educational comparison. It does not claim to be a live measurement feed.

## Services

No backend, database, user account, analytics service, or API key is required.
