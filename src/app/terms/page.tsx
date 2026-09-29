import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — DailyPlanner',
  description: 'Terms and conditions for using the DailyPlanner website and mobile application.',
};

export default function TermsPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Last updated: October 2025</p>
        </div>
      </section>

      <section className="legal-container">
        <aside className="legal-sidebar">
          <h4>Table of Contents</h4>
          <div className="legal-nav">
            <a href="#acceptance">
              <i className="fa-solid fa-chevron-right"></i> Acceptance of Terms
            </a>
            <a href="#license">
              <i className="fa-solid fa-chevron-right"></i> Use License
            </a>
            <a href="#conduct">
              <i className="fa-solid fa-chevron-right"></i> User Responsibilities
            </a>
            <a href="#disclaimer">
              <i className="fa-solid fa-chevron-right"></i> Disclaimer of Warranties
            </a>
            <a href="#liability">
              <i className="fa-solid fa-chevron-right"></i> Limitation of Liability
            </a>
            <a href="#modifications">
              <i className="fa-solid fa-chevron-right"></i> Modifications
            </a>
          </div>
        </aside>

        <div className="legal-content">
          <section id="acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using DailyPlanner (via web or mobile platforms), you agree to be bound by these Terms of
              Service. If you disagree with any part of these terms, you may not use our service.
            </p>
          </section>

          <section id="license">
            <h2>2. Use License</h2>
            <p>
              Permission is granted to download and use one copy of the DailyPlanner software for personal,
              non-commercial productivity management. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section id="conduct">
            <h2>3. User Responsibilities</h2>
            <p>
              You agree not to reverse engineer, decompile, or attempt to derive the source code of the application, or
              use the service for any unlawful or prohibited activity.
            </p>
          </section>

          <section id="disclaimer">
            <h2>4. Disclaimer of Warranties</h2>
            <p>
              DailyPlanner is provided on an 'as is' and 'as available' basis without warranties of any kind, whether
              express or implied. We do not warrant that the application will be uninterrupted, error-free, or free of
              harmful components.
            </p>
          </section>

          <section id="liability">
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall DailyPlanner or AASHUKAY TECH Private Limited be liable for any indirect, incidental,
              special, or consequential damages resulting from the use or inability to use the service.
            </p>
          </section>

          <section id="modifications">
            <h2>6. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of DailyPlanner following any changes
              constitutes your acceptance of the revised terms.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
