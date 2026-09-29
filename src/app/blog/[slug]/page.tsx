import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: 'The Power of Time Blocking — DailyPlanner Blog',
    description: 'Learn how breaking your day into dedicated time blocks can double your output and eliminate burnout.',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <article>
      <header className="post-header">
        <div className="post-meta">Productivity & Deep Work</div>
        <h1>The Power of Time Blocking: How to 10x Your Deep Work</h1>
        <div className="post-author">
          <img src="/developer.jpeg" alt="Shlok Goyal" />
          <div>
            <strong>Shlok Goyal</strong>
            <div>Lead Developer • Oct 15, 2025 • 5 min read</div>
          </div>
        </div>
      </header>

      <div className="post-hero-img">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Desk with laptop and coffee"
        />
      </div>

      <div className="post-content">
        <p>
          Ever get to the end of a busy 10-hour workday feeling like you accomplished almost nothing? You answered
          emails, jumped between Slack messages, tweaked a few slides—yet the truly important project remained
          untouched.
        </p>

        <p>
          You are not alone. Traditional to-do lists are passive. They tell you <em>what</em> needs to be done, but they
          give you zero structure on <em>when</em> to do it. That is why high-performing individuals rely on
          <strong> Time Blocking</strong>.
        </p>

        <blockquote>
          "A 40-hour time-blocked work week, I estimate, produces the same amount of output as a 60+ hour work week
          pursued without structure." — Cal Newport, author of Deep Work
        </blockquote>

        <h2>Why To-Do Lists Fail Us</h2>
        <p>
          When you operate from a simple list, every open moment forces a micro-decision: <em>What should I do now?</em>
          Under cognitive fatigue, your brain naturally defaults to the easiest task rather than the most impactful one.
        </p>
        <p>
          Time blocking solves this by making decisions in advance. Your calendar becomes a protective shield against
          interruptions and reactive busywork.
        </p>

        <h2>The 3 Golden Rules of Effective Time Blocking</h2>
        <ul>
          <li>
            <strong>1. Schedule Deep Work First:</strong> Place your most cognitively demanding 90-minute blocks during
            your morning peak hours.
          </li>
          <li>
            <strong>2. Batch Shallow Tasks:</strong> Group emails, replies, and routine updates into a single 45-minute
            block in the afternoon.
          </li>
          <li>
            <strong>3. Add Buffer Time:</strong> Leave 15–30 minutes between focus blocks for unexpected overflows and
            mental resets.
          </li>
        </ul>

        <h2>How DailyPlanner Automates This with AI</h2>
        <p>
          Creating a manual time-blocked schedule every morning can take 20 minutes of friction. DailyPlanner's
          AI assistant analyzes your priority list and automatically generates a realistic, balanced timetable aligned
          with your energy rhythm.
        </p>

        <div style={{ marginTop: '50px', padding: '30px', background: 'var(--bg-alt)', borderRadius: '16px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '12px' }}>Try AI Time Blocking Today</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
            DailyPlanner is 100% free and ready for iOS and Android.
          </p>
          <Link href="/" className="btn-hero" style={{ display: 'inline-flex' }}>
            Get DailyPlanner Free
          </Link>
        </div>
      </div>
    </article>
  );
}
