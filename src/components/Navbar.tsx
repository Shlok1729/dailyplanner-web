'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={`nav-backdrop ${menuOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <img src="/logo.png" alt="DailyPlanner Logo" className="logo-img" width="36" height="36" />
          <span>DailyPlanner</span>
        </Link>
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
          <Link href="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/#features" className="nav-link" onClick={closeMenu}>
            Features
          </Link>
          <Link href="/#comparison" className="nav-link" onClick={closeMenu}>
            Compare
          </Link>
          <Link href="/#roi" className="nav-link" onClick={closeMenu}>
            Results
          </Link>
          <Link href="/how-to-use" className="nav-link" onClick={closeMenu}>
            How It Works
          </Link>
          <Link href="/about" className="nav-link" onClick={closeMenu}>
            About
          </Link>
          <Link href="/blog" className="nav-link" onClick={closeMenu}>
            Blog
          </Link>
          <a
            href="https://play.google.com/store/apps/details?id=com.ashukaytech.daily_planner"
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Download
          </a>
        </div>
        <button
          className={`nav-toggle ${menuOpen ? 'active' : ''}`}
          id="nav-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    </>
  );
}
