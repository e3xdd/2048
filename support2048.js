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
