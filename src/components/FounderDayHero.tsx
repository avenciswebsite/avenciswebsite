import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { TimeOfDay } from '../types';
import { FOUNDER_DAY_STORIES } from '../data/siteData';

/* Authentic App Icons for Notifications */
const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <div className="real-app-icon whatsapp" title="WhatsApp">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.454 5.711 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  </div>
);

const GmailIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <div className="real-app-icon gmail" title="Gmail">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" fill="#EA4335" />
      <path d="M22 6L12 13L2 6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const PhoneIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <div className="real-app-icon phone" title="Missed Call">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  </div>
);

/* Helper for smooth easing */
const smoothStep = (t: number): number => {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
};

export const FounderDayHero: React.FC = () => {
  const timeMoments: TimeOfDay[] = useMemo(
    () => ['9:30am', '12:30pm', '3:00pm', '5:00pm', '7:00pm'],
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Preload all high-res photography assets
  useEffect(() => {
    const imagesToPreload = [
      '/assets/founder-stressed.webp',
      '/assets/founder-calm.webp',
      '/assets/1230 PM — WITHOUT AVENCIS.webp',
      '/assets/1230 PM — WITH AVENCIS.webp',
      '/assets/1500 PM — WITHOUT AVENCIS.webp',
      '/assets/1500 PM — WITH AVENCIS.webp',
      '/assets/1730 PM — WITHOUT AVENCIS.webp',
      '/assets/1730 PM — WITH AVENCIS.webp',
      '/assets/1900 PM — WITHOUT AVENCIS.webp',
      '/assets/1900 PM — WITH AVENCIS.webp',
      '/assets/Final CTA Image.webp',
      '/assets/avencis-name-logo.png',
      '/assets/avencis-logo.png'
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Continuous high-performance scroll tracker
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - (window.innerHeight - headerHeight);
      if (totalScrollable <= 0) return;

      const rawProgress = (headerHeight - rect.top) / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ==========================================================================
  // SCROLL PROGRESS PHASES WITH DEDICATED READING/PAUSE WINDOWS
  // Rhythm: TRANSITION -> ARRIVE & SETTLE -> READING WINDOW -> NEXT TRANSITION
  //
  // Interval 1 (9:30 AM -> 12:30 PM):
  //   - Transition: [0.00, 0.11] -> t1: 0 -> 1
  //   - Settled Reading Window: [0.11, 0.20] (12:30 PM fully settled & static)
  // Interval 2 (12:30 PM -> 3:00 PM):
  //   - Transition: [0.20, 0.31] -> t2: 0 -> 1
  //   - Settled Reading Window: [0.31, 0.40] (3:00 PM fully settled & static)
  // Interval 3 (3:00 PM -> 5:00 PM):
  //   - Transition: [0.40, 0.51] -> t3: 0 -> 1
  //   - Settled Reading Window: [0.51, 0.60] (5:00 PM fully settled & static)
  // Interval 4 (5:00 PM -> 7:00 PM):
  //   - Transition: [0.60, 0.71] -> t4: 0 -> 1
  //   - Settled Reading Window: [0.71, 0.80] (7:00 PM fully settled & static)
  // Interval 5 (7:00 PM -> Final CTA):
  //   - Transition: [0.80, 0.90] -> tCta: 0 -> 1
  //   - Settled Final CTA: [0.90, 1.00]
  // ==========================================================================
  const t1 = smoothStep(scrollProgress / 0.11);
  const t2 = smoothStep((scrollProgress - 0.20) / 0.11);
  const t3 = smoothStep((scrollProgress - 0.40) / 0.11);
  const t4 = smoothStep((scrollProgress - 0.60) / 0.11);
  const tCta = smoothStep((scrollProgress - 0.80) / 0.10);

  // Active time index for header badge & timeline node highlighting
  let activeIndex = 0;
  if (scrollProgress >= 0.65) {
    activeIndex = 4; // 7:00 PM (active during transition & reading window [0.71, 0.80])
  } else if (scrollProgress >= 0.45) {
    activeIndex = 3; // 5:00 PM (active during transition & reading window [0.51, 0.60])
  } else if (scrollProgress >= 0.25) {
    activeIndex = 2; // 3:00 PM (active during transition & reading window [0.31, 0.40])
  } else if (scrollProgress >= 0.05) {
    activeIndex = 1; // 12:30 PM (active during transition & reading window [0.11, 0.20])
  }
  const isCtaActive = scrollProgress >= 0.86;

  // Continuous Timeline Track Progress Line (%)
  // Progress advances during transitions and settles at destination timestamp dots during reading windows
  const timelineProgressPercent = useMemo(() => {
    if (scrollProgress <= 0.00) return 0;
    if (scrollProgress <= 0.11) {
      return (scrollProgress / 0.11) * 25;
    }
    if (scrollProgress <= 0.20) {
      return 25; // Settled at 12:30 PM dot during reading window
    }
    if (scrollProgress <= 0.31) {
      return 25 + ((scrollProgress - 0.20) / 0.11) * 25;
    }
    if (scrollProgress <= 0.40) {
      return 50; // Settled at 3:00 PM dot during reading window
    }
    if (scrollProgress <= 0.51) {
      return 50 + ((scrollProgress - 0.40) / 0.11) * 25;
    }
    if (scrollProgress <= 0.60) {
      return 75; // Settled at 5:00 PM dot during reading window
    }
    if (scrollProgress <= 0.71) {
      return 75 + ((scrollProgress - 0.60) / 0.11) * 25;
    }
    return 100; // Settled at 7:00 PM dot & Final CTA
  }, [scrollProgress]);

  // Image layer transform helpers (Drop in from above)
  const getImageLayerStyle = (layerIndex: number) => {
    if (layerIndex === 0) {
      return {
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        zIndex: 1
      };
    }
    const t = [0, t1, t2, t3, t4][layerIndex];
    return {
      opacity: t,
      transform: `translateY(${-40 * (1 - t)}px) scale(${1.03 - 0.03 * t})`,
      zIndex: layerIndex + 1
    };
  };

  // Content layer transform helpers (Synchronized transition)
  const getContentLayerStyle = (layerIndex: number) => {
    if (layerIndex === 0) {
      const out = t1;
      return {
        opacity: Math.max(0, 1 - out * 1.5),
        transform: `translateY(${25 * out}px)`,
        pointerEvents: out > 0.5 ? ('none' as const) : ('auto' as const),
        visibility: out >= 1 ? ('hidden' as const) : ('visible' as const)
      };
    } else if (layerIndex === 1) {
      const incoming = t1;
      const outgoing = t2;
      const op = incoming >= 1 ? Math.max(0, 1 - outgoing * 1.5) : incoming;
      const trans = incoming < 1 ? -25 * (1 - incoming) : 25 * outgoing;
      return {
        opacity: op,
        transform: `translateY(${trans}px)`,
        pointerEvents: incoming >= 0.5 && outgoing < 0.5 ? ('auto' as const) : ('none' as const),
        visibility: incoming <= 0 || outgoing >= 1 ? ('hidden' as const) : ('visible' as const)
      };
    } else if (layerIndex === 2) {
      const incoming = t2;
      const outgoing = t3;
      const op = incoming >= 1 ? Math.max(0, 1 - outgoing * 1.5) : incoming;
      const trans = incoming < 1 ? -25 * (1 - incoming) : 25 * outgoing;
      return {
        opacity: op,
        transform: `translateY(${trans}px)`,
        pointerEvents: incoming >= 0.5 && outgoing < 0.5 ? ('auto' as const) : ('none' as const),
        visibility: incoming <= 0 || outgoing >= 1 ? ('hidden' as const) : ('visible' as const)
      };
    } else if (layerIndex === 3) {
      const incoming = t3;
      const outgoing = t4;
      const op = incoming >= 1 ? Math.max(0, 1 - outgoing * 1.5) : incoming;
      const trans = incoming < 1 ? -25 * (1 - incoming) : 25 * outgoing;
      return {
        opacity: op,
        transform: `translateY(${trans}px)`,
        pointerEvents: incoming >= 0.5 && outgoing < 0.5 ? ('auto' as const) : ('none' as const),
        visibility: incoming <= 0 || outgoing >= 1 ? ('hidden' as const) : ('visible' as const)
      };
    } else {
      // 7:00 PM (layer 4)
      const incoming = t4;
      const outgoing = tCta;
      const op = incoming >= 1 ? Math.max(0, 1 - outgoing * 1.5) : incoming;
      const trans = incoming < 1 ? -25 * (1 - incoming) : 25 * outgoing;
      return {
        opacity: op,
        transform: `translateY(${trans}px)`,
        pointerEvents: incoming >= 0.5 && outgoing < 0.5 ? ('auto' as const) : ('none' as const),
        visibility: incoming <= 0 || outgoing >= 1 ? ('hidden' as const) : ('visible' as const)
      };
    }
  };

  // Staggered cinematic pop-up animation for incoming compact notifications (Without Avencis)
  const getNotificationItemStyle = (layerIndex: number, notifIndex: number) => {
    if (layerIndex === 0) {
      return {
        opacity: 1,
        transform: 'translateX(0) scale(1)',
        willChange: 'transform, opacity'
      };
    }

    const incomingT = [0, t1, t2, t3, t4][layerIndex];
    const startThreshold = 0.06 + notifIndex * 0.22;
    const duration = 0.44;
    const p = smoothStep((incomingT - startThreshold) / duration);

    return {
      opacity: p,
      transform: `translateX(${32 * (1 - p)}px) scale(${0.96 + 0.04 * p})`,
      willChange: 'transform, opacity',
      transition: 'transform 80ms ease-out, opacity 80ms linear'
    };
  };

  const renderAppIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <WhatsAppIcon size={14} />;
      case 'email':
        return <GmailIcon size={14} />;
      case 'phone':
        return <PhoneIcon size={13} />;
      default:
        return <AlertCircle size={13} color="#EF4444" />;
    }
  };

  const handleContinueToNextSection = () => {
    const nextSection = document.getElementById('transformation-imperative');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="founder-experience-root" id="founders-day">
      {/* ============================================================
          CHANGE 1: INTRODUCTORY SECTION ABOVE SPLIT-SCREEN ANIMATION
          ============================================================ */}
      <section className="founder-intro-section" id="founder-intro">
        <div className="container founder-intro-container">
          <div className="founder-intro-header">
            <div className="eyebrow-badge orange" style={{ display: 'inline-flex' }}>
              <Sparkles size={13} />
              <span>Two Business Realities</span>
            </div>
            <h2 className="founder-intro-main-title font-serif">
              Your Business Shouldn't Need You for Everything.
            </h2>
            <p className="founder-intro-supporting-text">
              See what a day looks like when everything depends on you — versus when your business has the systems, accountability and management support to keep moving.
            </p>
          </div>

          {/* Side-by-side comparison cards */}
          <div className="founder-intro-comparison-grid">
            {/* Left Reality: Without Avencis */}
            <div className="intro-reality-card without">
              <div className="intro-reality-pill danger">
                <AlertCircle size={11} />
                <span>WITHOUT AVENCIS</span>
              </div>
              <h3 className="intro-reality-heading font-serif">
                The Founder Is the System.
              </h3>
              <p className="intro-reality-subtext">
                Every question, decision and follow-up comes back to you.
              </p>
            </div>

            {/* Center VS Indicator */}
            <div className="intro-reality-vs-badge" aria-hidden="true">
              VS
            </div>

            {/* Right Reality: With Avencis */}
            <div className="intro-reality-card with">
              <div className="intro-reality-pill success">
                <CheckCircle2 size={11} />
                <span>WITH AVENCIS</span>
              </div>
              <h3 className="intro-reality-heading font-serif">
                The System Supports the Founder.
              </h3>
              <p className="intro-reality-subtext">
                Your team owns execution. You focus on the decisions that move the business forward.
              </p>
            </div>
          </div>

          {/* Subtle Scroll Cue */}
          <div className="founder-intro-scroll-prompt">
            <span>Scroll to experience the day unfold ↓</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          CINEMATIC SPLIT-SCREEN SCROLL-PINNED ANIMATION STAGE
          ============================================================ */}
      <div className="founder-day-scroll-container" ref={containerRef}>
        {/* Sticky Cinematic Viewport Container */}
        <div className="founder-day-sticky-stage">
          {/* MAIN SPLIT-SCREEN CINEMATIC VIEWPORT */}
          <div className="split-cinematic-stage">
            {/* Central VS Badge */}
            <div className="cinematic-vs-badge" aria-hidden="true">
              VS
            </div>

            {/* ============================================================
                LEFT SIDE: WITHOUT AVENCIS (SYNCHRONIZED IMAGE & STORY)
                ============================================================ */}
            <div className="cinematic-left-panel">
              {/* Layered Background Images (Dropping from Above) */}
              <div className="panel-media-stack" aria-hidden="true">
                {timeMoments.map((momentKey, idx) => {
                  const storyItem = FOUNDER_DAY_STORIES[momentKey];
                  return (
                    <div
                      key={`left-bg-${momentKey}`}
                      className="panel-bg-layer"
                      style={getImageLayerStyle(idx)}
                    >
                      <img
                        src={storyItem.withoutAvencis.image}
                        alt=""
                        className="panel-bg-img"
                      />
                      <div className="panel-bg-overlay without" />
                    </div>
                  );
                })}
              </div>

              {/* Layered Content Stack (Cross-fading with Scroll) */}
              <div className="panel-content-stack">
                {timeMoments.map((momentKey, idx) => {
                  const storyItem = FOUNDER_DAY_STORIES[momentKey];
                  return (
                    <div
                      key={`left-content-${momentKey}`}
                      className="panel-content-layer headline-led"
                      style={getContentLayerStyle(idx)}
                    >
                      <div className="panel-inner-content">
                        {/* Top State Label */}
                        <div className="panel-top-header">
                          <span className="status-pill-danger">
                            <AlertCircle size={11} />
                            <span>WITHOUT AVENCIS — {storyItem.timeLabel}</span>
                          </span>
                        </div>

                        {/* Approved Headline & Supporting Paragraph */}
                        <div className="panel-story-narrative-group">
                          <h3 className="panel-story-headline text-white font-serif">
                            {storyItem.withoutAvencis.title}
                          </h3>
                          <p className="panel-story-paragraph text-slate-light">
                            {storyItem.withoutAvencis.subtitle}
                          </p>
                        </div>

                        {/* CHANGE 2: Compact Notification Visuals */}
                        <div className="compact-notifications-stream">
                          <div className="compact-notif-cards-stack">
                            {storyItem.withoutAvencis.notifications.slice(0, 3).map((notif, nIdx) => (
                              <div
                                key={nIdx}
                                className={`compact-story-notif ${nIdx >= 2 ? 'secondary-notif' : ''}`}
                                style={getNotificationItemStyle(idx, nIdx)}
                              >
                                <div className="compact-notif-header">
                                  <div className="compact-notif-sender">
                                    {renderAppIcon(notif.type)}
                                    <span className="compact-sender-name">{notif.sender}</span>
                                    {notif.badge && (
                                      <span className="compact-notif-badge">{notif.badge}</span>
                                    )}
                                  </div>
                                  <span className="compact-notif-time">{notif.time}</span>
                                </div>
                                <div className="compact-notif-preview-row">
                                  <span className="compact-notif-subject">{notif.title}</span>
                                  <div className="compact-scribble-line" aria-hidden="true" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ============================================================
                RIGHT SIDE: WITH AVENCIS (SYNCHRONIZED IMAGE & STORY)
                ============================================================ */}
            <div className="cinematic-right-panel">
              {/* Layered Background Images (Dropping from Above) */}
              <div className="panel-media-stack" aria-hidden="true">
                {timeMoments.map((momentKey, idx) => {
                  const storyItem = FOUNDER_DAY_STORIES[momentKey];
                  return (
                    <div
                      key={`right-bg-${momentKey}`}
                      className="panel-bg-layer"
                      style={getImageLayerStyle(idx)}
                    >
                      <img
                        src={storyItem.withAvencis.image}
                        alt=""
                        className="panel-bg-img"
                      />
                      <div className="panel-bg-overlay with" />
                    </div>
                  );
                })}
              </div>

              {/* Layered Content Stack (Cross-fading with Scroll) */}
              <div className="panel-content-stack">
                {timeMoments.map((momentKey, idx) => {
                  const storyItem = FOUNDER_DAY_STORIES[momentKey];
                  return (
                    <div
                      key={`right-content-${momentKey}`}
                      className="panel-content-layer headline-led"
                      style={getContentLayerStyle(idx)}
                    >
                      <div className="panel-inner-content">
                        {/* Top State Label */}
                        <div className="panel-top-header">
                          <span className="status-pill-success">
                            <CheckCircle2 size={11} />
                            <span>WITH AVENCIS — {storyItem.timeLabel}</span>
                          </span>
                        </div>

                        {/* Approved Headline & Supporting Paragraph */}
                        <div className="panel-story-narrative-group">
                          <h3 className="panel-story-headline text-navy font-serif">
                            {storyItem.withAvencis.title}
                          </h3>
                          <p className="panel-story-paragraph text-navy-sub">
                            {storyItem.withAvencis.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================
              BOTTOM TIMELINE (CONTINUOUS ORANGE SCROLL PROGRESS TRACK)
              ============================================================ */}
          <div className="founder-day-timeline-bar">
            <div className="container timeline-container">
              <div className="timeline-track-wrapper" aria-label="Founder Day Timeline">
                {/* Base Track Line */}
                <div className="timeline-connecting-line" aria-hidden="true">
                  {/* Active Orange Glowing Progress Fill */}
                  <div
                    className="timeline-active-progress-line"
                    style={{ width: `${timelineProgressPercent}%` }}
                  />
                </div>

                {timeMoments.map((momentKey, idx) => {
                  const itemStory = FOUNDER_DAY_STORIES[momentKey];
                  const isNodeActive = activeIndex === idx && !isCtaActive;
                  const isNodePast = activeIndex > idx || isCtaActive;

                  return (
                    <div
                      key={momentKey}
                      className={`timeline-node-item ${isNodeActive ? 'active' : ''} ${isNodePast ? 'past' : ''}`}
                    >
                      <div className="timeline-node-dot" />
                      <span className="timeline-node-time">{itemStory.timeLabel}</span>
                      <span className="timeline-node-theme">{itemStory.theme}</span>
                    </div>
                  );
                })}

                {/* Final Conclusion Milestone */}
                <div className={`timeline-node-item compare ${isCtaActive ? 'active' : ''}`}>
                  <div className="timeline-node-dot" />
                  <span className="timeline-node-time">Verdict</span>
                  <span className="timeline-node-theme">Your Choice</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              CHANGE 3: COMBINED CLOSING CTA SCREEN (EMOTIONAL CLIMAX)
              ============================================================ */}
          <div
            className="fullscreen-final-cta-overlay"
            style={{
              opacity: tCta,
              transform: `translateY(${-30 * (1 - tCta)}px)`,
              pointerEvents: tCta >= 0.7 ? 'auto' : 'none',
              visibility: tCta <= 0 ? 'hidden' : 'visible'
            }}
          >
            {/* High-Res Background Image with Cinematic Dark Overlay */}
            <div className="final-cta-bg-wrapper" aria-hidden="true">
              <img
                src="/assets/Final CTA Image.webp"
                alt=""
                className="final-cta-bg-img"
              />
              <div className="final-cta-gradient-overlay" />
            </div>

            <div className="container final-cta-inner-container">
              {/* Avencis Logo Emblem */}
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/assets/avencis-name-logo.png"
                  alt="Avencis Growth Consulting"
                  className="final-cta-brand-logo"
                />
              </div>

              {/* Story Eyebrow Badge */}
              <div className="eyebrow-badge orange" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                <Sparkles size={14} />
                <span>The Transformation Imperative</span>
              </div>

              {/* Approved Main Headline */}
              <h2 className="final-cta-question font-serif">
                You Didn't Build a Business to Become Its Bottleneck.
              </h2>

              {/* Approved Supporting Copy */}
              <p className="final-cta-subtext">
                You built it to create something bigger. Avencis helps you build the management systems, accountability and execution discipline to make that possible.
              </p>

              {/* Approved Brand Statement */}
              <div className="final-cta-brand-statement">
                Avencis — Your Extended Management Team.
              </div>

              {/* Primary Continuation Action */}
              <div className="final-cta-actions-group">
                <button
                  type="button"
                  onClick={handleContinueToNextSection}
                  className="btn btn-orange btn-lg"
                  id="scroll-final-cta-continue-btn"
                >
                  <span>Continue to the next homepage section</span>
                  <ArrowRight size={18} />
                </button>
                <Link
                  to="/diagnostic"
                  className="btn btn-outline-white btn-lg"
                  id="scroll-final-cta-diagnostic-btn"
                >
                  <span>Take Business Scale Assessment</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

