//底层支持逻辑
var documentWidth = window.screen.availWidth
var documentHeight = window.screen.availHeight
var gridContainerWidth = documentWidth * 0.92
var cellSideLength = documentWidth * 0.18
var cellSpace = documentWidth * 0.04

var getPosTop = function(i, j) {
    return cellSpace + i * (cellSideLength + cellSpace)
}

var getPosLeft = function(i, j) {
    return cellSpace + j * (cellSideLength + cellSpace)
}

// number-cell 的前景色
var getNumberColor = function(number) {
    if (number <= 4) {
        return '#776e65'
    }
    return 'white'
}

// number-cell 的背景色
var getNumberBackgroundColor = function(number) {
    var color = {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#9c0',
        1024: '#33b5e5',
        2048: '#09c',
        4096: '#a6c',
        8192: '93c'
    }
    return color[number]
}

// noSpace 空间是否可以再生成一个数字
var noSpace = function (board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false
            }
        }
    }
    return true
}

var noMove = function(board) {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
        return false
    }
    return true
}

var canMoveLeft = function(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j-1] === 0 || board[i][j-1] === board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

var canMoveRight = function(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                if (board[i][j+1] === 0 || board[i][j+1] === board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

var canMoveUp = function(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                if (board[i-1][j] === 0 || board[i-1][j] === board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

var canMoveDown = function(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                if (board[i+1][j] === 0 || board[i+1][j] === board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

// 判断移动过程中是否有障碍物
// 第 row 行 第 col1 列 到 第 col2 列 元素判断
var noBlockHorizontal = function(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] !== 0) {
            return false
        }
    }
    return true
}

// 判断移动过程中是否有障碍物
var noBlockVertical = function(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] !== 0) {
            return false
        }
    }
    return true
}
