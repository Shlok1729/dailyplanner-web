'use client';

const reviews = [
  {
    stars: '★★★★★',
    text: '"Amazing app! The daily planner is super simple to use and really helps me stay organised. The reminders are accurate, the layout is clean, and it actually makes planning my day enjoyable."',
    name: 'Manav Bhardwaj',
    role: 'Google Play Review',
    avatar: 'MB',
  },
  {
    stars: '★★★★★',
    text: '"I\'ve been using this daily planner app for a while now, and it has genuinely transformed the way I organize my day. The interface is clean, simple, and extremely user-friendly."',
    name: 'Jatin Sharma',
    role: 'Google Play Review',
    avatar: 'JS',
  },
  {
    stars: '★★★★★',
    text: '"Very useful because it reminds us about our tasks and helps reduce distraction. Easy to access and understand, smooth app with secure handling. Makes me focused and productive."',
    name: 'Vishal Gulia',
    role: 'Google Play Review',
    avatar: 'VG',
  },
  {
    stars: '★★★★★',
    text: '"This app is a game changer for anyone who wants to be more productive. The AI scheduling is brilliant — it plans my day around my energy levels. Love the Pomodoro timer too!"',
    name: 'Priya Kapoor',
    role: 'Google Play Review',
    avatar: 'PK',
  },
  {
    stars: '★★★★★',
    text: '"Best planner app I\'ve used. Clean design, no ads, and the Eisenhower Matrix feature helps me prioritize what actually matters. Highly recommended for students!"',
    name: 'Arjun Thakur',
    role: 'Google Play Review',
    avatar: 'AT',
  },
  {
    stars: '★★★★☆',
    text: '"Really helpful app for managing daily tasks. The focus mode actually blocks distracting apps which is great. The AI assistant gives solid advice for planning study sessions."',
    name: 'Rohit Singh',
    role: 'Google Play Review',
    avatar: 'RS',
  },
];

export default function ReviewsMarquee() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-header">
          <span className="section-label">What Users Say</span>
          <h2 className="section-heading">Real reviews from real users</h2>
          <div className="reviews-rating-summary">
            <span className="reviews-stars">★★★★★</span>
            <span className="reviews-avg">4.8 on Google Play & App Store</span>
          </div>
        </div>
      </div>
      <div className="reviews-marquee-wrapper">
        <div className="reviews-track">
          {/* Group 1 */}
          <div className="reviews-group">
            {reviews.map((r, i) => (
              <div key={`g1-${i}`} className="review-card">
                <div className="review-stars">{r.stars}</div>
                <p className="review-text">{r.text}</p>
                <div className="review-author">
                  <div className="review-avatar">{r.avatar}</div>
                  <div className="review-author-info">
                    <strong>{r.name}</strong>
                    <span>{r.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Group 2 (Duplicate for seamless loop) */}
          <div className="reviews-group">
            {reviews.map((r, i) => (
              <div key={`g2-${i}`} className="review-card" aria-hidden="true">
                <div className="review-stars">{r.stars}</div>
                <p className="review-text">{r.text}</p>
                <div className="review-author">
                  <div className="review-avatar">{r.avatar}</div>
                  <div className="review-author-info">
                    <strong>{r.name}</strong>
                    <span>{r.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
