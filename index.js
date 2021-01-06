let direction = 'left';
const gridSize = 10;
const snakeCoords = [{row: 7, column: 6}, {row: 7, column: 7}, {row: 7, column: 8}];
const generateGrid = (size) => {
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < gridSize; column++) {
      const square = document.createElement('li');
      square.setAttribute('id', `${row}${column}`);
      square.setAttribute('data-row', row);
      square.setAttribute('data-column', column);
      square.classList.add('square');
      // square.innerText = `${row}${column}`;
      document.getElementById('grid').append(square);
    }
  }
}

const moveSnake = () => {
  [...document.getElementsByClassName("square")].forEach((square) => {
    square.classList.remove("active")
  });
  snakeCoords.pop();
  switch(direction) {
    case 'up':
      if (snakeCoords[0].row > 0) {
        snakeCoords.splice(0, 0, {row: snakeCoords[0].row - 1, column: snakeCoords[0].column});
      }
      break;
    case 'right':
      if (snakeCoords[0].column < gridSize) {
        snakeCoords.splice(0, 0, {column: snakeCoords[0].column + 1, row: snakeCoords[0].row});
      }
      break;
    case 'down':
      if (snakeCoords[0].row < gridSize) {
        snakeCoords.splice(0, 0, {row: snakeCoords[0].row + 1, column: snakeCoords[0].column});
      }
      break;
    default: // left
      if (snakeCoords[0].column > 0) {
        snakeCoords.splice(0, 0, {column: snakeCoords[0].column - 1, row: snakeCoords[0].row});
      }
      break;
  }

  for (let i = 0; i < snakeCoords.length; i++) {
    const square = document.getElementById(`${snakeCoords[i].row}${snakeCoords[i].column}`);
    square.classList.add("active");
  }
};

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 75: // up
      if (direction === 'down') break;
      direction = 'up';
      break;
    case 76: // right
      if (direction === 'left') break;
      direction = 'right';
      break;
    case 74: // down
      if (direction === 'up') break;
      direction = 'down';
      break;
    case 72: // left
      if (direction === 'right') break;
      direction = 'left';
      break;
    default:
      break;
  }
});

setInterval(() => {
  moveSnake();
}, 250);

generateGrid(gridSize);
