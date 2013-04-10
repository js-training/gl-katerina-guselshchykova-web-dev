/**
 * Created with JetBrains WebStorm.
 * User: K.Guselshchykova
 * Date: 4/8/13
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict";
var snakeDefault = [
    {field: ["********************",
             "*@@@               *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*             0    *",
              "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "*                  *",
             "********************"]}];

// game logic
var SnakeGame = {
    construct: function(place){
        this.level = null;
        this.field = null;

        var newGame = dom("BUTTON", null, "New game");
        addHandler(newGame, "click", method(this, "newGame"));
        var reset = dom("BUTTON", null, "Reset level");
        addHandler(reset, "click", method(this, "reset"));
        this.container = dom("DIV", null,
            dom("H1", null, "Snake"),
            dom("DIV", null, newGame, " ", reset));
        place.appendChild(this.container);
        addHandler(document, "keydown", method(this, "keyDown"));
    },
    newGame: function() {
        this.level = 0;
        this.reset();
    },
    reset: function() {
        if (this.field)   {
            this.field.remove();
        }
        this.field = GameField.create(snakeDefault[this.level]);
        this.field.place(this.container);
   },
    keyDown: function(event) {
        if (arrowKeyCodes.contains(event.keyCode)) {
            event.stop();
            var direction = arrowKeyCodes.lookup(event.keyCode);
            this.field.move(direction);
        }
    }
};

window.onload = function () {
    var snakeGame = SnakeGame.create(document.body);
};