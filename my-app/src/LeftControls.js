import React from 'react';

const LeftControls = ({ movePlayer, dropPlayer }) => (
  <div className="left-controls">
    <button onClick={() => movePlayer(-1)}>Left</button>
    <button onClick={() => movePlayer(1)}>Right</button>
    <button onClick={() => dropPlayer()}>Down</button>
  </div>
);

export default LeftControls;
