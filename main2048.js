// 游戏的主逻辑
var board = new Array()
var score = 0

$(documen).ready(function(){
    newgame()
})

var newgame = function() {
    // 初始化棋盘
    init()
}

var init = function() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; i++) {
            var gridCell = $("#grid-cell-" + i + "-" + j)
            gridCell.css('top', getPosTop(i, j))
            gridCell.css('left', getPosLeft(i, j))
        }
    }
}
