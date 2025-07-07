import React from 'react';

const Pixel = ({ color }) => (
  <div className="pixel-wrapper">
    <div 
      className="pixel" 
      style={{ backgroundColor: color }} 
    />
  </div>
);

export default Pixel;
