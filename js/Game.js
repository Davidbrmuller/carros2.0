class Game {
  constructor() {
this.resetTitle=createElement("h2")
this.resetButton=createButton("")
    this.leaderboardTitle=createElement("h2")
    this.leader1=createElement("h2")
    this.leader2=createElement("h2")
    this.playerMoving=false
    this.leftAtive=false
  }
getState(){
var gameStateref=database.ref("gameState")
gameStateref.on("value",function(data){
  gameState=data.val()
})

}
update(state){
  database.ref("/").update({
    gameState:state
  })
}
  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount=player.getCount()
    carro1=createSprite(width/2-50,height-100)
    carro1.addImage(carroimg1)
    carro1.scale=0.07
    carro2=createSprite(width/2+100,height-100)
    carro2.addImage(carroimg2)
    carro2.scale=0.07
    carros=[carro1,carro2]
    combustivel=new Group()
    moedas=new Group()
    obstaculos=new Group()
    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: pneuimg },
      { x: width / 2 - 150, y: height - 1300, image: coneimg },
      { x: width / 2 + 250, y: height - 1800, image: coneimg },
      { x: width / 2 - 180, y: height - 2300, image: pneuimg },
      { x: width / 2, y: height - 2800, image: pneuimg },
      { x: width / 2 - 180, y: height - 3300, image: coneimg },
      { x: width / 2 + 180, y: height - 3300, image: pneuimg },
      { x: width / 2 + 250, y: height - 3800, image: pneuimg },
      { x: width / 2 - 150, y: height - 4300, image: coneimg },
      { x: width / 2 + 250, y: height - 4800, image: pneuimg },
      { x: width / 2, y: height - 5300, image: coneimg },
      { x: width / 2 - 180, y: height - 5500, image: pneuimg }
    ];
    this.addSprites(combustivel,4,combustivelimg,0.02)
    this.addSprites(moedas,18,moedasimg,0.09)
    this.addSprites(obstaculos,obstaclesPositions.length,obstaclesPositions,0.04,obstaclesPositions)
  }
  addSprites(spriteGroup,numeroDeSprites,spriteImage,scale,positions=[]){
for(var i=0;i<numeroDeSprites;i++){
  var x,y
  if(positions.length>0){
    x=positions[i].x
    y=positions[i].y
spriteImage=positions[i].image
  }
  else{
  x=random(width/2+150,width/2-150)
  y=random(-height*4.5,height-400)}
  var sprite=createSprite(x,y)
  sprite.addImage("sprite",spriteImage)
  sprite.scale=scale
  spriteGroup.add(sprite)
}


  }
  handleElements(){
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffect")
    this.resetTitle.html("Reiniciar jogo")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width/2+200,40)
    this.resetButton.class("resetButton")
    this.resetButton.position(width/2+230,100)
    this.leaderboardTitle.html("Placar")
    this.leaderboardTitle.class("resetText")
    this.leaderboardTitle.position(width/3-60,40)
    this.leader1.class("leadersText")
    this.leader1.position(width/3-50,80)
    this.leader2.class("leadersText")
    this.leader2.position(width/3-50,130)
  }
  play(){
    this.handleElements()
    this.handleResetButton()
    Player.getPlayerInfo()
  player.getcarsatend()
    if(allPlayers!==undefined){
      image(pista,0,-height*5,width,height*6)
      this.showLeaderBoard()
      this.showLife()
      this.showfuel()
      var index=0
      for(var plr in allPlayers){
        index=index+1
        var x=allPlayers[plr].positionX
        var y=height-allPlayers[plr].positionY
        var currentLife=allPlayers[plr].life
        if(currentLife<=0){
          this.gameover()
        }
        carros[index-1].position.x=x
        carros[index-1].position.y=y
        if (index===player.index){
          stroke(10)
          fill("red")
          ellipse(x,y,60,60)
          this.handleFuel(index)
          this.handleCoins(index)
          this.handleColisao(index)
          this.handleColisaocarros(index)
          camera.position.y=carros[index-1].position.y
        }
      }
      if(this.playerMoving){
        player.positionY+=5
        player.update()
      }
      this.handlePlayerControls()
      const finishLine=height*6 -100
      if(player.positionY>finishLine){
        gamestate=2
        player.rank+=1
        Player.updateCarsAtEnd(player.rank)
        player.update()
        this.showRank()
      }
      drawSprites();
    }
  }
  handlePlayerControls(){
    if (keyIsDown(UP_ARROW)){
      this.playerMoving=true
      player.positionY+=10
      player.update()
    }
    if (keyIsDown(LEFT_ARROW)&& player.positionX>width/3-50){
      player.positionX-=5
      this.leftAtive=true
      player.update()
    }
    if (keyIsDown(RIGHT_ARROW)&& player.positionX<width/2+300){
      player.positionX+=5
      this.leftAtive=false
      player.update()
    }
  }
  showLeaderBoard(){
    var leader1
    var leader2
    var players=Object.values(allPlayers)
    if (players[0].rank===0 && players[1].rank===0 || players[0].rank===1){
      leader1=
      players[0].rank+
      "&emsp;"+
      players[0].name+
      "&emsp;"+
      players[0].score;
      leader2=
      players[1].rank+
      "&emsp;"+
      players[1].name+
      "&emsp;"+
      players[1].score;
    }
    if (players[1].rank===1){
      leader1=
      players[1].rank+
      "&emsp;"+
      players[1].name+
      "&emsp;"+
      players[1].score;
      leader2=
      players[0].rank+
      "&emsp;"+
      players[0].name+
      "&emsp;"+
      players[0].score;
    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }
  handleResetButton(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        carsAtEnd:0,
        playerCount:0,
        gameState:0,
        players:{}
      })
      window.location.reload()
    })
  }
  handleFuel(index){
    carros[index-1].overlap(combustivel,function(collector,collected){
      player.combustivel=185
      collected.remove()
    })
    if(player.combustivel>0&&this.playerMoving){
      player.combustivel-=0.3
    }
    if (player.combustivel<=0){
      gamestate=2
      this.gameover()
    }
  }
  handleCoins(index){
    carros[index-1].overlap(moedas,function(collector,collected){
      player.score+=21
      player.update()
      collected.remove()
    })
  }
  showRank(){
  swal({
    title:`incrivel!${"\n"}Rank${"\n"}${player.rank}`,
    text:"você alcançou a linha de chegada com susseso",
   imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
imageSize:"100x100",
confirmButtonText:"ok"
  })
  }
  gameover(){
    swal({
      title:`fim de jogo`,
      text:"ops você perdeu a corrida",
      imageURL:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize:"100x100",
      confirmButtonText:"obrigado por jogar"
    })
  }
  showLife(){
    push()
    image(lifeImage,width/2-130,height-player.positionY-400,20,20)
    fill("white")
    rect(width/2-100,height-player.positionY-400,185,20)
    fill("#f50057")
    rect(width/2-100,height-player.positionY-400,player.life,20)
    noStroke()
    pop()
  }
  showfuel(){
    push()
    image(combustivelimg,width/2-130,height-player.positionY-100,20,20)
    fill("white")
    rect(width/2-100,height-player.positionY-100,185,20)
    fill("#f50057")
    rect(width/2-100,height-player.positionY-100,player.combustivel,20)
    noStroke()
    pop()
  }
  handleColisao(index){
    if (carros[index-1].collide(obstaculos)){
      if (this.leftAtive){
        player.positionX+=100
      }
      else{
        player.positionX-=100
      }
      if(player.life>0){
        player.life-=185/4
      }
      player.update()
    }

  }
  handleColisaocarros(index){
    if (index===1){
      if(carros[index-1].collide(carros[1])){
        if (this.leftAtive){
          player.positionX+=100
        }
        else{
          player.positionX-=100
        }
        if(player.life>0){
          player.life-=185/4
        }
        player.update()
      }
    }
    if (index===2){
      if(carros[index-1].collide(carros[0])){
        if (this.leftAtive){
          player.positionX+=100
        }
        else{
          player.positionX-=100
        }
        if(player.life>0){
          player.life-=185/4
        }
        player.update()
        
      }
    }
  }
}
