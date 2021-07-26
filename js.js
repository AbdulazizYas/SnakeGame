const cvs = document.getElementById('snake'),
      ctx = cvs.getContext("2d");

//Create the Unit 
const box = 32;

//load images
const ground = new Image();
ground.src = "imgs/ground.png";

const foodImg = new Image();
foodImg.src = "imgs/food.png";

//create the snake

let snake = [];
snake[0]={
  x: 9 * box,
  y: 10 * box
}

//create the food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}

//create the Score Variable

let score = 0;

//declare vars for audio
const dead = new Audio(),
      eat = new Audio(),
      up = new Audio(),
      down = new Audio(),
      right = new Audio(),
      left = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";

//control the Snake

let d;
document.addEventListener('keydown',direction);

function direction(e) {
  if(e.keyCode == 37 && d !== "RIGHT"){
    d = "LEFT";
    left.play();
  }else if(e.keyCode == 38 && d !== "DOWN"){
    d = "UP";
    up.play();
  }else if(e.keyCode == 39 && d !== "LEFT"){
    d = "RIGHT";
    right.play();
  }else if(e.keyCode == 40 && d !== "UP"){
    d = "DOWN";
    down.play();
  }
  
}

//create collusion function
function collusion(head,array) {
  for (let i = 0; i < array.length; i++) {
    if(head.x == array[i].x && head.y == array[i].y){
 
      return true;
    }
    
  }
  return false;
}

//create the Function that will draw everything

function draw() {
  ctx.drawImage(ground,0,0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0)? "#6F1E51" : "#833471";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);

    ctx.strokeStyle = "#009432";
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);

  }
  ctx.drawImage(foodImg,food.x,food.y);

  //old head position

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

    //which Direction go snake
  if(d == "LEFT") snakeX -= box;
  if(d == "UP") snakeY -= box;
  if(d == "RIGHT") snakeX += box;
  if(d == "DOWN") snakeY += box;

  

  //if the snake eats the food
  if(snakeX == food.x && snakeY == food.y){
    score++
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
    eat.play();
    //here we don't want to remove tail
  }else{
    //remove the tail
    snake.pop();
  }

  //add a new head
  let newHead = {
    x:snakeX,
    y:snakeY
  }

  //game over
  if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collusion(newHead,snake)){
    clearInterval(game);
    dead.play();
    setTimeout(rel,2000);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px cursive";
  ctx.fillText(score, 2*box,1.6*box);
}

let game = setInterval(draw,150);
function rel(){
  location.reload();
}