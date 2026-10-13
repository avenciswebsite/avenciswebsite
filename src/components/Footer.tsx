import React from 'react';
import { Link } from 'react-router-dom';
import { GLOBAL_FOOTER_CONTENT } from '../data/siteData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" id="contact" style={{ backgroundColor: 'var(--av-deep-blue)', color: '#FFFFFF', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container">
        {/* Top Section: Brand & Capabilities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Col 1: Brand & Positioning */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Link
                to="/"
                className="footer-logo-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
                aria-label="Avencis Growth Consulting Home"
              >
                <img
                  src="/assets/avencis-logo-dark-bg-mark.png"
                  alt="Avencis Mark"
                  className="footer-logo-mark"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/Avencis Logo For Dark Bg.png';
                  }}
                />
                <img
                  src="/assets/avencis-name-logo.png"
                  alt="Avencis Growth Consulting"
                  className="footer-logo-name"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/avencis-logo.png';
                  }}
                />
              </Link>
            </div>

            <div style={{ fontSize: '1.1875rem', fontWeight: 800, color: 'var(--av-accent-orange)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
              {GLOBAL_FOOTER_CONTENT.brandName} : {GLOBAL_FOOTER_CONTENT.tagline}
            </div>

            <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '20px' }}>
              {GLOBAL_FOOTER_CONTENT.purposeStatement}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#94A3B8', marginBottom: '12px' }}>
              <MapPin size={16} color="var(--av-accent-orange)" />
              <span>{GLOBAL_FOOTER_CONTENT.location}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem', color: '#E2E8F0' }}>
                <MessageSquare size={16} color="#25D366" />
                <span>WhatsApp: <strong>{GLOBAL_FOOTER_CONTENT.whatsappDisplay}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9375rem', color: '#E2E8F0' }}>
                <Mail size={16} color="var(--av-soft-blue)" />
                <span>Email: <strong>{GLOBAL_FOOTER_CONTENT.emailDisplay}</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: The 10 Capabilities */}
          <div>
            <h4 style={{ fontSize: '1.125rem', color: '#FFFFFF', marginBottom: '18px', fontWeight: 700, letterSpacing: '0.04em' }}>
              Our Capabilities & Practice Areas
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px 16px'
              }}
            >
              {GLOBAL_FOOTER_CONTENT.capabilities.map((cap, idx) => (
                <div key={idx} style={{ fontSize: '0.875rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--av-accent-orange)' }}>•</span>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links & Start Here */}
          <div>
            <h4 style={{ fontSize: '1.125rem', color: '#FFFFFF', marginBottom: '16px', fontWeight: 700, letterSpacing: '0.04em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {GLOBAL_FOOTER_CONTENT.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    style={{ fontSize: '0.9375rem', color: '#CBD5E1', transition: 'color 150ms ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--av-accent-orange)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 style={{ fontSize: '1.125rem', color: '#FFFFFF', marginBottom: '14px', fontWeight: 700, letterSpacing: '0.04em' }}>
              Start Here
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to={GLOBAL_FOOTER_CONTENT.startHere.assessmentPath}
                style={{ fontSize: '0.9375rem', color: 'var(--av-accent-orange)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>{GLOBAL_FOOTER_CONTENT.startHere.assessmentLabel}</span>
              </Link>
              <a
                href={getWhatsAppUrl(GLOBAL_FOOTER_CONTENT.startHere.whatsAppKeyword)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.9375rem', color: '#25D366', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>{GLOBAL_FOOTER_CONTENT.startHere.whatsAppLabel}</span>
              </a>
            </div>
          </div>
        </div>

        {/* The Avencis Principle Banner */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '28px 24px',
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <div style={{ fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--av-accent-orange)', marginBottom: '8px' }}>
            {GLOBAL_FOOTER_CONTENT.avencisPrinciple.title}
          </div>
          <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
            {GLOBAL_FOOTER_CONTENT.avencisPrinciple.boldText}
          </h3>
          <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', color: '#CBD5E1', fontFamily: 'var(--font-serif)' }}>
            {GLOBAL_FOOTER_CONTENT.avencisPrinciple.subText}
          </h3>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.8125rem',
            color: '#94A3B8'
          }}
        >
          <div>
            © 2026 Avencis Growth Consulting LLP. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#94A3B8' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#94A3B8' }}>Terms of Engagement</a>
            <a href="#" style={{ color: '#94A3B8' }}>Confidentiality Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
