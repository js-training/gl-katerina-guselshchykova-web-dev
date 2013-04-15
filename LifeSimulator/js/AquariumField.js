"use strict";
var AquariumField = function (aquariumGrid) {

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

function characterFromElement(element) {
  //  console.log(element.character);
    if (element == undefined) {
        return " ";
    }
    else {
        return element.character;
    }
}
