"use client";

import {
  ArrowClockwise,
  Brain,
  Browser,
  Butterfly,
  Camera,
  CaretDown,
  ChatsCircle,
  Cloud,
  Code,
  DownloadSimple,
  EnvelopeSimple,
  FacebookLogo,
  GameController,
  GlobeSimple,
  InstagramLogo,
  MagnifyingGlass,
  Megaphone,
  Play,
  Package,
  Robot,
  SlackLogo,
  Sparkle,
  ThreadsLogo,
  UsersThree,
  VideoCamera,
  XLogo,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Status = "idle" | "running" | "finished";
type CategoryId = "social" | "communication" | "creation" | "ai" | "search" | "downloads";

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
  eyebrow: "The big picture",
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
    source: "Skeepers UGC Guide 2025",
    sourceUrl: "https://get.skeepers.io/hubfs/Ebooks%20and%20Guides/2025-SKP-EN-EBK-LSE-UGC-eBook.pdf",
    basis: "100 million photos and videos uploaded per day, divided by 1,440 minutes.",
    sourceDate: "2025 guide; rounded public estimate",
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
    source: "Skeepers UGC Guide 2025",
    sourceUrl: "https://get.skeepers.io/hubfs/Ebooks%20and%20Guides/2025-SKP-EN-EBK-LSE-UGC-eBook.pdf",
    basis: "4.7 billion items shared per day, divided by 1,440 minutes.",
    sourceDate: "2025 guide; rounded public estimate",
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
    value: 360_000,
    suffix: " posts",
    fact: "About 6,000 posts arrive on X every second.",
    source: "Domo Data Never Sleeps 11.0",
    sourceUrl: "https://www.businesswire.com/news/home/20231214558619/en/Domo-Releases-11th-Annual-Data-Never-Sleeps-Report",
    basis: "Domo's published per-minute figure. X no longer regularly discloses global post volume.",
    sourceDate: "December 2023; latest strong public benchmark",
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
    title: "Snapchat selfies",
    prompt: "Camera snaps created",
    value: 1_902_588,
    suffix: " selfies",
    fact: "More than 31,700 selfies are captured every second.",
    source: "Snap Inc. Q2 2025",
    sourceUrl: "https://investor.snap.com/news/news-details/2025/Snap-Inc--Announces-Second-Quarter-2025-Financial-Results/default.aspx",
    basis: "Over 5 billion Snaps created daily; 55% are selfies, divided by 1,440 minutes.",
    sourceDate: "August 2025",
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
    value: 261_388_889,
    suffix: " emails",
    fact: "More than 4.3 million emails leave an outbox every second.",
    source: "Radicati Email Statistics 2024–2028",
    sourceUrl: "https://www.radicati.com/wp/wp-content/uploads/2024/12/Email-Statistics-Report-2024-2028-Executive-Summary.pdf",
    basis: "376.4 billion emails projected per day in 2025, divided by 1,440 minutes.",
    sourceDate: "2024 forecast for 2025",
    Icon: EnvelopeSimple,
    accent: "#ff805d",
    ink: "#3c1107",
    estimated: true,
  },
  {
    id: "slack",
    category: "communication",
    eyebrow: "Slack",
    title: "Slack messages",
    prompt: "Workplace messages sent",
    value: 1_040_000,
    suffix: " messages",
    fact: "Around 17,300 Slack messages land every second.",
    source: "Domo Data Never Sleeps 12.0",
    sourceUrl: "https://www.domoinvestors.com/news/news-details/2025/Domos-Data-Never-Sleeps-Infographic-Wins-2025-Communicator-Award/default.aspx",
    basis: "Domo's published per-minute figure.",
    sourceDate: "2024 edition, awarded 2025",
    Icon: SlackLogo,
    accent: "#70e2d1",
    ink: "#063832",
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
    sourceUrl: "https://about.fb.com/news/2022/03/new-ways-to-enjoy-whatsapp-voice-messages/",
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
    sourceUrl: "https://blog.youtube/press/",
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
    source: "GitHub Octoverse 2024",
    sourceUrl: "https://github.blog/news-insights/octoverse/octoverse-2024/",
    basis: "993 million contributions in 2024; commits were 52.7%, divided across the year.",
    sourceDate: "October 2024",
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
    value: 88.73,
    suffix: " domains",
    fact: "A new .com or .net name is registered about every 0.7 seconds.",
    source: "Verisign DNIB Q1 2026",
    sourceUrl: "https://investor.verisign.com/node/26331/pdf",
    basis: "11.5 million new .com and .net registrations in Q1 2026, divided across the quarter's 129,600 minutes.",
    sourceDate: "April 2026",
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
    sourceUrl: "https://blog.google/products/search/how-google-search-delivers-accurate-results/",
    basis: "More than 5 trillion searches per year, divided into 525,600 minutes.",
    sourceDate: "March 2025",
    Icon: MagnifyingGlass,
    accent: "#68d7ff",
    ink: "#002f42",
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
    value: 71_323,
    suffix: " searches",
    fact: "That is roughly 1,189 DuckDuckGo searches each second.",
    source: "DuckDuckGo public traffic count",
    sourceUrl: "https://duckduckgo.com/traffic",
    basis: "102.7 million average daily searches, divided by 1,440 minutes.",
    sourceDate: "2022; latest disclosed traffic count",
    Icon: MagnifyingGlass,
    accent: "#f7b6a5",
    ink: "#43180f",
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
    sourceUrl: "https://openai.com/index/how-people-are-using-chatgpt/",
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
    sourceUrl: "https://api.npmjs.org/downloads/point/last-week/react",
    basis: "171,637,376 React package downloads from August 23–29, 2026, divided across one week.",
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
    eyebrow: "Category 01",
    title: "Social media",
    description: "Posts, shares, selfies, and the endless public feed.",
    accent: "#ff8fcb",
    ink: "#3d0627",
    Icon: UsersThree,
  },
  {
    id: "communication",
    eyebrow: "Category 02",
    title: "Communication",
    description: "What moves through inboxes, chats, and voice notes.",
    accent: "#72e3d2",
    ink: "#073a34",
    Icon: ChatsCircle,
  },
  {
    id: "creation",
    eyebrow: "Category 03",
    title: "Create & publish",
    description: "Fresh videos, code, and domain names added to the internet.",
    accent: "#ff775d",
    ink: "#401007",
    Icon: Megaphone,
  },
  {
    id: "ai",
    eyebrow: "Category 04",
    title: "AI tools",
    description: "Prompts, queries, and tokens moving through popular AI services.",
    accent: "#c6a5ff",
    ink: "#27104a",
    Icon: Robot,
  },
  {
    id: "search",
    eyebrow: "Category 05",
    title: "Search engines",
    description: "Queries made through Google, Brave, and DuckDuckGo—independent of browser choice.",
    accent: "#a8d8ff",
    ink: "#062c4d",
    Icon: MagnifyingGlass,
  },
  {
    id: "downloads",
    eyebrow: "Category 06",
    title: "Downloads",
    description: "Apps, games, AI tools, and software packages pulled onto devices.",
    accent: "#9be6a6",
    ink: "#0b3c17",
    Icon: DownloadSimple,
  },
];

