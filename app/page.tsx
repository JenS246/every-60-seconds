'use client';

import {
  ArrowClockwise,
  Brain,
  Camera,
  ChatCircleDots,
  Cloud,
  Code,
  EnvelopeSimple,
  MagnifyingGlass,
  Play,
  Sparkle,
  VideoCamera,
} from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';

const ROUND_SECONDS = 60;

type Metric = {
  id: string;
  title: string;
  short: string;
  value: number;
  suffix: string;
  decimal?: number;
  prefix?: string;
  fact: string;
  basis: string;
  source: string;
  sourceUrl: string;
  color: string;
  ink: string;
  Icon: typeof Cloud;
  featured?: boolean;
};

const metrics: Metric[] = [
  {
    id: 'datasphere',
    title: 'The global datasphere',
    short: 'Data made, captured or copied',
    value: 332.95,
    suffix: ' petabytes',
    decimal: 2,
    fact: 'Enough raw data to fill about 71,000 single-layer DVDs.',
    basis: 'Derived from the IDC and Seagate forecast of 175 zettabytes in 2025.',
    source: 'IDC / Seagate, Data Age 2025',
    sourceUrl: 'https://www.seagate.com/files/www-content/our-story/trends/files/data-age-us-idc.pdf',
    color: 'var(--tile-blue)',
    ink: '#f7fbff',
    Icon: Cloud,
    featured: true,
  },
  {
    id: 'email',
    title: 'Email',
    short: 'Emails sent and received',
    value: 261_388_889,
    suffix: ' emails',
    fact: 'That is more than 4.3 million emails every second.',
    basis: 'Derived from 376.4 billion emails per day forecast for 2025.',
    source: 'Radicati, Email Statistics Report',
    sourceUrl: 'https://www.radicati.com/wp/wp-content/uploads/2020/12/Email-Statistics-Report-2021-2025-Executive-Summary.pdf',
    color: 'var(--tile-yellow)',
    ink: '#29210f',
    Icon: EnvelopeSimple,
  },
  {
    id: 'search',
    title: 'Google Search',
    short: 'Searches made',
    value: 9_512_938,
    suffix: ' searches',
    fact: 'Roughly 158,500 questions and queries land every second.',
    basis: 'Derived from more than 5 trillion searches per year, reported in 2025.',
    source: 'Google, May 2025',
    sourceUrl: 'https://blog.google/products/ads-commerce/google-search-ai-brand-discovery/',
    color: 'var(--tile-cyan)',
    ink: '#122526',
    Icon: MagnifyingGlass,
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    short: 'Messages sent to AI',
    value: 1_736_111,
    suffix: ' messages',
    fact: 'About 28,900 prompts arrive every second.',
    basis: 'Derived from more than 2.5 billion messages per day in July 2025.',
    source: 'OpenAI, July 2025',
    sourceUrl: 'https://openai.com/global-affairs/new-economic-analysis/',
    color: 'var(--tile-lime)',
    ink: '#152711',
    Icon: Brain,
  },
  {
    id: 'youtube',
    title: 'YouTube',
    short: 'New videos uploaded',
    value: 13_889,
    suffix: ' videos',
    fact: 'A fresh video arrives more than 230 times every second.',
    basis: 'Derived from more than 20 million video uploads per day in 2025.',
    source: 'YouTube, April 2025',
    sourceUrl: 'https://blog.youtube/news-and-events/happy-birthday-youtube-20/',
    color: 'var(--tile-coral)',
    ink: '#341714',
    Icon: VideoCamera,
  },
  {
    id: 'snapchat',
    title: 'Snapchat',
    short: 'Selfie Snaps created',
    value: 1_902_588,
    suffix: ' selfies',
    fact: 'That is nearly 31,700 new selfie Snaps every second.',
    basis: 'Derived from more than 1 trillion selfie Snaps created in 2024.',
    source: 'Snap, 2025',
    sourceUrl: 'https://newsroom.snap.com/trillion-selfies-snapchat',
    color: 'var(--tile-pink)',
    ink: '#321521',
    Icon: Camera,
  },
  {
    id: 'github',
    title: 'GitHub',
    short: 'Code commits pushed',
    value: 1_876,
    suffix: ' commits',
    fact: 'Developers also create more than 230 repositories each minute.',
    basis: 'Derived from 986 million commits pushed during 2025.',
    source: 'GitHub Octoverse 2025',
    sourceUrl: 'https://github.blog/news-insights/octoverse/what-986-million-code-pushes-say-about-the-developer-workflow-in-2025/',
    color: 'var(--tile-violet)',
    ink: '#f9f5ff',
    Icon: Code,
  },
  {
    id: 'voice',
    title: 'WhatsApp voice',
    short: 'Voice messages sent',
    value: 4_861_111,
    suffix: ' voice notes',
    fact: 'More than 81,000 voice messages leave phones every second.',
    basis: 'Derived from 7 billion WhatsApp voice messages per day.',
    source: 'Meta, March 2022',
    sourceUrl: 'https://about.fb.com/news/2022/03/new-voice-message-features-on-whatsapp/',
    color: 'var(--tile-mint)',
    ink: '#10281f',
    Icon: ChatCircleDots,
  },
];

