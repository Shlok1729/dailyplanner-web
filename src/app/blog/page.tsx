import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: 'DailyPlanner Blog – Actionable Study & Productivity Strategies',
  description:
    'Evidence-based study timetables, deep work strategies, exam prep routines (UPSC, JEE, NEET), and focus habits for high achievers.',
  alternates: {
    canonical: 'https://www.dailyplannerapp.com/blog',
  },
  openGraph: {
    type: 'website',
    title: 'DailyPlanner Blog – Actionable Study & Productivity Strategies',
    description:
      'Evidence-based study timetables, deep work strategies, exam prep routines (UPSC, JEE, NEET), and focus habits for high achievers.',
    url: 'https://www.dailyplannerapp.com/blog',
    images: [{ url: '/hero-bg.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DailyPlanner Blog – Actionable Study & Productivity Strategies',
    description:
      'Evidence-based study timetables, deep work strategies, exam prep routines (UPSC, JEE, NEET), and focus habits for high achievers.',
    images: ['/hero-bg.png'],
  },
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
  const list = blogPosts.filter((p) => p.slug !== featured.slug);

  const categories = ['All', 'Study Strategies', 'Exam Prep', 'Focus & Habits', 'Productivity'];

  return (
    <>
      <section className="page-header" style={{ padding: '120px 20px 60px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: 'var(--primary-light)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Insights & Guides
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            DailyPlanner <span className="text-gradient-purple">Blog</span>
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-light)',
              maxWidth: '680px',
              margin: '0 auto 30px',
              lineHeight: 1.6,
            }}
          >
            Neuro-productivity blueprints, time-blocking frameworks, and exam timetables engineered to help you execute consistently.
          </p>
        </div>
      </section>

      <section className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 100px' }}>
        {/* Featured Article */}
        <Link
          href={`/blog/${featured.slug}`}
          className="blog-featured"
          style={{
            textDecoration: 'none',
            display: 'block',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(13, 11, 26, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            marginBottom: '60px',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
            }}
          >
            <div style={{ padding: 'clamp(30px, 5vw, 60px)' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--primary)',
                  color: '#fff',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <i className="fa-solid fa-star"></i> Featured Guide
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 800,
                  color: 'var(--text)',
                  lineHeight: 1.25,
                  marginBottom: '16px',
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  color: 'var(--text-light)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}
              >
                {featured.excerpt}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={featured.author.image}
                    alt={featured.author.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{featured.author.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                      {featured.date} • {featured.readTime}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    color: 'var(--primary-light)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.95rem',
                  }}
                >
                  Read Full Guide <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </div>
            <div
              style={{
                height: '100%',
                minHeight: '280px',
                backgroundImage: `url(${featured.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </Link>

        {/* Section Heading */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)' }}>
              All Articles & Blueprints
            </h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
              Showing {blogPosts.length} comprehensive guides for students and professionals.
            </p>
          </div>
        </div>

        {/* Modern Grid */}
        <div className="blog-grid-modern">
          {list.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card-modern"
              style={{
                textDecoration: 'none',
                background: 'rgba(20, 17, 38, 0.75)',
                borderColor: 'rgba(139, 92, 246, 0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="blog-card-image" style={{ height: '220px', position: 'relative' }}>
                <div
                  className="blog-card-category"
                  style={{
                    background: 'rgba(9, 7, 20, 0.9)',
                    color: 'var(--primary-light)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                >
                  {post.category}
                </div>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="blog-card-content" style={{ padding: '24px' }}>
                <h3
                  className="blog-card-title"
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: '10px',
                    color: 'var(--text)',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="blog-card-excerpt"
                  style={{
                    color: 'var(--text-light)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {post.excerpt}
                </p>
                <div className="blog-card-footer" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <span>{post.date}</span>
                  <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
