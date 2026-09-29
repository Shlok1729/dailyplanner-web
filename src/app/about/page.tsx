import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — DailyPlanner',
  description: 'About DailyPlanner - Our mission and story.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Redefining Productivity</h1>
          <p>We believe that managing your time shouldn't take more time than doing the actual work.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="bento-grid">
          {/* Mission (Wide) */}
          <div className="bento-item bento-wide">
            <div className="bento-icon">
              <i className="fa-solid fa-rocket"></i>
            </div>
            <h3>Our Mission</h3>
            <p>
              Our mission is simple: to help you focus on what truly matters. In a world full of distractions, finding
              the time to work deeply, rest properly, and connect with loved ones can be a challenge. We use
              cutting-edge AI and intuitive design to remove the friction from planning, giving you back hours of your
              week.
            </p>
          </div>

          {/* AI Driven (Narrow) */}
          <div className="bento-item bento-narrow">
            <div className="bento-icon">
              <i className="fa-solid fa-brain"></i>
            </div>
            <h3>AI-Driven</h3>
            <p>
              We don't just give you a blank calendar. Our AI analyzes your natural energy rhythms and intelligently
              slots deep work when you're most focused, and shallow tasks when you're tired.
            </p>
          </div>

          {/* Community (Half) */}
          <div className="bento-item bento-half">
            <div className="bento-icon">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3>Community First</h3>
            <p>
              We are constantly evolving, driven by the feedback of our incredible community of students, athletes, and
              entrepreneurs. Our Curated Timetables feature was born directly from user feedback.
            </p>
          </div>

          {/* Privacy (Half) */}
          <div className="bento-item bento-half">
            <div className="bento-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3>Privacy Focused</h3>
            <p>
              Your calendar is your most private asset. We built DailyPlanner with bank-level encryption and a strict
              policy of never selling your personal scheduling data to third parties.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
