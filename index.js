

let popupHtml = `<div style="padding:5px;" class="icon" id="king"><img src=${'img/king.png'} width="30px" height="30px" /><p>King</p></div>
<div style="padding:5px;" class="icon" id="queen"><img src=${'img/queen.png'} width="30px" height="30px" /><p>Queen</p></div>
<div style="padding:5px;" class="icon" id="bishop"><img src=${'img/bishop.png'} width="30px" height="30px" /><p>Bishop</p></div>
<div style="padding:5px;" class="icon" id="rook"><img src=${'img/rook.png'} width="30px" height="30px" /><p>Rook</p></div>
<div style="padding:5px;" class="icon" id="horse"><img src=${'img/horse.png'} width="30px" height="30px" /><p>Knight</p></div>
<div style="padding:5px;" class="icon" id="pawn"><img src=${'img/pawn.png'} width="30px" height="30px" /><p>Pawn</p></div>`;

//implement chessboard UI--->
let chessBoard = document.querySelector('.chessBoard');
let color1, color2;

for(let i = 0; i < 8; i++) {

    //create div for the row
    let chessRow = document.createElement('div');
    chessRow.className = 'row';

    //set ID for every row
    chessRow.setAttribute("id", `row-${i}`);

    color1 = i % 2 === 0 ? 'white' : 'black';
    color2 = i % 2 === 0 ? 'black' : 'white';

    for(let j = 0; j < 8; j++) {

        //create div for square
        let chessSquare = document.createElement('div');
        chessSquare.className = 'square';

        //set Id for every square
        chessSquare.setAttribute("data-id", `square${i}-${j}`);

        //set background color alternative
        chessSquare.style.backgroundColor = j % 2 === 0 ? color1 : color2;

        //set popup in the square
        let popup = document.createElement('div');
        popup.className = 'popup';
        popup.setAttribute("id", `popup${i}-${j}`);
        popup.innerHTML = popupHtml

        chessSquare.appendChild(popup);

        //append the square in row div
        chessRow.appendChild(chessSquare);
    }

    //append the row into chessBoard div
    chessBoard.appendChild(chessRow);
}


//implement set chessBoard functionality-->
let arr = ['square0', 'square1', 'square6', 'square7'];

let prevPopUp, prevImage;
//square click functionality--->
document.querySelector('.chessBoard').addEventListener('click', (e) => {
    //get the id of square-->
    const id = e.target.closest('.square').dataset.id;
    let popUpId = id.replace('square', 'popup');
    let popupDiv = document.getElementById(popUpId);

    if(prevPopUp) prevPopUp.classList.toggle('show');

    if(prevPopUp !== popupDiv) {
        popupDiv.classList.toggle('show');
        prevPopUp = popupDiv;
        return;
    }
    
    prevPopUp = undefined;
});


//add eventHandler on Popup(popUpClick Functionality)--->
document.querySelectorAll('.popup').forEach((item) => {
    item.addEventListener('click', (e) => {
        const popup = e.target.closest('.popup');
        const popupParent = popup.parentNode;
        const iconId = e.target.closest('.icon').id;


        //set image in the square--->
        const img = document.createElement('img');
        img.setAttribute('src', `img/${iconId}.png`);
        img.setAttribute('id', `${e.target.closest('.popup').id}-img`);
        img.setAttribute('height', '30px');
        img.setAttribute('width', '30px');
 
        //check image is exists or not in the square--->
        let prevImage = document.getElementById(`${e.target.closest('.popup').id}-img`);
        if(prevImage && prevImage.getAttribute('src') === img.getAttribute('src')) {
            popupParent.removeChild(prevImage);
        } else {
            //add the image in the sqaure--->
            prevImage && popupParent.removeChild(prevImage);
            popupParent.appendChild(img);
        }
    });
});

document.getElementById('submit_btn').addEventListener('click', (e) => {

    //check queen---->
    const playerQueen1 = checkKingDom('#row-0', 'img/queen.png', 3);
    const playerQueen2 = checkKingDom('#row-7', 'img/queen.png', 3);
    if(!(playerQueen1 && playerQueen2)) {
        alert(`Please try again, good things will take some time!`);
        return;
    } 

    //check king------>
    const playerKing1 = checkKingDom('#row-0', 'img/king.png', 4);
    const playerKing2 = checkKingDom('#row-7', 'img/king.png', 4);
    if(!(playerKing1 && playerKing2)){
        alert(`Please try again, good things will take some time!`);
        return;
    }

    //check pawns are set or not--->
    const playerPawn1 = checkPawns('#row-1' ,'img/pawn.png');
    const playerPawn2 = checkPawns('#row-6', 'img/pawn.png');
    if(!(playerPawn1 && playerPawn2)) {
        alert(`Please try again, good things will take some time!`);
        return;
    } 

    //check rooks position---->
    const playerRook1 = checkPosition('#row-0', 'img/rook.png', 0, 7);
    const playerRook2 = checkPosition('#row-7', 'img/rook.png', 0, 7);
    if(!(playerRook1 && playerRook2)) {
        alert(`Please try again, good things will take some time!`);
        return;
    } 

    //check knights position---->
    const playerKnight1 = checkPosition('#row-0', 'img/horse.png', 1, 6);
    const playerKnight2 = checkPosition('#row-7', 'img/horse.png', 1, 6);
    if(!(playerKnight1 && playerKnight2)) {
        alert(`Please try again, good things will take some time!`);
        return;
    } 

    //check bishops---->
    const playerBishop1 = checkPosition('#row-0', 'img/bishop.png', 2, 5);
    const playerBishop2 = checkPosition('#row-7', 'img/bishop.png', 2, 5);
    if(playerBishop1 && playerBishop2) {
        alert(`Congratulations! your chess board is correct!`)
    } else {
        alert(`Please try again, good things will take some time!`);
        return;
    }
});


//Pawns
const checkPawns = (id, imgPath) => {
    let pawns = document.querySelectorAll(id);
    let squares = pawns[0].childNodes;
    let count = 0;

    squares.forEach(item => {
        let firstChild = item.firstChild;
        let imgId = `${firstChild.id}-img`;
        let img = document.getElementById(imgId);

        if(!img) {
            return;
        } 

        if(img.getAttribute('src') === imgPath) {
            count++;
        }
    });

    return count === 8;
}

//Rooks-->bishops-->knights
const checkPosition = (id, imgPath, pos1, pos2) => {
    let rooks = document.querySelectorAll(id);
    let squares = rooks[0].childNodes;
    let count = 0;
    // console.log(squares);

    squares.forEach((curr, index) => {
       if(index === pos1 || index === pos2) {
            let firstChild = curr.firstChild;
            let imgId = `${firstChild.id}-img`;
            let img = document.getElementById(imgId);

            if(!img) {
                return;
            }

            if(img.getAttribute('src') === imgPath) {
                count++;
            }            
       }
    });

    return count === 2;
}

//King or Queen 
const checkKingDom = (id, imgPath, pos) => {
    let rooks = document.querySelectorAll(id);
    let squares = rooks[0].childNodes;
    let count = 0;

    squares.forEach((curr, index) => {
       if(index !== pos) {
           return;
       }

        let firstChild = curr.firstChild;
        let imgId = `${firstChild.id}-img`;
        let img = document.getElementById(imgId);

        if(!img) {
            return;
        }

        if(img.getAttribute('src') === imgPath) {
            count++;
        }            
       
    });

    return count === 1;
}
