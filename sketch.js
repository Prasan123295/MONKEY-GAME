var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var score = 0;
var survivalTime = 0;
var ground,groundImage;
var invisibleGround,invisibleGround2;
var gameoverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundImage = loadImage("background2.jpg");
  gameoverImage = loadImage("gameover1.jpg");
}



function setup() {
  createCanvas(600,600);
   
  foodGroup = createGroup();
  obstaclesGroup = createGroup();

   monkey  = createSprite(100,350,40,40);
  monkey.addAnimation("banana",monkey_running);
  monkey.addImage("gameover",gameoverImage);
  monkey.scale = 0.2;
  
  ground = createSprite(300,500,40,40);
  ground.addImage("beau",groundImage);
  ground.velocityX=-9;
  
  invisibleGround = createSprite(300,400,600,10);
  
  invisibleGround2 = createSprite(300,100,600,10);
  
  
  score = 0;
}


function draw() {
   background("white");
  
  
  
  
  if(gameState === PLAY){
  
    stroke("black");
  textSize(30);
  fill("white");
  text("SCORE : "+score,230,50);
  
  stroke("black");
  textSize(30);
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SURVIVAL TIME : "+survivalTime,180,100);
   if(ground.x<0){
   ground.x=ground.width/2;
  }
  
  bananas();
  obstacles(); 
  
  if(keyDown("space")){
    monkey.velocityY=-12; 
 }
  
   monkey.velocityY = monkey.velocityY+0.8;  
   
    if(foodGroup.isTouching(monkey)){
      score = score+1;
      foodGroup.destroyEach();
} 
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END; 
       
  }
  }  
  else if (gameState === END){
    over();
    if(keyDown("r")){
  reset();  
  }       
  }  
  
  
  
  
  
  monkey.depth = monkey.depth+1;
  
  invisibleGround.visible = false;
  invisibleGround2.visible = false;
  monkey.collide(invisibleGround);
  monkey.bounceOff(invisibleGround2);
  drawSprites();
}

function bananas(){
  if(frameCount % 100 === 0){
   var banana = createSprite(600,400,20,20); 
   banana.y = Math.round(random(200,100)); 
   banana.velocityX = -8;
   banana.addImage("yellow",bananaImage);
   banana.scale=0.1;
   banana.lifetime = 100; 
  
   foodGroup.add(banana); 
    
  }
  
}

function obstacles(){
  if(frameCount % 80 === 0){
  var rock = createSprite(600,380,20,20);
  rock.addImage("stone",obstacleImage);  
  rock.scale = 0.1;
  rock.velocityX = -6;
    
  obstaclesGroup.add(rock);   
}
  
}  

function over(){
  monkey.velocityY = 0;
  ground.velocityX = 0;
  foodGroup.setVelocityXEach = (0);
  obstaclesGroup.setVelocityXEach = (0);
  monkey.changeImage("gameover",gameoverImage);
  monkey.x = 300;
  monkey.y = 130;
  monkey.scale = 1.5;

} 

function reset(){
  gameState = PLAY;
  monkey.changeAnimation("banana",monkey_running);
  monkey.scale = 0.2;
  monkey.x = 100;
  monkey.y = 350;
  ground.velocityX = -12;
  score = 0;
  survivalTime = 0;
  
  
  
  
} 




