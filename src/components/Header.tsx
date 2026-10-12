import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { label: "Founder's Day", path: '/' },
    { label: 'What We Do', path: '/what-we-do' },
    { label: 'Methodology', path: '/methodology' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Diagnostics', path: '/diagnostics' },
    { label: 'Dependency Index', path: '/dependency-index' },
    { label: 'Why Avencis', path: '/why-avencis' },
    { label: 'Insights', path: '/insights' },
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo-link" aria-label="Avencis Growth Consulting Home">
            <img
              src="/assets/avencis-name-logo.png"
              alt="Avencis Growth Consulting"
              className="nav-logo-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/avencis-logo.png';
              }}
            />
          </Link>

          {/* Desktop Navigation Routes */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs: Primary Score CTA + Secondary WhatsApp CTA */}
          {/* Desktop CTAs: Primary Score CTA + Secondary WhatsApp CTA */}
          <div className="nav-actions">
            <Link
              to="/diagnostics"
              className="btn-header-cta"
              id="header-score-cta"
            >
              <span className="cta-text-full">Find Your Business Scale Score →</span>
              <span className="cta-text-short">Scale Score →</span>
            </Link>

            <a
              href={getWhatsAppUrl('AVENCIS')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-header-whatsapp hide-on-compact"
              id="header-whatsapp-cta"
              title="WhatsApp Avencis"
            >
              <MessageSquare size={15} />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Toggle Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/assets/avencis-name-logo.png"
                alt="Avencis"
                style={{ height: '36px' }}
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{ padding: '8px', color: 'var(--av-deep-blue)' }}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            to="/diagnostics"
            className="btn btn-orange btn-lg"
            onClick={() => setMobileMenuOpen(false)}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Find Your Business Scale Score →</span>
          </Link>
          <a
            href={getWhatsAppUrl('AVENCIS')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg"
            style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={18} color="#25D366" />
            <span>WhatsApp Avencis</span>
          </a>
        </div>
      </div>
    </>
  );
};
