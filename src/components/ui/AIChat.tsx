"use client";

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatStats {
  totalRequests: number;
  keywordMatches: number;
  defaultResponses: number;
  successRate: string;
  unmatchedQueries: Array<{query: string, timestamp: string}>;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm Rob.AI, your friendly guide to Rob's awesome portfolio! Want to chat about his projects or connect with him directly?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<ChatStats | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          mode: isInterviewMode ? 'interview' : 'normal'
        }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again!",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/.netlify/functions/chat/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    if (showStats) {
      fetchStats();
      const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [showStats]);

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-semibold">Rob.AI</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
            title="Toggle Stats"
          >
            📊
          </button>
          <button
            onClick={() => setIsInterviewMode(!isInterviewMode)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              isInterviewMode 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            title={isInterviewMode ? 'Switch to Normal Mode' : 'Switch to Interview Mode'}
          >
            {isInterviewMode ? '👤' : '🤖'}
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && stats && (
        <div className="bg-gray-50 p-3 border-b border-gray-200 text-xs">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>Total Requests: <span className="font-semibold">{stats.totalRequests}</span></div>
            <div>Success Rate: <span className="font-semibold">{stats.successRate}%</span></div>
            <div>Keyword Matches: <span className="font-semibold text-green-600">{stats.keywordMatches}</span></div>
            <div>Default Responses: <span className="font-semibold text-red-600">{stats.defaultResponses}</span></div>
          </div>
          {stats.unmatchedQueries.length > 0 && (
            <details className="text-xs">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                Recent Unmatched Queries ({stats.unmatchedQueries.length})
              </summary>
              <div className="mt-1 max-h-20 overflow-y-auto">
                {stats.unmatchedQueries.slice(-5).map((query, index) => (
                  <div key={index} className="text-gray-600 py-1 border-b border-gray-200 last:border-b-0">
                    "{query.query}"
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Rob..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat; 