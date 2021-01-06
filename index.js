let direction;
let snakeCoords = [{row: 7, column: 6}, {row: 7, column: 7}, {row: 7, column: 8}]; // initial snake
const gridSize = 50; // might  be nice to let the user set the grid size
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
const moveSnake = () => {
  [...document.getElementsByTagName('li')].forEach((square) => {
    square.classList.remove('active')
  });
  snakeCoords.pop();
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
  for (let i = 0; i < snakeCoords.length; i++) {
    const square = document.querySelector(`[data-row="${snakeCoords[i].row}"][data-column="${snakeCoords[i].column}"]`)
    square.classList.add('active');
  }
};
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'k': // up
      if (direction === 'down') break;
      direction = 'up';
      break;
    case 'l': // right
      if (direction === 'left') break;
      direction = 'right';
      break;
    case 'j': // down
      if (direction === 'up') break;
      direction = 'down';
      break;
    case 'h': // left
      if (direction === 'right') break;
      direction = 'left';
      break;
  }
});
let gameInterval;
const lose = () => {
  if (confirm('You\'ve lost. Would you like to start a new game?')) {
    newGame();
  } else {
    clearInterval(gameInterval);
  }
}
const newGame = () => {
  direction = 'left';
  snakeCoords = [{row: 7, column: 6}, {row: 7, column: 7}, {row: 7, column: 8}]; // initial snake
  clearInterval(gameInterval);
  gameInterval = setInterval(moveSnake, 150);
}
generateGrid(gridSize);
newGame();