const totalMetrics = metrics.length + 1;

function formatValue(metric: Metric) {
  if (metric.value < 1_000) return metric.value.toFixed(2);
  if (metric.value >= 1_000_000_000) return `${(metric.value / 1_000_000_000).toFixed(1)}B`;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(metric.value);
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
          <span className="metric-eyebrow">{metric.eyebrow}</span>
          <span className="metric-icon"><Icon size={featured ? 42 : 34} weight="duotone" /></span>
        </span>

        <span className="metric-front">
          <span className="metric-title">{metric.title}</span>
          <span className="metric-prompt">{metric.prompt}</span>
          <span className="tap-cue"><Sparkle size={16} weight="fill" /> Tap to reveal</span>
        </span>

        <span className="metric-answer" aria-hidden={!revealed}>
          <span className="answer-kicker">Every 60 seconds</span>
          <span className="answer-value">{formatValue(metric)}<small>{metric.suffix}</small></span>
          <span className="answer-fact">{metric.fact}</span>
        </span>

        <span className="burst" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
        </span>
      </button>

      <a className="metric-source" href={metric.sourceUrl} target="_blank" rel="noreferrer">
        {metric.source} · {metric.sourceDate}
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
          <p className="overline">A one-minute data game</p>
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
          <span className="orbit-note">{status === "idle" ? "Ready when you are" : status === "finished" ? "Minute complete" : "The data keeps moving"}</span>
        </div>
      </section>

      <section className="game-section" aria-labelledby="game-title">
        <div className="section-heading">
          <div>
            <p className="overline">Pick your rabbit hole</p>
            <h2 id="game-title">What gets made in a minute?</h2>
          </div>
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
                    <span className="category-eyebrow">{category.eyebrow}</span>
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
          <p className="overline">Read the small print</p>
          <h2>How the minute is made</h2>
          <p>Every figure is normalized to 60 seconds from the newest credible public total we could find. Platform reporting is uneven, so estimates are labeled and older disclosures are dated instead of pretending they are live counters.</p>
        </div>
        <div className="method-list">
          {[overviewMetric, ...metrics].map((metric) => (
            <details key={metric.id}>
              <summary>
                <span>{metric.eyebrow}</span>
                <strong>{metric.estimated ? "Estimated" : "Reported"}</strong>
              </summary>
              <p>{metric.basis}</p>
              <a href={metric.sourceUrl} target="_blank" rel="noreferrer">Open source ↗</a>
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
