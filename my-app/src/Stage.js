import React from 'react';
import Pixel from './Pixel';

const Stage = ({ stage }) => {
  return (
    <div style={{ display: 'inline-block' }}>
      {stage.map((row, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {row.map((color, x) => (
            <Pixel key={x} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Stage;
