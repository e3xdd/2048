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

// 绑定键盘上下左右事件
$(document).keydown(function(event){
    switch (event.keyCode) {
        case 37:
            if (moveLeft()) {
                generateOneNumber()
                isGameOver()
            }
            // console.log('left')
            break
        case 38:
            if (moveUp()) {
                generateOneNumber()
                isGameOver()
            }
            // console.log('up')
            break
        case 39:
            if (moveRight()) {
                generateOneNumber()
                isGameOver()
            }
            // console.log('right')
            break
        case 40:
            if (moveDown()) {
                generateOneNumber()
                isGameOver()
            }
            // console.log('down')
            break
    }
})


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

var moveLeft = function() {
    if (!canMoveLeft(board)) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score += board[i][k]
                        updateScore(score)
                        hasConflicted[i][k] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200)
    return true
}

var moveRight = function() {
    if (!canMoveRight(board)) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for(var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score += board[i][k]
                        updateScore(score)
                        hasConflicted[i][k] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200)
    return true
}

var moveUp = function() {
    if (!canMoveUp(board)) {
        return false
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score += board[k][j]
                        updateScore(score)
                        hasConflicted[k][j] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200)
    return true
}

var moveDown = function() {
    if (!canMoveDown(board)) {
        return false
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[k][j] === board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score += board[k][j]
                        updateScore(score)
                        hasConflicted[k][j] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200)
    return true
}
