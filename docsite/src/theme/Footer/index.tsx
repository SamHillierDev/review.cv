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
              <a
                href="https://discord.com/invite/XfZHVfPr9C"
                target="_blank"
                rel="noopener noreferrer"
                className="rc-footer__social-link"
                aria-label="Discord"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
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
