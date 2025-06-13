import React from 'react';

const ActionButton = ({ callback, text }) => {
  return (
    <button onClick={callback}>
      {text}
    </button>
  );
};

export default ActionButton;

