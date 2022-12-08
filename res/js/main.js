let bird;
let pipes = [];

function startGame() {
  myGameArea.start();
  bird = new component(40, 40, "yellow", 600, 120);
}

var myGameArea = {
  canvas: document.getElementById("canvas"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(() => {
      for (i = 0; i < pipes.length; i += 1) {
        if (bird.crashWith(pipes[i])) {
          myGameArea.stop();
          return;
        }
      }
      myGameArea.clear();
      myGameArea.frameNo += 1;
      if (myGameArea.frameNo == 1 || everyinterval(360)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200;
        pipes.push(new component(80, 1000, "green", 1900, 400));
      }
      for (i = 0; i < pipes.length; i += 1) {
        pipes[i].x += -1;
        pipes[i].update();
      }
      bird.y += 1;
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
  },
};

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = () => {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
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
  bird.y -= 120;
  bird.update();
  for (i = 0; i < pipes.length; i += 1) {
    pipes[i].update();
  }
};