function formatValue(metric: Metric, progress: number) {
  const current = metric.value * progress;
  const decimals = metric.decimal ?? 0;
  return `${metric.prefix ?? ''}${current.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })}${metric.suffix}`;
}

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [burst, setBurst] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'running' || startedAt === null) return;

    const timer = window.setInterval(() => {
      const next = Math.min((Date.now() - startedAt) / 1000, ROUND_SECONDS);
      setElapsed(next);
      if (next >= ROUND_SECONDS) setStatus('finished');
    }, 100);

    return () => window.clearInterval(timer);
  }, [status, startedAt]);

  useEffect(() => {
    if (!burst) return;
    const timer = window.setTimeout(() => setBurst(null), 700);
    return () => window.clearTimeout(timer);
  }, [burst]);

  const progress = Math.min(elapsed / ROUND_SECONDS, 1);
  const remaining = Math.max(0, Math.ceil(ROUND_SECONDS - elapsed));
  const revealedCount = revealed.length;
  const timerLabel = status === 'idle' ? '60' : String(remaining).padStart(2, '0');
  const outcome = useMemo(() => {
    if (status !== 'finished') return '';
    if (revealedCount === metrics.length) return 'You caught the whole minute.';
    if (revealedCount >= 5) return 'Most of the minute, uncovered.';
    return 'The minute moved faster than your taps.';
  }, [revealedCount, status]);

  function startRound() {
    setElapsed(0);
    setRevealed([]);
    setStartedAt(Date.now());
    setStatus('running');
  }

  function revealMetric(id: string) {
    if (status === 'idle') {
      setStartedAt(Date.now());
      setStatus('running');
    }
    if (!revealed.includes(id)) setRevealed((current) => [...current, id]);
    setBurst(id);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Every 60 Seconds home">
          every <strong>60</strong> seconds
        </a>
        <div className="round-score" aria-live="polite">
          <span>{revealedCount}/{metrics.length} revealed <b>{remaining}s</b></span>
          <button className="restart-mini" onClick={startRound} aria-label="Restart the 60 second round">
            <ArrowClockwise size={19} weight="bold" />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">One minute on the internet</p>
          <h1>The world makes data. Can you catch it?</h1>
          <p className="hero-text">Tap every tile before the 60-second clock runs out. Each one reveals a live global estimate.</p>
          <button className="start-button" onClick={startRound}>
            {status === 'running' ? 'Restart round' : status === 'finished' ? 'Play again' : 'Start the clock'}
            <Play size={19} weight="fill" />
          </button>
        </div>

        <div className={`clock ${status}`} aria-label={`${remaining} seconds remaining`}>
          <div className="clock-ring" style={{ '--progress': `${progress * 360}deg` } as React.CSSProperties}>
            <div className="clock-core">
              <span className="clock-number">{timerLabel}</span>
              <span className="clock-unit">seconds</span>
            </div>
          </div>
          <Sparkle className="clock-spark spark-one" size={34} weight="fill" aria-hidden="true" />
          <Sparkle className="clock-spark spark-two" size={22} weight="fill" aria-hidden="true" />
        </div>
      </section>

      {status === 'finished' && (
        <section className="result" aria-live="polite">
          <div>
            <p>{outcome}</p>
            <strong>{revealedCount} of {metrics.length} data streams revealed</strong>
          </div>
          <button onClick={startRound}>Try another minute</button>
        </section>
      )}

      <section className="game-section" aria-labelledby="game-title">
        <div className="section-heading">
          <h2 id="game-title">Tap the data streams</h2>
          <p>Every counter reaches its estimated 60-second total when the clock hits zero.</p>
        </div>

        <div className="data-grid">
          {metrics.map((metric) => {
            const isRevealed = revealed.includes(metric.id);
            const Icon = metric.Icon;
            const displayProgress = status === 'idle' ? 0 : status === 'finished' ? 1 : progress;

            return (
              <article
                className={`data-card ${metric.featured ? 'featured' : ''} ${isRevealed ? 'revealed' : ''}`}
                key={metric.id}
                style={{ background: metric.color, color: metric.ink }}
              >
                <button
                  className="card-button"
                  onClick={() => revealMetric(metric.id)}
                  aria-expanded={isRevealed}
                  aria-label={`${isRevealed ? 'View' : 'Reveal'} ${metric.title} data`}
                >
                  <div className="card-topline">
                    <span>{metric.title}</span>
                    <Icon size={metric.featured ? 68 : 48} weight="fill" aria-hidden="true" />
                  </div>

                  {!isRevealed ? (
                    <div className="card-prompt">
                      <strong>Tap to reveal</strong>
                      <span>{metric.short}</span>
                    </div>
                  ) : (
                    <div className="card-reading" aria-live="polite">
                      <strong>{formatValue(metric, displayProgress)}</strong>
                      <span>in 60 seconds</span>
                      <p>{metric.fact}</p>
                    </div>
                  )}

                  {burst === metric.id && (
                    <span className="burst" aria-hidden="true">
                      {Array.from({ length: 8 }).map((_, index) => (
                        <i key={index} style={{ '--i': index } as React.CSSProperties} />
                      ))}
                    </span>
                  )}
                </button>
                {isRevealed && (
                  <a className="source-link" href={metric.sourceUrl} target="_blank" rel="noreferrer">
                    {metric.source}
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="method" aria-labelledby="method-title">
        <div>
          <h2 id="method-title">A snapshot, not a stopwatch</h2>
          <p>Public platforms report at different times and in different units. We convert their latest usable totals into one minute, then round for readability.</p>
        </div>
        <div className="method-list">
          {metrics.map((metric) => (
            <details key={metric.id}>
              <summary>{metric.title}</summary>
              <p>{metric.basis}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <p>Built to make one ordinary minute feel enormous.</p>
        <p>Estimates updated September 2026</p>
      </footer>
    </main>
  );
}
