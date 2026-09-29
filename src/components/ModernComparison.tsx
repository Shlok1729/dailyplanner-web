'use client';

export default function ModernComparison() {
  const comparisonData = [
    {
      feature: 'AI Energy-Adaptive Scheduling',
      dailyPlanner: 'Included (Automatic)',
      others: 'Manual or None',
      highlight: true,
    },
    {
      feature: 'Focus Mode & App Blocker',
      dailyPlanner: 'Built-in (Mutes Apps)',
      others: 'Requires 3rd-party apps',
      highlight: true,
    },
    {
      feature: 'Pomodoro Sprint Cycles',
      dailyPlanner: 'Built-in with Sound & Ring',
      others: 'Paid upgrade / Add-on',
      highlight: false,
    },
    {
      feature: 'Eisenhower Priority Matrix',
      dailyPlanner: 'Instant 4-Quadrant View',
      others: 'Complex custom templates',
      highlight: false,
    },
    {
      feature: 'Curated Routines (Athletes & CEOs)',
      dailyPlanner: '1-Tap Apply',
      others: 'None',
      highlight: true,
    },
    {
      feature: 'Privacy & Local Device Storage',
      dailyPlanner: '100% Private on Device',
      others: 'Cloud tracking / Sold data',
      highlight: false,
    },
    {
      feature: 'Pricing',
      dailyPlanner: '100% FREE FOREVER',
      others: '₹250 – ₹860 / month',
      highlight: true,
      priceRow: true,
    },
  ];

  return (
    <section className="modern-comparison-section" id="comparison">
      <div className="container">
        <div className="section-head-center">
          <span className="section-pill">The Smart Choice</span>
          <h2 className="section-title-large">Why DailyPlanner stands out.</h2>
          <p className="section-subtitle">
            Most productivity tools make you spend more time managing tasks than actually doing them. We fixed that.
          </p>
        </div>

        <div className="modern-comparison-table-wrap">
          <table className="modern-table">
            <thead>
              <tr>
                <th className="th-feature">Feature</th>
                <th className="th-dailyplanner highlight">
                  <div className="app-badge-col">
                    <img src="/logo.png" alt="DailyPlanner" className="table-app-icon" />
                    <div>
                      <strong>DailyPlanner</strong>
                      <span className="table-badge-free">100% Free</span>
                    </div>
                  </div>
                </th>
                <th className="th-competitors">Other Apps (Todoist / TickTick / Notion)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={row.priceRow ? 'price-highlight-row' : ''}>
                  <td className="td-feature-title">{row.feature}</td>
                  <td className="td-dailyplanner highlight">
                    <span className="check-pill">
                      <i className="fa-solid fa-check"></i>
                      {row.dailyPlanner}
                    </span>
                  </td>
                  <td className="td-competitors">
                    <span className="cross-pill">
                      {row.priceRow ? (
                        <span className="expensive-price">{row.others}</span>
                      ) : (
                        <>
                          <i className="fa-solid fa-xmark"></i>
                          {row.others}
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
