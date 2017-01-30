var player = (function(){
  "use strict";
  
  var keyDown = {
    up: false,
    down: false,
    left: false,
    right: false,
    atk: false,
    atk2: false,
    inventory: false,
    invCursor: false
  };

  var inventory = inventoryF.inventory,
    _inventoryState = inventoryF._inventoryState,
    weapons = item.weapons,
    weaponInit = item.weaponInit,
    tileSize = maps.tileSize,
    _mapState = maps._mapState,
    scale = canvas.scale,
    cWidth = canvas.width,
    cHeight = canvas.height,
    gameCtx = canvas.gameCtx,
    checkMove = collision.checkMove;

  inventory.slotA = inventory.storage[0];
  weapons.sword.V1 = inventory.storage[0];

  var playerState = function() {
    this.width = tileSize;
    this.height = tileSize;
    this.life = 3;
    this.maxLife = 3;
    this.x = 16 * scale;
    this.y = 48 * scale;
    this.speed = 1 * scale;
    this.sprX = 0;
    this.sprY = 0;
    this.hitboxMove = 4 * scale;
    this.aniWalk = false;
    this.aniAttack = false;
    this.aniCounter = 0;

    this.pressed = function(keyInput) {

      if(_inventoryState.opened === false) {

        /*PLAYER ITEM ANIMATION AND CREATION*/
        //atk
        if(keyDown.atk === false && keyInput === 'atk' && this.aniAttack === false){
          this.aniAttack = true;
          keyDown.atk = true;

          if(this.aniAttack === true){
            this.sprY = 60;
            weaponInit(inventory.slotA);
            setTimeout(function(){
              this.sprY = 0;
              this.aniAttack = false;
            }.bind(this),140);
          } else{
            this.aniCounter = 0;
          }
        }
        //atk2
        if(keyDown.atk2 === false && keyInput === 'atk2' && this.aniAttack === false){
          this.aniAttack = true;
          keyDown.atk2 = true;

          if(this.aniAttack === true){
            this.sprY = 60;
            weaponInit(inventory.slotB);
            setTimeout(function(){
              this.sprY = 0;
              this.aniAttack = false;
            }.bind(this),140);
          } else{
            this.aniCounter = 0;
          }
        }
      } 
      else{

        /*INVENTORY ITEM SELECT*/
        //atk
        if (keyDown.atk === false && keyInput === 'atk' && this.aniAttack === false){
          keyDown.atk = true;
          inventory.slotA = inventory.storage[_inventoryState.storageSlot];
        }
        //atk2
        if(keyDown.atk2 === false && keyInput === 'atk2' && this.aniAttack === false){
          keyDown.atk2 = true;
          inventory.slotB = inventory.storage[_inventoryState.storageSlot];
        }

      }
    };

    this.update = function() {

      if(_inventoryState.opened === false) {

        /*PLAYER MOVEMENT*/
        //up
        if(keyDown.up === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 60;
          this.aniWalk = true;
          if(this.y > 0 + inventory.size) {
            checkMove(this.x, this.y-this.speed+6*scale, tileSize, tileSize-6*scale, this.speed, 'up', this);
            this.y -= this.speed;
          } else {
            _mapState.mapY -= 1;
            canvas.scene = true;
            this.y = cHeight-tileSize;
          }

        }
        //left
        else if(keyDown.left === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 30;
          this.aniWalk = true;
          if(this.x > 0) {
            checkMove(this.x-this.speed, this.y+6*scale, tileSize, tileSize-6*scale, this.speed, 'left', this);
            this.x -= this.speed;
          } else{
            _mapState.mapX -= 1;
            canvas.scene = true;
            this.x = cWidth-tileSize;
          }
        }
        //down
        else if(keyDown.down === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 0;
          this.aniWalk = true;
          if ((this.y + tileSize) < cHeight) {
            checkMove(this.x, this.y+this.speed+6*scale, tileSize, tileSize-6*scale, this.speed, 'down', this, 6*scale);
            this.y += this.speed;
          } else{
            _mapState.mapY += 1;
            canvas.scene = true;
            this.y = 0 + inventory.size;
          }

        }
        //right
        else if(keyDown.right === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 90;
          this.aniWalk = true;
          if((this.x + tileSize) < cWidth) {
            checkMove(this.x+this.speed, this.y+6*scale, tileSize, tileSize-6*scale, this.speed, 'right', this);
            this.x += this.speed;
          } else{
            _mapState.mapX += 1;
            canvas.scene = true;
            this.x = 0;
          }

        }

        if(this.aniWalk === true){
          this.aniCounter += 0.16; 
          this.sprY = Math.floor(this.aniCounter) % 2 * 30;
          this.aniWalk = false;
        }

      } else{

        /*INVENTORY CURSOR MOVEMENT*/
        //up
        if(keyDown.up === true && keyDown.invCursor === false){
          keyDown.invCursor = true;
          _inventoryState.cursorY -= 28;
          _inventoryState.storageSlot -= 4;
        }
        //left
        else if(keyDown.left === true && keyDown.invCursor === false){
          keyDown.invCursor = true;
          _inventoryState.cursorX -= 25;
          _inventoryState.storageSlot -= 1;
        }
        //down
        else if(keyDown.down === true && keyDown.invCursor === false){
          keyDown.invCursor = true;
          _inventoryState.cursorY += 28;
          _inventoryState.storageSlot += 4;
        }
        //right
        else if(keyDown.right === true && keyDown.invCursor === false){
          keyDown.invCursor = true;
          _inventoryState.cursorX += 25;
          _inventoryState.storageSlot += 1;
        }

      }
    };

    this.render = function() {
      gameCtx.drawImage(sprite.chr, this.sprX, this.sprY, sprite.size, sprite.size, this.x, this.y, tileSize, tileSize);
    };
  };

  window.onkeydown = function(e) {
    //up
    if(e.keyCode === 87 || e.keyCode === 38) {
      keyDown.up = true;
    }
    //left
    if(e.keyCode === 65 || e.keyCode === 37){
      keyDown.left = true;
    }
    //down
    if(e.keyCode === 83 || e.keyCode === 40){
      keyDown.down = true;
    }
    //right
    if(e.keyCode === 68 || e.keyCode === 39){
      keyDown.right = true;
    }
    //atk
    if(e.keyCode === 90 || e.keyCode === 75){
      player._playerState.pressed('atk');
    }
    //atk2
    if(e.keyCode === 88 || e.keyCode === 76){
      player._playerState.pressed('atk2');
    }
    //inventory
    if(e.keyCode === 32 && keyDown.inventory === false) {
      keyDown.inventory = true;
      if(_inventoryState.opened === false) {
        _inventoryState.opened = true;
      } else if(_inventoryState.opened === true) {
        _inventoryState.opened = false;
      }
    }
  };

  window.onkeyup = function(e) {
    //left
    if(e.keyCode === 65 || e.keyCode === 37){
      keyDown.left = false;
      keyDown.invCursor = false;
    } 
    //right
    if(e.keyCode === 68 || e.keyCode === 39){
      keyDown.right = false;
      keyDown.invCursor = false;
    } 
    //down
    if(e.keyCode === 83 || e.keyCode === 40){
      keyDown.down =  false;
      keyDown.invCursor = false;
    } 
    //up
    if(e.keyCode === 87 || e.keyCode === 38){
      keyDown.up = false;
      keyDown.invCursor = false;
    }
    //atk
    if(e.keyCode === 90 || e.keyCode === 75){
      keyDown.atk = false;
    }
    //atk2
    if(e.keyCode === 88 || e.keyCode === 76){
      keyDown.atk2 = false;
    }
    //inventory
    if(e.keyCode === 32 && keyDown.inventory === true) {
      keyDown.inventory = false;
    }
  };

  return {
    _playerState: new playerState()
  };

})();
