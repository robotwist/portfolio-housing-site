"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIChatHandle {
  toggleChat: () => void;
}

const AIChat = forwardRef<AIChatHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
    setMessages([
      { 
        role: 'assistant', 
        content: "Hi there! I'm Rob's portfolio assistant. What would you like to know about his work or experience?" 
      }
    ]);
  }, []);

  // Expose the toggleChat method to the parent component
  useImperativeHandle(ref, () => ({
    toggleChat: () => setIsOpen(prev => !prev)
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything until after mount
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          backgroundColor: "var(--color-primary)",
          color: "white",
          padding: "1rem",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          border: "none",
          cursor: "pointer",
          zIndex: 50,
          transition: "background-color 0.2s ease, transform 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary)";
        }}
        aria-label="Open chat"
      >
        <FaRobot style={{ width: "1.5rem", height: "1.5rem" }} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="project-card"
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              width: "380px",
              maxWidth: "calc(100vw - 40px)",
              height: "500px",
              maxHeight: "calc(100vh - 100px)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Chat header */}
            <div className="card-header" style={{
              padding: "1rem 1.5rem",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "var(--color-card-bg)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <FaRobot style={{ color: "var(--color-primary)", width: "1.25rem", height: "1.25rem" }} />
                <h3 className="card-title" style={{ margin: 0 }}>Chat with Me</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-muted-foreground)",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  transition: "color 0.2s ease, background-color 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-card-hover)";
                  e.currentTarget.style.color = "var(--color-foreground)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-muted-foreground)";
                }}
                aria-label="Close chat"
              >
                <FaTimes style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="card-content" style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              backgroundColor: "var(--color-card-bg)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: message.role === 'user' ? "flex-end" : "flex-start",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem",
                      backgroundColor: message.role === 'user' 
                        ? "var(--color-primary)" 
                        : "var(--color-card-hover)",
                      color: message.role === 'user' 
                        ? "white" 
                        : "var(--color-foreground)",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      wordBreak: "break-word"
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    backgroundColor: "var(--color-card-hover)",
                    color: "var(--color-foreground)",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}>
                    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-primary)",
                        opacity: 0.7,
                        animation: "bounce 1.4s infinite ease-in-out both",
                        animationDelay: "0s"
                      }} />
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-primary)",
                        opacity: 0.7,
                        animation: "bounce 1.4s infinite ease-in-out both",
                        animationDelay: "0.2s"
                      }} />
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-primary)",
                        opacity: 0.7,
                        animation: "bounce 1.4s infinite ease-in-out both",
                        animationDelay: "0.4s"
                      }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="card-footer" style={{
              padding: "1rem",
              borderTop: "1px solid var(--color-border)",
              backgroundColor: "var(--color-card-bg)",
            }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--color-card-hover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.5rem",
                    color: "var(--color-foreground)",
                    outline: "none",
                    resize: "none",
                    transition: "border-color 0.2s ease",
                    fontFamily: "inherit",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                  }}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: !input.trim() || isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    opacity: !input.trim() || isLoading ? 0.6 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseOver={(e) => {
                    if (input.trim() && !isLoading) {
                      e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-primary)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <FaPaperPlane style={{ width: "1.25rem", height: "1.25rem" }} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Animation for the dots */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </>
  );
});

AIChat.displayName = 'AIChat';

export default AIChat; 