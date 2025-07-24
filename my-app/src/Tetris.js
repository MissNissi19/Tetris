import './App.css';
import Stage from './Stage';
import Display from './Display';
import LeftControls from './LeftControls';
import NextPiece from './NextPiece';
import RightControls from './RightControls';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tetrominos } from './Tetrominos';
import { createStage, createNewPlayer } from './GameInitialization';

const Tetris = () => {
  
  const [stage, setStage] = useState(createStage());
  const [player, setPlayer] = useState(createNewPlayer(stage));
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const intervalId = useRef(null);
  const [nextPiece, setNextPiece] = useState(null);

  
  const checkCollision = useCallback((currentPosition, shape, currentStage) => {
    if (!shape || !currentStage || !currentStage[0]) return true;
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const posY = currentPosition.y + row;
          const posX = currentPosition.x + col;

          if (posX < 0 || posX >= currentStage[0].length || posY >= currentStage.length) {
            return true;
          }
          
          if (currentStage[posY]?.[posX]?.touched) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const removeLine = useCallback((stageToClean) => {
    let linesCleared = 0;
    const newStage = [];
    const rows = stageToClean.length;
    const cols = stageToClean[0].length;
    
    
    for (let row = 0; row < rows; row++) {
      if (stageToClean[row].every(cell => cell.touched)) {
        linesCleared++;
      } else {
        newStage.push([...stageToClean[row]]);
      }
    }
    
    
    const emptyRow = Array.from({ length: cols }, () => Tetrominos[0]);
    const newRows = Array(linesCleared).fill().map(() => [...emptyRow]);
    
    return { 
      stage: [...newRows, ...newStage],
      linesCleared 
    };
  }, []);

  const startGame = useCallback(() => {
    const freshStage = createStage();
    const firstPlayer = createNewPlayer(freshStage);
    const theNextPiece = createNewPlayer(freshStage);

    setStage(freshStage);
    setPlayer(firstPlayer);
    setNextPiece(theNextPiece.tetromino);
    setGameStarted(true);
    setScore(0);
    setGameOver(false);
  }, []);

  const movePlayer = useCallback((xAmount) => {
    setPlayer(prev => {
      const newPosition = { ...prev.position, x: prev.position.x + xAmount };
      if (!checkCollision(newPosition, prev.tetromino.shape, stage)) {
        return { ...prev, position: newPosition };
      }
      return prev;
    });
  }, [checkCollision, stage]);

  const dropPlayer = useCallback(() => {
    setPlayer(prev => {
      const newPosition = { ...prev.position, y: prev.position.y + 1 };
      
      
      if (!checkCollision(newPosition, prev.tetromino.shape, stage)) {
        return { ...prev, position: newPosition };
      }
      
      
      if (prev.position.y < 1) {
        setGameOver(true);
        setGameStarted(false);
        return prev;
      }

      
      const newStage = JSON.parse(JSON.stringify(stage));
      for (let row = 0; row < prev.tetromino.shape.length; row++) {
        for (let col = 0; col < prev.tetromino.shape[row].length; col++) {
          if (prev.tetromino.shape[row][col] !== 0) {
            const stageRow = prev.position.y + row;
            const stageCol = prev.position.x + col;
            if (newStage[stageRow] && newStage[stageRow][stageCol]) {
              newStage[stageRow][stageCol] = {
                ...newStage[stageRow][stageCol],
                touched: true,
                color: prev.tetromino.color,
                shape: prev.tetromino.shape[row][col],
              };
            }
          }
        }
      }
      
      
      const { stage: cleanedStage, linesCleared } = removeLine(newStage);
      
     
      if (linesCleared > 0) {
        const linePoints = [100, 300, 500, 800]; 
        const points = linePoints[Math.min(linesCleared - 1, linePoints.length - 1)];
        setScore(prevScore => prevScore + points);
      }
      
      
      setStage(cleanedStage);
      
      
      
      const newPlayer = {
        position: { x: Math.floor((cleanedStage[0].length / 2)) - 2, y: 0 },
        tetromino: nextPiece,
      };

      const newNextPiece = createNewPlayer(cleanedStage);

      if (checkCollision(newPlayer.position, newPlayer.tetromino.shape, cleanedStage)) {
        setGameOver(true);
        setGameStarted(false);
      } else {
        setPlayer(newPlayer);
        setNextPiece(newNextPiece.tetromino);
      }
      
      return prev;
    });
  }, [checkCollision, removeLine, stage, nextPiece, score]);

  const rotatePlayer = useCallback(() => {
    setPlayer(prev => {
      const shape = prev.tetromino.shape;
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

      if (!checkCollision(prev.position, rotated, stage)) {
        return {
          ...prev,
          tetromino: { ...prev.tetromino, shape: rotated },
        };
      }
      return prev;
    });
  }, [checkCollision, stage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
      
      if (e.key === 'ArrowLeft') movePlayer(-1);
      else if (e.key === 'ArrowRight') movePlayer(1);
      else if (e.key === 'ArrowDown') dropPlayer();
      else if (e.key === 'ArrowUp') rotatePlayer();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, dropPlayer, movePlayer, rotatePlayer]);

  
  useEffect(() => {
    if (!gameStarted) return;

    const dropTime = score >= 500 ? 300 : 1000;

    const timer = setInterval(() => {
      if (gameStarted) {
        dropPlayer();
      }
    }, dropTime);

    intervalId.current = timer;

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [gameStarted, dropPlayer, score]);

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
    <div className="tetris-container">
      <h2>Tetris</h2>
      <div className="game-wrapper">
        <div className="left-panel">
          <NextPiece piece={nextPiece} />
          <LeftControls 
            movePlayer={movePlayer}
            dropPlayer={dropPlayer}
          />
        </div>
        <Stage stage={displayStage} />
        <RightControls
          startGame={startGame}
          rotatePlayer={rotatePlayer}
        />
      </div>
      <div className="displays">
        <Display score={score} gameOver={gameOver} />
      </div>
    </div>
  );
}

export default Tetris;
