import React from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import type { TimelineStory } from '../types';
import { Notification } from './Notification';

interface StoryPanelProps {
  story: TimelineStory;
  mode: 'without' | 'with';
}

export const StoryPanel: React.FC<StoryPanelProps> = ({ story, mode }) => {
  if (mode === 'without') {
    const data = story.withoutAvencis;
    return (
      <div className="story-panel-without" id="story-panel-without-avencis">
        <div>
          {/* Header */}
          <div className="panel-header-without">
            <span className="panel-label-without">
              <AlertCircle size={14} />
              <span>Without Avencis</span>
            </span>
            <span className="panel-time-pill">{story.time}</span>
          </div>

          {/* Image */}
          <div className="story-img-container">
            <img
              src={data.image}
              alt="Founder stressed without business engines"
              loading="eager"
            />
            <div className="story-img-overlay">
              <span className="story-img-badge" style={{ color: '#FCA5A5' }}>
                Status: {data.founderMood}
              </span>
            </div>
          </div>

          {/* Narrative Content */}
          <h3 style={{ color: '#FFFFFF', fontSize: '1.625rem', marginBottom: '8px' }}>
            {data.title}
          </h3>
          <p style={{ color: '#F87171', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '14px' }}>
            {data.subtitle}
          </p>
          <p style={{ color: '#CBD5E1', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '24px' }}>
            {data.description}
          </p>

          {/* Realistic Notification Cards */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94A3B8', fontWeight: 700, marginBottom: '10px' }}>
              Incoming Tactical Friction ({data.notifications.length} Priority Alerts)
            </div>
            <div className="notifications-stack">
              {data.notifications.map((item, idx) => (
                <Notification key={idx} {...item} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metric Card */}
        <div className="panel-footer-without">
          <span className="footer-metric-label">Operational Bottleneck</span>
          <span className="footer-metric-val">{data.bottleneck}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.8125rem', color: '#FCA5A5' }}>
            <span>{data.timeSpentInFirefighting}</span>
          </div>
        </div>
      </div>
    );
  }

  // WITH AVENCIS MODE
  const data = story.withAvencis;
  return (
    <div className="story-panel-with" id="story-panel-with-avencis">
      <div>
        {/* Header */}
        <div className="panel-header-with">
          <span className="panel-label-with">
            <CheckCircle2 size={14} />
            <span>With Avencis</span>
          </span>
          <span className="panel-time-pill" style={{ color: 'var(--av-primary-blue)' }}>
            {story.time}
          </span>
        </div>

        {/* Image */}
        <div className="story-img-container">
          <img
            src={data.image}
            alt="Founder with clarity and autonomous business engines"
            loading="eager"
          />
          <div className="story-img-overlay" style={{ background: 'linear-gradient(180deg, rgba(0, 26, 114, 0) 40%, rgba(0, 26, 114, 0.85) 100%)' }}>
            <span className="story-img-badge" style={{ color: '#6EE7B7' }}>
              Status: {data.founderMood}
            </span>
          </div>
        </div>

        {/* Narrative Content */}
        <h3 style={{ color: 'var(--av-deep-blue)', fontSize: '1.625rem', marginBottom: '8px' }}>
          {data.title}
        </h3>
        <p style={{ color: 'var(--av-primary-blue)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '14px' }}>
          {data.subtitle}
        </p>
        <p style={{ color: 'var(--av-slate-700)', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '24px' }}>
          {data.description}
        </p>

        {/* Live System Highlights */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--av-primary-blue)', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="var(--av-accent-orange)" />
            <span>Automated Business Engine Indicators</span>
          </div>
          <div className="system-highlights-grid">
            {data.systemHighlights.map((item, idx) => (
              <div key={idx} className="system-card">
                <div className="system-card-left">
                  <span className="system-card-label">{item.label}</span>
                  <span className="system-card-value">{item.value}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="system-card-metric">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Metric Card */}
      <div className="panel-footer-with">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={14} color="var(--av-primary-blue)" />
          <span className="footer-metric-label-with">Strategic Bandwidth Liberated</span>
        </div>
        <span className="footer-metric-val-with">{data.strategicFocus}</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.8125rem', color: 'var(--av-primary-blue)', fontWeight: 600 }}>
          <span>{data.timeOnStrategy}</span>
        </div>
      </div>
    </div>
  );
};
