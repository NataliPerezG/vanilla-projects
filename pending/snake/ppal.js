const board = document.querySelector(".board");
const initMessage = document.querySelector(".char");

const boardSize = 15;
let snake = [{ x: 1, y: 1 }];
let food = generateFood();
let direction = "right";
let velocity = 200;
let gameInterval = null;
let isGameRunning = false;
let canChangeDirection = true; // Previene múltiples giros en un mismo frame

function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

function drawSnake() {
  snake.forEach((snakePart) => {
    const snakeSegment = createElement("div", "snake");
    setPosition(snakeSegment, snakePart);
    board.append(snakeSegment);
  });
}

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumnStart = position.x;
  element.style.gridRowStart = position.y;
}

function drawFood() {
  const foodElement = createElement("div", "food");
  setPosition(foodElement, food);
  board.append(foodElement);
}

function generateFood() {
  let newFood;
  let isOnSnake;

  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize) + 1,
      y: Math.floor(Math.random() * boardSize) + 1,
    };
    isOnSnake = snake.some(
      (snakeSegment) =>
        snakeSegment.x === newFood.x && snakeSegment.y === newFood.y,
    );
  } while (isOnSnake);
  return newFood;
}

function moveSnake() {
  canChangeDirection = true; // Permite cambiar dirección para el siguiente paso

  let head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  if (checkCollision(head)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseVelocity();
  } else {
    snake.pop();
  }
}

function increaseVelocity() {
  if (velocity >= 200) {
    velocity -= 5;
  } else if (velocity >= 150) {
    velocity -= 3;
  } else {
    velocity -= 1;
  }

  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    moveSnake();
    if (isGameRunning) {
      draw();
    }
  }, velocity);
}

function resetGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  isGameRunning = false;
  snake = [{ x: 1, y: 1 }];
  food = generateFood();
  direction = "right";
  velocity = 200;
  board.innerHTML = "";
  board.append(initMessage);
}

function checkCollision(head) {
  if (head.x < 1 || head.x > boardSize || head.y < 1 || head.y > boardSize) {
    return true;
  }
  for (let i = 0; i < snake.length; i++) {
    const element = snake[i];
    if (head.x === element.x && head.y === element.y) {
      return true;
    }
  }
  return false;
}

function startGame() {
  if (isGameRunning) return;

  isGameRunning = true;
  board.innerHTML = "";
  draw(); // Renderizado inmediato para que aparezca la serpiente sin esperar 200ms

  gameInterval = setInterval(() => {
    moveSnake();
    if (isGameRunning) {
      draw();
    }
  }, velocity);
}

function handlerKey(e) {
  if (e.key === "Enter" && !isGameRunning) {
    startGame();
    return;
  }
  // Si no se ha procesado el movimiento del tick anterior, ignoramos nuevas teclas
  if (isGameRunning && canChangeDirection) {
    let newDirection = direction;

    switch (e.key) {
      case "ArrowUp":
        if (direction !== "down") newDirection = "up";
        break;
      case "ArrowDown":
        if (direction !== "up") newDirection = "down";
        break;
      case "ArrowLeft":
        if (direction !== "right") newDirection = "left";
        break;
      case "ArrowRight":
        if (direction !== "left") newDirection = "right";
        break;
    }

    if (newDirection !== direction) {
      direction = newDirection;
      canChangeDirection = false; // Bloquea giros extra hasta el siguiente moveSnake()
    }
  }
}

document.addEventListener("keydown", (e) => {
  handlerKey(e);
});
