gApp.enemy = (function(){
  "use strict";
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
        up: {x:624, y:0},
        left: {x:480, y:0},
        down: {x:528, y:0},
        right: {x:576, y:0},
        life:3,
        damage:1,
        speed:2,
        attackSpeed:80,
        size:20,
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
        up: {x:816, y:0},
        left: {x:672, y:0},
        down: {x:730, y:0},
        right: {x:768, y:0},
        life:5,
        damage:2,
        speed:3,
        attackSpeed:50,
        size:20,
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
        up: {x:48, y:84},
        left: {x:24, y:84},
        down: {x:0, y:84},
        right: {x:72, y:84},
        life:20,
        damage:2,
        speed:20,
        size:24,
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
        image(this.type.isBoss ? gApp.spr.bosses : gApp.spr.enemies, this.x, this.y, gApp.tileSize, gApp.tileSize, this.sprX, this.sprY, this.type.size, this.type.size);
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
