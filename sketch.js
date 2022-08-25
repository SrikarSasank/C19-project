var road, roadImg
var theif,theifImg
var theif_caught
var cop, copImg
var game_overImg
var PLAY=1
var END=0
var gameState

var invisible_ground
var max_height_of_theif
var score
var rockImg
var barricadeImg
var dogImg
var obstaclesGroup
var coinGroup
var gold_coinImg
var copcaught_theifImg
var restartImg
var restart
var copcaught_theif
var gameover


function preload(){

  pathImg = loadImage("path.png");
  copImg = loadImage("cop.png")
  theifImg = loadImage("theif.png")
  rockImg = loadImage("stone.png")
  barricadeImg = loadImage("barricade.png")
  dogImg = loadImage("dog.png")
  game_overImg = loadImage("gameOver.png")
  theif_caught = loadImage("game_over.png")
  gold_coinImg = loadImage("coin.png")
  copcaught_theifImg = loadImage("game_over.png")
  restartImg = loadImage("restart.png")

}

function setup(){

  createCanvas(1440,800);

  path=createSprite(675,400);
  path.addImage(pathImg);
  path.scale = 4.165
  path.velocityX = -6;

  cop = createSprite(220,715)
  cop.addImage(copImg)
  cop.scale = 0.49

  theif = createSprite(900,650)
  theif.addImage(theifImg)
  theif.scale = 0.5

  invisible_ground = createSprite(720,755,1440,0.000000000000000000000000000000000000000000001)
  invisible_ground2 = createSprite(990,720,200,0.00000000000000000000000000000000000000000001)
  max_height_of_theif = createSprite(1000,100,325,0.000000000000000000000000000000000000000000001)

  score = 0

  obstaclesGroup = new Group();

  coinGroup = new Group();
 gameState="play"

 gameover = createSprite(750,300)
gameover.addImage(game_overImg)
gameover.scale = 1.5

copcaught_theif = createSprite(750,675)
copcaught_theif.addImage(copcaught_theifImg)
copcaught_theif.scale = 0.4

restart = createSprite(750,450)
restart.addImage(restartImg)
restart.scale = 0.07

   gameover.visible = false
 restart.visible = false
  copcaught_theif.visible = false

}


function draw(){

  if(gameState=="play"){
  if (path.x < 0.9){
    path.x = path.width/1;
  }

cop.setCollider("rectangle",2,5,590,530)
theif.setCollider("rectangle",0,10,310,220)

  if(keyDown("space") && theif.y >= 540) {
    theif.velocityY = -15;
  }
  theif.velocityY = theif.velocityY + 0.8
  
  theif.collide(invisible_ground2)
  cop.collide(invisible_ground)
  theif.collide(max_height_of_theif)

  

edges = createEdgeSprites()
theif.collide(edges)

spawnObstacles()
spawnCoins()
if(coinGroup.isTouching(theif)){
  score = score + 5
 coinGroup.destroyEach()

}

if(cop.isTouching(obstaclesGroup)){

cop.velocityY = -23

}
cop.velocityY = cop.velocityY + 0.9
if(theif.isTouching(obstaclesGroup)){
  gameState="end"
}


  }
if (gameState=="end"){
  path.velocityX=0
  theif.velocityY=0
obstaclesGroup.destroyEach()
cop.visible = false
theif.visible = false

gameover.visible = true
restart.visible = true
 copcaught_theif.visible = true

coinGroup.destroyEach()



if(mousePressedOver(restart)) {
  reset();
}
  }


 


  drawSprites();


textSize(30);
fill("black");
text("Score: " + score, 1050, 200);

}

function spawnObstacles(){
  if(frameCount % 140 === 0) {
  obstacle = createSprite(1500,700,0.1,0.1)
  obstacle.scale = 0.15
  var rand = Math.round(random(1,3));
  switch(rand) {
    case 1: obstacle.addImage(rockImg);
            break;
    case 2: obstacle.addImage(barricadeImg);
            break;
    case 3: obstacle.addImage(dogImg);
            break;
    default: break;
  }
  obstacle.velocityX = -6

  obstaclesGroup.add(obstacle);


}

}

function spawnCoins(){
  if(frameCount % 300 === 0) {

 var gold_coin = createSprite(1880,460)

 gold_coin.scale = 0.1
  
  var rand = Math.round((1));
  switch(rand) {
    case 1: gold_coin.addImage(gold_coinImg)
            break;
    default: break;
  }
   gold_coin.velocityX = -6

   coinGroup.add(gold_coin)
}

}

function reset(){
path.velocityX = -6
if (path.x < 0.9){
  path.x = path.width/1;
}
restart.visible = false
gameState = "play"

gameover.visible = false
restart.visible = false
copcaught_theif.visible = false
 
score = 0

cop.visible = true
theif.visible = true

}



