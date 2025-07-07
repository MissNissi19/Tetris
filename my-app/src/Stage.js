import React from 'react';
import Pixel from './Pixel';

const Stage = ({ stage }) => (
  <div className='stage'>
    {stage.map((row, y) => (
      <div key={y} style={{ display: 'flex' }}>
        {row.map((col, x) => (
          <Pixel key={x} color={col.color} />
        ))}
      </div>
    ))}
  </div>
);

export default Stage;
