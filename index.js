let apple, appleInterval, direction, gameInterval, gridSize = 50;
let snakeCoords = [{row: 7, column: 6}, {row: 7, column: 7}, {row: 7, column: 8}]; // initial snake
const generateGrid = (size) => {
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      const square = document.createElement('li');
      square.setAttribute('data-row', row);
      square.setAttribute('data-column', column);
      document.getElementById('grid').append(square);
    }
  }
}
document.addEventListener('keydown', event => {
  if (event.key === 'i' && direction !== 'down') direction = 'up';
  if (event.key === 'l' && direction !== 'left') direction = 'right';
  if (event.key === 'k' && direction !== 'up') direction = 'down';
  if (event.key === 'j' && direction !== 'right') direction = 'left';
});
const makeApple = () => ({ row: Math.floor(Math.random() * (gridSize - 1) + 1), column: Math.floor(Math.random() * (gridSize - 1) + 1)});
const placeApple = () => {
  if (apple) return;
  let newApple = makeApple();
  if (!snakeCoords.every(coord => coord.row !== newApple.row && coord.column !== newApple.column)) return placeApple();
  apple = newApple; 
  document.querySelector(`[data-row="${apple.row}"][data-column="${apple.column}"]`).classList.add('apple');
};

const moveSnake = () => {
  [...document.getElementsByTagName('li')].forEach((square) => square.classList.remove('active'));
  switch(direction) {
    case 'up':
      snakeCoords[0].row > 0 ? snakeCoords.splice(0, 0, { row: snakeCoords[0].row - 1, column: snakeCoords[0].column }) : lose();
      break;
    case 'right':
      snakeCoords[0].column < gridSize - 1 ? snakeCoords.splice(0, 0, {column: snakeCoords[0].column + 1, row: snakeCoords[0].row}) : lose();
      break;
    case 'down':
      snakeCoords[0].row < gridSize - 1 ? snakeCoords.splice(0, 0, {row: snakeCoords[0].row + 1, column: snakeCoords[0].column}) : lose();
      break;
    default: // left
      snakeCoords[0].column > 0 ? snakeCoords.splice(0, 0, {column: snakeCoords[0].column - 1, row: snakeCoords[0].row}) : lose();
  }
  if (!apple || (apple.row !== snakeCoords[0].row || apple.column !== snakeCoords[0].column)) {
    snakeCoords.pop();
  } else if (apple && (apple.row === snakeCoords[0].row && apple.column === snakeCoords[0].column)) {
    snakeCoords.push({ row: snakeCoords[snakeCoords.length - 1].row + 1, column: snakeCoords[snakeCoords.length - 1].column });
    document.querySelector(`[data-row="${apple.row}"][data-column="${apple.column}"]`).classList.remove('apple');
    apple = null;
  }
  for (let i = 0; i < snakeCoords.length; i++) {
    document.querySelector(`[data-row="${snakeCoords[i].row}"][data-column="${snakeCoords[i].column}"]`).classList.add('active');
  }
};
const lose = () => (confirm('You\'ve lost. Would you like to start a new game?')) ? newGame() : clearInterval(gameInterval);
const newGame = () => {
  direction = 'left';
  snakeCoords = [{row: 7, column: 6}, {row: 7, column: 7}, {row: 7, column: 8}]; // initial snake
  clearInterval(gameInterval);
  clearInterval(appleInterval);
  gameInterval = setInterval(moveSnake, 100);
  appleInterval = setInterval(placeApple, 5000);
}
generateGrid(gridSize);
newGame();
