Object.prototype.create = function() {
    var object = clone(this);
    if (typeof object.construct == "function") {
        object.construct.apply(object, arguments);
    }
    return object;
};