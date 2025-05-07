import React from 'react';

const FEEDBACK_URL = 'https://github.com/jmpijll/FortiManager-Live-Monitor/issues/new';

export default function FeedbackButton() {
  return (
    <a
      href={FEEDBACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 px-6 py-3 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 z-50 font-semibold text-lg flex items-center gap-2 transition-all duration-200 active:scale-95 animate-fade-in"
      aria-label="Send feedback or report an issue"
    >
      <span role="img" aria-label="Feedback">
        💬
      </span>{' '}
      Feedback
    </a>
  );
}
