const replies = [
    'Got it! Here’s a concise summary coming right up.',
    'Absolutely. Drafting a minimal smartwatch description.',
    'Sure thing—here’s a polite refund response template.',
    'Thanks! I’m on it.',
  ];
  
  let i = 0;
  export const nextAssistantReply = () => {
    const r = replies[i % replies.length];
    i += 1;
    return r;
  };
  