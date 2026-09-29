'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';

interface Task {
  id: number;
  name: string;
  time: string;
  completed: boolean;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function InteractiveDemo() {
  const [activeScreen, setActiveScreen] = useState<
    'home' | 'tasks' | 'focus' | 'timer' | 'assistant' | 'schedule' | 'insights' | 'matrix' | 'menu'
  >('home');

  // Tasks State
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Morning workout', time: '8:00 AM', completed: false },
    { id: 2, name: 'Deep work session', time: '10:00 AM', completed: false },
    { id: 3, name: 'Team meeting', time: '2:00 PM', completed: false },
  ]);

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('09:00');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Focus & Timer State
  const [focusStats, setFocusStats] = useState({ sessionsToday: 0, sessionsWeek: 2, streak: 3 });
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerTotal, setTimerTotal] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hi! 👋 I'm your productivity assistant. I can help plan your day. Try asking \"plan my day\"!",
      time: 'Now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Dynamic Greeting and Date
  const [greeting, setGreeting] = useState('Good Morning');
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    setCurrentDateStr(new Date().toLocaleDateString('en-US', options));
  }, []);

  // Timer Interval Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timerSeconds === 0) {
      setIsTimerRunning(false);
      setFocusStats((prev) => ({
        ...prev,
        sessionsToday: prev.sessionsToday + 1,
        sessionsWeek: prev.sessionsWeek + 1,
      }));
      setActiveScreen('focus');
      setIsDownloadModalOpen(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Tasks actions
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!newTaskName.trim()) return;

    // Convert time to 12h format if needed
    let formattedTime = newTaskTime;
    try {
      const [h, m] = newTaskTime.split(':');
      const hourNum = parseInt(h, 10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const formattedH = hourNum % 12 || 12;
      formattedTime = `${formattedH}:${m} ${ampm}`;
    } catch {
      formattedTime = newTaskTime;
    }

    const newTask: Task = {
      id: Date.now(),
      name: newTaskName.trim(),
      time: formattedTime,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskName('');
    setIsTaskModalOpen(false);
  };

  // Timer actions
  const startSession = (minutes: number) => {
    const mins = minutes || 25;
    setSelectedDuration(mins);
    setTimerTotal(mins * 60);
    setTimerSeconds(mins * 60);
    setIsTimerRunning(true);
    setActiveScreen('timer');
  };

  const formatTimerDigits = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return {
      min: String(m).padStart(2, '0'),
      sec: String(s).padStart(2, '0'),
    };
  };

  // Chat actions
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I'm here to keep you on track! Try asking 'plan my day' or 'start focus mode'.";
      const lower = text.toLowerCase();

      if (lower.includes('plan') || lower.includes('day') || lower.includes('schedule')) {
        reply = "📋 Here's your optimized schedule:\n• 9:00 AM: Deep Work (high focus)\n• 11:30 AM: Review & Messages\n• 2:00 PM: Meetings & Team tasks\n• 4:30 PM: Wrap-up & Tomorrow's plan!";
      } else if (lower.includes('focus') || lower.includes('timer') || lower.includes('pomodoro')) {
        reply = "⏱️ Ready to focus? I recommend a 25-minute Pomodoro sprint. I can block notifications for you!";
      } else if (lower.includes('matrix') || lower.includes('priority')) {
        reply = "🎯 Eisenhower Matrix helps you divide tasks into Urgent vs Important. Start with quadrant 1 (Do Now) to eliminate stress!";
      } else if (lower.includes('streak') || lower.includes('done') || lower.includes('stats')) {
        reply = `🔥 You're currently on a ${focusStats.streak}-day streak with ${focusStats.sessionsToday} sessions finished today. Outstanding work!`;
      } else if (lower.includes('hello') || lower.includes('hi')) {
        reply = "Hello! 👋 Ready to conquer your day? What would you like to accomplish?";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  // Calculations
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const timerDigits = formatTimerDigits(timerSeconds);

  // SVG Progress calculation for Timer (radius = 85, circum = 2 * PI * 85 ~= 534)
  const timerCircumference = 2 * Math.PI * 85;
  const timerProgress = timerTotal > 0 ? (timerSeconds / timerTotal) * timerCircumference : 0;

  // Home ring circumference (radius = 40, circum = 2 * PI * 40 ~= 251.32)
  const homeRingCircumference = 2 * Math.PI * 40;
  const homeRingProgress = (progressPercent / 100) * homeRingCircumference;

  return (
    <>
      <div className="phone-mockup" id="phone-demo">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          {/* Real Mobile Status Bar */}
          <div className="phone-status-bar">
            <div className="status-left">
              <span className="status-time">4:24</span>
              <span className="status-wifi-dot">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2zm0-10h2v8h-2z" />
                </svg>
              </span>
            </div>
            <div className="status-right">
              <span className="status-cell">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="16" width="3" height="6" rx="1" />
                  <rect x="7" y="12" width="3" height="10" rx="1" />
                  <rect x="12" y="8" width="3" height="14" rx="1" />
                  <rect x="17" y="4" width="3" height="18" rx="1" />
                </svg>
              </span>
              <span className="status-network-type">5G</span>
              <div className="status-battery-pill">
                <span className="battery-val">20</span>
              </div>
            </div>
          </div>

          {/* SCREEN: HOME (1:1 with Real App Screenshot) */}
          {activeScreen === 'home' && (
            <div className="app-screen active app-screen-home" data-screen="home">
              {/* Header */}
              <div className="app-header-home-real">
                <button
                  className="header-icon-btn-round"
                  onClick={() => setActiveScreen('menu')}
                  aria-label="Menu"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="4" y1="7" x2="20" y2="7"></line>
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="17" x2="20" y2="17"></line>
                  </svg>
                </button>
                <div className="greeting-block-real">
                  <span className="greeting-time-real">{greeting}</span>
                  <span className="greeting-name-real">Shlok</span>
                </div>
                <button
                  className="header-icon-btn-square"
                  onClick={() => setActiveScreen('schedule')}
                  aria-label="Schedule"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </button>
              </div>

              {/* Daily Overview Heading */}
              <div className="app-section-title-wrap">
                <h3 className="app-main-heading">Daily Overview</h3>
              </div>

              {/* Your Activity Card */}
              <div className="activity-card-real">
                <div className="ac-top-pills">
                  <div className="ac-date-pill">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Tuesday, Sep 29</span>
                  </div>

                  <button
                    className="ac-plan-pill"
                    onClick={() => setIsTaskModalOpen(true)}
                  >
                    <span>📅 Plan Day ✍️</span>
                  </button>
                </div>

                <div className="ac-body-row">
                  <div className="ac-left-info">
                    <h4 className="ac-title">Your Activity</h4>
                    <p className="ac-subtext">No tasks scheduled for today</p>

                    <div className="ac-status-pills">
                      <div className="ac-stat-chip done">
                        <div className="ac-chip-icon done">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <div className="ac-chip-text">
                          <strong>{completedCount}</strong>
                          <small>Done</small>
                        </div>
                      </div>

                      <div className="ac-stat-chip todo">
                        <div className="ac-chip-icon todo">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
                          </svg>
                        </div>
                        <div className="ac-chip-text">
                          <strong>{pendingCount}</strong>
                          <small>Todo</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ac-gauge-wrap">
                    <div className="ac-circular-gauge">
                      <svg className="gauge-svg" viewBox="0 0 80 80">
                        <circle className="gauge-bg" cx="40" cy="40" r="32"></circle>
                        <circle
                          className="gauge-bar"
                          cx="40"
                          cy="40"
                          r="32"
                          style={{
                            strokeDasharray: 201,
                            strokeDashoffset: 201 - (progressPercent / 100) * 201,
                          }}
                        ></circle>
                      </svg>
                      <div className="gauge-center">
                        <strong>{progressPercent}%</strong>
                        <span>Score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Curated Routines Section */}
              <div className="app-section-header-row">
                <h3 className="app-main-heading">Curated Routines</h3>
                <button
                  className="app-view-all-btn"
                  onClick={() => setActiveScreen('schedule')}
                >
                  View All
                </button>
              </div>

              {/* Horizontal Routines Carousel */}
              <div className="routines-carousel-container">
                <div className="routines-carousel-track">
                  {/* Sundar Pichai */}
                  <div
                    className="routine-card-item-modern"
                    onClick={() => {
                      setTasks([
                        { id: 1, name: 'Morning tea & reflection', time: '6:30 AM', completed: true },
                        { id: 2, name: 'Wall Street Journal review', time: '7:15 AM', completed: false },
                        { id: 3, name: 'Strategic non-reactive block', time: '9:00 AM', completed: false },
                      ]);
                      setIsDownloadModalOpen(true);
                    }}
                  >
                    <div className="rc-image-banner sundar">
                      <span className="rc-category-badge">BILLIONAIRE</span>
                      <div className="rc-banner-overlay">
                        <h4>Sundar Pichai</h4>
                      </div>
                    </div>
                    <div className="rc-footer-details">
                      <div className="rc-routine-name">The Non-Reactive Morning</div>
                      <div className="rc-stats-badges">
                        <span>🔥 310.0K</span>
                        <span>⭐ 4.8</span>
                        <span>⏱ 81%</span>
                      </div>
                    </div>
                  </div>

                  {/* MrBeast Mode */}
                  <div
                    className="routine-card-item-modern"
                    onClick={() => {
                      setTasks([
                        { id: 1, name: 'Brainstorm viral concepts', time: '8:00 AM', completed: false },
                        { id: 2, name: 'Thumbnail and hook sprint', time: '10:30 AM', completed: false },
                        { id: 3, name: 'Production deep dive', time: '2:00 PM', completed: false },
                      ]);
                      setIsDownloadModalOpen(true);
                    }}
                  >
                    <div className="rc-image-banner mrbeast">
                      <span className="rc-category-badge">CREATOR</span>
                      <div className="rc-banner-overlay">
                        <h4>MrBeast Mode</h4>
                      </div>
                    </div>
                    <div className="rc-footer-details">
                      <div className="rc-routine-name">Hyper-Focus Sprints</div>
                      <div className="rc-stats-badges">
                        <span>🔥 450.0K</span>
                        <span>⭐ 4.9</span>
                        <span>⏱ 92%</span>
                      </div>
                    </div>
                  </div>

                  {/* Elon Musk */}
                  <div
                    className="routine-card-item-modern"
                    onClick={() => {
                      setTasks([
                        { id: 1, name: 'Critical engineering sprint', time: '9:00 AM', completed: false },
                        { id: 2, name: 'Factory floor walk', time: '1:00 PM', completed: false },
                        { id: 3, name: 'Product architecture review', time: '4:30 PM', completed: false },
                      ]);
                      setIsDownloadModalOpen(true);
                    }}
                  >
                    <div className="rc-image-banner elon">
                      <span className="rc-category-badge">BILLIONAIRE</span>
                      <div className="rc-banner-overlay">
                        <h4>Elon Musk</h4>
                      </div>
                    </div>
                    <div className="rc-footer-details">
                      <div className="rc-routine-name">The 5-Minute Block Method</div>
                      <div className="rc-stats-badges">
                        <span>🔥 520.0K</span>
                        <span>⭐ 4.6</span>
                        <span>⏱ 62%</span>
                      </div>
                    </div>
                  </div>

                  {/* Cristiano Ronaldo */}
                  <div
                    className="routine-card-item-modern"
                    onClick={() => {
                      setTasks([
                        { id: 1, name: 'Hydration & 90-min sleep cycle', time: '7:00 AM', completed: true },
                        { id: 2, name: 'High-intensity conditioning', time: '9:30 AM', completed: false },
                        { id: 3, name: 'Recovery & nutrition block', time: '1:00 PM', completed: false },
                      ]);
                      setIsDownloadModalOpen(true);
                    }}
                  >
                    <div className="rc-image-banner ronaldo">
                      <span className="rc-category-badge">ATHLETE</span>
                      <div className="rc-banner-overlay">
                        <h4>Ronaldo Framework</h4>
                      </div>
                    </div>
                    <div className="rc-footer-details">
                      <div className="rc-routine-name">Polyphasic Sleep System</div>
                      <div className="rc-stats-badges">
                        <span>🔥 201.0K</span>
                        <span>⭐ 4.6</span>
                        <span>⏱ 71%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Action Button (+) */}
              <button
                className="app-floating-action-btn"
                onClick={() => setIsTaskModalOpen(true)}
                aria-label="Add new task"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          )}

          {/* SCREEN: ALL TASKS */}
          {activeScreen === 'tasks' && (
            <div className="app-screen active" data-screen="tasks">
              <div className="app-header-inner">
                <button className="back-btn" onClick={() => setActiveScreen('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="header-title">All Tasks</h2>
                <button className="icon-btn" onClick={() => setIsTaskModalOpen(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>

              <div className="tasks-stats-bar">
                <div className="task-stat-chip">
                  <span className="chip-dot completed"></span>
                  <span>{completedCount} Completed</span>
                </div>
                <div className="task-stat-chip">
                  <span className="chip-dot pending"></span>
                  <span>{pendingCount} Pending</span>
                </div>
              </div>

              <div className="full-tasks-list">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="task-checkbox">
                      {task.completed && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <div className="task-info">
                      <span className="task-name">{task.name}</span>
                      <span className="task-time">{task.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="fab"
                onClick={() => setIsTaskModalOpen(true)}
                aria-label="Add Task"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          )}

          {/* SCREEN: FOCUS */}
          {activeScreen === 'focus' && (
            <div className="app-screen active" data-screen="focus">
              <div className="app-header-inner">
                <button className="back-btn" onClick={() => setActiveScreen('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="header-title">Focus Mode</h2>
                <div className="header-actions"></div>
              </div>
              <div className="focus-hero">
                <div className="focus-icon-large">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3 className="focus-headline">Time to Focus</h3>
                <p className="focus-subtext">Choose your session type</p>
              </div>
              <div className="focus-stats-row">
                <div className="focus-stat-card">
                  <span className="fs-value">{focusStats.sessionsToday}</span>
                  <span className="fs-label">Today</span>
                </div>
                <div className="focus-stat-card">
                  <span className="fs-value">{focusStats.sessionsWeek}</span>
                  <span className="fs-label">This Week</span>
                </div>
                <div className="focus-stat-card">
                  <span className="fs-value">{focusStats.streak}</span>
                  <span className="fs-label">Streak 🔥</span>
                </div>
              </div>
              <div className="session-section">
                <h4 className="session-heading">Session Type</h4>
                <div className="session-grid">
                  <button
                    className={`session-card ${selectedDuration === 25 ? 'selected' : ''}`}
                    onClick={() => startSession(25)}
                  >
                    <div className="session-icon">🍅</div>
                    <span className="session-name">Pomodoro</span>
                    <span className="session-desc">25 min</span>
                  </button>
                  <button
                    className={`session-card ${selectedDuration === 90 ? 'selected' : ''}`}
                    onClick={() => startSession(90)}
                  >
                    <div className="session-icon">🧠</div>
                    <span className="session-name">Deep Work</span>
                    <span className="session-desc">90 min</span>
                  </button>
                  <button
                    className={`session-card ${selectedDuration === 15 ? 'selected' : ''}`}
                    onClick={() => startSession(15)}
                  >
                    <div className="session-icon">⚡</div>
                    <span className="session-name">Quick</span>
                    <span className="session-desc">15 min</span>
                  </button>
                  <button
                    className={`session-card ${selectedDuration === 45 ? 'selected' : ''}`}
                    onClick={() => startSession(45)}
                  >
                    <div className="session-icon">⚙️</div>
                    <span className="session-name">Standard</span>
                    <span className="session-desc">45 min</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: TIMER */}
          {activeScreen === 'timer' && (
            <div className="app-screen active" data-screen="timer">
              <div className="timer-container">
                <div className="timer-status-badge">🔒 FOCUS ACTIVE</div>
                <div className="timer-visual">
                  <svg className="timer-ring-svg" viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <circle className="timer-ring-bg" cx="100" cy="100" r="85" />
                    <circle
                      className="timer-ring-progress"
                      id="timer-ring-fill"
                      cx="100"
                      cy="100"
                      r="85"
                      style={{
                        strokeDasharray: timerCircumference,
                        strokeDashoffset: timerCircumference - timerProgress,
                      }}
                    />
                  </svg>
                  <div className="timer-lock-icon">🔒</div>
                </div>
                <div className="timer-digits">
                  <span className="timer-num">{timerDigits.min}</span>
                  <span className="timer-colon">:</span>
                  <span className="timer-num">{timerDigits.sec}</span>
                </div>
                <div className="timer-labels">
                  <span>MIN</span>
                  <span>SEC</span>
                </div>
                <div className="timer-controls">
                  <button
                    className="timer-control-btn"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    {isTimerRunning ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>
                  <button
                    className="timer-control-btn outline"
                    onClick={() => {
                      setIsTimerRunning(false);
                      setActiveScreen('focus');
                    }}
                  >
                    GIVE UP
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: AI ASSISTANT */}
          {activeScreen === 'assistant' && (
            <div className="app-screen active" data-screen="assistant">
              <div className="app-header-inner">
                <div className="assistant-avatar-block">
                  <div className="avatar-circle">🤖</div>
                  <div className="avatar-info">
                    <span className="avatar-name">AI Assistant</span>
                    <span className="avatar-status">
                      <span className="status-dot"></span>Online
                    </span>
                  </div>
                </div>
                <button className="icon-btn" onClick={() => setActiveScreen('home')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div className="chat-messages" ref={chatScrollRef}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg ${msg.sender}`}>
                    <div className="msg-avatar">{msg.sender === 'bot' ? '🤖' : '👤'}</div>
                    <div className="msg-content">
                      <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                      <span className="msg-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-msg bot">
                    <div className="msg-avatar">🤖</div>
                    <div className="msg-content typing">
                      <span>•</span>
                      <span>•</span>
                      <span>•</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick suggestions pills */}
              <div style={{ padding: '4px 10px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                <button
                  type="button"
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSendMessage('Plan my day')}
                >
                  ✨ Plan my day
                </button>
                <button
                  type="button"
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSendMessage('Start focus mode')}
                >
                  ⏱️ Focus tips
                </button>
                <button
                  type="button"
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSendMessage('Explain Eisenhower Matrix')}
                >
                  🎯 Priority
                </button>
              </div>

              <div className="chat-input-bar">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  autoComplete="off"
                />
                <button className="send-btn" onClick={() => handleSendMessage()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN: SCHEDULE / CALENDAR */}
          {activeScreen === 'schedule' && (
            <div className="app-screen active" data-screen="schedule">
              <div className="app-header-inner">
                <button className="back-btn" onClick={() => setActiveScreen('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="header-title">Schedule</h2>
                <div className="header-actions"></div>
              </div>
              <div className="calendar-strip">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div
                    key={day}
                    className={`cal-day ${i === 1 ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '6px 4px',
                      borderRadius: '8px',
                      background: i === 1 ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                      fontSize: '0.75rem',
                      minWidth: '32px',
                    }}
                  >
                    <span>{day}</span>
                    <span style={{ fontWeight: 700 }}>{28 + i > 31 ? (28 + i) - 31 : 28 + i}</span>
                  </div>
                ))}
              </div>
              <div className="schedule-timeline">
                <div className="timeline-item">
                  <span className="tl-time">8:00 AM</span>
                  <div className="tl-event blue">
                    <span className="tl-title">Morning workout</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="tl-time">10:00 AM</span>
                  <div className="tl-event purple">
                    <span className="tl-title">Deep work session</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="tl-time">2:00 PM</span>
                  <div className="tl-event pink">
                    <span className="tl-title">Team meeting</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: INSIGHTS */}
          {activeScreen === 'insights' && (
            <div className="app-screen active" data-screen="insights">
              <div className="app-header-inner">
                <button className="back-btn" onClick={() => setActiveScreen('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="header-title">Insights</h2>
                <div className="header-actions"></div>
              </div>
              <div className="insights-period">
                <button className="period-btn active">Week</button>
                <button className="period-btn">Month</button>
              </div>
              <div className="insight-card">
                <h4>Focus Time</h4>
                <div className="insight-value">
                  <span className="big-num">{focusStats.sessionsToday * 0.5 + 2}</span>
                  <span className="unit">hours</span>
                </div>
                <div className="insight-bar">
                  <div className="bar-fill" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="insight-card">
                <h4>Tasks Completed</h4>
                <div className="insight-value">
                  <span className="big-num">{completedCount}</span>
                  <span className="unit">tasks</span>
                </div>
                <div className="insight-bar">
                  <div className="bar-fill purple" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
              <div className="streak-card">
                <div className="streak-icon">🔥</div>
                <div className="streak-info">
                  <span className="streak-num">{focusStats.streak}</span>
                  <span className="streak-label">Day Streak</span>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: MATRIX */}
          {activeScreen === 'matrix' && (
            <div className="app-screen active" data-screen="matrix">
              <div className="app-header-inner">
                <button className="back-btn" onClick={() => setActiveScreen('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="header-title">Eisenhower Matrix</h2>
                <div className="header-actions"></div>
              </div>
              <div className="matrix-intro">
                <p>Organize by urgency & importance</p>
              </div>
              <div className="matrix-grid">
                <div className="matrix-header">
                  <span></span>
                  <span className="mh-label">URGENT</span>
                  <span className="mh-label">NOT URGENT</span>
                </div>
                <div className="matrix-row">
                  <span className="mr-label">IMP.</span>
                  <div className="matrix-cell do">
                    <span className="mc-title">DO</span>
                    <div className="mc-task">Emergency meeting</div>
                  </div>
                  <div className="matrix-cell decide">
                    <span className="mc-title">DECIDE</span>
                    <div className="mc-task">Plan goals</div>
                  </div>
                </div>
                <div className="matrix-row">
                  <span className="mr-label">NOT</span>
                  <div className="matrix-cell delegate">
                    <span className="mc-title">DELEGATE</span>
                    <div className="mc-empty">—</div>
                  </div>
                  <div className="matrix-cell delete">
                    <span className="mc-title">DELETE</span>
                    <div className="mc-empty">—</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: MENU / SETTINGS */}
          {activeScreen === 'menu' && (
            <div className="app-screen active" data-screen="menu">
              <div className="app-header-inner">
                <button className="back-btn" onClick={() => setActiveScreen('home')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="header-title">Settings</h2>
                <div className="header-actions"></div>
              </div>
              <div className="profile-card">
                <div className="profile-avatar">👤</div>
                <div className="profile-info">
                  <span className="profile-name">User</span>
                  <span className="profile-email">user@example.com</span>
                </div>
              </div>
              <div className="settings-group">
                <div className="setting-item">
                  <span className="setting-icon">🔔</span>
                  <span className="setting-label">Notifications</span>
                  <span className="setting-chevron">›</span>
                </div>
                <div className="setting-item">
                  <span className="setting-icon">🎨</span>
                  <span className="setting-label">Appearance</span>
                  <span className="setting-chevron">›</span>
                </div>
                <div className="setting-item">
                  <span className="setting-icon">❓</span>
                  <span className="setting-label">Help</span>
                  <span className="setting-chevron">›</span>
                </div>
              </div>
              <button
                className="download-cta-btn"
                onClick={() => setIsDownloadModalOpen(true)}
              >
                📱 Download Full App
              </button>
            </div>
          )}

          {/* Phone Bottom Navigation Bar */}
          <nav className="app-bottom-nav" id="app-nav">
            <button
              className={`bnav-item ${activeScreen === 'home' ? 'active-home-tab' : ''}`}
              onClick={() => setActiveScreen('home')}
              aria-label="Home"
            >
              {activeScreen === 'home' ? (
                <div className="home-active-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0b0918">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                  </svg>
                </div>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </>
              )}
            </button>

            <button
              className={`bnav-item ${activeScreen === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveScreen('tasks')}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Tasks</span>
            </button>

            <button
              className={`bnav-item ${activeScreen === 'focus' || activeScreen === 'timer' ? 'active' : ''}`}
              onClick={() => setActiveScreen('focus')}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <span>Focus</span>
            </button>

            <button
              className={`bnav-item ${activeScreen === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveScreen('schedule')}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Schedule</span>
            </button>

            <button
              className={`bnav-item ${activeScreen === 'assistant' ? 'active' : ''}`}
              onClick={() => setActiveScreen('assistant')}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path>
              </svg>
              <span>AI</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Add Task Modal */}
      {isTaskModalOpen && (
        <div className="modal active" id="add-task-modal">
          <div className="modal-overlay" onClick={() => setIsTaskModalOpen(false)}></div>
          <div className="modal-content">
            <h3>Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                id="new-task-input"
                placeholder="Task name (e.g. Design review)..."
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                autoFocus
              />
              <input
                type="time"
                id="new-task-time"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
              />
              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel"
                  onClick={() => setIsTaskModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-confirm">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {isDownloadModalOpen && (
        <div className="modal active" id="download-modal">
          <div className="modal-overlay" onClick={() => setIsDownloadModalOpen(false)}></div>
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsDownloadModalOpen(false)}
            >
              ×
            </button>
            <div className="modal-icon">🎉</div>
            <h3>You're doing great!</h3>
            <p>Get the full experience with the DailyPlanner app on your phone.</p>
            <div className="modal-download-buttons">
              <a
                href="https://play.google.com/store/apps/details?id=com.ashukaytech.daily_planner"
                className="btn-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-google-play"></i> Android
              </a>
              <a
                href="https://apps.apple.com/in/app/the-dailyplanner-app/id6771750050"
                className="btn-cta btn-cta-apple"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-apple"></i> iOS
              </a>
            </div>
            <button
              className="modal-dismiss"
              onClick={() => setIsDownloadModalOpen(false)}
            >
              Continue Demo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
