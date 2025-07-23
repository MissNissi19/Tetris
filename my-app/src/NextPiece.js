import React from 'react';
import Pixel from './Pixel';

const NextPiece = ({ piece }) => {
  // Create a 4x4 grid to display the piece
  const grid = Array.from(Array(4), () => Array(4).fill({ color: '#000', touched: false }));

  // Draw the piece onto the grid
  if (piece) {
    const shape = piece.shape;
    const startY = Math.floor((4 - shape.length) / 2);
    const startX = Math.floor((4 - shape[0].length) / 2);

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          grid[startY + y][startX + x] = { color: piece.color, touched: true };
        }
      }
    }
  }

  return (
    <div className="next-piece-container">
      <h4>Next</h4>
      <div className="next-piece-grid">
        {grid.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((pixel, x) => (
              <Pixel key={x} color={pixel.color} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;
