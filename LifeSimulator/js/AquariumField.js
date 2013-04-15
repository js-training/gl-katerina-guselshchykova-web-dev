"use strict";
var AquariumField = function (aquariumPlan) {
        var tbody = dom("TBODY", {"class": "gameField"});
        this.squares = [];
    //    this.food = {};
  //      this.player = new Snake();
   //     this.playerPos = this.player.head;

        for (var y = 0; y < aquariumPlan.length; y++) {
            var line = aquariumPlan[y];
            var tableRow = dom("TR");
            var squareRow = [];
            for (var x = 0; x < line.length; x++) {
                var tableCell = dom("TD");
                tableRow.appendChild(tableCell);
                var square = new Square(line.charAt(x), tableCell);
                squareRow.push(square);
//                if (square.hasFood()) {
//                    this.foodPos = new Point(x, y);
//                }
            }
            tbody.appendChild(tableRow);
            this.squares.push(squareRow);
        }

        this.table = dom("TABLE", {"class": "gameField"}, tbody);
        this.score = dom("DIV", null, "...");

        this.getSquare =  function(position) {
            return this.squares[position.y][position.x];
        }
        this.place =  function(where) {
            where.appendChild(this.score);
            where.appendChild(this.table);
        };
};

AquariumField.place = function(where) {
    where.appendChild(this.score);
    where.appendChild(this.table);
};
AquariumField.remove = function() {
    removeElement(this.score);
    removeElement(this.table);
};

AquariumField.move = function(direction) {
    var playerSnake = this.player;
    var targetPos = this.playerPos.add(direction);
    var targetSquare = this.getSquare(targetPos);

    if (targetSquare.hasFood()) {
        var foodSquare = this.getSquare(this.foodPos);
        var randomDirection = randomTarget();
        while (randomDirection.x + this.foodPos.x > 19 ||
            randomDirection.y + this.foodPos.y > 19 ||
            randomDirection.x + this.foodPos.x < 1 ||
            randomDirection.y + this.foodPos.y < 1) {
            randomDirection = randomTarget();
        }

        var targetRandomPos = this.foodPos.add(randomDirection);

        this.foodPos =  targetRandomPos;
        var targetRandomSquare = this.getSquare(this.foodPos);
        foodSquare.moveContent(targetRandomSquare);

        var headSquare = this.getSquare(playerSnake.snakeBody["0"].position);
        headSquare.copyContent(targetSquare);
        playerSnake.increase(direction);

        this.playerPos =  playerSnake.snakeBody["0"].position;
    } else if (targetSquare.hasPlayer()) {
        alert("Game over!");
        this.remove();
    } else if(targetSquare.isEmpty()){
        //move head
        var headSquare = this.getSquare(this.playerPos);
        headSquare.moveContent(targetSquare);
        for (var i = 1; i < playerSnake.length(); i++){
            var snakeSquare = this.getSquare(playerSnake.snakeBody[i].position);
            var snakeDirection = playerSnake.snakeBody[i].position.add(playerSnake.snakeBody[i].direction);
            var targetSnakeSquare = this.getSquare(snakeDirection);
            snakeSquare.moveContent(targetSnakeSquare);
        }
        playerSnake.move(direction);
        this.playerPos =  playerSnake.snakeBody["0"].position;
    }
};
