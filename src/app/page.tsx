'use client';

import Link from 'next/link';
import InteractiveDemo from '@/components/InteractiveDemo';
import ModernBentoGrid from '@/components/ModernBentoGrid';
import ModernComparison from '@/components/ModernComparison';
import RoiCalculator from '@/components/RoiCalculator';
import FaqSection from '@/components/FaqSection';
import ReviewsMarquee from '@/components/ReviewsMarquee';

export default function HomePage() {
  return (
    <>
      {/* 2-COLUMN SPLIT HERO SECTION */}
      <section className="hero-split-section" id="top">
        <div className="hero-split-glow" aria-hidden="true" />

        <div className="container hero-split-container">
          {/* LEFT COLUMN: CONTENT & CALL TO ACTIONS */}
          <div className="hero-split-left">
            <div className="section-pill shimmer">
              <span className="pill-dot"></span>
              <span>AI-Powered Focus & Timetable Assistant • 100% Free</span>
            </div>

            <h1 className="hero-split-title">
              Master your daily focus.
              <br />
              <span className="text-gradient-purple">Effortless time blocking.</span>
            </h1>

            <p className="hero-split-desc">
              DailyPlanner aligns your day with your natural energy rhythm. Automatically schedule tasks, lock out
              distracting apps, and enter deep flow state without the friction.
            </p>

            <div className="hero-split-actions">
              <a
                href="https://play.google.com/store/apps/details?id=com.ashukaytech.daily_planner"
                className="btn-primary-gradient"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-google-play"></i>
                <span>Get on Android</span>
              </a>

              <a
                href="https://apps.apple.com/in/app/the-dailyplanner-app/id6771750050"
                className="btn-secondary-glass"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-apple"></i>
                <span>Get for iOS</span>
              </a>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-pill">
                <span className="stars">★★★★★</span>
                <strong>4.8 / 5</strong>
                <span>App Store & Google Play</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-pill">
                <strong>10,000+</strong>
                <span>Daily Planners</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-pill">
                <strong className="free-tag">100% Free</strong>
                <span>No Ads • No Subscriptions</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D TILTED PHONE SHOWCASING THE LIVE APP */}
          <div className="hero-split-right">
            <div className="tilted-phone-stage" id="interactive-demo">
              <div className="tilted-phone-glow" aria-hidden="true" />

              {/* Floating Highlight Badges */}
              <div className="floating-badge badge-top-right">
                <span className="badge-emoji">🔒</span>
                <div>
                  <strong>Focus Shield Active</strong>
                  <small>Social apps silenced</small>
                </div>
              </div>

              <div className="floating-badge badge-bottom-left">
                <span className="badge-emoji">🧠</span>
                <div>
                  <strong>Peak Energy 9:00 AM</strong>
                  <small>Deep work scheduled</small>
                </div>
              </div>

              {/* 3D Angled Phone Mockup with live interactive mini-app */}
              <div className="tilted-phone-wrapper">
                <InteractiveDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODERN CAPABILITIES TICKER */}
      <section className="capabilities-ticker-section">
        <div className="ticker-track">
          <div className="ticker-group">
            <span>✨ AI Timetable Auto-Generator</span>
            <span className="ticker-dot">•</span>
            <span>🍅 Pomodoro Focus Sprints</span>
            <span className="ticker-dot">•</span>
            <span>🔒 App Blocker & Distraction Shield</span>
            <span className="ticker-dot">•</span>
            <span>🎯 Eisenhower Priority Matrix</span>
            <span className="ticker-dot">•</span>
            <span>🔥 Streak & Habit Tracking</span>
            <span className="ticker-dot">•</span>
            <span>⚡ Curated Top-Achiever Routines</span>
            <span className="ticker-dot">•</span>
            <span>🛡️ 100% Local Device Privacy</span>
            <span className="ticker-dot">•</span>
          </div>
          <div className="ticker-group" aria-hidden="true">
            <span>✨ AI Timetable Auto-Generator</span>
            <span className="ticker-dot">•</span>
            <span>🍅 Pomodoro Focus Sprints</span>
            <span className="ticker-dot">•</span>
            <span>🔒 App Blocker & Distraction Shield</span>
            <span className="ticker-dot">•</span>
            <span>🎯 Eisenhower Priority Matrix</span>
            <span className="ticker-dot">•</span>
            <span>🔥 Streak & Habit Tracking</span>
            <span className="ticker-dot">•</span>
            <span>⚡ Curated Top-Achiever Routines</span>
            <span className="ticker-dot">•</span>
            <span>🛡️ 100% Local Device Privacy</span>
            <span className="ticker-dot">•</span>
          </div>
        </div>
      </section>

      {/* SECTION: MODERN BENTO GRID */}
      <ModernBentoGrid />

      {/* SECTION: INTERACTIVE ROI / FOCUS CALCULATOR */}
      <section className="calculator-section" id="roi">
        <div className="container">
          <RoiCalculator />
        </div>
      </section>

      {/* SECTION: MODERN FEATURE COMPARISON */}
      <ModernComparison />

      {/* SECTION: FOUNDER & LEAD DEVELOPER QUOTE CARDS */}
      <section className="creators-section" id="team">
        <div className="container">
          <div className="section-head-center">
            <span className="section-pill">Our Mission</span>
            <h2 className="section-title-large">Crafted with obsessiveness.</h2>
            <p className="section-subtitle">
              We built DailyPlanner because we were exhausted by bloated tools with endless paid paywalls.
            </p>
          </div>

          <div className="creators-grid">
            <div className="creator-card">
              <div className="creator-quote-mark">“</div>
              <p className="creator-quote">
                I've always believed technology should empower us, making complex planning simpler and our goals
                attainable. DailyPlanner cuts through the constant noise of daily life so you can do what truly matters.
              </p>
              <div className="creator-profile">
                <img src="/founder.jpeg" alt="Aashish Dubey" className="creator-avatar" />
                <div>
                  <strong>Aashish Dubey</strong>
                  <span>Founder & CEO</span>
                </div>
              </div>
            </div>

            <div className="creator-card">
              <div className="creator-quote-mark">“</div>
              <p className="creator-quote">
                Every screen, timer, and micro-interaction in DailyPlanner is designed with one goal: make your day feel
                effortless. We obsess over the speed, polish, and privacy so you never have to think about it.
              </p>
              <div className="creator-profile">
                <img src="/developer.jpeg" alt="Shlok Goyal" className="creator-avatar" />
                <div>
                  <strong>Shlok Goyal</strong>
                  <span>Lead Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: REVIEWS MARQUEE */}
      <ReviewsMarquee />

      {/* SECTION: FAQ ACCORDION */}
      <FaqSection />

      {/* SECTION: FINAL GLOWING CTA */}
      <section className="final-glow-cta">
        <div className="container">
          <div className="final-cta-card">
            <div className="final-cta-ambient" aria-hidden="true" />
            <span className="section-pill">Get Started Today</span>
            <h2>Take control of your time.</h2>
            <p>
              Join over 10,000 students, creators, and professionals who start their morning with DailyPlanner.
              Completely free, with zero ads.
            </p>
            <div className="final-cta-buttons">
              <a
                href="https://play.google.com/store/apps/details?id=com.ashukaytech.daily_planner"
                className="btn-primary-gradient"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-google-play"></i>
                <span>Download for Android</span>
              </a>
              <a
                href="https://apps.apple.com/in/app/the-dailyplanner-app/id6771750050"
                className="btn-secondary-glass"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-apple"></i>
                <span>Download for iOS</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: NEWSLETTER */}
      <section className="newsletter-minimal-section">
        <div className="container">
          <div className="newsletter-minimal-card">
            <div>
              <h3>Subscribe to Weekly Focus Insights</h3>
              <p>Actionable time blocking frameworks and app updates. No spam, ever.</p>
            </div>
            <form
              className="newsletter-minimal-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing!');
              }}
            >
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn-primary-gradient">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
