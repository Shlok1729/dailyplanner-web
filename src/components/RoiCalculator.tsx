'use client';

import { useState } from 'react';

export default function RoiCalculator() {
  const [workHours, setWorkHours] = useState(8);
  const [distractionLevel, setDistractionLevel] = useState<'low' | 'med' | 'high'>('med');

  const distractionMultipliers = {
    low: 0.18,
    med: 0.28,
    high: 0.42,
  };

  const hoursSavedDaily = (workHours * distractionMultipliers[distractionLevel]).toFixed(1);
  const hoursSavedWeekly = (parseFloat(hoursSavedDaily) * 5).toFixed(1);
  const focusGainPercent = Math.round(distractionMultipliers[distractionLevel] * 120);
  const daysGainedYearly = Math.round((parseFloat(hoursSavedWeekly) * 48) / 8);

  return (
    <div className="roi-calculator-card">
      <div className="roi-calc-header">
        <span className="section-pill">Interactive Focus Calculator</span>
        <h3>How much time will DailyPlanner save you?</h3>
        <p>Estimate the hours you can recover every week by automating scheduling and locking in deep work.</p>
      </div>

      <div className="roi-calc-grid">
        <div className="roi-calc-controls">
          <div className="calc-control-group">
            <div className="calc-label-row">
              <label htmlFor="work-hours-slider">Daily Working Hours</label>
              <span className="calc-value-badge">{workHours} hrs / day</span>
            </div>
            <input
              id="work-hours-slider"
              type="range"
              min="4"
              max="14"
              step="1"
              value={workHours}
              onChange={(e) => setWorkHours(parseInt(e.target.value, 10))}
              className="calc-range-slider"
            />
            <div className="calc-range-ticks">
              <span>4h</span>
              <span>8h (Standard)</span>
              <span>14h</span>
            </div>
          </div>

          <div className="calc-control-group">
            <label className="calc-label-block">Current Distraction & Interruption Level</label>
            <div className="distraction-pills">
              <button
                type="button"
                className={`distraction-pill ${distractionLevel === 'low' ? 'active' : ''}`}
                onClick={() => setDistractionLevel('low')}
              >
                <span>🌱 Low</span>
                <small>Few notifications</small>
              </button>
              <button
                type="button"
                className={`distraction-pill ${distractionLevel === 'med' ? 'active' : ''}`}
                onClick={() => setDistractionLevel('med')}
              >
                <span>⚡ Medium</span>
                <small>Regular pings & tabs</small>
              </button>
              <button
                type="button"
                className={`distraction-pill ${distractionLevel === 'high' ? 'active' : ''}`}
                onClick={() => setDistractionLevel('high')}
              >
                <span>🔥 High</span>
                <small>Constant multitasking</small>
              </button>
            </div>
          </div>
        </div>

        <div className="roi-calc-results">
          <div className="result-metric-card primary">
            <span className="result-metric-label">Weekly Hours Reclaimed</span>
            <div className="result-metric-number">
              +{hoursSavedWeekly}
              <span className="unit">hrs/wk</span>
            </div>
            <p className="result-metric-subtext">Equivalent to getting an extra half-workday back every week.</p>
          </div>

          <div className="result-metric-row">
            <div className="result-metric-card">
              <span className="result-metric-label">Focus State Increase</span>
              <div className="result-metric-number">+{focusGainPercent}%</div>
              <p className="result-metric-subtext">Deeper flow sessions</p>
            </div>
            <div className="result-metric-card">
              <span className="result-metric-label">Productive Days / Year</span>
              <div className="result-metric-number">+{daysGainedYearly}</div>
              <p className="result-metric-subtext">Free days gained</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
