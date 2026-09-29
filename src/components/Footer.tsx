import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span>DailyPlanner</span>
            </Link>
            <p>Created to bring structure, calm, and confidence to your daily life.</p>
            <p className="footer-made">Made with 💜 in India</p>
          </div>
          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              <li>
                <Link href="/#features">Features</Link>
              </li>
              <li>
                <Link href="/how-to-use">How to Use</Link>
              </li>
              <li>
                <Link href="/#roi">Results</Link>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ashukaytech.daily_planner"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Android App
                </a>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/in/app/the-dailyplanner-app/id6771750050"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  iOS App
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-links">
              <a
                href="https://x.com/aashishdubey01"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="X (Twitter)"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/dailyplannerapp_/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@DailyPlannerApp"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-huge-text" aria-hidden="true">
          DAILYPLANNER
        </div>

        <div className="footer-bottom">
          <p>© 2025-2026 AASHUKAY TECH Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
