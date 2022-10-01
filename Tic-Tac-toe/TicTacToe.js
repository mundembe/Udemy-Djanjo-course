var restart = document.getElementById("restart_btn");

var squares = document.querySelectorAll("td");

function clearAllSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }
}

restart.addEventListener("click", clearAllSquares);


function changeMarker() {
    if (this.textContent === "") {
        this.textContent = "X";
    }else if(this.textContent === "X"){
        this.textContent = "O";
    }else{
        this.textContent = "";
    }
}

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", changeMarker);
}