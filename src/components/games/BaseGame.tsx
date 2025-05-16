import React, { useEffect, useRef } from 'react';

export interface BaseGameProps {
  width?: number;
  height?: number;
  className?: string;
  update?: () => void;
  render?: (ctx: CanvasRenderingContext2D) => void;
}

export const BaseGame: React.FC<BaseGameProps> = ({ 
  width = 400, 
  height = 300,
  className = '',
  update = () => {},
  render = () => {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Game loop
    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update and render game state
      update();
      render(ctx);
      
      // Continue loop
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    // Start game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    // Cleanup
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [width, height, update, render]);

  return (
    <canvas
      ref={canvasRef}
      className={`border border-primary/20 rounded-lg shadow-lg ${className}`}
      style={{ width, height }}
    />
  );
}; 