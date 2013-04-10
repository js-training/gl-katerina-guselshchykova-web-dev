var Square = {
    construct: function(character, tableCell) {
        this.background = "empty";
        if (character === "#")    {
            this.background = "wall";
        } else if (character === "*")  {
            this.background = "exit";
        }

        this.tableCell = tableCell;
        this.tableCell.className = this.background;

        this.content = null;
        if (character === "0") {
            this.content = "food";
        } else if (character === "@")   {
            this.content = "player";
        } else if (character === "*")   {
            this.content = "wall";
        }

        if (this.content !== null) {
            var image = dom("IMG", {src: "img/" +
                this.content + ".gif"});
            this.tableCell.appendChild(image);
        }
    },

    hasPlayer: function() {
        return this.content == "player";
    },
    hasFood: function() {
        return this.content == "food";
    },
    hasWall: function() {
        return this.content == "wall";
    },
    isEmpty: function() {
        return this.content == null && this.background == "empty";
    },
    clear: function(){
        this.content = null;
        this.background = "empty";
    }

};

Square.moveContent = function(target) {
    target.content = this.content;
    this.content = null;
    target.tableCell.appendChild(this.tableCell.lastChild);
};

Square.copyContent = function(target) {
    var image = dom("IMG", {src: "img/player.gif"});
    target.content = "player";
    target.tableCell.appendChild(image);
};

Square.clearContent = function() {
    this.content = null;
    var image = this.tableCell.lastChild;
    var size = 100;

    var animate = setInterval(function() {
        size -= 10;
        image.style.width = size + "%";
        image.style.height = size + "%";
        if (size < 30) {
            clearInterval(animate);
            removeElement(image);
        }
    }, 70);
};