import React from 'react';

const FEEDBACK_URL = 'https://github.com/jmpijll/FortiManager-Live-Monitor/issues/new';

export default function FeedbackButton() {
  return (
    <a
      href={FEEDBACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 px-4 py-2 rounded bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 z-50"
      aria-label="Send feedback or report an issue"
    >
      💬 Feedback
    </a>
  );
}
