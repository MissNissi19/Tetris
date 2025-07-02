import './App.css';
import Stage from './Stage';
import React, { useState, useEffect, useRef } from 'react';
import { Tetrominos } from './Tetrominos';

function Tetris() {
  function createStage() {
    const grid = []
    const rows = 20;
    const cols = 12;

    for (let x = 0; x < rows; x++) {
      const row = []
      for (let y = 0; y < cols; y++) {
        row.push(Tetrominos[0])
      }
      grid.push(row)
    }
    return grid;
  }

  const [stage, setStage] = useState(createStage());

  const [player, setPlayer] = useState(
    {
      position: { x: 5, y: 0 },
      tetromino: {
        shape: [],
        color: "rgb(0, 42, 255)"
      }
    }
  )

  const [gameStarted, setGameStarted] = useState(false);
  const intervalId = useRef(null);

  useEffect(() => {
    if (gameStarted && intervalId.current === null) {
      intervalId.current = setInterval(() => {
        movePlayerDown();
      }, 1000);
    }

    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [gameStarted])

  useEffect(() => {
    if (gameStarted) {
      const cleanStage = reRenderStage();
      placeTetromino(cleanStage);
    }
  }, [player, gameStarted]);

  function placeTetromino(cleanStage, fixed = false) {
    const newStage = JSON.parse(JSON.stringify(cleanStage));

    for (let row = 0; row < player.tetromino?.shape?.length; row++) {
      for (let col = 0; col < player.tetromino?.shape[row].length; col++) {
        if (player.tetromino.shape[row][col] !== 0) {
          const stageRow = player.position.y + row
          const stageCol = player.position.x + col

          if (!newStage[stageRow][stageCol].touched) {
            newStage[stageRow][stageCol].shape = player.tetromino.shape[row];
            newStage[stageRow][stageCol].color = player.tetromino.color;
            if (fixed) {
              newStage[stageRow][stageCol].touched = true;
            }
          }
        }
      }
    }

    setStage(() => newStage);
  }

  function setShape() {
    const pieces = Object.keys(Tetrominos).filter(key => key !== "0")
    const randomIndex = Math.floor(Math.random() * pieces.length);
    const randomPieceName = pieces[randomIndex];
    const randomPiece = Tetrominos[randomPieceName];

    setPlayer({
      position: { x: 5, y: 0 },
      tetromino: randomPiece
    });
  }

  function reRenderStage() {
    const newStage = JSON.parse(JSON.stringify(stage));

    for (let row = 0; row < newStage.length; row++) {
      for (let col = 0; col < newStage[row].length; col++) {
        const column = newStage[row][col];
        if (!column.touched) {
          newStage[row][col] = Tetrominos[0];
        }

      }
    }

    return newStage
  }

  function startGame() {
    placeTetromino(stage);
    setGameStarted(true);
    setShape()
  }

  function updatePlayerPosition(xAmount, yAmount) {
    setPlayer((oldPlayer) => {
        const newPosition = {
            x: oldPlayer.position.x + xAmount,
            y: oldPlayer.position.y + yAmount,
        };

        if (!checkCollision(newPosition, oldPlayer.tetromino.shape, stage)) {
            return {
                ...oldPlayer,
                position: newPosition,
            };
        }

        if (yAmount > 0) {
          setStage(prevStage => {
              const newStage = JSON.parse(JSON.stringify(prevStage));
              for (let row = 0; row < oldPlayer.tetromino.shape.length; row++) {
                  for (let col = 0; col < oldPlayer.tetromino.shape[row].length; col++) {
                      if (oldPlayer.tetromino.shape[row][col] !== 0) {
                          const stageRow = oldPlayer.position.y + row;
                          const stageCol = oldPlayer.position.x + col;
                          newStage[stageRow][stageCol].shape = oldPlayer.tetromino.shape[row];
                          newStage[stageRow][stageCol].color = oldPlayer.tetromino.color;
                          newStage[stageRow][stageCol].touched = true;
                      }
                  }
              }
              return newStage;
          });
      
          const pieces = Object.keys(Tetrominos).filter(key => key !== "0");
          const randomIndex = Math.floor(Math.random() * pieces.length);
          const randomPieceName = pieces[randomIndex];
          const randomPiece = Tetrominos[randomPieceName];
          return {
              position: { x: 5, y: 0 },
              tetromino: randomPiece
          };
        }
        return oldPlayer;
    });
}

  function movePlayerDown() {
    updatePlayerPosition(0, 1);
  }

  function movePlayerRight() {
    updatePlayerPosition(1, 0)
  }

  function movePlayerLeft() {
    updatePlayerPosition(-1, 0)
  }

  function checkCollision(newPosition, shape, stage) {
    for (let row = 0; row < shape?.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const posX = newPosition.x + col;
          const posY = newPosition.y + row;

          if (posX < 0 || posX >= stage[0].length || posY >= stage.length) {
            return true;
          }

          if (stage[posY] && stage[posY][posX] && stage[posY][posX].touched) {
            return true;
          }
        }
      }
    }
    return false;
  }

  return (
    <div>
      <h2>Tetris</h2>
      <button onClick={movePlayerDown}>muta jos</button>
      <button onClick={movePlayerRight}>muta dreapta</button>
      <button onClick={movePlayerLeft}>muta stanga</button>
      <button onClick={startGame}>start Game</button>
      <Stage stage={stage} />
    </div>
  );
}

export default Tetris;
