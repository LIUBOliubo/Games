var GRID_SIZE = 5;
var GRID_TOTAL = GRID_SIZE * GRID_SIZE;
var STATE_LOSE = -1;
var STATE_WIN = 1;
var STATE_PLAY = 0;
var BOMB_NUM = 5;
var BLANK_NUM = GRID_TOTAL - BOMB_NUM;
var I_BOMB = -1;
var I_BLANK = 0;
var I_NUMBER = 1;
function Game() {
    STORAGE.init("sweep");
    var game = this;
    CONTROL.clickOn(".retry",
    function(event) {
        game.newGame()
    });
    this.setBestTime(STORAGE.getInt("best"));
    this.initCells();
    this.newGame();
    setInterval(function() {
        game.updateTime()
    },
    100)
}
Game.prototype.initCells = function() {
    var container = $(".cell-container");
    this.cells = new Array(GRID_TOTAL);
    for (var i = 0; i < GRID_TOTAL; ++i) {
        var div = $(document.createElement("div"));
        var cell = new Cell(div, i % GRID_SIZE, i / GRID_SIZE);
        div.on(CLICK_EVENT, cell, this.cellClick);
        container.append(div);
        this.cells[i] = cell
    }
};
Game.prototype.newGame = function() {
    this.clearEnding();
    this.state = STATE_PLAY;
    this.startTime = new Date().getTime();
    this.clickNum = 0;
    this.randomCellData()
};
Game.prototype.randomCellData = function() {
    var cells = this.cells;
    var data = "1000010000100001000010000".split("");
    TOOL.shuffle(data);
    for (var n = 0; n < GRID_TOTAL; ++n) {
        cells[n].reset()
    }
    for (var n = 0; n < GRID_TOTAL; ++n) {
        var cell = cells[n];
        if (data[n] == "0") {
            continue
        }
        cell.item = I_BOMB;
        for (var i = -1; i <= 1; ++i) {
            for (var j = -1; j <= 1; ++j) {
                var x = i + cell.x;
                var y = j + cell.y;
                if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
                    continue
                }
                var around = cells[y * GRID_SIZE + x];
                if (around.item >= 0) {++around.item
                }
            }
        }
    }
    var r, c;
    do {
        r = parseInt(Math.random() * GRID_TOTAL);
        c = cells[r]
    } while ( c . item == I_BOMB );
    this.showCellAround(c)
};
Game.prototype.cellClick = function(event) {
    var game = GAME;
    var cell = event.data;
    if (cell.isClicked) {
        return
    }
    if (cell.item == I_BOMB) {
        game.loseGame()
    } else {
        game.showCellAround(cell);
        if (game.clickNum == BLANK_NUM) {
            game.winGame()
        }
    }
};
Game.prototype.winGame = function() {
    var time = $(".current>span").text();
    time = parseInt(time * 1000);
    if (time < this.best || this.best < 1) {
        this.setBestTime(time);
        STORAGE.save("best", time)
    }
    this.showEnding(STATE_WIN);
	dp_submitScore(time);
};
Game.prototype.loseGame = function() {
    this.showEnding(STATE_LOSE)
};
Game.prototype.showEnding = function(state) {
    this.showCellAll();
    this.state = state;
    var isWin = (state == STATE_WIN);
    var ending = $(".ending");
    var title = ending.find("p");
    title.text(isWin ? "胜利": "失败");
    title.css("background-color", isWin ? "#5cb85c": "#f0ad4e");
    var btn = ending.find(".retry");
    btn.attr("class", "retry btn btn-" + (isWin ? "success": "warning"));
    ending.show();
	
};
Game.prototype.clearEnding = function() {
    $(".ending").hide()
};
Game.prototype.showCellAround = function(cell) {
    if (cell.isClicked || cell.item == I_BOMB) {
        return
    }
    cell.isClicked = true; ++this.clickNum;
    if (cell.item == I_BLANK) {
        for (var i = 0; i < 4; ++i) {
            var x = DIRECTION[i].x + cell.x;
            var y = DIRECTION[i].y + cell.y;
            if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
                continue
            }
            var around = this.cells[y * GRID_SIZE + x];
            this.showCellAround(around)
        }
    }
    this.showCell(cell)
};
Game.prototype.showCellAll = function() {
    for (var i = 0; i < GRID_TOTAL; ++i) {
        var cell = this.cells[i];
        this.showCell(cell)
    }
};
Game.prototype.showCell = function(cell) {
    var div = cell.div;
    switch (cell.item) {
    case I_BLANK:
        div.attr("class", "blank");
        break;
    case I_BOMB:
        div.html("<span class='glyphicon glyphicon-asterisk'></span>");
        div.attr("class", "bomb");
        break;
    default:
        div.html(cell.item);
        div.attr("class", "number");
        break
    }
};
Game.prototype.setBestTime = function(best) {
    this.best = best;
    var time = best / 1000;
    $(".best>span").text(best == 0 ? "--": time.toFixed(1))
};
Game.prototype.updateTime = function() {
    if (this.state != STATE_PLAY) {
        return
    }
    var timeDiv = $(".current>span");
    var time = new Date().getTime();
    time = (time - this.startTime) / 1000;
    if (time >= 99.9) {
        time = 99.9;
        this.loseGame()
    }
    timeDiv.text(time.toFixed(1))
};
function Cell(div, x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.div = div
}
Cell.prototype.reset = function() {
    this.item = 0;
    this.isClicked = false;
    this.div.empty();
    this.div.attr("class", "")
}