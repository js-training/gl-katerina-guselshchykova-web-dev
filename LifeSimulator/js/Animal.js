"use strict";

function Animal(){
}

Animal.prototype.move = function(direction) {
    alert("Animal move to "+direction);
}