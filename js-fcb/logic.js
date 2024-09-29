// VARIABLES - storage of values

let board;
let score = 0;
let rows = 4;
let columns = 4;
 // this variables will be used to monitor if the user already won once in the value of 2048, 4096, or 8192
//  If one of these variables value became true, it means the player already won once in specific values
let is2048Exist = false; 
let is4096Exist = false;
let is28192Exist = false;
// 
function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]; // This board will be used as the backend board to design and modify the tiles of the frontend board

    // FOR LOOP
    for(let r=0; r<rows; r++){
        for (let c=0; c<columns; c++){
            // CREATE A DIV ELEMENT

            let tile = document.createElement("div");
            // ASSIGN AN ID BASED ON THE TILE

            tile.id = r.toString() + "-" + c.toString();

            // RETRIVES THE NUMBER OF THE TILE FROM THE BACKEND BOARD
            // BOARD[0][1] = 0
            let num = board[r][c];

            updateTile(tile, num);
            // THROW IT HERE
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}
// This function is to update the color of the tile based on its number(num) value
function updateTile(tile, num) {

    tile.innerText = "";
    tile.classList.value = "";
    // <div class="tile"></div>
    tile.classList.add("tile");

    if(num > 0) {
        // <div class="tile">2</div>
        tile.innerText = num.toString();

        // 2 less than 8192
        if (num < 8192) {
             // 2 less than 8192 : add 
            tile.classList.add("x" + num.toString());
        }
        else {
            tile.classList.add("x8192");
        }
    }
}

window.onload = function() {
    setGame(); // WE CALL THE SETGAME FUNCTION
}
// e : event keydown(press)

// HNADLESLIDE
function handleSlide(e){

    console.log(e.code);

    if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {

        if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
        }
        else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
        }
        else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
        }
        else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
        }
    }
    
    document.getElementById("score").innerText = score;

    setTimeout(() =>{
        checkWin();
    }, 100);

    // checkWin();

    if (hasLost() == true) {

        setTimeout(() => {
            alert("Game Over. You have lost the game. Game will restart");
            restartGame();
            alert("Click any arrow key to restart")
        }, 100);
    }
}

document.addEventListener("keydown", handleSlide);

// slide funtion to merge matching

function slideLeft() {

    for(let r=0; r<rows; r++){

        let row = board[r];
        row = slide(row);
        board[r] = row;
            
            for (let c=0; c<columns; c++){
                let tile = document.getElementById(r.toString() + "-" + c.toString());

                let num = board[r][c];
                updateTile(tile, num);
            }

}
    
}

// 2 0 0 2 -> 4 : temporary remove the "0"
function filterZero(row){
    return row.filter(num => num !=0);
}

// core function
function slide(tiles){

    // [2,0,0,2] -> [2,2,2]
    tiles = filterZero(tiles);

    for (let i=0; i < tiles.length-1; i++) {

        if(tiles[i] == tiles[i+1]){
            tiles[i] = tiles[i] *=2; // [4, 2,2]
            tiles[i+1] = 0; //[4,0,2]
            score += tiles[i];
        }
    }
    
    tiles = filterZero(tiles); // [4,2]

    while(tiles.length < columns) {
        tiles.push(0); // [4,2,0,0]
    }
    return tiles;
}

// SLIDE RIGHT

// function slideRight() {

//     for(let r=0; r<rows; r++){
//         // All titles values per row are saved in a counter row

//         board[r]= slide(board[r].reverse())
//         board [r] = reverse()
//         // let row = board[r];

//         // row.reverse();
//         // row = slide(row); // use slide function to merge the same values
//         // 4 2 0 0

//         // row.reverse();
//         // 0 0 2 4
//         board[r] = row; // update the row with merged tile/s

//         // for (let c=0; c<columns; c++){
            
//             for (let c=0; c<columns; c++){
//                 // Access the tile using it's id
//                 let tile = document.getElementById(r.toString() + "-" + c.toString());

//                 let num = board[r][c];
//                 updateTile(tile, num);
//             }
//     // }
// }
    
// }

