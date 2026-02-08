import React from 'react';
import Link from '@docusaurus/Link';

const footerLinks = {
  docs: [
    { label: 'Introduction', to: '/' },
    { label: 'Quick Start', to: '/getting-started/quick-start' },
    { label: 'Uploading Your CV', to: '/guides/uploading-cv' },
    { label: 'Understanding Results', to: '/guides/understanding-results' },
  ],
  pages: [
    { label: 'How It Works', href: 'https://review.cv/#how-it-works' },
    { label: 'Testimonials', href: 'https://review.cv/#testimonials' },
    { label: 'FAQ', href: 'https://review.cv/#faq' },
  ],
  support: [
    { label: 'Contact', href: 'https://review.cv/#' },
    { label: 'Privacy Policy', href: 'https://review.cv/privacy' },
    { label: 'Terms of Service', href: 'https://review.cv/terms' },
  ],
};

function Footer(): React.ReactElement {
  return (
    <footer className="rc-footer">
      <div className="rc-footer__container">
        <div className="rc-footer__grid">
          {/* Brand Column */}
          <div className="rc-footer__brand">
            <a href="https://review.cv" className="rc-footer__logo">
              <div className="rc-footer__logo-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
              </div>
              <span className="rc-footer__logo-text">ReviewCV</span>
            </a>
            <p className="rc-footer__tagline">
              Transform your career with AI-powered CV analysis and expert
              consultations. Stand out from the crowd and land your dream job.
            </p>
            <div className="rc-footer__social">
              <a
                href="https://www.linkedin.com/company/reviewcv"
                target="_blank"
                rel="noopener noreferrer"
                className="rc-footer__social-link"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Docs Links */}
          <div className="rc-footer__column">
            <h4 className="rc-footer__heading">Docs</h4>
            <ul className="rc-footer__list">
              {footerLinks.docs.map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="rc-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages Links */}
          <div className="rc-footer__column">
            <h4 className="rc-footer__heading">Pages</h4>
            <ul className="rc-footer__list">
              {footerLinks.pages.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="rc-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="rc-footer__column">
            <h4 className="rc-footer__heading">Support</h4>
            <ul className="rc-footer__list">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="rc-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="rc-footer__bottom">
          <p className="rc-footer__copyright">
            &copy; {new Date().getFullYear()} ReviewCV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
