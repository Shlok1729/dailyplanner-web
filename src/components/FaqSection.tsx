'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Is it really free?',
    answer:
      'Yes! DailyPlanner is 100% free with no hidden subscriptions or premium tiers. We believe productivity tools should be accessible to everyone.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Absolutely. Your tasks, schedule, and focus timers all work perfectly without an internet connection.',
  },
  {
    question: 'How is my data stored?',
    answer:
      'Your data stays completely private and is stored locally on your device. We don’t track your personal tasks or sell your data.',
  },
  {
    question: 'Is it available on iOS and Android?',
    answer:
      'Yes, DailyPlanner is available for both iOS and Android. You can download it directly from the App Store or Google Play Store.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header">
          <span className="section-label">Got Questions?</span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <i
                    className="fa-solid fa-chevron-down"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                    }}
                  ></i>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
