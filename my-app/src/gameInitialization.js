import { Tetrominos } from './Tetrominos';

export const createStage = () => {
  const grid = [];
  const rows = 20;
  const cols = 12;
  for (let x = 0; x < rows; x++) {
    grid.push(Array.from(Array(cols), () => Tetrominos[0]));
  }
  return grid;
};

export const createNewPlayer = (stage) => {
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
