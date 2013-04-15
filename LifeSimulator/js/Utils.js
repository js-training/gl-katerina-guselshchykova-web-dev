function randomTarget() {
    var min = -20;
    var max = 20;
    return new Point(getRandom(max, min), getRandom(max, min));
}

function clone(object) {
    function OneShotConstructor(){}
    OneShotConstructor.prototype = object;
    return new OneShotConstructor();
}

function getRandom(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//var arrowKeyCodes = new Dictionary({
//    37: new Point(-1, 0), // left
//    38: new Point(0, -1), // up
//    39: new Point(1, 0),  // right
//    40: new Point(0, 1)   // down
//});

function forEachIn(object, action) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            action(property, object[property]);
        }
    }
}

function method(object, name) {
    return function() {
        object[name].apply(object, arguments);
    };
}