import React, { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';

function App() {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsEmailSubmitted(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Order Status Checker</h1>
      </header>
      <main>
        {!isEmailSubmitted ? (
          <div className="email-form-container">
            <h2>Please enter your email to continue</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Continue</button>
            </form>
          </div>
        ) : (
          <ChatInterface userEmail={email} />
        )}
      </main>
    </div>
  );
}

export default App;
