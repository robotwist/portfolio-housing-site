import React, { useState, useEffect } from 'react';
import { BaseGame } from './BaseGame';

interface PongProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Pong: React.FC<PongProps> = (props) => {
  const [gameState, setGameState] = useState({
    ball: { x: 200, y: 150, dx: 2, dy: 2, radius: 10 },
    paddle1: { y: 125, height: 50, width: 10, score: 0 },
    paddle2: { y: 125, height: 50, width: 10, score: 0 },
    keys: { w: false, s: false, up: false, down: false }
  });

  useEffect(() => {
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
  }, []);

  const update = () => {
    setGameState(prev => {
      const { ball, paddle1, paddle2, keys } = prev;
      const newBall = { ...ball };
      const newPaddle1 = { ...paddle1 };
      const newPaddle2 = { ...paddle2 };

      // Move paddles
      if (keys.w && newPaddle1.y > 0) newPaddle1.y -= 5;
      if (keys.s && newPaddle1.y < 300 - newPaddle1.height) newPaddle1.y += 5;
      if (keys.up && newPaddle2.y > 0) newPaddle2.y -= 5;
      if (keys.down && newPaddle2.y < 300 - newPaddle2.height) newPaddle2.y += 5;

      // Move ball
      newBall.x += newBall.dx;
      newBall.y += newBall.dy;

      // Ball collision with top and bottom
      if (newBall.y - newBall.radius <= 0 || newBall.y + newBall.radius >= 300) {
        newBall.dy *= -1;
      }

      // Ball collision with paddles
      if (newBall.x - newBall.radius <= 20 && 
          newBall.y >= newPaddle1.y && 
          newBall.y <= newPaddle1.y + newPaddle1.height) {
        newBall.dx *= -1;
      }
      if (newBall.x + newBall.radius >= 380 && 
          newBall.y >= newPaddle2.y && 
          newBall.y <= newPaddle2.y + newPaddle2.height) {
        newBall.dx *= -1;
      }

      // Score points
      if (newBall.x <= 0) {
        newPaddle2.score++;
        newBall.x = 200;
        newBall.y = 150;
        newBall.dx = 2;
        newBall.dy = 2;
      }
      if (newBall.x >= 400) {
        newPaddle1.score++;
        newBall.x = 200;
        newBall.y = 150;
        newBall.dx = -2;
        newBall.dy = 2;
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

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
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
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw paddles
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(380, paddle2.y, paddle2.width, paddle2.height);

    // Draw scores
    ctx.font = '32px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(paddle1.score.toString(), 100, 50);
    ctx.fillText(paddle2.score.toString(), 300, 50);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <BaseGame {...props} update={update} render={render} />
      <div className="text-sm text-foreground/60">
        Controls: W/S for left paddle, ↑/↓ for right paddle
      </div>
    </div>
  );
}; 