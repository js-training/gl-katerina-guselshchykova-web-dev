/**
 * Created with JetBrains WebStorm.
 * User: K.Guselshchykova
 * Date: 4/8/13
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

var aquariumDefault =
    ["*                                    *",
    "*  0                                 *",
    "* 0                                  *",
    "*0                                   *",
    "*0                                   *",
    "*0         %                         *",
    "* 00                                 *",
    "*   0                                *",
    "*                 0                  *",
    "*                 0 0     0          *",
    "*                   0   0            *",
    "*    %               0 0             *",
    "*                    0               *",
    "*   0               0                *",
    "*   0 0          0 0             %   *",
    "*   000        0 00                  *",
    "*   0          0 0                   *",
    "*0  0          00                    *",
    "*0  0          0                     *",
    "*0  0          0     0   0           *",
    "*0  0           0    00 0            *",
    "*0000    @    0000000000       @     *",
    "**************************************"];

// game logic
function Aquarium(plan) {
       this.grid = new Grid(plan[0].length, plan.length);
       for (var y = 0; y < plan.length; y++) {
           var line = plan[y];
           for (var x = 0; x < line.length; x++) {
               this.grid.setValueAt(new Point(x, y),
                   elementFromCharacter(line.charAt(x)));
           }
       }
      // this.grid = grid;
   }

Aquarium.prototype.render = function(place){
    this.grid.render();
    this.grid.place(place);
}

function elementFromCharacter(character) {
        if (character == " ")  {
            return undefined;
        } else if (character == "*")  {
            return new Wall();
        } else if (character == "%")       {
            return new Fish();
        } else if (character == "@")       {
            return new Snail();
        } else if (character == "0")       {
            return new Food();
        }
    }
//var AquariumMain = function(place){
//        this.field = null;
//
//        var newGame = dom("BUTTON", null, "New game");
//        addHandler(newGame, "click", method(this, "newGame"));
//        var reset = dom("BUTTON", null, "Reset level");
//        addHandler(reset, "click", method(this, "reset"));
//        this.container = dom("DIV", null,
//            dom("H1", null, "Snake"),
//            dom("DIV", null, newGame, " ", reset));
//        place.appendChild(this.container);
//        addHandler(document, "keydown", method(this, "keyDown"));
//
//    this.newGame = function() {
//        this.level = 0;
//        this.reset();
//    },
//    this.reset = function() {
//        if (this.field)   {
//            this.field.remove();
//        }
//        this.field = new AquariumField(aquariumDefault);
//        this.field.place(this.container);
//   },
//   this.keyDown = function(event) {
//        if (arrowKeyCodes.contains(event.keyCode)) {
//            event.stop();
//            var direction = arrowKeyCodes.lookup(event.keyCode);
//            this.field.move(direction);
//        }
//    }
//
//};

window.onload = function () {
    var aquarium = new Aquarium(aquariumDefault);
    aquarium.render(document.body);
   // var snakeGame = new AquariumMain(document.body);
};