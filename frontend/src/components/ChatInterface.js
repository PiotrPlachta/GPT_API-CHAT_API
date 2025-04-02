import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatInterface.css';

const ChatInterface = ({ userEmail }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat whenever history changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Add user message to chat history
    const userMessage = { role: 'user', content: message };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setMessage('');
    setIsLoading(true);

    try {
      // Send message to backend API
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: message,
        history: chatHistory,
        email: userEmail
      });

      // Update chat history with response from API
      setChatHistory(response.data.history);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant', content: 'Sorry, there was an error processing your request. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chatHistory.length === 0 ? (
          <div className="welcome-message">
            <p>Welcome to our Order Status Checker!</p>
            <p>How can I help you today?</p>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant loading">
            <div className="loading-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || message.trim() === ''}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
