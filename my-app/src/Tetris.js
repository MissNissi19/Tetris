import './App.css';
import Stage from './Stage';
import React, { useState, useEffect, useRef } from 'react';
import { Tetrominos } from './Tetrominos';

function Tetris() {
  function createStage() {
   const grid =[]
   const rows= 20;
   const cols = 12;

   for(let x=0; x< rows; x++) {
      const row = []
      for(let y=0; y< cols; y++) {
        row.push(Tetrominos[0])
      }
      grid.push(row)

   }
   return grid;
   
} 
const [stage, setStage] = useState(createStage());

const [player, setPlayer] = useState(
  { 
    position: { x: 3, y: 0 }, 
    tetromino: {
      shape: [], 
     color: "rgb(0, 42, 255)"
    }
  }
)

const [displayStage, setDisplayStage] = useState(stage);
const [ gameStarted, setGameStarted] = useState(false);
const intervalId = useRef(null);

function placeTetromino(cleanStage) {
  const newStage = JSON.parse(JSON.stringify(cleanStage));

  //[
    // ["I", 0, 0, 0], 
    // ["I", 0, 0, 0], 
    // ["I", 0, 0, 0], 
    // ["I", 0, 0, 0]]


    // [
      //     [0,  0, "J"],
      //     ["J","J","J"],
      //     [0,   0,   0]
      //     ], 
  console.log(newStage)

    // [ [ [ {shape: [], color: '}]]]
  for(let row = 0; row < player.tetromino?.shape?.length; row++) {
    for(let col = 0; col < player.tetromino?.shape[row].length; col++) {
      if(player.tetromino.shape[row][col] != 0) {
        const stageRow = player.position.y + row
        const stageCol = player.position.x + col
        // console.log("placing piece at row", stageRow)
        // console.log("placing piece at col", stageCol)

        newStage[stageRow][stageCol].shape = player.tetromino.shape[row]
        newStage[stageRow][stageCol].color = player.tetromino.color
      } 
    }
  }
  
  setStage((prevStage) => newStage);
}



useEffect(() => {
  if (gameStarted && intervalId.current === null) {
    intervalId.current = setInterval(() => {
      movePlayerDown();
    }, 1000);
  }
  console.log("useEffect")
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


function setShape() {
  const pieces = Object.keys(Tetrominos).filter(key => key !== "0")
  const randomIndex = Math.floor(Math.random() * pieces.length);
  const randomPieceName = pieces[randomIndex];
  const randomPiece = Tetrominos[randomPieceName];
  

  setPlayer({
    position: { x: 4, y: 0 },
    tetromino: randomPiece
  });
}


function reRenderStage() {
  const newStage = JSON.parse(JSON.stringify(stage));

  for(let row = 0; row < newStage.length; row++) {
    for(let col = 0; col < newStage[row].length; col++) {
      const column = newStage[row][col];
      if(!column.touched) {
        newStage[row][col] = Tetrominos[0];
      }
    }
  }

  setStage((prevStage) => newStage);
  return newStage
}

function startGame() {
  placeTetromino(stage);
  setGameStarted(true);
  setShape()
}

function updatePlayerPosition(xAmount, yAmount)  {
  setPlayer((oldPlayer) => {
      return {
        ...oldPlayer,
        position: {
          x: oldPlayer.position.x + xAmount,
          y: oldPlayer.position.y + yAmount
        }
      }
  })
}  

function movePlayerDown() {
  updatePlayerPosition(0, 1);
}




return (
  <div>
    <h2>Tetris</h2>
    <button onClick={movePlayerDown}> muta-te la ma-ta</button>
    <button onClick={startGame}> start Game </button>
    <Stage stage={stage} />
  </div>
);
}

export default Tetris;