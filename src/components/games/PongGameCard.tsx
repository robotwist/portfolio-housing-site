"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BaseGame } from './BaseGame';

interface PongGameCardProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function PongGameCard({ width = 400, height = 300, className = '' }: PongGameCardProps) {
  const [demoMode, setDemoMode] = useState(true);
  const [gameState, setGameState] = useState({
    ball: { x: 200, y: 150, dx: 3, dy: 2, radius: 10 },
    paddle1: { y: 125, height: 50, width: 10, score: 0 },
    paddle2: { y: 125, height: 50, width: 10, score: 0 },
    keys: { w: false, s: false, up: false, down: false }
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle key events for when not in demo mode
  useEffect(() => {
    if (demoMode) return; // Don't register key events in demo mode

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') setGameState(prev => ({ ...prev, keys: { ...prev.keys, w: true } }));
      if (e.key === 's') setGameState(prev => ({ ...prev, keys: { ...prev.keys, s: true } }));
      if (e.key === 'ArrowUp') setGameState(prev => ({ ...prev, keys: { ...prev.keys, up: true } }));
      if (e.key === 'ArrowDown') setGameState(prev => ({ ...prev, keys: { ...prev.keys, down: true } }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w') setGameState(prev => ({ ...prev, keys: { ...prev.keys, w: false } }));
      if (e.key === 's') setGameState(prev => ({ ...prev, keys: { ...prev.keys, s: false } }));
      if (e.key === 'ArrowUp') setGameState(prev => ({ ...prev, keys: { ...prev.keys, up: false } }));
      if (e.key === 'ArrowDown') setGameState(prev => ({ ...prev, keys: { ...prev.keys, down: false } }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [demoMode]);

  const update = () => {
    setGameState(prev => {
      const { ball, paddle1, paddle2, keys } = prev;
      const newBall = { ...ball };
      const newPaddle1 = { ...paddle1 };
      const newPaddle2 = { ...paddle2 };

      // Move ball
      newBall.x += newBall.dx;
      newBall.y += newBall.dy;

      if (demoMode) {
        // AI control for both paddles in demo mode
        // Left paddle (paddle1) AI
        const paddle1Center = newPaddle1.y + newPaddle1.height / 2;
        const paddle1Target = newBall.y;
        
        // Add some prediction and occasional "mistakes" for realism
        if (Math.abs(paddle1Center - paddle1Target) > 10) {
          if (paddle1Center < paddle1Target && newPaddle1.y < 300 - newPaddle1.height) {
            newPaddle1.y += 2.5; // Slower than player speed for difficulty
          } else if (paddle1Center > paddle1Target && newPaddle1.y > 0) {
            newPaddle1.y -= 2.5;
          }
        }
        
        // Right paddle (paddle2) AI
        const paddle2Center = newPaddle2.y + newPaddle2.height / 2;
        const paddle2Target = newBall.y;
        
        if (Math.abs(paddle2Center - paddle2Target) > 10) {
          if (paddle2Center < paddle2Target && newPaddle2.y < 300 - newPaddle2.height) {
            newPaddle2.y += 2.5;
          } else if (paddle2Center > paddle2Target && newPaddle2.y > 0) {
            newPaddle2.y -= 2.5;
          }
        }
      } else {
        // Player controls when not in demo mode
        if (keys.w && newPaddle1.y > 0) newPaddle1.y -= 5;
        if (keys.s && newPaddle1.y < 300 - newPaddle1.height) newPaddle1.y += 5;
        if (keys.up && newPaddle2.y > 0) newPaddle2.y -= 5;
        if (keys.down && newPaddle2.y < 300 - newPaddle2.height) newPaddle2.y += 5;
      }

      // Ball collision with top and bottom
      if (newBall.y <= 0 || newBall.y >= 300) {
        newBall.dy *= -1;
      }

      // Ball collision with paddles
      if (
        newBall.x <= 20 && 
        newBall.y >= newPaddle1.y && 
        newBall.y <= newPaddle1.y + newPaddle1.height
      ) {
        newBall.dx = Math.abs(newBall.dx); // Ensure it goes right
        // Add some angle based on where the ball hits the paddle
        const relativeIntersectY = (newPaddle1.y + newPaddle1.height / 2) - newBall.y;
        const normalizedRelativeIntersectionY = relativeIntersectY / (newPaddle1.height / 2);
        const bounceAngle = normalizedRelativeIntersectionY * 0.4; // Max 45-degree angle
        newBall.dy = -bounceAngle * 4; // Adjust speed as needed
      }

      if (
        newBall.x >= 380 && 
        newBall.y >= newPaddle2.y && 
        newBall.y <= newPaddle2.y + newPaddle2.height
      ) {
        newBall.dx = -Math.abs(newBall.dx); // Ensure it goes left
        // Similar angle calculation for right paddle
        const relativeIntersectY = (newPaddle2.y + newPaddle2.height / 2) - newBall.y;
        const normalizedRelativeIntersectionY = relativeIntersectY / (newPaddle2.height / 2);
        const bounceAngle = normalizedRelativeIntersectionY * 0.4;
        newBall.dy = -bounceAngle * 4;
      }

      // Reset ball when scoring (no score counting in demo mode)
      if (newBall.x <= 0) {
        if (!demoMode) newPaddle2.score++;
        newBall.x = 200;
        newBall.y = 150;
        newBall.dx = 3; // Always start going right after left scores
        newBall.dy = Math.random() > 0.5 ? 2 : -2;
      }
      
      if (newBall.x >= 400) {
        if (!demoMode) newPaddle1.score++;
        newBall.x = 200;
        newBall.y = 150;
        newBall.dx = -3; // Always start going left after right scores
        newBall.dy = Math.random() > 0.5 ? 2 : -2;
      }

      return {
        ...prev,
        ball: newBall,
        paddle1: newPaddle1,
        paddle2: newPaddle2
      };
    });
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    const { ball, paddle1, paddle2 } = gameState;

    // Clear canvas with a slightly darker background
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, 400, 300);

    // Draw center line
    ctx.strokeStyle = '#ffffff33';
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ball
    ctx.fillStyle = '#58a6ff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw paddles
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(380, paddle2.y, paddle2.width, paddle2.height);

    // Draw scores
    ctx.font = '32px Arial';
    ctx.fillStyle = '#58a6ff';
    ctx.textAlign = 'center';
    ctx.fillText(paddle1.score.toString(), 100, 50);
    ctx.fillText(paddle2.score.toString(), 300, 50);

    // Draw demo mode message
    if (demoMode) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '16px Arial';
      ctx.fillText('Click to Play', 200, 150);
    }
  };

  const handleClick = () => {
    if (demoMode) {
      setDemoMode(false);
      // Reset game state when starting a real game
      setGameState({
        ball: { x: 200, y: 150, dx: 3, dy: 2, radius: 10 },
        paddle1: { y: 125, height: 50, width: 10, score: 0 },
        paddle2: { y: 125, height: 50, width: 10, score: 0 },
        keys: { w: false, s: false, up: false, down: false }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="project-card"
      style={{ maxWidth: "700px", margin: "0 auto" }}
    >
      <div className="card-content">
        <h3 className="card-title">Pong Game</h3>
        <p className="card-description" style={{ textAlign: "center" }}>
          Take a break and enjoy a classic game of Pong,  two-player for historical accuracy. Currently in {demoMode ? 'demo mode' : 'play mode'}.
        </p>
        
        <div 
          className="media-container" 
          style={{ 
            cursor: demoMode ? 'pointer' : 'default', 
            height: height, 
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#161b22"
          }}
          onClick={handleClick}
        >
          <BaseGame width={width} height={height} update={update} render={render} />
        </div>
      </div>
      
      <div className="card-footer">
        <div className="card-description" style={{ margin: 0, fontSize: "0.9rem" }}>
          {demoMode ? (
            <span>Click on the game to start playing</span>
          ) : (
            <span>Controls: W/S for left paddle, ↑/↓ for right paddle</span>
          )}
        </div>
        <div className="tech-tags">
          <span className="tech-tag">HTML5 Canvas</span>
          <span className="tech-tag">React</span>
          <span className="tech-tag">TypeScript</span>
        </div>
      </div>
    </motion.div>
  );
} 