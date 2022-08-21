var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount=0
var carroimg1
var carroimg2
var carro1
var carro2
var pista
var allPlayers
var gameState=0
var carros=[]
var combustivel
var moedas
var obstaculos
var combustivelimg
var moedasimg
var pneuimg
var coneimg
var lifeImage

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  lifeImage=loadImage("assets/life.png")
  carroimg1=loadImage("assets/car1.png");
  carroimg2=loadImage("assets/car2.png");
  pista=loadImage("assets/track.jpg")
combustivelimg=loadImage("assets/fuel.png")
moedasimg=loadImage("assets/goldCoin.png")
pneuimg=loadImage("assets/obstacle2.png")
coneimg=loadImage("assets/obstacle1.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState()
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount===2){
    game.update(1)
  }
  if(gameState===1){
    game.play()
  }
  console.log(allPlayers)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
