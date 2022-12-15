const canvas = document.getElementById("canvas");
let bird;
let hint;
let pipesBottom = [];
let pipesTop = [];
let x, y;
let random = 0;

const startGame = () => {
  bird = new component(50, 50, "yellow", 600, 120, "bird");
  hint = new component("50px", "Consolas", "black", 600, 120, "text");
  hint.text = "Click to play";
  hint.update();
  pipesBottom = [];
  pipesTop = [];
  canvas.addEventListener("click", play);
};

const play = () => {
  myGameArea.start();
  canvas.removeEventListener("click", play);
};

let myGameArea = {
  canvas: canvas,
  start: function () {
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.interval = setInterval(() => {
      for (i = 0; i < pipesBottom.length; i += 1) {
        if (bird.crashWith(pipesBottom[i]) || bird.crashWith(pipesTop[i])) {
          myGameArea.stop();
          return;
        }
      }
      myGameArea.clear();
      myGameArea.frameNo += 1;
      if (myGameArea.frameNo == 1 || everyinterval(270)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200;
        random = Math.random() * 600 - 300;
        pipesBottom.push(new component(80, 10000, "green", 1900, 600 - random, "pipe"));
        pipesTop.push(new component(80, 10000, "green", 1900, -9700 - random, "pipe"));
      }
      for (i = 0; i < pipesBottom.length; i += 1) {
        pipesBottom[i].x += -1.5;
        pipesBottom[i].update();
        pipesTop[i].x += -1.5;
        pipesTop[i].update();
      }
      if (this.gravitySpeed < 10) {
        this.gravitySpeed += this.gravity;
      }
      bird.y += this.gravitySpeed;
      bird.update();
    }, 4);
    myGameArea.canvas.addEventListener("click", clickEvent);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
    myGameArea.canvas.removeEventListener("click", clickEvent);
    startGame();
  },
};

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function component(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = () => {
    ctx = canvas.getContext("2d");
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.crashWith = function (otherobj) {
    let myleft = this.x;
    let myright = this.x + this.width;
    let mytop = this.y;
    let mybottom = this.y + this.height;
    let otherleft = otherobj.x;
    let otherright = otherobj.x + otherobj.width;
    let othertop = otherobj.y;
    let otherbottom = otherobj.y + otherobj.height;
    let crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

const clickEvent = () => {
  myGameArea.clear();
  myGameArea.gravitySpeed = -4;
  bird.update();
  for (i = 0; i < pipesBottom.length; i += 1) {
    pipesBottom[i].update();
    pipesTop[i].update();
  }
};
