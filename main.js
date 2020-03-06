const MOVEMENT_DISTANCE = 25;

class Player{
     constructor(left, top){
          this.element = document.getElementsByClassName("player")[0];
          this.left = 0;
          this.top = 0;
          this._createLives();
          this._initMovement();       
     };
     
     _createLives(){
          this.lives = 3;
          this.score = document.querySelector(".score");
          this.score.innerText = "Lives:"+ " " + this.lives;
     }
     moveLeft(){
          this.left = this.left - MOVEMENT_DISTANCE;
          this._updateLocation();
     };

     moveRight(){ 
          this.left = this.left + MOVEMENT_DISTANCE;
          this._updateLocation();
     };

     moveDown(){
          this.top = this.top + MOVEMENT_DISTANCE;
          this._updateLocation();
     };

     moveTop(){
          this.top = this.top - MOVEMENT_DISTANCE;
          this._updateLocation();
     };

     _updateLocation(){
          this._isOutOfBoundary();
          this.element.style.left = this.left + "px";
          this.element.style.top = this.top + "px"; 
          this._lookForColision();
     };

     _initMovement(){
          document.addEventListener("keydown", this._movePlayer.bind(this))
     }

     _movePlayer(event){
          switch(event.key){
          case "ArrowRight":
               this.moveRight();
               break;
          case "ArrowLeft":
               this.moveLeft();
               break;
          case "ArrowUp":
               this.moveTop();
               break;
          case "ArrowDown":
               this.moveDown();
               break;
          };
     };

     _isOutOfBoundary(){
          if(this.left < 0){
               this.left = 0;
          }

          if(this.left > 1000 - 25){
               this.left = 1000-25;
          }

          if(this.top < 0){
               this.top = 0;
          }

          if(this.top > 500 - 25){
               this.top = 500 - 25;
          }
     };

     _lookForColision(){
          for(var i = 0; i< positions.length/2; i++){
               for(var j = 0; j < 2; j++){
                    console.log(positions[i][j]);
                    if(this.left == (positions[i][j] - MOVEMENT_DISTANCE) || this.left == (positions[i][j] + MOVEMENT_DISTANCE) || this.left == positions[i][j]){
                         if(this.top <= positions[i][j+1]){
                              this._resetPosition();
                              this._updateLives();
                         }
                    }
               }
          }

          for(var i = 4; i <positions.length; i++){
               for(var j = 0; j < 2; j++){
                    if(this.left == (positions[i][j] - MOVEMENT_DISTANCE) || this.left == (positions[i][j] + MOVEMENT_DISTANCE) || this.left == positions[i][j]){
                         if(this.top >= 500 - positions[i][j+1] - MOVEMENT_DISTANCE){
                              this._resetPosition(); 
                              this._updateLives();
                         }
                    }
               }
          }
     }

     _resetPosition(){
          this.top = 0;
          this.left = 0;
     }

     _updateLives(){
               this.lives = this.lives - 1;
               this.score.innerText = "Lives:"+ " " + this.lives;
               if(this.lives == 0){
                    alert("you died");
                    var player = new Player();
               }
          
     }
};

class Walls{
     constructor(left, top, height){
          this.element = document.createElement("div");
          this.element.classList.add("wall");
          this.element.style.left = left + "px";
          this.element.style.top = top + "px";
          this.element.style.height = height + "px";
          var walls = document.getElementsByClassName("walls")[0];
          walls.appendChild(this.element);
     }
};

     var wall1 = new Walls(175, 0, 350);
     var wall2 = new Walls(375, 0, 275);
     var wall3 = new Walls(600, 0, 250);
     var wall4 = new Walls(800, 0, 150);
     var wall5 = new Walls(275, 450, 50);
     var wall6 = new Walls(475, 200, 300);
     var wall7 = new Walls(675, 400, 100);
     var wall8 = new Walls(900, 225, 275);

     var walls = [wall1.element, wall2.element, wall3.element, wall4.element, wall5.element, wall6.element, wall7.element, wall8.element];
     
     function getEachWallPosition(){
          var finalPositionArray= [];
          for(var i = 0; i < walls.length; i++){
               var positionOfWalls = [];
               var currentLeft = walls[i].offsetLeft;
               var currentTop =  walls[i].clientHeight;
               positionOfWalls.push(currentLeft);
               positionOfWalls.push(currentTop);
               finalPositionArray.push(positionOfWalls);
          }
          return finalPositionArray;
     };

     var positions = getEachWallPosition();
     
     var player = new Player();
     



