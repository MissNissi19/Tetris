
import React from 'react';
import ActionButton from './ActionButton';

const Controls = ({ onLeft, onRight, onRotate, onDown }) => {
  return (
    <div>
      <ActionButton callback={onLeft} text="Left" />
      <ActionButton callback={onRight} text="Right" />
      <ActionButton callback={onRotate} text="Rotate" />
      <ActionButton callback={onDown} text="Down" />
    </div>
  );
};

export default Controls;
