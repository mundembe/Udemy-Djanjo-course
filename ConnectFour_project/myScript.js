var player1 = prompt("Player Blue please enter your name: ");
var player1Color = 'rgb(84, 151, 255)';
var player2 = prompt("Player Red please enter your name: ");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');
var numMoves = 0;   // If numMoves is even, Then it is player1's turn to move

function reportWin(rowNum,colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
    rowSelector = $(table).eq(rowIndex);
    columnSelector = rowSelector.find('td').eq(colIndex);
    buttonSelector = columnSelector.find('button');
    buttonSelector.css('background-color', color);
}

function checkColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

var defaultColor = checkColor(0,0);

function checkBottom(rowIndex, colIndex) {
    var bottomEmpty = true;
    if ((checkColor(rowIndex+1, colIndex) === defaultColor)) {
        bottomEmpty = true;
    }else{
        bottomEmpty = false;
    }
    return bottomEmpty;
}

function switchTurns(numMoves) {
    if (numMoves % 2 === 0) {
        return player1Color;
    }else{
        return player2Color;
    }
}

var colorMap = [[],[],[],[],[],[]];

function checkWin1(){
    player1Score = 0;
    /**POSSIBLE PATHS TO VICTORY
     * 
     * BY ROW:
     *  0123, 1234, 2345
     * BY COLUMN:
     *  0123, 1234, 2345, 3456
     * BY DIAGONAL: L -> R
     * [3][0],[2][1],[1][2],[0][3],     * [3][1],[2][2],[1][3],[0][4],     * [3][],[2][],[1][],[0][],
     * [4][0],[3][1],[2][2],[1][3],     * [4][],[3][],[2][],[1][],     * [4][],[3][],[2][],[1][],
     * [5][],[4][],[3][],[2][],     * [5][1],[4][],[3][],[2][],
     * 
     * 
     * BY DIAGONAL: R -> L
     * 
     */

    // Vertical Wins
    for (let c = 0; c < 7; c++) {
        for(let j = 0; j < 3; j++){
            if(colorMap[j][c] + colorMap[j+1][c] + colorMap[j+2][c] + colorMap[j+3][c] === 4){
                player1Score++;
            }
        }        
    }
    // Horizontal Wins
    for (let r = 0; r < colorMap.length; r++) {
        for(let j = 0; j < 4; j++){
            if(colorMap[r][j] + colorMap[r][j+1] + colorMap[r][j+2] + colorMap[r][j+3] === 4){
                player1Score++;
            }
        }
    }

    // Diagonal Wins - Left to Right
    for (let r = 3; r < colorMap.length; r++) {
        for(let c = 0; c < 7; c++){
            if (colorMap[r][c] + colorMap[r-1][c+1] + colorMap[r-2][c+2] + colorMap[r-3][c+3] === 4) {
                player1Score++;
                console.log(r);
            }
        }      
    }
    // Diagonal Wins - Right to Left
    for (let r = 0; r < colorMap.length - 3; r++) {
        for(let c = 0; c < 7; c++){
            if (colorMap[r][c] + colorMap[r+1][c+1] + colorMap[r+2][c+2] + colorMap[r+3][c+3] === 4) {
                player1Score++;
                console.log(r);
            }
        }      
    }

    return player1Score;
}

function checkWin2(){
    player2Score = 0;
    /**POSSIBLE PATHS TO VICTORY
     * 
     * BY ROW:
     *  0123, 1234, 2345
     * BY COLUMN:
     *  0123, 1234, 2345, 3456
     * BY DIAGONAL: L -> R
     * [3][0],[2][1],[1][2],[0][3],     * [3][1],[2][2],[1][3],[0][4],     * [3][],[2][],[1][],[0][],
     * [4][0],[3][1],[2][2],[1][3],     * [4][],[3][],[2][],[1][],     * [4][],[3][],[2][],[1][],
     * [5][],[4][],[3][],[2][],     * [5][1],[4][],[3][],[2][],
     * 
     * 
     * BY DIAGONAL: R -> L
     * 
     */

    // Vertical Wins
    for (let c = 0; c < 7; c++) {
        for(let j = 0; j < 3; j++){
            if(colorMap[j][c] + colorMap[j+1][c] + colorMap[j+2][c] + colorMap[j+3][c] === 0){
                player2Score++;
            }
        }        
    }
    // Horizontal Wins
    for (let r = 0; r < colorMap.length; r++) {
        for(let j = 0; j < 4; j++){
            if(colorMap[r][j] + colorMap[r][j+1] + colorMap[r][j+2] + colorMap[r][j+3] === 0){
                player2Score++;
            }
        }
    }

    // Diagonal Wins - Left to Right
    for (let r = 3; r < colorMap.length; r++) {
        for(let c = 0; c < 7; c++){
            if (colorMap[r][c] + colorMap[r-1][c+1] + colorMap[r-2][c+2] + colorMap[r-3][c+3] === 0) {
                player2Score++;
                console.log(r);
            }
        }      
    }
    // Diagonal Wins - Right to Left
    for (let r = 0; r < colorMap.length - 3; r++) {
        for(let c = 0; c < 7; c++){
            if (colorMap[r][c] + colorMap[r+1][c+1] + colorMap[r+2][c+2] + colorMap[r+3][c+3] === 0) {
                player2Score++;
                console.log(r);
            }
        }      
    }

    return player2Score;
}


for (let i = 0; i < colorMap.length; i++) {
    for (let j = 0; j < 7; j++){
        colorMap[i][j] = 10;
    }
    
}

$('button').click(function(){
    var col = $(this).closest('td').index();
    var exitLoop = false;
    var tag = '';
    for (let i = 5; i >= 0; i--) {
        if((checkColor(i, col) === defaultColor) && !exitLoop){
            changeColor(i, col, switchTurns(numMoves));
            numMoves++;
            exitLoop = true;
            colorMap[i][col] = numMoves % 2;    // add entry to colorMap  {NOTE 1=player1; 0=player2}

        }
        
    }
})




/**     Pre-Production Notes
 *  checkBottom() not being used; remove it
 *  use colorMap[0].length instead of '7' in for loops
 *  PROBLEM: 5 0r more same color matches will be counted as 2 or more score points
 */