//Move tiles right
function slideRight()
{
	//Start the first loop
	for(let r=0; r<rows; r++)
	{
		//Slide the tiles on the current row

		// board[r]=slide(board[r].reverse());
		// board[r].reverse() : 207 - 208 : alternate below
        let row = board[r];
        // 2, 2, 2, 0 -> 0, 2, 2, 2
        row.reverse();

        row = slide(row); //  use slide function to merge the same values 
        row.reverse();
        // 0024
        board[r] = row; // update the row with the merged tile/s

		//Start the second loop
		for(let c=0; c<columns; c++)
		{
		//Update tiles
		let tile = document.getElementById(r.toString() + "-" + c.toString());
		updateTile(tile, board[r][c]);
		}
	}
}

// SLIDE UP
function slideUp() {

    for(let c=0; c<columns; c++){

        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        // [0,2,2,2]
        col = slide(col);

        // board[r] = row;
            
            for (let r=0; r<rows; r++){

                board[r][c] = col[r];

                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }

}
    
}

// SLIDE DOWN
function slideDown() {

    for(let c=0; c<columns; c++){

        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        // [0,2,2,2]
        col.reverse();
        col = slide(col);
        col.reverse();
        // board[r] = row;
            
            for (let r=0; r<rows; r++){

                board[r][c] = col[r];

                let tile = document.getElementById(r.toString() + "-" + c.toString());

                let num = board[r][c];
                updateTile(tile, num);
            }

}
    
}

// TRUE : IF HAS EMPTY TILE || FALSE : IF HAS NOT EMPTY TILE
function hasEmptyTile(){

    for(let r=0; r<rows; r++){
        for (let c=0; c<columns; c++){
            
            if(board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}


function setTwo() {
    if (hasEmptyTile() == false) {
        return;
    }
    let found = false;

    while(found == false) {
        // generate a random value based on the rows value (0-3)
        // [random r]
        let r = Math.floor(Math.random() * rows); 
        // [random c]
        let c = Math.floor(Math.random() * columns);

        //  if(board [random r] [random c] == 0)
        if (board[r][c] == 0){
            // if the tile is an empty tile, we convert the empty tile to 2 (0 ->2)
            board[r][c] = 2;
    
            let tile = document.getElementById(r.toString()  + "-" + c.toString());
    
            // <div class="x2">2</div>
            tile.innerText = "2";
            tile.classList.add("x2");

            found = true;
        }
    }
}

function checkWin() {

    for(let r=0; r<rows; r++){
        for (let c=0; c<columns; c++){

            if (board[r][c] == 2048 && is2048Exist == false) {
                alert("You Win! You got the 2048");
                is2048Exist = true;
            }
            else if (board [r][c] == 4096 && is4096Exist == false) {
                alert("You are unstoppable! You are fantastically unstoppable!");
                is4096Exist = true;
            }
            else if (board [r][c] == 8192 && is28192Exist == false) {
                alert("Victory! You have reached 8192! You are incrredibly awesome!");
                is28192Exist = true;
            }
        }
    }
}

function hasLost() {

    for(let r=0; r<rows; r++){
        for (let c=0; c<columns; c++){

            if (board[r][c] == 0) {
                return false;
            }

                const currentTile = board [r][c];

            if (

                r > 0 && board[r-1][c] === currentTile || // upper tile

                r < 3 && board[r+1][c] === currentTile ||  // lower tile
                
                c > 0 && board [r][c-1] === currentTile || // left tile

                c > 3 && board[r][c+1] === currentTile  // right tile
            ) {
                return false;
            }
            // no possible moves - meaning true, the user has lost.                
        }
    }
    return true;
    // const currentTile = board [r][c];

    // if (
    //     /* r > 0 && board[r-1][c] === currentTile || // upper tile

    //     r < rows - 1 && board[r+1][c] === currentTile ||  // lower tile
        
    //     c > 0 && board [r][c-1] === currentTile || // left tile

    //     c > columns - 1 && board[r][c+1] === currentTile  // right tile */

    //     r > 0 && board[r-1][c] === currentTile || // upper tile

    //     r < 3 && board[r+1][c] === currentTile ||  // lower tile
        
    //     c > 0 && board [r][c-1] === currentTile || // left tile

    //     c > 3 && board[r][c+1] === currentTile  // right tile
    // ){
    //     return false;
    // }
    // // no possible moves - meaning true, the user has lost.
    // return true;
}

function restartGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    score = 0;
    setTwo();
    // setTwo();
}


