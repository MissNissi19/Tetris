
import React from 'react';

const Display = ({ score, gameOver }) => (
  <div className="display">
    {gameOver ? `Game Over! Scor: ${score}` : `Scor: ${score}`}
  </div>
);

export default Display;

