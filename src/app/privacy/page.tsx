import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — DailyPlanner',
  description: 'Learn how DailyPlanner protects your data with local storage and strict privacy principles.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: October 2025</p>
        </div>
      </section>

      <section className="legal-container">
        <aside className="legal-sidebar">
          <h4>Table of Contents</h4>
          <div className="legal-nav">
            <a href="#info-collect">
              <i className="fa-solid fa-chevron-right"></i> Information We Collect
            </a>
            <a href="#info-use">
              <i className="fa-solid fa-chevron-right"></i> How We Use Information
            </a>
            <a href="#data-storage">
              <i className="fa-solid fa-chevron-right"></i> Data Storage & Security
            </a>
            <a href="#third-parties">
              <i className="fa-solid fa-chevron-right"></i> Third-Party Services
            </a>
            <a href="#user-rights">
              <i className="fa-solid fa-chevron-right"></i> Your Rights
            </a>
            <a href="#contact">
              <i className="fa-solid fa-chevron-right"></i> Contact Us
            </a>
          </div>
        </aside>

        <div className="legal-content">
          <section id="info-collect">
            <h2>1. Information We Collect</h2>
            <p>
              DailyPlanner is designed with a privacy-first architecture. Your personal tasks, daily routines, habits,
              and focus statistics remain stored locally on your device. We do not maintain server-side databases of
              your personal scheduling items.
            </p>
            <p>
              Optional non-identifiable diagnostic metrics (such as crash logs and app performance) may be processed
              anonymously to maintain software stability.
            </p>
          </section>

          <section id="info-use">
            <h2>2. How We Use Information</h2>
            <p>Any local data processed on your device is used solely to:</p>
            <ul>
              <li>Generate and adapt your daily schedules using our AI recommendation engine.</li>
              <li>Calculate your focus streaks, task completion rates, and Pomodoro statistics.</li>
              <li>Deliver local push notifications and task reminders that you have configured.</li>
            </ul>
          </section>

          <section id="data-storage">
            <h2>3. Data Storage & Security</h2>
            <p>
              We prioritize device-level security. Your data stays on your smartphone and is never shared, auctioned, or
              monetized for advertising purposes.
            </p>
          </section>

          <section id="third-parties">
            <h2>4. Third-Party Services</h2>
            <p>
              DailyPlanner integrates with Apple App Store and Google Play Store services for distribution and app
              updates. These platforms may collect standard app download and store engagement metrics in accordance
              with their respective privacy policies.
            </p>
          </section>

          <section id="user-rights">
            <h2>5. Your Rights</h2>
            <p>
              Because your data is stored locally, you maintain total control. Clearing your app cache, deleting the
              app, or resetting tasks completely wipes all stored data from your device immediately.
            </p>
          </section>

          <section id="contact">
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions or feedback regarding our privacy practices, please contact our team at{' '}
              <a href="mailto:support@dailyplanner.app">support@dailyplanner.app</a>.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
