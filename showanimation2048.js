//动画效果逻辑
var showNumberWithAnimation = function(i, j, randNumber) {
    var numberCell = $(`#number-cell-${i}-${j}`)
    numberCell.css('background-color', getNumberBackgroundColor(randNumber))
    numberCell.css('color', getNumberColor(randNumber))
    numberCell.css('font-size', getNumberSize(board[i][j]))
    numberCell.text(randNumber)

    // jquery 自带的动画函数
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50)
    // console.log('showNumberWithAnimation');
}
