import React, { useState, useEffect } from 'react';

const AIChatbot = () => {
  const [iframeState, setIframeState] = useState('modal'); // Default to modal for GDPR

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'CHATBOT_STATE') {
        setIframeState(event.data.state);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  let containerClasses = "fixed z-50 max-w-[100vw] max-h-[100vh] transition-all duration-300 ";

  if (iframeState === 'modal') {
    containerClasses += "inset-0 w-full h-full";
  } else if (iframeState === 'chat') {
    containerClasses += "bottom-0 right-0 w-[600px] h-[950px]";
  } else {
    containerClasses += "bottom-0 right-0 w-[150px] h-[150px]";
  }

  return (
    <div className={containerClasses}>
      <iframe 
        src="/chatbot.html" 
        className="w-full h-full border-none bg-transparent"
        title="Medical AI Assistant"
      />
    </div>
  );
};

export default AIChatbot;
