import React from 'react';

// aici voi seta culorile

const Pixel = ({ color }) => {
  return (
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: color,
      border: '1px solid #ccc'
    }} />
  );
};

export default Pixel;
