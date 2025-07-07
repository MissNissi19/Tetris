import React from 'react';

const RightControls = ({ startGame, rotatePlayer }) => (
  <div className="right-controls">
    <button className="start-button" onClick={startGame}>Start</button>
    <button className="rotate-button" onClick={rotatePlayer}>Rotate</button>
  </div>
);
export default RightControls;
