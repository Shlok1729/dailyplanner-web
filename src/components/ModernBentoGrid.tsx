'use client';

import { useState } from 'react';

export default function ModernBentoGrid() {
  const [energyTime, setEnergyTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [focusShieldActive, setFocusShieldActive] = useState(true);
  const [activeQuadrant, setActiveQuadrant] = useState<'do' | 'decide' | 'delegate' | 'delete'>('do');

  const energySchedules = {
    morning: {
      time: '9:00 AM – 11:30 AM',
      title: 'Deep Architecture & Coding',
      level: 'Peak Focus (95%)',
      color: '#6366f1',
      icon: '🧠',
      tip: 'AI detected peak cognitive stamina. Deep work placed here.',
    },
    afternoon: {
      time: '1:30 PM – 3:30 PM',
      title: 'Team Sync & Client Reviews',
      level: 'Collaborative Energy (68%)',
      color: '#8b5cf6',
      icon: '👥',
      tip: 'Energy dipping slightly. Optimal for shared context and meetings.',
    },
    evening: {
      time: '5:00 PM – 6:30 PM',
      title: 'Task Review & Daily Reflection',
      level: 'Wind Down & Habits (45%)',
      color: '#ec4899',
      icon: '✨',
      tip: 'Low cognitive friction tasks to close your day stress-free.',
    },
  };

  const selectedEnergy = energySchedules[energyTime];

  return (
    <section className="modern-bento-section" id="features">
      <div className="container">
        <div className="section-head-center">
          <span className="section-pill">Engineered for Deep Flow</span>
          <h2 className="section-title-large">Everything you need to master your day.</h2>
          <p className="section-subtitle">
            Say goodbye to chaotic to-do lists. DailyPlanner aligns your tasks with your biological rhythm and protects
            your attention.
          </p>
        </div>

        <div className="modern-bento-grid">
          {/* BENTO 1: AI ENERGY SCHEDULING (Wide 2-col) */}
          <div className="bento-box bento-span-2">
            <div className="bento-box-header">
              <div className="bento-badge-icon purple">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <span className="bento-tag">AI Timetable Generator</span>
            </div>
            <h3>Intelligent Energy Matching</h3>
            <p>
              Your brain isn't equally sharp at 9 AM and 3 PM. Our engine analyzes your energy curve and automatically
              slots high-leverage deep work when you are at your best.
            </p>

            <div className="energy-interactive-widget">
              <div className="energy-tabs">
                <button
                  type="button"
                  className={`energy-tab ${energyTime === 'morning' ? 'active' : ''}`}
                  onClick={() => setEnergyTime('morning')}
                >
                  🌅 Morning (Peak)
                </button>
                <button
                  type="button"
                  className={`energy-tab ${energyTime === 'afternoon' ? 'active' : ''}`}
                  onClick={() => setEnergyTime('afternoon')}
                >
                  ☀️ Afternoon (Mid)
                </button>
                <button
                  type="button"
                  className={`energy-tab ${energyTime === 'evening' ? 'active' : ''}`}
                  onClick={() => setEnergyTime('evening')}
                >
                  🌙 Evening (Low)
                </button>
              </div>

              <div className="energy-card-preview" style={{ borderColor: selectedEnergy.color }}>
                <div className="ec-header">
                  <span className="ec-icon">{selectedEnergy.icon}</span>
                  <div className="ec-meta">
                    <span className="ec-time">{selectedEnergy.time}</span>
                    <strong className="ec-title">{selectedEnergy.title}</strong>
                  </div>
                  <span className="ec-pill" style={{ background: `${selectedEnergy.color}25`, color: selectedEnergy.color }}>
                    {selectedEnergy.level}
                  </span>
                </div>
                <div className="ec-footer">
                  <i className="fa-solid fa-sparkles"></i>
                  <span>{selectedEnergy.tip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO 2: DISTRACTION SHIELD & APP BLOCK */}
          <div className="bento-box">
            <div className="bento-box-header">
              <div className="bento-badge-icon red">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <span className="bento-tag">Distraction Shield</span>
            </div>
            <h3>Lock In & App Blocker</h3>
            <p>During active focus sessions, distracting apps and notifications are firmly silenced.</p>

            <div className="shield-widget">
              <div className="shield-toggle-row">
                <span>Focus Shield</span>
                <button
                  type="button"
                  className={`toggle-switch ${focusShieldActive ? 'on' : 'off'}`}
                  onClick={() => setFocusShieldActive(!focusShieldActive)}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>

              <div className="blocked-apps-list">
                <div className={`blocked-app-item ${focusShieldActive ? 'blocked' : 'allowed'}`}>
                  <span>📸 Instagram</span>
                  <span className="status-label">{focusShieldActive ? 'BLOCKED' : 'ALLOWED'}</span>
                </div>
                <div className={`blocked-app-item ${focusShieldActive ? 'blocked' : 'allowed'}`}>
                  <span>▶️ YouTube</span>
                  <span className="status-label">{focusShieldActive ? 'BLOCKED' : 'ALLOWED'}</span>
                </div>
                <div className={`blocked-app-item ${focusShieldActive ? 'blocked' : 'allowed'}`}>
                  <span>✖️ X / Twitter</span>
                  <span className="status-label">{focusShieldActive ? 'BLOCKED' : 'ALLOWED'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO 3: EISENHOWER MATRIX */}
          <div className="bento-box">
            <div className="bento-box-header">
              <div className="bento-badge-icon blue">
                <i className="fa-solid fa-table-cells-large"></i>
              </div>
              <span className="bento-tag">Priority Framework</span>
            </div>
            <h3>Eisenhower Matrix</h3>
            <p>Sort tasks by urgency vs importance so you stop letting noise drown out your real goals.</p>

            <div className="mini-matrix-grid">
              <div
                className={`matrix-box do ${activeQuadrant === 'do' ? 'active' : ''}`}
                onClick={() => setActiveQuadrant('do')}
              >
                <div className="mb-label">1. DO FIRST</div>
                <div className="mb-task">Critical Milestone</div>
              </div>
              <div
                className={`matrix-box decide ${activeQuadrant === 'decide' ? 'active' : ''}`}
                onClick={() => setActiveQuadrant('decide')}
              >
                <div className="mb-label">2. SCHEDULE</div>
                <div className="mb-task">Strategy & Health</div>
              </div>
              <div
                className={`matrix-box delegate ${activeQuadrant === 'delegate' ? 'active' : ''}`}
                onClick={() => setActiveQuadrant('delegate')}
              >
                <div className="mb-label">3. DELEGATE</div>
                <div className="mb-task">Routine Replies</div>
              </div>
              <div
                className={`matrix-box delete ${activeQuadrant === 'delete' ? 'active' : ''}`}
                onClick={() => setActiveQuadrant('delete')}
              >
                <div className="mb-label">4. ELIMINATE</div>
                <div className="mb-task">Mindless Feeds</div>
              </div>
            </div>
          </div>

          {/* BENTO 4: CURATED TIMETABLES */}
          <div className="bento-box bento-span-2">
            <div className="bento-box-header">
              <div className="bento-badge-icon green">
                <i className="fa-solid fa-fire"></i>
              </div>
              <span className="bento-tag">Curated Routines</span>
            </div>
            <h3>Adopt Habits of Top Achievers</h3>
            <p>
              Browse vetted daily schedules from world-class athletes, high-scoring students, and visionary founders.
              One tap applies their proven time blocks directly to your day.
            </p>

            <div className="routines-showcase-row">
              <div className="routine-card-item">
                <div className="rc-badge athlete">Athlete</div>
                <h4>Morning High-Performance</h4>
                <p>Early conditioning, nutrition blocks, and deep mental recovery.</p>
                <span className="rc-users">🔥 12,500+ using</span>
              </div>
              <div className="routine-card-item">
                <div className="rc-badge founder">Founder</div>
                <h4>CEO Deep Output</h4>
                <p>90-min uninterrupted deep block before 10 AM, zero reactive emails.</p>
                <span className="rc-users">🔥 9,800+ using</span>
              </div>
              <div className="routine-card-item">
                <div className="rc-badge topper">Academic</div>
                <h4>Active Recall & Spacing</h4>
                <p>Feynman technique intervals with Pomodoro sprint pacing.</p>
                <span className="rc-users">🔥 14,200+ using</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
