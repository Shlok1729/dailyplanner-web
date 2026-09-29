import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works — DailyPlanner',
  description: 'Learn how to maximize your daily focus and routine with DailyPlanner.',
};

export default function HowToUsePage() {
  return (
    <>
      <section className="hiw-hero">
        <div className="container">
          <h1>Master Your Day in 4 Simple Steps</h1>
          <p>
            DailyPlanner makes productivity effortless. Here is how you can transform your focus from day one.
          </p>
        </div>
      </section>

      <section className="hiw-steps">
        <div className="hiw-step">
          <div className="hiw-number">1</div>
          <div className="hiw-content">
            <h2>Download & Quick Onboarding</h2>
            <p>
              Get DailyPlanner 100% free from Google Play or the Apple App Store. No lengthy signups, no credit cards,
              and no ad clutter. Your personal assistant is ready in under 60 seconds.
            </p>
          </div>
        </div>

        <div className="hiw-step">
          <div className="hiw-number">2</div>
          <div className="hiw-content">
            <h2>Let AI Build Your Dynamic Schedule</h2>
            <p>
              Enter what you want to achieve today. DailyPlanner’s AI engine analyzes your natural energy peaks, slots
              high-leverage deep work when your mind is sharpest, and arranges shallow tasks for later in the day.
            </p>
          </div>
        </div>

        <div className="hiw-step">
          <div className="hiw-number">3</div>
          <div className="hiw-content">
            <h2>Lock In with Focus Mode</h2>
            <p>
              When it is time for deep work, activate Focus Mode. Distracting apps and notifications are muted. Work in
              timed Pomodoro sprints (25 min, 45 min, or 90 min) to maintain deep cognitive flow.
            </p>
          </div>
        </div>

        <div className="hiw-step">
          <div className="hiw-number">4</div>
          <div className="hiw-content">
            <h2>Celebrate Wins & Build Habits</h2>
            <p>
              Track your streaks, completed tasks, and focus hours in the Insights dashboard. Build momentum day after
              day with zero stress.
            </p>
          </div>
        </div>
      </section>

      <section className="hiw-cta">
        <div className="container">
          <h2>Ready to experience effortless productivity?</h2>
          <div className="hero-cta-group">
            <a
              href="https://play.google.com/store/apps/details?id=com.ashukaytech.daily_planner"
              className="btn-hero"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-google-play btn-icon"></i>
              Download for Android
            </a>
            <a
              href="https://apps.apple.com/in/app/the-dailyplanner-app/id6771750050"
              className="btn-hero btn-apple"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-apple btn-icon"></i>
              Download for iOS
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
