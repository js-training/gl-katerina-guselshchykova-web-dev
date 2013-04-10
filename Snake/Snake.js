"use strict";
function SnakeItem (position, direction){
    this.position = position;
    this.direction = direction;
}

function Snake(){
    this.snakeBody = {0: new SnakeItem(new Point(3,1), new Point(1,0)),
        1: new SnakeItem(new Point(2,1), new Point(1,0)),
        2: new SnakeItem(new Point(1,1), new Point(1,0))};
    this.addItem = function(snakeItem){
        this.snakeBody[this.length()] = snakeItem;
    };
    this.move = function(moveDirection, lastIndex){
        if (lastIndex === null || lastIndex === undefined){
            lastIndex = this.length()-1;;
        }
        this.snakeBody["0"].direction =  moveDirection;
        this.snakeBody["0"].position = this.snakeBody["0"].position.add(moveDirection);

        for(var i = lastIndex; i > 0; i--){
            this.snakeBody[i].position = this.snakeBody[i].position.add(this.snakeBody[i].direction);
            this.snakeBody[i].direction =  this.snakeBody[i-1].direction;
        }
    };
    this.increase = function(moveDirection){
        this.addItem(cloneIt(this.snakeBody[this.length()-1]));
        this.move(moveDirection, this.length()-2);
    };
    this.head = new Point(this.snakeBody["0"].position.x, this.snakeBody["0"].position.y);
    this.length = function(){
            var size = 0, key; // get the size data
            for (key in this.snakeBody) { // check the okeys in the object
                if (this.snakeBody.hasOwnProperty(key)) size++; // increase the size
            }
            return size; // return the size of the object
    };
    this.toString = function(){
        for (var i = 0; i < this.length(); i ++){
             console.log(i + " : position" + "("+this.snakeBody[i].position.x + " ; "+ this.snakeBody[i].position.y + ")   direction" + "("+this.snakeBody[i].direction.x + " ; "+ this.snakeBody[i].direction.y + ")");
         }
    };
}

function cloneIt(obj) {
    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof SnakeItem) {
        var copyPosition = new Point(obj.position.x, obj.position.y);
        var copyDirection = new Point(obj.direction.x, obj.direction.y);
        var copy = new SnakeItem(copyPosition, copyDirection);
        return copy;
    }
}