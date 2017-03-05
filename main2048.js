// 游戏的主逻辑
var board = new Array()
var score = 0

$(documen).ready(function(){
    newgame()
})

var newgame = function() {
    // 初始化棋盘
    init()
    // 在随机两个格子中生成数字
    generateOneNumber()
    generateOneNumber()
}

var init = function() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; i++) {
            var gridCell = $("#grid-cell-" + i + "-" + j)
            gridCell.css('top', getPosTop(i, j))
            gridCell.css('left', getPosLeft(i, j))
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array()
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0
        }
    }
    // 根据 board 的值动态的更新前端的表现
    updateBoardView()
}

var updateBoardView = function() {
    $(".number-cell").remove()
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`)
            var theNemberCell = $(`#number-cell-${i}-${j}`)
            if (board[i][j] === 0) {
                theNemberCell.css('height', '0px')
                theNemberCell.css('width', '0px')
                theNemberCell.css('top', getPosTop(i, j) + cellSideLength / 2)
                theNemberCell.css('left', getPosLeft(i, j) + cellSideLength / 2)
            } else {
                theNemberCell.text(board[i][j])
                theNemberCell.css('height', cellSideLength)
                theNemberCell.css('width', cellSideLength)
                theNemberCell.css('top', getPosTop(i, j))
                theNemberCell.css('left', getPosLeft(i, j))
                theNemberCell.css('font-size', getNumberSize(board[i][j]))
                theNemberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
                theNemberCell.css('color', getNumberColor(board[i][j]))
            }
}

var generateOneNumber = function() {
    if(noSpace(board)) {
        return false
    }
    // 随机一个位置 0~4
    var randx = parseInt(Math.floor(Math.random() * 4))
    var randy = parseInt(Math.floor(Math.random() * 4))
    while (true) {
        if (board[randx][randy] === 0) {
            break
        }
        var randx = parseInt(Math.floor(Math.random() * 4))
        var randy = parseInt(Math.floor(Math.random() * 4))
    }
    // 随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4
    // console.log('randNumber :', randNumber);
    // 在随机位置显示该数字
    board[randx][randy] = randNumber
    // 前端动态显示该数字
    showNumberWithAnimation(randx, randy, randNumber)
    // console.log('generateOneNumber');
    // 在随机位置显示该数字

    return true
}
