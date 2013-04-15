/**
 * Created with JetBrains WebStorm.
 * User: K.Guselshchykova
 * Date: 4/8/13
 * Time: 3:15 PM
 * To change this template use File | Settings | File Templates.
 */
function registerEventHandler(node, event, handler) {
    if (typeof node.attachEvent === "function") {
        node.attachEvent("on" + event, handler);
    } else {
        node.addEventListener(event, handler, false);
    }
}
function unregisterEventHandler(node, event, handler) {
    if (typeof node.attachEvent === "function") {
        node.detachEvent("on" + event, handler);
    } else {
        node.removeEventListener(event, handler, false);
    }
}

function normaliseEvent(event) {
    if (!event.stopPropagation) {
        event.stopPropagation = function() {this.cancelBubble = true;};
        event.preventDefault = function() {this.returnValue = false;};
    }
    if (!event.stop) {
        event.stop = function() {
            this.stopPropagation();
            this.preventDefault();
        };
    }

    if (event.srcElement && !event.target) {
        event.target = event.srcElement;
    }
    if ((event.toElement || event.fromElement) && !event.relatedTarget) {
        event.relatedTarget = event.toElement || event.fromElement;
    }
    if (event.clientX !== undefined && event.pageX === undefined) {
        event.pageX = event.clientX + document.body.scrollLeft;
        event.pageY = event.clientY + document.body.scrollTop;
    }
    if (event.type === "keypress") {
        if (event.charCode === 0 || event.charCode === undefined) {
            event.character = String.fromCharCode(event.keyCode);
        }
        else {
            event.character = String.fromCharCode(event.charCode);
        }
    }

    return event;
}

function addHandler(node, type, handler) {
    function wrapHandler(event) {
        handler(normaliseEvent(event || window.event));
    }
    registerEventHandler(node, type, wrapHandler);
    return {node: node, type: type, handler: wrapHandler};
}

function removeHandler(object) {
    unregisterEventHandler(object.node, object.type, object.handler);
}
