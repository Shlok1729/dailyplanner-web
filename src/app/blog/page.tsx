import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — DailyPlanner',
  description: 'Insights, tips, and strategies for a more focused and productive life.',
};

export const blogPosts = [
  {
    slug: 'time-blocking-deep-work',
    title: 'The Power of Time Blocking: How to 10x Your Deep Work',
    excerpt: 'Discover how breaking your day into dedicated time blocks can double your output and reduce decision fatigue.',
    category: 'Productivity',
    date: 'Oct 15, 2025',
    readTime: '5 min read',
    featured: true,
  },
  {
    slug: 'eliminate-distractions',
    title: 'How to Eliminate Distractions',
    excerpt: 'A comprehensive guide to creating a distraction-free environment for intense, focused work sessions.',
    category: 'Deep Work',
    date: 'Oct 10, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'perfect-morning-routine',
    title: 'Building the Perfect Morning Routine',
    excerpt: 'Learn how the world’s most successful people start their mornings, and how you can apply their strategies.',
    category: 'Habits',
    date: 'Oct 05, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506784926709-22f1ec395907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'ai-curated-timetables',
    title: 'Introducing AI Curated Timetables',
    excerpt: 'We have launched a new feature that lets you browse and adopt the routines of top achievers.',
    category: 'Product Updates',
    date: 'Sep 28, 2025',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
  const list = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>DailyPlanner Blog</h1>
          <p>Insights, tips, and strategies for a more productive and intentional life.</p>
        </div>
      </section>

      <section className="page-content">
        {/* Featured Article */}
        <Link href={`/blog/${featured.slug}`} className="blog-featured" style={{ textDecoration: 'none' }}>
          <div className="blog-featured-content">
            <div className="blog-featured-meta">Featured Article</div>
            <h2 className="blog-featured-title">{featured.title}</h2>
            <p className="blog-featured-excerpt">{featured.excerpt}</p>
            <span className="nav-cta">
              Read Article <i className="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </Link>

        <div className="blog-grid-modern">
          {list.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card-modern"
              style={{ textDecoration: 'none' }}
            >
              <div className="blog-card-image">
                <div className="blog-card-category">{post.category}</div>
                {post.image && <img src={post.image} alt={post.title} loading="lazy" />}
              </div>
              <div className="blog-card-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
