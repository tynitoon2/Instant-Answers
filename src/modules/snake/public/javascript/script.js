/**
 * This is your main script file. Please refer to the documentation for more information.
 */

var IARuntime = function() {
    function Snake(iaData) {

        // constructor
    }

    /**
     * runs at runtime
     */
    Snake.prototype.run = function () {
        var play = document.getElementById('start');
        var can = document.getElementById("game");
        var cross = document.getElementById("cross");
        var elem = document.getElementById("background_games");
        var state = 0; // 0 = little interface 1= big interface
        var scope = this;
        can.style.display = "none";
        cross.style.display = "none";
        play.addEventListener("click", function(){
            if (state === 0){
                elem.style.height = "800px";
                setTimeout(function(){
                    can.style.display = "block";
                    cross.style.display = "block";
                }, 800)
                play.style.cursor = "default";
                scope.game();

                state = 1;
            }
        })
        cross.addEventListener("click", function(){
            if(state === 1){
                elem.style.height = "200px";
                can.style.display = "none";
                cross.style.display = "none";
                setTimeout(function(){
                play.style.cursor = "pointer";
                }, 800)
                state = 0;

            }
        })
    };
    // function that's gonna run at runtime

    Snake.prototype.game = function () {
        var mycanvas = document.getElementById('mycanvas');
        var ctx = mycanvas.getContext('2d');
        var snakeSize = 20;
        mycanvas.width = 800;
        mycanvas.height = 600;
        var w = 800;
        var h = 600;
        var score = 0;
        var snake;
        var food;
        var bonbon;
        var screen = 0;
        var gameloop;

        var bodySnake = function (x, y) {
            ctx.fillStyle = 'green';
            ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
            ctx.strokeStyle = 'darkgreen';
            ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        }

        var pizza = function (x, y) {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
            ctx.fillStyle = 'red';
            ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
        }
        var bonus = function (x, y) {
            ctx.fillStyle = 'pink';
            ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        }

        var scoreText = function () {
            var score_text = "Score: " + score;
            ctx.font = '12pt Calibri,Geneva,Arial';
            ctx.fillStyle = 'blue';
            ctx.fillText(score_text, mycanvas.width - 80, mycanvas.height - 15);
        }

        var drawSnake = function () {
            var length = 4;
            snake = [];
            for (var i = length - 1; i >= 0; i--) {
                snake.push({x: i, y: 0});
            }
        }

        var paint = function () {
            ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);

                ctx.fillStyle = 'lightgrey';
                ctx.fillRect(0, 0, w, h);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(0, 0, w, h);
                var snakeX = snake[0].x;
                var snakeY = snake[0].y;

                if (direction == 'right') {
                    snakeX++;
                }
                else if (direction == 'left') {
                    snakeX--;
                }
                else if (direction == 'up') {
                    snakeY--;
                } else if (direction == 'down') {
                    snakeY++;
                }

                if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
                    //restart game
                    gameOver();
                }

                if (snakeX == food.x && snakeY == food.y) {
                    var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
                    score++;
                    createFood(); //Create new food
                    if (bonbon.x == -1 && Math.trunc((Math.random() * 1000) % 4) == 0) {
                        createBonus(); //Create new food
                    }
                } else if (snakeX == bonbon.x && snakeY == bonbon.y) {
                    var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
                    score += 10;
                    bonbon = {
                        x : -1,
                        y : -1
                    };
                } else {
                    var tail = snake.pop(); //pops out the last cell
                    tail.x = snakeX;
                    tail.y = snakeY;
                }
                //The snake can now eat the food.
                snake.unshift(tail); //puts back the tail as the first cell

                for (var i = 0; i < snake.length; i++) {
                    bodySnake(snake[i].x, snake[i].y);
                }

                pizza(food.x, food.y);
                bonus(bonbon.x, bonbon.y);
                scoreText();

                console.log(mycanvas.offsetLeft);

        }
        var gameOver = function() {
            ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
            gameloop = clearInterval(gameloop);
            ctx.fillStyle = "#000000";
            ctx.font = '20pt Calibri,Geneva,Arial';

            var textString = "GAMEOVER!!!\n Click To Restart",
                textWidth = ctx.measureText(textString).width;
            ctx.fillText(textString, (mycanvas.width / 2) - (textWidth / 2), 300);
            screen = 2;
        }
        var start = function () {
            ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
            ctx.fillStyle = "#000000";
            ctx.font = '20pt Calibri,Geneva,Arial';
            var textString = "Start",
                textWidth = ctx.measureText(textString).width;
            ctx.fillText(textString, (mycanvas.width / 2) - (textWidth / 2), 300);

        }

        var createFood = function () {
            var seekX = 0;
            var seekY = 0;
            var testPos = true;

            for (var i = 0; i < 50 && testPos; ++i) {
                seekX = Math.floor((Math.random() * 10000) % (mycanvas.width / 20));
                seekY = Math.floor((Math.random() * 10000) % (mycanvas.height / 20));
                testPos = false;
                for (var j = 0; j < snake.length; ++j) {
                    if (snake[j].x == seekX && snake[j].y == seekY) {
                        testPos = true;
                    }
                }
            }
            if (testPos) {
                for (i = 0; i < Math.trunc(mycanvas.height / 20) && testPos; ++i) {
                    for (j = 0; j < Math.trunc(mycanvas.width / 20) && testPos; ++j) {
                        testPos = false;
                        for (var k = 0; k < snake.length; ++k) {
                            if (snake[k].x == j && snake[k].y == i) {
                                testPos = true;
                            }
                        }
                        if (!testPos) {
                         seekX = j;
                         seekY = i;
                        }
                    }
                }
            }
            food = {
                x: seekX,
                y: seekY
            }
        }
        var createBonus = function () {
            var seekX = 0;
            var seekY = 0;
            var testPos = true;

            for (var i = 0; i < 50 && testPos; ++i) {
                seekX = Math.floor((Math.random() * 10000) % (mycanvas.width / 20));
                seekY = Math.floor((Math.random() * 10000) % (mycanvas.height / 20));
                testPos = false;
                for (var j = 0; j < snake.length; ++j) {
                    if ((snake[j].x == seekX && snake[j].y == seekY) ||
                        (food.x == seekX && food.y == seekX)) {
                        testPos = true;
                    }
                }
            }
            if (testPos) {
                for (i = 0; i < Math.trunc(mycanvas.height / 20) && testPos; ++i) {
                    for (j = 0; j < Math.trunc(mycanvas.width / 20) && testPos; ++j) {
                        testPos = false;
                        for (var k = 0; k < snake.length; ++k) {
                            if ((snake[k].x == j && snake[k].y == i) ||
                                (food.x == seekX && food.y == seekX)) {
                                testPos = true;
                            }
                        }
                        if (!testPos) {
                            seekX = j;
                            seekY = i;
                        }
                    }
                }
            }
            bonbon = {
                x: seekX,
                y: seekY
            }
        }

        var checkCollision = function (x, y, array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].x === x && array[i].y === y){
                    return true;
                }

            }
            return false;
        }
        ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
        start();
        mycanvas.addEventListener("click",function(e){
            var x = e.pageX - mycanvas.offsetLeft;
            var y = e.pageY - mycanvas.offsetTop;
            if (screen === 0) {
                screen = 1;
                direction = 'down';
                score = 0;
                drawSnake();
                createFood();
                bonbon = {
                    x : -1,
                    y : -1
                };
               gameloop = setInterval(paint, 80);
                window.addEventListener("keydown", keyDownHandler, false);

            } else if(screen === 2){
                screen = 0;
                start();
            }
        })

        function keyDownHandler(e) {

            switch (e.keyCode) {

                case 37:
                    if (screen == 1) {
                        e.preventDefault();
                    }
                    if (snake[0].x - 1 != snake[1].x || snake[0].y != snake[1].y) {
                        direction = 'left';
                    }
                    console.log('left');
                    break;

                case 39:
                    if (screen == 1) {
                        e.preventDefault();
                    }
                    if (snake[0].x + 1 != snake[1].x || snake[0].y != snake[1].y) {
                        direction = 'right';
                        console.log('right');
                    }
                    break;

                case 38:
                    if (screen == 1) {
                        e.preventDefault();
                    }
                    if (snake[0].x != snake[1].x || snake[0].y - 1 != snake[1].y) {
                        direction = 'up';
                        console.log('up');
                    }
                    break;

                case 40:
                    if (screen == 1) {
                        e.preventDefault();
                    }
                    if (snake[0].x != snake[1].x || snake[0].y + 1 != snake[1].y) {
                        direction = 'down';
                        console.log('down');
                    }
                    break;
            }
        }
    };



    /**
     * runs upon exit
     */
    Snake.prototype.stop = function() {
        // function that's gonna run upon exit
    };

    return Snake;
}();