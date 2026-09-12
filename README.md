# Every 60 Seconds

Every 60 Seconds is a mobile-first browser game that turns public internet-usage statistics into a one-minute interactive challenge. Players start the clock, tap bright data tiles, and watch each counter build toward its estimated 60-second total.

## How it works

- The 60-second challenge starts only from the main Start the minute button. After a brief 3-2-1 countdown, it presents a fresh randomized sequence of 10 signals spanning all categories.
- Explore All Data is a separate untimed mode where visitors can open every category and reveal every figure at their own pace.
- One overview tile and 37 source tiles are organized into Social Media, Communication, Create & Publish, Watching & Sharing, AI Tools, Search Engines, Web Browsers, and Downloads categories.
- Social Media includes Instagram, Facebook, X, Bluesky, Threads, LinkedIn, and Snapchat. Communication includes email, text messages, Slack, Discord, Microsoft Teams, and WhatsApp.
- Watching & Sharing compares YouTube Shorts views, Reels reshares, and Netflix watch time. Create & Publish includes both YouTube and TikTok uploads.
- Search figures cover Google, Bing, Yahoo, Yandex, Baidu, Brave, and DuckDuckGo. Downloads separates non-game apps, mobile games, AI apps, and software packages.
- Each category opens into its own responsive tile grid and keeps a local reveal score alongside the full explorer score.
- During a challenge, one existing metric card is shown at a time. Reveal unlocks Next, and active-round sources remain visible without opening external links.
- A compact fixed status bar keeps the remaining time and challenge score visible. Revealing all 10 cards ends the round early and records completion time.
- The end-of-round panel offers Play again, Review this round, and Explore all data. Review shows all 10 round metrics with their sources restored.
- On screens up to 780px wide, opening an explorer category closes the previously open category. Desktop keeps multi-category expansion.
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
