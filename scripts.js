let gameStart = false;
let gameMessage = document.getElementById("gameMessage");

let playerOne;
let playerOneMovement = {
    left: false,
    right: true,
    up: true,
    down: true
};
let playerOneScore = 0;

let playerTwo;
let playerTwoMovement = {
    left: true,
    right: false,
    up: true,
    down: true
}
let playerTwoScore = 0;

let scl = 10;

function setup() {
    createCanvas(1200, 700);
    playerOne = new Snake(-20, 350, '#C63697');
    playerOne.speedX = 0;
    playerTwo = new Snake(1200, 350, '#57A2DA');
    playerTwo.speedX = 0;
    playerOneMovement = {left: false, right: true, up: true, down: true}
    playerTwoMovement = {left: false, right: true, up: true, down: true}
    frameRate(30);
}

function draw() {
    background(13, 15, 47);

    playerOne.update();
    playerOne.show();
    playerOne.total++;
    playerOne.death();
   
    playerTwo.update();
    playerTwo.show();
    playerTwo.total++;
    playerTwo.death();

    fill(255, 0, 100);
}


function Snake(x, y, color) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.total = 1;
    this.tail = [];

    this.dir = function (x, y) {
        this.speedX = x;
        this.speedY = y;
    }

    this.death = function () {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            let o = dist(playerOne.x, playerOne.y, pos.x, pos.y);
            let t = dist(playerTwo.x, playerTwo.y, pos.x, pos.y);
            if (gameStart) {
                if (d < 1) {
                    this.total = 0;
                    this.tail = [];
                    this.alive = 0;
                    if (playerOne.total == 0) {
                        playerTwoScore++;
                        document.getElementById("p2Score").innerHTML = playerTwoScore;
                        gameMessage.innerHTML = "Player Two Wins"
                        setTimeout(gameMessage.innerHTML = "Press Enter to Start", 2000);
                        gameStart = false;
                    } else if (playerTwo.total == 0) {
                        playerOneScore++;
                        document.getElementById("p1Score").innerHTML = playerOneScore;
                        gameMessage.innerHTML = "Player One Wins"
                        setTimeout(gameMessage.innerHTML = "Press Enter to Start", 2000);
                        gameStart = false;
                    }
                    setup()
                } else if (o < 1) {
                    playerOne.total = 0;
                    playerOne.tail = [];
                    playerOne.speedX = 0;
                    playerOne.speedY = 0;
                    playerTwoScore++;
                    document.getElementById("p2Score").innerHTML = playerTwoScore;
                    gameMessage.innerHTML = "Player Two Wins"
                    setTimeout(gameMessage.innerHTML = "Press Enter to Start", 2000);
                    gameStart = false;
                    setup();
                } else if (t < 1) {
                    playerTwo.total = 0;
                    playerTwo.tail = [];
                    playerTwo.speedX = 0;
                    playerTwo.speedY = 0;
                    playerOneScore++;
                    document.getElementById("p1Score").innerHTML = playerOneScore;
                    gameMessage.innerHTML = "Player One Wins"
                    setTimeout(gameMessage.innerHTML = "Press Enter to Start", 2000);
                    gameStart = false;
                    setup();
                }
            }
        }
    }

    this.update = function () {
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }
        this.x = this.x + this.speedX * scl;
        this.y = this.y + this.speedY * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }
    this.show = function () {
        fill(color);
        stroke(0, 0, 0, 0)
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}


function keyPressed() {
    if(gameStart) {
        if (keyCode === 87) {
            if (playerOneMovement.up == true) {
                playerOneMovement.down = false;
                playerOneMovement.left = true;
                playerOneMovement.right = true;
                playerOne.dir(0, -1);
            }
        } else if (keyCode === 83) {
            if (playerOneMovement.down == true) {
                playerOneMovement.up = false;
                playerOneMovement.left = true;
                playerOneMovement.right = true;
                playerOne.dir(0, 1);
            }
        } else if (keyCode === 68) {
            if (playerOneMovement.right == true) {
                playerOneMovement.left = false;
                playerOneMovement.up = true;
                playerOneMovement.down = true;
                playerOne.dir(1, 0);
            }
        } else if (keyCode === 65) {
            if (playerOneMovement.left == true) {
                playerOneMovement.right = false;
                playerOneMovement.up = true;
                playerOneMovement.down = true;
                playerOne.dir(-1, 0);
            }
        } else if (keyCode === UP_ARROW) {
            if (playerTwoMovement.up == true) {
                playerTwoMovement.down = false;
                playerTwoMovement.left = true;
                playerTwoMovement.right = true;
                playerTwo.dir(0, -1);
            }
        } else if (keyCode === DOWN_ARROW) {
            if (playerTwoMovement.down == true) {
                playerTwoMovement.up = false;
                playerTwoMovement.right = true;
                playerTwoMovement.left = true;
                playerTwo.dir(0, 1);
            }
        } else if (keyCode === RIGHT_ARROW) {
            if (playerTwoMovement.right == true) {
                playerTwoMovement.left = false;
                playerTwoMovement.up = true;
                playerTwoMovement.down = true;
                playerTwo.dir(1, 0)
            }
        } else if (keyCode === LEFT_ARROW) {
            if (playerTwoMovement.left == true) {
                playerTwoMovement.right = false;
                playerTwoMovement.up = true;
                playerTwoMovement.down = true;
                playerTwo.dir(-1, 0);
            }
        }
    } else if (keyCode === 13) {
        playerOne.speedX = 1;
        playerTwo.speedX = -1;
        gameStart = true;
        gameMessage.innerHTML = "Game Begin"
    }
}