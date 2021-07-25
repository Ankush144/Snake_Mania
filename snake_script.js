//Game Constant & variables
let inputDir = { x: 0, y: 0};
const foodsound = new Audio("food.mp3");
const gameOverSound = new Audio("game_over.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
foodsound.play();
let speed = 7;
let high_score=0;
let lastPaintTime = 0;
let snakeArr=[
    {x:13,y:15}
];
let score=0;
document.getElementById('score').innerHTML=score;
let food = {x:6,y:7};

//game function
function main(ctime) {
    window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1/speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}




        
function isCollide(snakeArr)
{

    for(let index=1;index<snakeArr.length;index++)
    {
        if(snakeArr[index].x===snakeArr[0].x&&snakeArr[index].y===snakeArr[0].y)
        {
            return true;
        }
    }
        if(snakeArr[0].x>=18 ||snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].x<=0)
        {
            return true;
        }

}
function gameEngine() {
  //Part 1:Updating the snake array
   if(isCollide(snakeArr))
   {
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0,y:0};
   document.getElementById('high').innerHTML="Highest Score<br>"+score;
    alert("Game_Over");
 
    snakeArr=[{x:13,y:15}];
    musicSound.play();
    score=0;
   }
   //if you have eaten the food incremnt the score and regenerate the food
   if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x)
   {
       foodsound.play();
        snakeArr.unshift({ x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y});
        score +=1;
        document.getElementById('score').innerHTML=score;
        let a=2;
        let b=16;
        food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};  
    }
   //moving the snake
   for(let i=snakeArr.length-2;i>=0;i--)
   {
               snakeArr[i+1]={...snakeArr[i]};
   }
  snakeArr[0].x +=inputDir.x;
  snakeArr[0].y +=inputDir.y;
  //part 3:Display the snake 
  board.innerHTML="";
    snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart= e.y;
    snakeElement.style.gridColumnStart= e.x;
    if(index===0)
    {
        snakeElement.classList.add('head');
    }else{
    snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
 });

 //part 2:Display the  food
 foodElement = document.createElement('div');
 foodElement.style.gridRowStart= food.y;
 foodElement.style.gridColumnStart= food.x;
 foodElement.classList.add('food');
 board.appendChild(foodElement);
}







//Main logic starts here.
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    musicSound.play();
    inputDir={x:0,y:1};//start the game
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight ");
            inputDir.x=1;
            inputDir.y=0;
            break;
            default:
                break;

    }   
});
