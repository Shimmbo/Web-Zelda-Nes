gApp.enemy = (function(){
    "use strict";
    var bossSizeVer=31;
    var bossSizeHor=31;
    var enemies = {
      red_m: {
        id:7,
        up: {x:144, y:0},
        left: {x:0, y:0},
        down: {x:48, y:0},
        right: {x:96, y:0},
        life:1,
        damage:1,
        speed:1,
        attackSpeed:160,
        size:24,
        isBoss:false,
        dead: {
          x:1320,
          y: 16,
          time:120
        }
      },
      blue_m: {
        id:8,
        up:{x:336, y:0},
        left:{x:192, y:0},
        down:{x:240, y:0},
        right:{x:288, y:0},
        life:2,
        damage:1,
        speed:2,
        attackSpeed:120,
        size:24,
        isBoss:false,
        dead: {
          x:1320,
          y: 16,
          time:120
        }
      },
      red_c: {
        id:9,
        up: {x:619, y:6},
        left: {x:475, y:6},
        down: {x:523, y:6},
        right: {x:571, y:6  },
        life:3,
        damage:1,
        speed:2,
        attackSpeed:80,
        size:21,
        isBoss:false,
        weapon: gApp.item.weapons.sword.V1,
        dead: {
          x:1320,
          y: 16,
          time:120
        }
      },
      blue_c: {
        id:10,
        up: {x:809, y:6},
        left: {x:665, y:6},
        down: {x:712, y:6},
        right: {x:763, y:6},
        life:5,
        damage:2,
        speed:3,
        attackSpeed:50,
        size:21,
        isBoss:false,
        weapon: gApp.item.weapons.sword.V2,
        dead: {
          x:1320,
          y: 16,
          time:120
        }
      },
      dodongo: {
        id:11,
        up: {x:83, y:88},
        left: {x:83, y:88},
        down: {x:83, y:88},
        right: {x:83, y:88},
        shooting: {x:81,y:150},
        life:40,
        damage:3,
        speed:8,
        sizeX:31,
        sizeY: 20,
        weapon: gApp.item.weapons.fireball.V1,
        attackSpeed:50,
        isBoss:true,
        dead: {
          x:1320,
          y: 16,
          time:120
        }
      }
  }

  var enemyState = function(x, y, type, mapX, mapY) {
    this.width = gApp.tileSize;
    this.height = gApp.tileSize;
    this.x = x;
    this.y = y;
    this.type = enemies[type];
    this.life = enemies[type].life;
    this.sprX;
    this.sprY;
    this.mapX = mapX;
    this.mapY = mapY;
    this.direction = "up";
    this.changeDirectionCooldown = 160;
    this.changeDirectionCount = 0;
    this.attackCount = 0;
    this.update = function() {
      if (this.changeDirectionCount === 0) {
          this.changeDirectionCount = this.changeDirectionCooldown;
          this.direction = getRandomDirection();
      } else {
          this.changeDirectionCount--;
      }
      if(this.attackCount === 0 && this.type.weapon != undefined) {
        this.attackCount = this.type.attackSpeed;
          this.sprY = 60;
          if (this.type.isBoss)
            gApp.item.weaponInit(this.type.weapon, 1,this.x, this.y, this);
          else
            gApp.item.weaponInit(this.type.weapon, undefined, undefined, undefined, this);
          setTimeout(function(){
            this.sprY = 0;
            this.aniAttack = false;
          }.bind(this),140);
      } else {
        this.attackCount--;
      }
      var mapX = Math.round(this.x / gApp.tileSize),
          mapY = Math.round((this.y - gApp.inv.inventory.size) / gApp.tileSize);
      if(this.mapX != mapX || this.mapY != mapY) {
        gApp.maps.State.mapCurr[this.mapY][this.mapX] = 0;
        gApp.maps.State.mapCurr[mapY][mapX] = this.type.id;
        this.mapX = mapX;
        this.mapY = mapY;
      }
      if(this.direction == "up"){
          this.sprY = this.type.up.y;
          this.sprX = this.type.up.x;
          if(this.y > 0 + gApp.inv.inventory.size) {
            gApp.collision.checkMove(this.x, this.y-this.type.speed+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.type.speed, 'up', this, undefined, false);
            this.y -= this.type.speed;
          }
        }
        //left
        else if(this.direction == "left"){
          this.sprY = this.type.left.y;
          this.sprX = this.type.left.x;
          if(this.x > 0) {
            gApp.collision.checkMove(this.x-this.type.speed, this.y+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.type.speed, 'left', this, undefined, false);
            this.x -= this.type.speed;
          }
        }
        //down
        else if(this.direction == "down"){
          this.sprY = this.type.down.y;
          this.sprX = this.type.down.x;
          if ((this.y + gApp.tileSize) < gApp.cHeight) {
            gApp.collision.checkMove(this.x, this.y+this.type.speed+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.type.speed, 'down', this, 6*gApp.scale, false);
            this.y += this.type.speed;
          }

        }
        //right
        else if(this.direction == "right"){
          this.sprY = this.type.right.y;
          this.sprX = this.type.right.x;
          if((this.x + gApp.tileSize) < gApp.cWidth) {
            gApp.collision.checkMove(this.x+this.type.speed, this.y+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.type.speed, 'right', this, undefined, false);
            this.x += this.type.speed;
          }

        }
    }

    this.render = function() {
      if (this.type.isBoss){
        image( gApp.spr.bosses, this.x, this.y, gApp.tileSize*2, gApp.tileSize, this.sprX, this.sprY, this.type.sizeX, this.type.sizeY);
        }
        else{
        image( gApp.spr.enemies, this.x, this.y, gApp.tileSize, gApp.tileSize, this.sprX, this.sprY, this.type.size, this.type.size);
        }
      
    }

    this.gotHurt = function(damage) {
      this.life -= damage;
      if (this.life <= 0) {
        image(gApp.spr.enemies, this.x, this.y, gApp.tileSize, gApp.tileSize, this.type.dead.x, this.type.dead.y, 24, 24);
        gApp.maps.State.mapCurr[this.mapY][this.mapX] = 0;
        var index = gApp.enemy.State.enemies.indexOf(this);
        if (index > -1) {
          gApp.enemy.State.enemies.splice(index, 1);
        }
      }
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
    Enemies: enemies,
    Enemy: enemyState,
    State: new enemiesState()
  };

})();

var getRandomDirection = function () {
    var random = Math.floor(Math.random() * (4)) + 1;
    if(gApp.maps.State.mapX == 2 && gApp.maps.State.mapY == 2){
      if (random > 2){
        random = getRandomDirection();
      }
    }
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
