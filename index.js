let food, appleInterval, direction, gameInterval, gridSize = 50, hasBoost = false, score = 0, snakeCoords;
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
const makeFood = () => ({ row: Math.floor(Math.random() * (gridSize - 1) + 1), column: Math.floor(Math.random() * (gridSize - 1) + 1)});
const placeFood = () => {
  if (food) return;
  let newFood = makeFood();
  if (!snakeCoords.every(coord => coord.row !== newFood.row && coord.column !== newFood.column)) return placeFood();
  food = { coords: newFood }; 
  const odds = Math.random();
  (odds < 0.3 || hasBoost) ? food.type = 'apple' : food.type = 'boost';
  document.querySelector(`[data-row="${food.coords.row}"][data-column="${food.coords.column}"]`).classList.add(food.type);
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
  for (let i = 1; i <= snakeCoords.length - 1; i++) {
    if (snakeCoords[0].row === snakeCoords[i].row && snakeCoords[0].column === snakeCoords[i].column) lose();
  }
  if (!food || (food.coords.row !== snakeCoords[0].row || food.coords.column !== snakeCoords[0].column)) {
    snakeCoords.pop();
  } else if (food && (food.coords.row === snakeCoords[0].row && food.coords.column === snakeCoords[0].column)) {
    (food.type === 'boost') ? boostSnake() : growSnake();
    snakeCoords.pop();
  }
  for (let i = 0; i < snakeCoords.length; i++) {
    document.querySelector(`[data-row="${snakeCoords[i].row}"][data-column="${snakeCoords[i].column}"]`).classList.add('active');
  }
};

const boostSnake = () => {
  document.querySelector(`[data-row="${food.coords.row}"][data-column="${food.coords.column}"]`).classList.remove(food.type);
  food = null, hasBoost = true;
  clearInterval(gameInterval);
  gameInterval = setInterval(moveSnake, 30);
  setTimeout(() => {
    hasBoost = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, 100);
  }, 7000)
}
const growSnake = () => {
  snakeCoords.push({ row: snakeCoords[snakeCoords.length - 1].row + 1, column: snakeCoords[snakeCoords.length - 1].column });
  document.querySelector(`[data-row="${food.coords.row}"][data-column="${food.coords.column}"]`).classList.remove(food.type);
  food = null, score += 1;
  document.getElementById('score').innerText = score;
}
const lose = () => (confirm('You\'ve lost. Would you like to start a new game?')) ? newGame() : clearInterval(gameInterval);
const newGame = () => {
  direction = 'left', score = 0, food = null;
  snakeCoords = [{row: 25, column: 36}, {row: 25, column: 37}, {row: 25, column: 38}]; // initial snake
  clearInterval(gameInterval);
  clearInterval(appleInterval);
  gameInterval = setInterval(moveSnake, 75);
  appleInterval = setInterval(placeFood, 5000);
}
generateGrid(gridSize);
newGame();
