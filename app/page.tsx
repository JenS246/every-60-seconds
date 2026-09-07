"use client";

import {
  ArrowClockwise,
  Brain,
  Browser,
  Browsers,
  Butterfly,
  Camera,
  CaretDown,
  ChatText,
  ChatsCircle,
  Cloud,
  Code,
  Compass,
  DiscordLogo,
  DownloadSimple,
  EnvelopeSimple,
  FacebookLogo,
  GameController,
  GlobeHemisphereEast,
  GlobeSimple,
  InstagramLogo,
  MagnifyingGlass,
  Megaphone,
  MicrosoftTeamsLogo,
  Play,
  Package,
  Robot,
  SlackLogo,
  Sparkle,
  ThreadsLogo,
  Translate,
  UsersThree,
  VideoCamera,
  WindowsLogo,
  XLogo,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Status = "idle" | "running" | "finished";
type CategoryId = "social" | "communication" | "creation" | "ai" | "search" | "browsers" | "downloads";

type Metric = {
  id: string;
  category?: CategoryId;
  eyebrow: string;
  title: string;
  prompt: string;
  value: number;
  suffix: string;
  fact: string;
  source: string;
  sourceUrl: string;
  sourceLinks?: { label: string; url: string }[];
  basis: string;
  sourceDate: string;
  Icon: typeof Cloud;
  accent: string;
  ink: string;
  estimated?: boolean;
};

type Category = {
  id: CategoryId;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  ink: string;
  Icon: typeof UsersThree;
};

const overviewMetric: Metric = {
  id: "datasphere",
  eyebrow: "All new data",
  title: "All new data",
  prompt: "How much data is created or replicated?",
  value: 332.95,
  suffix: " petabytes",
  fact: "Enough to fill about 5.3 million 64 GB phones.",
  source: "IDC / Seagate Data Age 2025",
  sourceUrl: "https://www.seagate.com/files/www-content/our-story/trends/files/idc-seagate-dataage-whitepaper.pdf",
  basis: "175 zettabytes projected for 2025, divided into 525,600 minutes.",
  sourceDate: "2018 forecast for 2025",
  Icon: Cloud,
  accent: "#bdf46c",
  ink: "#102600",
  estimated: true,
};

const metrics: Metric[] = [
  {
    id: "instagram",
    category: "social",
    eyebrow: "Instagram",
    title: "Instagram posts",
    prompt: "Photos and videos uploaded",
    value: 69_444,
    suffix: " posts",
    fact: "That is roughly 1,157 new posts every second.",
    source: "Skeepers 2025 compilation",
    sourceUrl: "https://get.skeepers.io/hubfs/Ebooks%20and%20Guides/2025-SKP-EN-EBK-LSE-UGC-eBook.pdf",
    basis: "The guide repeats a widely cited estimate of 100 million photos and videos uploaded per day. It does not state when the underlying platform measurement was taken, so this is a rough benchmark rather than a current Instagram count.",
    sourceDate: "2025 guide; measurement date not stated",
    Icon: InstagramLogo,
    accent: "#ff79c8",
    ink: "#3a0826",
    estimated: true,
  },
  {
    id: "facebook",
    category: "social",
    eyebrow: "Facebook",
    title: "Facebook updates",
    prompt: "Status updates, posts, and items shared",
    value: 3_263_889,
    suffix: " shared items",
    fact: "That works out to more than 54,000 shares a second.",
    source: "Skeepers 2025 compilation",
    sourceUrl: "https://get.skeepers.io/hubfs/Ebooks%20and%20Guides/2025-SKP-EN-EBK-LSE-UGC-eBook.pdf",
    basis: "The guide repeats a widely cited estimate of 4.7 billion Facebook items shared per day. It does not state when the underlying platform measurement was taken, and the total includes more than status updates alone.",
    sourceDate: "2025 guide; measurement date not stated",
    Icon: FacebookLogo,
    accent: "#6ba4ff",
    ink: "#071f4b",
    estimated: true,
  },
  {
    id: "x-posts",
    category: "social",
    eyebrow: "X / Twitter",
    title: "X posts",
    prompt: "Posts sent into the public conversation",
    value: 347_222,
    suffix: " posts",
    fact: "About 5,787 posts, replies, quotes, and reposts arrive every second.",
    source: "X figures via Marketing Dive",
    sourceUrl: "https://www.marketingdive.com/news/x-seeing-more-usage-new-reports-indicate-rising-web-traffic/702926/",
    basis: "X reported 100 million original posts, 100 million replies, and 300 million quote posts and reposts per day. The combined 500 million daily actions are divided by 1,440 minutes. X does not regularly publish a newer global total.",
    sourceDate: "September 2023 company figures",
    Icon: XLogo,
    accent: "#f1f1f1",
    ink: "#111111",
    estimated: true,
  },
  {
    id: "bluesky",
    category: "social",
    eyebrow: "Bluesky",
    title: "Bluesky posts",
    prompt: "New posts on the AT Protocol network",
    value: 2_683,
    suffix: " posts",
    fact: "That is almost 45 new Bluesky posts every second.",
    source: "Bluesky 2025 Transparency Report",
    sourceUrl: "https://bsky.social/about/blog/01-29-2026-transparency-report-2025",
    basis: "1.41 billion posts created during 2025, divided into 525,600 minutes.",
    sourceDate: "January 2026",
    Icon: Butterfly,
    accent: "#70c9ff",
    ink: "#032f4b",
    estimated: true,
  },
  {
    id: "threads",
    category: "social",
    eyebrow: "Threads",
    title: "Threads sessions",
    prompt: "A conservative floor for daily mobile visits",
    value: 104_167,
    suffix: " app sessions",
    fact: "The real session count is higher because many people open Threads more than once.",
    source: "Meta / Similarweb via TechCrunch",
    sourceUrl: "https://techcrunch.com/2026/01/18/threads-edges-out-x-in-daily-mobile-users-new-data-shows/",
    basis: "Meta reported 150 million daily active users in October 2025; this floor assumes one session per daily user and divides by 1,440 minutes. Meta does not disclose global Threads post volume.",
    sourceDate: "January 2026 report",
    Icon: ThreadsLogo,
    accent: "#d7c8ff",
    ink: "#211343",
    estimated: true,
  },
  {
    id: "snapchat",
    category: "social",
    eyebrow: "Snapchat",
    title: "Snapchat snaps",
    prompt: "Photos and videos created",
    value: 3_800_000,
    suffix: " snaps",
    fact: "That is about 63,000 new snaps every second.",
    source: "Snap Newsroom",
    sourceUrl: "https://newsroom.snap.com/2trillion-snaps-in-2025",
    basis: "Snap reports nearly 2 trillion Snaps created in 2025 and publishes the normalized rate of 3.8 million per minute.",
    sourceDate: "March 2026; covers 2025",
    Icon: Camera,
    accent: "#ffe84c",
    ink: "#302500",
    estimated: true,
  },
  {
    id: "email",
    category: "communication",
    eyebrow: "Email",
    title: "Emails sent",
    prompt: "Messages crossing inboxes",
    value: 251_100_000,
    suffix: " emails",
    fact: "More than 4.1 million emails leave an outbox every second.",
    source: "Domo Data Never Sleeps 12.0",
    sourceUrl: "https://www.domo.com/learn/infographic/data-never-sleeps-12",
    sourceLinks: [
      { label: "Domo report", url: "https://www.domo.com/learn/infographic/data-never-sleeps-12" },
      { label: "Domo methodology note", url: "https://www.domo.com/blog/snap-tiktok-doordash-netflix-exploring-2024-in-data" },
    ],
    basis: "Domo's 2024 secondary compilation reports 251.1 million emails per minute. Domo identifies its overall source pool but does not map this individual figure to a specific underlying dataset.",
    sourceDate: "December 2024; secondary estimate",
    Icon: EnvelopeSimple,
    accent: "#ff805d",
    ink: "#3c1107",
    estimated: true,
  },
  {
    id: "text-messages",
    category: "communication",
    eyebrow: "SMS / MMS",
    title: "Text messages",
    prompt: "Texts sent between phones",
    value: 18_800_000,
    suffix: " text messages",
    fact: "More than 313,000 texts are sent every second.",
    source: "Domo Data Never Sleeps 12.0",
    sourceUrl: "https://www.domo.com/learn/infographic/data-never-sleeps-12",
    sourceLinks: [
      { label: "Domo report", url: "https://www.domo.com/learn/infographic/data-never-sleeps-12" },
      { label: "Domo methodology note", url: "https://www.domo.com/blog/snap-tiktok-doordash-netflix-exploring-2024-in-data" },
    ],
    basis: "Domo's 2024 secondary compilation reports 18.8 million text messages per minute. Domo identifies its overall source pool but does not map this individual figure to a specific underlying dataset.",
    sourceDate: "December 2024; secondary estimate",
    Icon: ChatText,
    accent: "#ffbd73",
    ink: "#3f2100",
    estimated: true,
  },
  {
    id: "slack",
    category: "communication",
    eyebrow: "Slack",
    title: "Slack messages",
    prompt: "Workplace messages sent",
    value: 694_444,
    suffix: " messages",
    fact: "Around 11,574 Slack messages land every second.",
    source: "Salesforce FY26 earnings remarks",
    sourceUrl: "https://s205.q4cdn.com/626266368/files/doc_financials/2026/q4/Transcript-Salesforce-Inc-Q4-FY26-Earnings-Conference-Call-2-25-26.pdf",
    basis: "Salesforce CEO Marc Benioff said Slack hosts about 1 billion messages per day. That company figure is divided by 1,440 minutes.",
    sourceDate: "February 2026",
    Icon: SlackLogo,
    accent: "#70e2d1",
    ink: "#063832",
    estimated: true,
  },
  {
    id: "discord",
    category: "communication",
    eyebrow: "Discord",
    title: "Discord messages",
    prompt: "Messages posted in servers and DMs",
    value: 668_000,
    suffix: " messages",
    fact: "That is more than 11,000 Discord messages every second.",
    source: "Domo 2021 via Technology Coalition",
    sourceUrl: "https://technologycoalition.org/resources/the-issue/",
    basis: "Domo's published per-minute estimate. Discord has not released a newer global message total.",
    sourceDate: "2021 benchmark, cited June 2022",
    Icon: DiscordLogo,
    accent: "#8d9cff",
    ink: "#111842",
    estimated: true,
  },
  {
    id: "microsoft-teams",
    category: "communication",
    eyebrow: "Microsoft Teams",
    title: "Teams messages",
    prompt: "Work chats and channel posts",
    value: 11_834,
    suffix: " messages",
    fact: "Teams carries about 197 chat messages every second.",
    source: "2023 Internet Minute source notes",
    sourceUrl: "https://ediscoverytoday.com/wp-content/uploads/2023/04/2023-Internet-Minute-Infographic-Source-Stats.pdf",
    basis: "6.22 billion annual Teams chats, divided into 525,600 minutes.",
    sourceDate: "April 2023; latest public message estimate",
    Icon: MicrosoftTeamsLogo,
    accent: "#b7a5ff",
    ink: "#22144d",
    estimated: true,
  },
  {
    id: "whatsapp",
    category: "communication",
    eyebrow: "WhatsApp",
    title: "Voice messages",
    prompt: "Audio notes shared",
    value: 4_861_111,
    suffix: " voice messages",
    fact: "That is about 81,000 voice notes every second.",
    source: "Meta / WhatsApp",
    sourceUrl: "https://about.fb.com/news/2022/03/new-voice-message-features-on-whatsapp/",
    basis: "7 billion voice messages per day, divided by 1,440 minutes.",
    sourceDate: "March 2022; latest disclosed total",
    Icon: ChatsCircle,
    accent: "#70e58e",
    ink: "#073b18",
    estimated: true,
  },
  {
    id: "youtube",
    category: "creation",
    eyebrow: "YouTube",
    title: "YouTube videos",
    prompt: "New video uploaded",
    value: 13_889,
    suffix: " videos",
    fact: "Creators upload over 230 videos every second.",
    source: "YouTube Press",
    sourceUrl: "https://blog.youtube/news-and-events/happy-birthday-youtube-20/",
    basis: "Over 20 million videos uploaded daily, divided by 1,440 minutes.",
    sourceDate: "April 2025",
    Icon: VideoCamera,
    accent: "#ff5d65",
    ink: "#43090d",
    estimated: true,
  },
  {
    id: "github",
    category: "creation",
    eyebrow: "GitHub",
    title: "Code commits",
    prompt: "Saved changes to code",
    value: 1_876,
    suffix: " commits",
    fact: "That is roughly 31 code commits every second.",
    source: "GitHub Octoverse 2025",
    sourceUrl: "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/",
    basis: "GitHub reports 986 million commits pushed in 2025. Dividing that total across 525,600 minutes gives roughly 1,876 commits per minute.",
    sourceDate: "October 2025",
    Icon: Code,
    accent: "#c6a5ff",
    ink: "#27104a",
    estimated: true,
  },
  {
    id: "domains",
    category: "creation",
    eyebrow: "Domain names",
    title: "New domains",
    prompt: ".com and .net addresses registered",
    value: 96.92,
    suffix: " domains",
    fact: "A new .com or .net name is registered about every 0.6 seconds.",
    source: "Verisign Q2 2026 results",
    sourceUrl: "https://investor.verisign.com/news-releases/news-release-details/verisign-reports-second-quarter-2026-results",
    basis: "Verisign processed 12.7 million new .com and .net registrations in Q2 2026. Dividing that total across the quarter's 131,040 minutes gives this rate.",
    sourceDate: "July 2026",
    Icon: GlobeSimple,
    accent: "#ffd36a",
    ink: "#392600",
    estimated: true,
  },
  {
    id: "google",
    category: "search",
    eyebrow: "Google Search",
    title: "Google searches",
    prompt: "Questions typed into Search",
    value: 9_512_938,
    suffix: " searches",
    fact: "Almost 159,000 searches begin every second.",
    source: "Google Search update",
    sourceUrl: "https://blog.google/products/ads-commerce/new-ways-retailers-can-win-over-strategic-consumers/",
    basis: "More than 5 trillion searches per year, divided into 525,600 minutes.",
    sourceDate: "March 2025",
    Icon: MagnifyingGlass,
    accent: "#68d7ff",
    ink: "#002f42",
    estimated: true,
  },
  {
    id: "bing-search",
    category: "search",
    eyebrow: "Microsoft Bing",
    title: "Bing searches",
    prompt: "Searches across Microsoft's engine",
    value: 469_904,
    suffix: " searches",
    fact: "That is an estimated 7,832 Bing searches every second.",
    source: "Google baseline + Statcounter",
    sourceUrl: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide",
    sourceLinks: [
      { label: "Google annual search total", url: "https://blog.google/products/ads-commerce/new-ways-retailers-can-win-over-strategic-consumers/" },
      { label: "Statcounter search share", url: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide" },
    ],
    basis: "Estimated by applying Bing's 4.5% August 2026 worldwide share to Google's disclosed 5 trillion yearly searches and 91.1% share.",
    sourceDate: "August 2026",
    Icon: WindowsLogo,
    accent: "#7ddad1",
    ink: "#063a36",
    estimated: true,
  },
  {
    id: "yahoo-search",
    category: "search",
    eyebrow: "Yahoo Search",
    title: "Yahoo searches",
    prompt: "Queries made through Yahoo",
    value: 128_440,
    suffix: " searches",
    fact: "That is an estimated 2,141 Yahoo searches every second.",
    source: "Google baseline + Statcounter",
    sourceUrl: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide",
    sourceLinks: [
      { label: "Google annual search total", url: "https://blog.google/products/ads-commerce/new-ways-retailers-can-win-over-strategic-consumers/" },
      { label: "Statcounter search share", url: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide" },
    ],
    basis: "Estimated by applying Yahoo's 1.23% August 2026 worldwide share to Google's disclosed 5 trillion yearly searches and 91.1% share.",
    sourceDate: "August 2026",
    Icon: Compass,
    accent: "#d5adff",
    ink: "#2f1048",
    estimated: true,
  },
  {
    id: "yandex-search",
    category: "search",
    eyebrow: "Yandex Search",
    title: "Yandex searches",
    prompt: "Queries made through Yandex",
    value: 103_379,
    suffix: " searches",
    fact: "That is an estimated 1,723 Yandex searches every second.",
    source: "Google baseline + Statcounter",
    sourceUrl: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide",
    sourceLinks: [
      { label: "Google annual search total", url: "https://blog.google/products/ads-commerce/new-ways-retailers-can-win-over-strategic-consumers/" },
      { label: "Statcounter search share", url: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide" },
    ],
    basis: "Estimated by applying Yandex's 0.99% August 2026 worldwide share to Google's disclosed 5 trillion yearly searches and 91.1% share.",
    sourceDate: "August 2026",
    Icon: Translate,
    accent: "#ff877d",
    ink: "#42100c",
    estimated: true,
  },
  {
    id: "baidu-search",
    category: "search",
    eyebrow: "Baidu Search",
    title: "Baidu searches",
    prompt: "Queries made through Baidu",
    value: 64_742,
    suffix: " searches",
    fact: "That is an estimated 1,079 Baidu searches every second.",
    source: "Google baseline + Statcounter",
    sourceUrl: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide",
    sourceLinks: [
      { label: "Google annual search total", url: "https://blog.google/products/ads-commerce/new-ways-retailers-can-win-over-strategic-consumers/" },
      { label: "Statcounter search share", url: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide" },
    ],
    basis: "Estimated by applying Baidu's 0.62% August 2026 worldwide share to Google's disclosed 5 trillion yearly searches and 91.1% share.",
    sourceDate: "August 2026",
    Icon: GlobeHemisphereEast,
    accent: "#8fb4ff",
    ink: "#0c2859",
    estimated: true,
  },
  {
    id: "brave-search",
    category: "search",
    eyebrow: "Brave Search",
    title: "Brave searches",
    prompt: "Private search queries answered",
    value: 55_556,
    suffix: " searches",
    fact: "More than 925 Brave searches happen every second.",
    source: "Brave by the numbers",
    sourceUrl: "https://brave.com/about/",
    basis: "More than 80 million Brave Search queries per day, divided by 1,440 minutes.",
    sourceDate: "Current 2026 company total",
    Icon: Browser,
    accent: "#ff9e65",
    ink: "#461b00",
    estimated: true,
  },
  {
    id: "duckduckgo",
    category: "search",
    eyebrow: "DuckDuckGo",
    title: "DuckDuckGo searches",
    prompt: "Privacy-focused search queries",
    value: 73_096,
    suffix: " searches",
    fact: "That is an estimated 1,218 DuckDuckGo searches each second.",
    source: "Google baseline + Statcounter",
    sourceUrl: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide",
    sourceLinks: [
      { label: "Google annual search total", url: "https://blog.google/products/ads-commerce/new-ways-retailers-can-win-over-strategic-consumers/" },
      { label: "Statcounter search share", url: "https://gs.statcounter.com/search-engine-market-share/all/worldwide/worldwide" },
    ],
    basis: "Estimated by applying DuckDuckGo's 0.7% August 2026 worldwide share to Google's disclosed 5 trillion yearly searches and 91.1% share.",
    sourceDate: "August 2026",
    Icon: MagnifyingGlass,
    accent: "#f7b6a5",
    ink: "#43180f",
    estimated: true,
  },
  {
    id: "safari-requests",
    category: "browsers",
    eyebrow: "Safari",
    title: "Safari web requests",
    prompt: "Requests attributed to Safari browsing",
    value: 769_338_000,
    suffix: " HTTP requests",
    fact: "That is a directional estimate of 12.8 million requests each second.",
    source: "Cloudflare + Statcounter",
    sourceUrl: "https://blog.cloudflare.com/radar-2025-year-in-review/",
    sourceLinks: [
      { label: "Cloudflare request baseline", url: "https://blog.cloudflare.com/radar-2025-year-in-review/" },
      { label: "Statcounter browser share", url: "https://gs.statcounter.com/browser-market-share/monthly" },
    ],
    basis: "Cloudflare reports 81 million average HTTP requests per second. Applying Safari's 15.83% August 2026 worldwide browser share gives this directional estimate.",
    sourceDate: "2025 baseline; August 2026 share",
    Icon: Compass,
    accent: "#78d8ff",
    ink: "#063448",
    estimated: true,
  },
  {
    id: "firefox-requests",
    category: "browsers",
    eyebrow: "Firefox",
    title: "Firefox web requests",
    prompt: "Requests attributed to Firefox browsing",
    value: 144_828_000,
    suffix: " HTTP requests",
    fact: "That is a directional estimate of 2.4 million requests each second.",
    source: "Cloudflare + Statcounter",
    sourceUrl: "https://gs.statcounter.com/browser-market-share/monthly",
    sourceLinks: [
      { label: "Cloudflare request baseline", url: "https://blog.cloudflare.com/radar-2025-year-in-review/" },
      { label: "Statcounter browser share", url: "https://gs.statcounter.com/browser-market-share/monthly" },
    ],
    basis: "Cloudflare reports 81 million average HTTP requests per second. Applying Firefox's 2.98% August 2026 worldwide browser share gives this directional estimate.",
    sourceDate: "2025 baseline; August 2026 share",
    Icon: GlobeSimple,
    accent: "#ff9d6c",
    ink: "#461b08",
    estimated: true,
  },
  {
    id: "chatgpt",
    category: "ai",
    eyebrow: "ChatGPT",
    title: "ChatGPT prompts",
    prompt: "Messages sent to ChatGPT",
    value: 1_736_111,
    suffix: " messages",
    fact: "People send nearly 29,000 prompts every second.",
    source: "OpenAI Signals",
    sourceUrl: "https://openai.com/global-affairs/new-economic-analysis/",
    basis: "2.5 billion messages per day, divided by 1,440 minutes.",
    sourceDate: "July 2025",
    Icon: Brain,
    accent: "#b6f379",
    ink: "#193500",
    estimated: true,
  },
  {
    id: "gemini",
    category: "ai",
    eyebrow: "Google Gemini",
    title: "Gemini tokens",
    prompt: "Tokens processed across Google's AI surfaces",
    value: 22_374_429_224,
    suffix: " tokens",
    fact: "That is more than 372 million tokens processed every second.",
    source: "Alphabet Q2 2025 remarks",
    sourceUrl: "https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2025/",
    basis: "980 trillion monthly tokens across Google's AI surfaces, divided by an average 43,800-minute month.",
    sourceDate: "July 2025",
    Icon: Sparkle,
    accent: "#9bbdff",
    ink: "#0b275e",
    estimated: true,
  },
  {
    id: "perplexity",
    category: "ai",
    eyebrow: "Perplexity",
    title: "Perplexity queries",
    prompt: "Questions asked of the answer engine",
    value: 17_473,
    suffix: " queries",
    fact: "Almost 300 Perplexity questions are asked every second.",
    source: "Perplexity CEO via TechCrunch",
    sourceUrl: "https://techcrunch.com/2025/06/05/perplexity-received-780-million-queries-last-month-ceo-says/",
    basis: "780 million queries during May 2025, divided across the month's 44,640 minutes.",
    sourceDate: "June 2025",
    Icon: Robot,
    accent: "#77e5df",
    ink: "#063936",
    estimated: true,
  },
  {
    id: "mobile-app-downloads",
    category: "downloads",
    eyebrow: "Mobile apps",
    title: "App downloads",
    prompt: "Non-game apps installed from major stores",
    value: 128_234,
    suffix: " app downloads",
    fact: "More than 2,137 non-game apps are downloaded every second.",
    source: "Appfigures 2025 via TechCrunch",
    sourceUrl: "https://techcrunch.com/2026/01/14/app-downloads-declined-again-in-2025-but-consumer-spending-soared-to-nearly-156b/",
    basis: "67.4 billion non-game mobile app downloads in 2025, divided into 525,600 minutes.",
    sourceDate: "January 2026",
    Icon: DownloadSimple,
    accent: "#8fe3a1",
    ink: "#093719",
    estimated: true,
  },
  {
    id: "mobile-game-downloads",
    category: "downloads",
    eyebrow: "Mobile games",
    title: "Game downloads",
    prompt: "Games installed from major app stores",
    value: 74_962,
    suffix: " game downloads",
    fact: "Nearly 1,250 mobile games are downloaded every second.",
    source: "Appfigures 2025 via TechCrunch",
    sourceUrl: "https://techcrunch.com/2026/01/14/app-downloads-declined-again-in-2025-but-consumer-spending-soared-to-nearly-156b/",
    basis: "39.4 billion mobile game downloads in 2025, divided into 525,600 minutes.",
    sourceDate: "January 2026",
    Icon: GameController,
    accent: "#c7a8ff",
    ink: "#28104e",
    estimated: true,
  },
  {
    id: "ai-app-downloads",
    category: "downloads",
    eyebrow: "Generative AI apps",
    title: "AI app downloads",
    prompt: "AI assistants and generators installed",
    value: 7_230,
    suffix: " AI app downloads",
    fact: "About 120 generative AI apps are downloaded every second.",
    source: "Sensor Tower State of Mobile 2026",
    sourceUrl: "https://sensortower.com/blog/state-of-mobile-2026",
    basis: "3.8 billion generative AI app downloads in 2025, divided into 525,600 minutes.",
    sourceDate: "January 2026",
    Icon: Brain,
    accent: "#f0a4ff",
    ink: "#3b0b45",
    estimated: true,
  },
  {
    id: "react-downloads",
    category: "downloads",
    eyebrow: "npm / React",
    title: "React downloads",
    prompt: "Copies of the React software package",
    value: 17_027,
    suffix: " package downloads",
    fact: "Developers download React about 284 times every second.",
    source: "npm Downloads API",
    sourceUrl: "https://api.npmjs.org/downloads/point/2026-08-23:2026-08-29/react",
    basis: "171,637,376 React package downloads from August 23-29, 2026, divided across one week.",
    sourceDate: "August 2026",
    Icon: Package,
    accent: "#75dff7",
    ink: "#073541",
    estimated: true,
  },
];

const categories: Category[] = [
  {
    id: "social",
    eyebrow: "Social networks",
    title: "Social media",
    description: "Posts, shares, selfies, and the endless public feed.",
    accent: "#ff8fcb",
    ink: "#3d0627",
    Icon: UsersThree,
  },
  {
    id: "communication",
    eyebrow: "Messages",
    title: "Communication",
    description: "What moves through inboxes, chats, and voice notes.",
    accent: "#72e3d2",
    ink: "#073a34",
    Icon: ChatsCircle,
  },
  {
    id: "creation",
    eyebrow: "Publishing",
    title: "Create & publish",
    description: "Fresh videos, code, and domain names added to the internet.",
    accent: "#ff775d",
    ink: "#401007",
    Icon: Megaphone,
  },
  {
    id: "ai",
    eyebrow: "Generative systems",
    title: "AI tools",
    description: "Prompts, queries, and tokens moving through popular AI services.",
    accent: "#c6a5ff",
    ink: "#27104a",
    Icon: Robot,
  },
  {
    id: "search",
    eyebrow: "Discovery",
    title: "Search engines",
    description: "Queries answered by major and privacy-focused search engines.",
    accent: "#a8d8ff",
    ink: "#062c4d",
    Icon: MagnifyingGlass,
  },
  {
    id: "browsers",
    eyebrow: "Web browsers",
    title: "Web browsers",
    description: "A directional view of requests carried by Safari and Firefox.",
    accent: "#7bcff2",
    ink: "#07384b",
    Icon: Browsers,
  },
  {
    id: "downloads",
    eyebrow: "Installs",
    title: "Downloads",
    description: "Apps, games, AI tools, and software packages pulled onto devices.",
    accent: "#9be6a6",
    ink: "#0b3c17",
    Icon: DownloadSimple,
  },
];

const totalMetrics = metrics.length + 1;

function formatValue(metric: Metric, value = metric.value) {
  if (metric.value < 1_000) return value.toFixed(2);
  if (metric.value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function valueSizeClass(metric: Metric) {
  const length = formatValue(metric).length;
  if (length >= 9) return "value-compact";
  if (length >= 6) return "value-long";
  return "";
}

function titleSizeClass(metric: Metric) {
  const longestWord = metric.title.split(" ").reduce((longest, word) => Math.max(longest, word.length), 0);
  if (longestWord >= 10) return "title-compact";
  if (metric.title.length >= 18) return "title-long";
  return "";
}

function AnimatedValue({ metric, active }: { metric: Metric; active: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    if (!active) {
      element.textContent = formatValue(metric, 0);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = formatValue(metric);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = metric.value >= 1_000_000_000 ? 1_450 : 1_100;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = formatValue(metric, metric.value * eased);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, metric]);

  return <span ref={valueRef} aria-hidden="true">{formatValue(metric, 0)}</span>;
}

function MetricCard({
  metric,
  revealed,
  onReveal,
  featured = false,
}: {
  metric: Metric;
  revealed: boolean;
  onReveal: (metric: Metric) => void;
  featured?: boolean;
}) {
  const Icon = metric.Icon;

  return (
    <article
      className={`metric-card ${featured ? "featured" : ""} ${revealed ? "revealed" : ""}`}
      style={{ "--accent": metric.accent, "--ink": metric.ink } as React.CSSProperties}
    >
      <button className="metric-trigger" onClick={() => onReveal(metric)} aria-expanded={revealed}>
        <span className="metric-topline">
          <span className="metric-icon"><Icon size={featured ? 42 : 34} weight="duotone" /></span>
        </span>

        <span className="metric-front">
          <span className={`metric-title ${titleSizeClass(metric)}`}>{metric.title}</span>
          <span className="metric-prompt">{metric.prompt}</span>
          <span className="tap-cue"><Sparkle size={16} weight="fill" /> Tap to reveal</span>
        </span>

        <span className="metric-answer" aria-hidden={!revealed}>
          <span className="answer-kicker">Every 60 seconds</span>
          <span className={`answer-value ${valueSizeClass(metric)}`}>
            <AnimatedValue metric={metric} active={revealed} />
            <small aria-hidden="true">{metric.suffix}</small>
          </span>
          <span className="sr-only">{`${formatValue(metric)}${metric.suffix}`}</span>
          <span className="answer-fact">{metric.fact}</span>
        </span>

        <span className="burst" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
        </span>
      </button>

      <a className="metric-source" href={metric.sourceUrl} target="_blank" rel="noreferrer">
        <span>{metric.source}</span>
        <span className="source-date">{metric.sourceDate}</span>
      </a>
    </article>
  );
}

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [timeLeft, setTimeLeft] = useState(60);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [openCategories, setOpenCategories] = useState<Set<CategoryId>>(new Set());

  const startRound = useCallback(() => {
    setRevealed(new Set());
    setOpenCategories(new Set());
    setTimeLeft(60);
    setStatus("running");
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setStatus("finished");
          return 0;
        }
        return current - 1;
      });
    }, 1_000);
    return () => window.clearInterval(timer);
  }, [status]);

  const revealMetric = useCallback((metric: Metric) => {
    if (status === "idle") setStatus("running");
    setRevealed((current) => {
      const next = new Set(current);
      next.add(metric.id);
      return next;
    });
  }, [status]);

  const toggleCategory = (categoryId: CategoryId) => {
    if (status === "idle") setStatus("running");
    setOpenCategories((current) => {
      const next = new Set(current);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const scoreMessage = useMemo(() => {
    if (status !== "finished") return null;
    if (revealed.size === totalMetrics) return "You caught every signal. The internet never stood a chance.";
    if (revealed.size >= Math.ceil(totalMetrics * 0.7)) return "Sharp work. You uncovered most of a minute online.";
    return "One minute moves fast. Open another round and keep exploring.";
  }, [revealed.size, status]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Every 60 Seconds home">
          <span className="wordmark-dot" /> Every 60 Seconds
        </a>
        <a className="method-link" href="#method">About the numbers</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>The internet makes <em>a lot</em> in 60 seconds.</h1>
          <p className="hero-intro">Open a category. Tap each data stream. See how much of our digital world appears before the clock runs out.</p>
          <button className="start-button" onClick={startRound}>
            {status === "idle" ? <Play size={20} weight="fill" /> : <ArrowClockwise size={20} weight="bold" />}
            {status === "idle" ? "Start the minute" : "Restart the minute"}
          </button>
        </div>

        <div className={`timer-orbit ${status}`} aria-live="polite">
          <div className="timer-ring" style={{ "--progress": `${(timeLeft / 60) * 360}deg` } as React.CSSProperties}>
            <div className="timer-face">
              <span className="timer-number">{timeLeft}</span>
              <span className="timer-label">seconds</span>
            </div>
          </div>
        </div>
      </section>

      <section className="game-section" aria-labelledby="game-title">
        <div className="section-heading">
          <h2 id="game-title">What gets made in a minute?</h2>
          <div className="score-pill" aria-live="polite">
            <strong>{revealed.size}</strong> / {totalMetrics} revealed
          </div>
        </div>

        {status === "finished" && (
          <div className="result-banner" role="status">
            <Sparkle size={24} weight="fill" />
            <span>{scoreMessage}</span>
          </div>
        )}

        <div className="overview-wrap">
          <MetricCard metric={overviewMetric} revealed={revealed.has(overviewMetric.id)} onReveal={revealMetric} featured />
        </div>

        <div className="category-list">
          {categories.map((category) => {
            const children = metrics.filter((metric) => metric.category === category.id);
            const isOpen = openCategories.has(category.id);
            const revealedInCategory = children.filter((metric) => revealed.has(metric.id)).length;
            const CategoryIcon = category.Icon;
            return (
              <section
                className={`category-group ${isOpen ? "open" : ""}`}
                key={category.id}
                style={{ "--category": category.accent, "--category-ink": category.ink } as React.CSSProperties}
              >
                <button
                  className="category-toggle"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isOpen}
                  aria-controls={`category-${category.id}`}
                >
                  <span className="category-icon"><CategoryIcon size={42} weight="duotone" /></span>
                  <span className="category-copy">
                    <span className="category-title">{category.title}</span>
                    <span className="category-description">{category.description}</span>
                  </span>
                  <span className="category-progress">
                    <strong>{revealedInCategory}/{children.length}</strong>
                    <span>{isOpen ? "Close" : "Explore"}</span>
                    <CaretDown className="category-caret" size={22} weight="bold" />
                  </span>
                </button>

                {isOpen && (
                  <div className="category-body" id={`category-${category.id}`}>
                    <div className="metric-grid">
                      {children.map((metric) => (
                        <MetricCard key={metric.id} metric={metric} revealed={revealed.has(metric.id)} onReveal={revealMetric} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </section>

      <section className="method" id="method">
        <div className="method-intro">
          <h2>How the minute is made</h2>
          <p>Every figure is normalized to 60 seconds from the newest credible public total we could find. Platform reporting is uneven, so estimates are labeled and older disclosures are dated instead of pretending they are live counters.</p>
        </div>
        <div className="method-list">
          {[overviewMetric, ...metrics].map((metric) => (
            <details key={metric.id}>
              <summary>
                <span>{metric.title}</span>
                <strong>{metric.estimated ? "Estimated" : "Reported"}</strong>
              </summary>
              <p>{metric.basis}</p>
              <span className="method-source-date">{metric.sourceDate}</span>
              <span className="method-links">
                {(metric.sourceLinks ?? [{ label: metric.source, url: metric.sourceUrl }]).map((link) => (
                  <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label} ↗</a>
                ))}
              </span>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <p>One human minute. An internet-sized amount of activity.</p>
        <a href="#top">Back to the top ↑</a>
      </footer>
    </main>
  );
}
