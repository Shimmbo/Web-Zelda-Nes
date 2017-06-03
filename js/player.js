gApp.player = (function(){
  "use strict";
  
  gApp.inv.inventory.slotA = gApp.inv.inventory.storage[0];
  gApp.item.weapons.sword.V1 = gApp.inv.inventory.storage[0];
  gApp.inv.inventory.slotB = gApp.inv.inventory.storage[1];
  gApp.item.weapons.bow.V1 = gApp.inv.inventory.storage[1];

  var playerState = function() {
    this.width = gApp.tileSize;
    this.height = gApp.tileSize;
    this.life = 8;
    this.maxLife = 8;
    this.x = 16 * gApp.scale;
    this.y = 48 * gApp.scale;
    this.speed = 1 * gApp.scale;
    this.sprX = 0;
    this.sprY = 0;
    this.hitboxMove = 4 * gApp.scale;
    this.aniWalk = false;
    this.aniAttack = false;
    this.aniCounter = 0;
    this.inmune = 160;
    this.inmuneCount = 0;
    this.pressed = function(keyInput) {

      if(gApp.inv.State.opened === false) {

        /*PLAYER ITEM ANIMATION AND CREATION*/
        //use1
        if(gApp.keyDown.use1 === false && keyInput === 'use1' && this.aniAttack === false){
          this.aniAttack = true;
          gApp.keyDown.use1 = true;

          if(this.aniAttack === true){
            this.sprY = 60;
            gApp.item.weaponInit(gApp.inv.inventory.slotA);
            setTimeout(function(){
              this.sprY = 0;
              this.aniAttack = false;
            }.bind(this),140);
          } else{
            this.aniCounter = 0;
          }
        }
        //use2
        if(gApp.keyDown.use2 === false && keyInput === 'use2' && this.aniAttack === false){
          this.aniAttack = true;
          gApp.keyDown.use2 = true;

          if(this.aniAttack === true){
            this.sprY = 60;
            gApp.item.weaponInit(gApp.inv.inventory.slotB);
            setTimeout(function(){
              this.sprY = 0;
              this.aniAttack = false;
            }.bind(this),140);
          } else{
            this.aniCounter = 0;
          }
        }
      } 
    };

    this.update = function() {
      if (this.inmuneCount !== 0) {
          this.inmuneCount--;
      } 

      if(gApp.inv.State.opened === false) {

        /*PLAYER MOVEMENT*/
        //up
        if(gApp.keyDown.up === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 60;
          this.aniWalk = true;
          if(this.y > 0 + gApp.inv.inventory.size) {
            gApp.collision.checkMove(this.x, this.y-this.speed+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'up', this, undefined, true);
            this.y -= this.speed;
          } else {
            gApp.maps.State.mapY -= 1;
            gApp.scene = true;
            this.y = gApp.cHeight-gApp.tileSize;
          }

        }
        //left
        else if(gApp.keyDown.left === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 30;
          this.aniWalk = true;
          if(this.x > 0) {
            gApp.collision.checkMove(this.x-this.speed, this.y+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'left', this, undefined, true);
            this.x -= this.speed;
          } else{
            gApp.maps.State.mapX -= 1;
            gApp.scene = true;
            this.x = gApp.cWidth-gApp.tileSize;
          }
        }
        //down
        else if(gApp.keyDown.down === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 0;
          this.aniWalk = true;
          if ((this.y + gApp.tileSize) < gApp.cHeight) {
            gApp.collision.checkMove(this.x, this.y+this.speed+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'down', this, 6*gApp.scale, true);
            this.y += this.speed;
          } else{
            gApp.maps.State.mapY += 1;
            gApp.scene = true;
            this.y = 0 + gApp.inv.inventory.size;
          }

        }
        //right
        else if(gApp.keyDown.right === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 90;
          this.aniWalk = true;
          if((this.x + gApp.tileSize) < gApp.cWidth) {
            gApp.collision.checkMove(this.x+this.speed, this.y+6*gApp.scale, gApp.tileSize, gApp.tileSize-6*gApp.scale, this.speed, 'right', this, undefined, true);
            this.x += this.speed;
          } else{
            gApp.maps.State.mapX += 1;
            gApp.scene = true;
            this.x = 0;
          }

        }

        if(this.aniWalk === true){
          this.aniCounter += 0.16; 
          this.sprY = Math.floor(this.aniCounter) % 2 * 30;
          this.aniWalk = false;
        }

      }
    };

    this.render = function() {
      image(gApp.spr.chr, this.x, this.y, gApp.tileSize, gApp.tileSize, this.sprX, this.sprY, gApp.spr.size, gApp.spr.size);
    };

    this.gotHurt = function(damage) {
      if(this.inmuneCount == 0) {
        this.life -= damage;
        this.inmuneCount = this.inmune;
      }
      if(this.life <= 0) location.reload();
    }
  };

  return {
    State: new playerState()
  };

})();
