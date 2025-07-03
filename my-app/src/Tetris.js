import './App.css';
import Stage from './Stage';
import React, { useState, useEffect, useRef } from 'react';
import { Tetrominos } from './Tetrominos';

function createStage() {
  const grid = [];
  const rows = 20;
  const cols = 12;
  for (let x = 0; x < rows; x++) {
    grid.push(Array.from(Array(cols), () => Tetrominos[0]));
  }
  return grid;
}

const createNewPlayer = (stage) => {
  const pieces = Object.keys(Tetrominos).filter(key => key !== "0");
  const randomIndex = Math.floor(Math.random() * pieces.length);
  const randomPieceName = pieces[randomIndex];
  const randomPiece = Tetrominos[randomPieceName];
  const startX = Math.floor((stage[0].length / 2)) - Math.floor((randomPiece.shape[0].length / 2));
  return {
    position: { x: startX, y: 0 },
    tetromino: randomPiece,
  };
};

function Tetris() {
  const [stage, setStage] = useState(createStage());
  const [player, setPlayer] = useState(createNewPlayer(stage));
  const [gameStarted, setGameStarted] = useState(false);
  const intervalId = useRef(null);



  function checkCollision(currentPosition, shape, currentStage) {
    if (!shape || !currentStage || !currentStage[0]) return true;
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const posY = currentPosition.y + row;
          const posX = currentPosition.x + col;

          if (posX < 0 || posX >= currentStage[0].length || posY >= currentStage.length) {
            return true;
          }
          
          if (currentStage[posY] && currentStage[posY][posX] && currentStage[posY][posX].touched) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function removeLine(stageToClean) {
    let newStage = JSON.parse(JSON.stringify(stageToClean));
    const rows = newStage.length;
    const cols = newStage[0].length;
  
    for (let row = newStage.length - 1; row >= 0; row--) {
      if (newStage[row].every(cell => cell.touched)) {
        newStage.splice(row, 1);
        newStage.unshift(Array.from({ length: cols }, () => Tetrominos[0]));
      }
    }
    
    while (newStage.length < rows) {
      newStage.unshift(Array.from({ length: cols }, () => Tetrominos[0]));
    }
    return newStage;
  }

  const movePlayer = (xAmount) => {
    const newPosition = { ...player.position, x: player.position.x + xAmount };
    if (!checkCollision(newPosition, player.tetromino.shape, stage)) {
      setPlayer(prev => ({ ...prev, position: newPosition }));
    }
  };

  const rotatePlayer = () => {
    const shape = player.tetromino.shape;
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated = [];
  
    for (let col = 0; col < cols; col++) {
      const newRow = [];
      for (let row = rows - 1; row >= 0; row--) {
        newRow.push(shape[row][col]);
      }
      rotated.push(newRow);
    }

    if (!checkCollision(player.position, rotated, stage)) {
      setPlayer(prev => ({
        ...prev,
        tetromino: { ...prev.tetromino, shape: rotated },
      }));
    }
  };

  const dropPlayer = () => {
    const newPosition = { ...player.position, y: player.position.y + 1 };
    if (!checkCollision(newPosition, player.tetromino.shape, stage)) {
      setPlayer(prev => ({ ...prev, position: newPosition }));
    } else {
      
      if (player.position.y < 1) {
        setGameStarted(false);
        alert('Game Over!');
        return;
      }

      
      let newStage = JSON.parse(JSON.stringify(stage));
      for (let row = 0; row < player.tetromino.shape.length; row++) {
        for (let col = 0; col < player.tetromino.shape[row].length; col++) {
          if (player.tetromino.shape[row][col] !== 0) {
            const stageRow = player.position.y + row;
            const stageCol = player.position.x + col;
            if (newStage[stageRow] && newStage[stageRow][stageCol]) {
              newStage[stageRow][stageCol] = {
                ...newStage[stageRow][stageCol],
                touched: true,
                color: player.tetromino.color,
                shape: player.tetromino.shape[row][col],
              };
            }
          }
        }
      }

      
      newStage = removeLine(newStage);
      
      const newPlayer = createNewPlayer(newStage);
      if (checkCollision(newPlayer.position, newPlayer.tetromino.shape, newStage)) {
        setGameStarted(false);
        alert('Game Over!');
        setStage(newStage); 
        return;
      }
      
     
      setStage(newStage);
      setPlayer(newPlayer);
    }
  };

  function startGame() {
    const freshStage = createStage();
    setStage(freshStage);
    setPlayer(createNewPlayer(freshStage));
    setGameStarted(true);
  }

  
  useEffect(() => {
    if (gameStarted) {
      if (intervalId.current) clearInterval(intervalId.current);
      intervalId.current = setInterval(dropPlayer, 1000);
    }
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [gameStarted, player]); 

 
  const displayStage = JSON.parse(JSON.stringify(stage));
  if (gameStarted) {
    for (let row = 0; row < player.tetromino.shape.length; row++) {
      for (let col = 0; col < player.tetromino.shape[row].length; col++) {
        if (player.tetromino.shape[row][col] !== 0) {
          const stageRow = player.position.y + row;
          const stageCol = player.position.x + col;
          if (displayStage[stageRow] && displayStage[stageRow][stageCol] && !displayStage[stageRow][stageCol].touched) {
            displayStage[stageRow][stageCol] = {
              shape: player.tetromino.shape[row][col],
              color: player.tetromino.color,
              touched: false,
            };
          }
        }
      }
    }
  }

  return (
    <div>
      <h2>Tetris</h2>
      <button onClick={() => dropPlayer()}>muta jos</button>
      <button onClick={() => movePlayer(1)}>muta dreapta</button>
      <button onClick={() => movePlayer(-1)}>muta stanga</button>
      <button onClick={startGame}>start Game</button>
      <button onClick={rotatePlayer}>rotate</button>
      <Stage stage={displayStage} />
    </div>
  );
}

export default Tetris;
