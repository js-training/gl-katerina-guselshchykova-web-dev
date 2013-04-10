function Dictionary(startValues) {
    this.values = startValues || {};
}

Dictionary.prototype.lookup = function(name) {
    return this.values[name];
};
Dictionary.prototype.contains = function(name) {
    return Object.prototype.hasOwnProperty.call(this.values, name) &&
        Object.prototype.propertyIsEnumerable.call(this.values, name);
};