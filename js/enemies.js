gApp.enemy = (function(){
  "use strict";
  var enemyState = function(x, y,damage, speed, type, sprX, sprY, mapX, mapY) {
    this.width = gApp.tileSize;
    this.height = gApp.tileSize;
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprX = sprX;
    this.sprY = sprY;
    this.mapX = mapX;
    this.mapY = mapY;
    this.speed = 1;
    this.damage = 1;
    this.direction = "up";
    this.changeDirectionCooldown = 160;
    this.changeDirectionCount = 0;

    this.update = function() {
      if (this.changeDirectionCount === 0) {
          this.changeDirectionCount = this.changeDirectionCooldown;
          this.direction = getRandomDirection();
      } else {
          this.changeDirectionCount--;
      }
      var pos = getSpritePosition(this.direction, this.type);
      if(this.direction == "up"){
          this.sprY = pos.y;
          this.sprX = pos.x;
          if(this.y > 0 + gApp.inv.inventory.size) {
            gApp.collision.checkMove(this.x, this.y-this.speed+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'up', this);
            this.y -= this.speed;
          } else {
            gApp.maps.State.mapY -= 1;
            gApp.scene = true;
            this.y = gApp.cHeight-gApp.tileSize;
          }

        }
        //left
        else if(this.direction == "left"){
          this.sprY = pos.y;
          this.sprX = pos.x;
          if(this.x > 0) {
            gApp.collision.checkMove(this.x-this.speed, this.y+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'left', this);
            this.x -= this.speed;
          } else{
            gApp.maps.State.mapX -= 1;
            gApp.scene = true;
            this.x = gApp.cWidth-gApp.tileSize;
          }
        }
        //down
        else if(this.direction == "down"){
          this.sprY = pos.y;
          this.sprX = pos.x;
          if ((this.y + gApp.tileSize) < gApp.cHeight) {
            gApp.collision.checkMove(this.x, this.y+this.speed+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'down', this, 6*gApp.scale);
            this.y += this.speed;
          } else{
            gApp.maps.State.mapY += 1;
            gApp.scene = true;
            this.y = 0 + gApp.inv.inventory.size;
          }

        }
        //right
        else if(this.direction == "right"){
          this.sprY = pos.y;
          this.sprX = pos.x;
          if((this.x + gApp.tileSize) < gApp.cWidth) {
            gApp.collision.checkMove(this.x+this.speed, this.y+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'right', this);
            this.x += this.speed;
          } else{
            gApp.maps.State.mapX += 1;
            gApp.scene = true;
            this.x = 0;
          }

        }

    }

    this.render = function() {
        image(gApp.spr.enemies, this.x, this.y, gApp.tileSize, gApp.tileSize, this.sprX, this.sprY, 24, 24);
    }
  };

  var enemiesState = function() {
    this.enemies = [];
    this.update = function() {
      for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].update();
      }
    }

    this.render = function() {
      for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].render();
      }
    }
  }
  return {
    Enemy: enemyState,
    State: new enemiesState()
  };

})();

var getRandomDirection = function () {
    var random = Math.floor(Math.random() * (4)) + 1;

    switch (random) {
        case 1:
            return "up";
        case 2:
            return "down";
        case 3:
            return "left";
        case 4:
            return "right";
        default:
            return "up";
    }
};

var getSpritePosition = function(direction, type) {
  var x = 0;
  var y = 0;
  if(direction == "up") {
    if (type == "red_m") return {x:96, y:0}
    else if (type == "blue_m") return {x:224, y:0}
    else if (type == "red_c") return {x:416, y:0}
    else if (type == "blue_c") return {x:544, y:0}
  } else if (direction == "left") {
    if (type == "red_m") return {x:0, y:0}
    else if (type == "blue_m") return {x:128, y:0}
    else if (type == "red_c") return {x:320, y:0}
    else if (type == "blue_c") return {x:448, y:0}
  } else if (direction == "down") {
    if (type == "red_m") return {x:32, y:0}
    else if (type == "blue_m") return {x:160, y:0}
    else if (type == "red_c") return {x:352, y:0}
    else if (type == "blue_c") return {x:480, y:0}
  } else if (direction == "right") {
    if (type == "red_m") return {x:64, y:0}
    else if (type == "blue_m") return {x:192, y:0}
    else if (type == "red_c") return {x:384, y:0}
    else if (type == "blue_c") return {x:512, y:0}
  }
}