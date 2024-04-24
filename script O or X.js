let boxes = document.querySelectorAll(".box");
const resetGame = document.querySelector(".reset-btn");

const winSound = new Audio('winsound.mp3');
const tingSound = new Audio('ting.mp3');
const winnerAnimation = document.querySelector(".win-animation")
const turnPlayer = document.querySelector(".turn-player");
let turn = true;

resetGame.addEventListener("click", () => {
  winnerAnimation.innerHTML = ``;
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
    });
});
const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turn){
            box.innerHTML= "⭕";
            turn = false;
        }

        else{
            box.innerHTML = "❌";
            turn = true;
        }
        box.disabled = true;
        checkWin();

    })
})

function checkWin(){
    let tie = true;
    if(!turn){
      
      turnPlayer.innerHTML = "Tura : ❌"
      
    }
    else{
      turnPlayer.innerHTML= "Tura : ⭕"
    }
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){

                winnerAnimation.innerHTML = `${pos1Val}`;
                winSound.play();
                for(let box of boxes){
                box.disabled = true;
                }

                tie = false;

                
            }
        }
        
    }

    if (tie) {
        for (let box of boxes) {
            if (box.innerHTML === "") {
                tie = false; 
                break;
            }
        }
    }
    
    if (tie) {
        winnerAnimation.innerHTML = "😶";
        tieSound.play();
    } else if (!turn) {
        turnPlayer.innerHTML = "Tura : ❌";
        tingSound.play();
    } else {
        turnPlayer.innerHTML = "Tura : ⭕";
        tingSound.play();
    }
}