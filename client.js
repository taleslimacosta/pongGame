var socket;

p1y = 0;
p2y = 0;
vel = 4;

score1 = 0;
score2 = 0;

px_b = 75;
py_b = 32;

var bx_speed = -6;
var by_speed = -6;
var level = 3;

function setup() {
  createCanvas(1200, 940);
  bg = loadImage(
    'https://raw.githubusercontent.com/talesjoabe/pongGame/master/background2.png'
  );

  // socket de comunicação com o server
  socket = io.connect('http://localhost:3000');
  socket.on('recv', newDrawing);
}

function newDrawing(data) {
  noStroke();

  if (data == 'as') {
    // amarelo - sobe
    p1y = p1y - vel;
  } else if (data == 'ad') {
    // amarelo - desce
    p1y = p1y + vel;
  } else if (data == 'vs') {
    // vermelho - sobe
    p2y = p2y - vel;
  } else if (data == 'vd') {
    // vermelho - desce
    p2y = p2y + vel;
  } else {
    var direction;
    bx_speed < 0 ? (direction = -1) : (direction = 1);
    vel = data / 25;
    var s = data / 25;

    if (bx_speed != 2 && bx_speed != -2 && s > 0 && s < 1) {
      bx_speed = 2 * direction;
      by_speed = 2 * direction;
      level = 1;
    } else if (bx_speed != 4 && bx_speed != -4 && s > 1 && s < 2) {
      bx_speed = 4 * direction;
      by_speed = 4 * direction;
      level = 2;
    } else if (bx_speed != 6 && bx_speed != -6 && s > 2 && s < 3) {
      bx_speed = 6 * direction;
      by_speed = 6 * direction;
      level = 3;
    } else if (bx_speed != 8 && bx_speed != -8 && s > 3 && s < 4) {
      bx_speed = 8 * direction;
      by_speed = 8 * direction;
      level = 4;
    } else if (bx_speed != 10 && bx_speed != -10 && s > 4 && s < 5) {
      bx_speed = 10 * direction;
      by_speed = 10 * direction;
      level = 5;
    } else if (bx_speed != 12 && bx_speed != -12 && s > 5 && s < 6) {
      bx_speed = 12 * direction;
      by_speed = 12 * direction;
      level = 6;
    } else if (bx_speed != 14 && bx_speed != -14 && s > 6 && s < 7) {
      bx_speed = 14 * direction;
      by_speed = 14 * direction;
      level = 7;
    } else if (bx_speed != 16 && bx_speed != -16 && s > 7 && s < 8) {
      bx_speed = 16 * direction;
      by_speed = 16 * direction;
      level = 8;
    } else if (bx_speed != 18 && bx_speed != -18 && s > 8 && s < 9) {
      bx_speed = 18 * direction;
      by_speed = 18 * direction;
      level = 9;
    } else if (bx_speed != 20 && bx_speed != -20 && s > 9 && s < 10) {
      bx_speed = 20 * direction;
      by_speed = 20 * direction;
      level = 10;
    }
    // console.log(s);
  }
}

function draw() {
  background(bg);

  // fill(0);
  // rect(1200, 0, 200, 150);

  fill(0);
  rect(-1, 800, 1250, 900);

  Score();

  fill(255, 204, 0);
  rect(0, p1y, 20, 150);

  fill(255, 0, 0);
  rect(1180, p2y, 20, 150);

  fill(255, 255, 255);
  ellipse(px_b, py_b, 25, 25);

  moveBall();
  movePlayers();
  bounce();
}

function movePlayers() {
  if (p1y >= 0 && p1y <= 800 - 150) {
    if (keyIsDown(UP_ARROW)) p1y = p1y - vel;
    else if (keyIsDown(DOWN_ARROW)) p1y = p1y + vel;
  } else if (p1y < 0) p1y = 0;
  else p1y = 650;

  if (p2y >= 0 && p2y <= 800 - 150) {
    if (keyIsDown(87)) p2y = p2y - vel;
    else if (keyIsDown(83)) p2y = p2y + vel;
  } else if (p2y < 0) p2y = 0;
  else p2y = 650;
}

function Score() {
  textSize(24);
  fill(255, 204, 0);
  text(' Jogador 1: ' + score1, 20, 925);
  fill(255, 0, 0);
  text('Jogador 2: ' + score2, 1000, 925);
  fill(255, 255, 255);
  text('DIFICULDADE: ' + level, 500, 870);
}

function moveBall() {
  px_b += bx_speed;
  py_b += by_speed;
}

function bounce() {
  if (py_b < 10 || py_b > 800 - 25) {
    by_speed *= -1;
  }

  if (py_b >= p1y && py_b <= p1y + 150 && px_b <= 25) {
    bx_speed *= -1;
    if (Math.random > 0.5) {
      by_speed *= -1;
    }
  } else if (px_b <= 0) {
    px_b = 50;
    py_b = p1y + 75;
    score2++;
    socket.emit('ponto2', score2);
  }

  if (py_b >= p2y && py_b <= p2y + 150 && px_b >= 1185) {
    bx_speed *= -1;
    if (Math.random > 0.5) {
      by_speed *= -1;
    }
  } else if (px_b >= 1200) {
    px_b = 1150;
    py_b = p2y + 75;
    score1++;
    socket.emit('ponto1', score1);
  }
}
