import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, BlogPost } from '@/data/blogPosts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found — DailyPlanner',
    };
  }

  const url = `https://www.dailyplannerapp.com/blog/${post.slug}`;

  return {
    title: `${post.metaTitle} | DailyPlanner`,
    description: post.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: post.metaTitle,
      description: post.metaDescription,
      url: url,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => post.relatedSlugs?.includes(p.slug)).slice(0, 3);

  // Structured Data Schema for Article and FAQs
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DailyPlanner',
      url: 'https://www.dailyplannerapp.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.dailyplannerapp.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.dailyplannerapp.com/blog/${post.slug}`,
    },
  };

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.dailyplannerapp.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.dailyplannerapp.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.dailyplannerapp.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article style={{ minHeight: '100vh', paddingBottom: '100px' }}>
        {/* Header */}
        <header
          className="post-header"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '120px 20px 40px',
            textAlign: 'center',
          }}
        >
          {/* Breadcrumbs */}
          <nav
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-light)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>
              Blog
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{post.category}</span>
          </nav>

          <div
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: 'var(--primary-light)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {post.category}
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              marginBottom: '24px',
              color: 'var(--text)',
            }}
          >
            {post.title}
          </h1>

          <div
            className="post-author"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginTop: '20px',
            }}
          >
            <img
              src={post.author.image}
              alt={post.author.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{post.author.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                {post.author.role} • {post.date} • {post.readTime}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div
          className="post-hero-img"
          style={{
            maxWidth: '1000px',
            margin: '0 auto 50px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            padding: '0 20px',
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '520px',
              objectFit: 'cover',
              borderRadius: '20px',
              display: 'block',
            }}
          />
        </div>

        {/* Post Content */}
        <div
          className="post-content"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 20px',
            fontSize: '1.12rem',
            lineHeight: 1.8,
            color: 'var(--text)',
          }}
        >
          {/* Quick Answer / AI Snippet Box */}
          {post.quickAnswer && (
            <aside
              style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(20, 17, 38, 0.85) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                borderRadius: '18px',
                padding: '24px 28px',
                marginBottom: '40px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--primary-light)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '10px',
                }}
              >
                <i className="fa-solid fa-bolt"></i> Quick Answer (Featured Summary)
              </div>
              <p
                style={{
                  fontSize: '1.08rem',
                  lineHeight: 1.65,
                  color: '#fff',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {post.quickAnswer}
              </p>
            </aside>
          )}

          {/* Intro Excerpt */}
          <p
            style={{
              fontSize: '1.22rem',
              lineHeight: 1.7,
              color: 'var(--text-light)',
              fontStyle: 'italic',
              marginBottom: '36px',
            }}
          >
            {post.excerpt}
          </p>

          {/* Sections */}
          {post.sections.map((section, idx) => (
            <section key={idx} style={{ marginBottom: '44px' }}>
              <h2
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '40px 0 18px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                }}
              >
                {section.heading}
              </h2>

              <div
                dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                style={{ lineHeight: 1.8 }}
              />

              {/* Key Points Checklist */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderLeft: '4px solid var(--primary-light)',
                    borderRadius: '0 14px 14px 0',
                    padding: '20px 24px',
                    margin: '24px 0',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: 'var(--primary-light)',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}
                  >
                    Core Principles:
                  </div>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {section.keyPoints.map((point, kIdx) => (
                      <li key={kIdx} style={{ marginBottom: '8px', color: 'var(--text)' }}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Callout box */}
              {section.callout && (
                <div
                  style={{
                    background: 'rgba(236, 72, 153, 0.08)',
                    border: '1px solid rgba(236, 72, 153, 0.25)',
                    borderRadius: '14px',
                    padding: '18px 22px',
                    margin: '24px 0',
                    color: '#fbcfe8',
                    fontSize: '1rem',
                  }}
                >
                  <i className="fa-solid fa-lightbulb" style={{ marginRight: '8px' }}></i>
                  {section.callout}
                </div>
              )}
            </section>
          ))}

          {/* Interactive Feature CTA Card */}
          <div
            style={{
              margin: '60px 0',
              padding: '40px 32px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(13, 11, 26, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(124, 58, 237, 0.3)',
                color: '#fff',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '16px',
              }}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i> 100% Free Productivity App
            </div>
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 900,
                color: '#fff',
                marginBottom: '14px',
              }}
            >
              Master Your Focus with DailyPlanner
            </h3>
            <p
              style={{
                color: 'var(--text-light)',
                maxWidth: '560px',
                margin: '0 auto 28px',
                fontSize: '1.05rem',
                lineHeight: 1.6,
              }}
            >
              Eliminate daily decision fatigue. Let DailyPlanner AI automatically schedule your focus blocks, shield you from phone distractions, and track your streaks.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.ashukaytech.daily_planner"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--primary)',
                  color: '#fff',
                  padding: '14px 26px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                <i className="fa-brands fa-google-play"></i> Get on Android
              </a>
              <a
                href="https://apps.apple.com/in/app/the-dailyplanner-app/id6771750050"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '14px 26px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                <i className="fa-brands fa-apple"></i> Get on iOS
              </a>
            </div>
          </div>

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <section style={{ marginTop: '50px' }}>
              <h2
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '24px',
                }}
              >
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {post.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    style={{
                      background: 'rgba(20, 17, 38, 0.6)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '16px',
                      padding: '20px 24px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--primary-light)',
                        marginBottom: '8px',
                      }}
                    >
                      {faq.question}
                    </h3>
                    <p style={{ color: 'var(--text-light)', margin: 0, lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Articles */}
          {related.length > 0 && (
            <section style={{ marginTop: '70px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '20px',
                }}
              >
                Recommended Next Reads
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    style={{
                      textDecoration: 'none',
                      background: 'rgba(20, 17, 38, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.15)',
                      borderRadius: '16px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--primary-light)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                        }}
                      >
                        {rel.category}
                      </div>
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#fff',
                          lineHeight: 1.4,
                          marginBottom: '12px',
                        }}
                      >
                        {rel.title}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                      {rel.readTime} • Read Guide →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
