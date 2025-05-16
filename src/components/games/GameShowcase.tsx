import React, { useState } from 'react';
import { Pong } from './Pong';

const games = [
  {
    id: 'pong',
    title: 'Pong',
    description: 'Classic two-player paddle game. Use W/S for left paddle and arrow keys for right paddle.',
    component: Pong
  },
  // We'll add more games here as we create them
];

export const GameShowcase: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState(games[0]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Play Some Games!</h2>
        <p className="text-foreground/60">
          Take a break and enjoy these classic arcade games. All games are built with vanilla JavaScript and HTML5 Canvas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedGame.id === game.id
                  ? 'bg-primary/20 text-primary'
                  : 'hover:bg-primary/10'
              }`}
            >
              <h3 className="font-semibold">{game.title}</h3>
              <p className="text-sm text-foreground/60">{game.description}</p>
            </button>
          ))}
        </div>

        <div className="bg-background/50 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">{selectedGame.title}</h3>
          <selectedGame.component />
        </div>
      </div>
    </div>
  );
}; 