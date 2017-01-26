var player = (function(){

  var keyDown = {
    up: false,
    down: false,
    left: false,
    right: false,
    item: false,
    item2: false,
    inventory: false,
    invCursor: false
  };

  inventoryF.inventory.slotA = inventoryF.inventory.storage[0];
  item.weapons.sword.V1 = inventoryF.inventory.storage[0];

  function playerState() {
    this.width = maps.tileSize;
    this.height = maps.tileSize;
    this.life = 3;
    this.maxLife = 3;
    this.x = 16 * canvas.scale;
    this.y = 48 * canvas.scale;
    this.speed = 1 * canvas.scale;
    this.sprX = 0;
    this.sprY = 0;
    this.hitboxMove = 4 * canvas.scale;
    this.aniWalk = false;
    this.aniAttack = false;
    this.aniCounter = 0;

    this.pressed = function(keyInput) {

      if(inventoryF._inventoryState.opened === false) {

        /*PLAYER ITEM ANIMATION AND CREATION*/
        //item
        if(keyDown.item === false && keyInput === 'item' && this.aniAttack === false){
          this.aniAttack = true;
          keyDown.item = true;

          if(this.aniAttack === true){
            this.sprY = 60;
            item.weaponInit(inventoryF.inventory.slotA);
            setTimeout(function(){
              this.sprY = 0;
              this.aniAttack = false;
            }.bind(this),140);
          } else{
            this.aniCounter = 0;
          }
        }
        //item2
        if(keyDown.item2 === false && keyInput === 'item2' && this.aniAttack === false){
          this.aniAttack = true;
          keyDown.item2 = true;

          if(this.aniAttack === true){
            this.sprY = 60;
            item.weaponInit(inventoryF.inventory.slotB);
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
        //item
        if (keyDown.item === false && keyInput === 'item' && this.aniAttack === false){
          keyDown.item = true;
          inventoryF.inventory.slotA = inventoryF.inventory.storage[inventoryF._inventoryState.storageSlot];
        }
        //item2
        if(keyDown.item2 === false && keyInput === 'item2' && this.aniAttack === false){
          keyDown.item2 = true;
          inventoryF.inventory.slotB = inventoryF.inventory.storage[inventoryF._inventoryState.storageSlot];
        }

      }
    }

    this.update = function() {

      if(inventoryF._inventoryState.opened === false) {

        /*PLAYER MOVEMENT*/
        //up
        if(keyDown.up === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 60;
          this.aniWalk = true;
          if(this.y > 0 + inventoryF.inventory.size) {
            checkMove(this.x, this.y-this.speed+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'up', this);
            this.y -= this.speed;
          } else {
            maps._mapState.mapY -= 1;
            canvas.scene = true;
            this.y = canvas.cHeight-maps.tileSize;
          }

        }
        //left
        else if(keyDown.left === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 30;
          this.aniWalk = true;
          if(this.x > 0) {
            checkMove(this.x-this.speed, this.y+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'left', this);
            this.x -= this.speed;
          } else{
            maps._mapState.mapX -= 1;
            canvas.scene = true;
            this.x = canvas.cWidth-maps.tileSize;
          }
        }
        //down
        else if(keyDown.down === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 0;
          this.aniWalk = true;
          if ((this.y + maps.tileSize) < canvas.cHeight) {
            checkMove(this.x, this.y+this.speed+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'down', this, 6*canvas.scale);
            this.y += this.speed;
          } else{
            maps._mapState.mapY += 1;
            canvas.scene = true;
            this.y = 0 + inventoryF.inventory.size;
          }

        }
        //right
        else if(keyDown.right === true && this.aniAttack === false){
          this.sprY = 0;
          this.sprX = 90;
          this.aniWalk = true;
          if((this.x + maps.tileSize) < canvas.cWidth) {
            checkMove(this.x+this.speed, this.y+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'right', this);
            this.x += this.speed;
          } else{
            maps._mapState.mapX += 1;
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
          inventoryF._inventoryState.cursorY -= 28;
          inventoryF._inventoryState.storageSlot -= 4;
        }
        //left
        else if(keyDown.left === true && keyDown.invCursor === false){
          keyDown.invCursor = true;
          inventoryF._inventoryState.cursorX -= 25;
          inventoryF._inventoryState.storageSlot -= 1;
        }
        //down
        else if(keyDown.down === true && keyDown.invCursor === false){
          keyDown.invCursor = true;
          inventoryF._inventoryState.cursorY += 28;
          inventoryF._inventoryState.storageSlot += 4;
        }
        //right
        else if(keyDown.right === true && keyDown.invCursor === false){
          keyDown.invCursor = true;
          inventoryF._inventoryState.cursorX += 25;
          inventoryF._inventoryState.storageSlot += 1;
        }

      }
    }

    this.render = function() {
      canvas.gameCtx.drawImage(sprite.chr, this.sprX, this.sprY, sprite.size, sprite.size, this.x, this.y, maps.tileSize, maps.tileSize);
    }
  }

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
    //item
    if(e.keyCode === 90 || e.keyCode === 75){
      player._playerState.pressed('item');
    }
    //item2
    if(e.keyCode === 88 || e.keyCode === 76){
      player._playerState.pressed('item2');
    }
    //inventory
    if(e.keyCode === 32 && keyDown.inventory === false) {
      keyDown.inventory = true;
      if(inventoryF._inventoryState.opened === false) {
        inventoryF._inventoryState.opened = true;
      } else if(inventoryF._inventoryState.opened === true) {
        inventoryF._inventoryState.opened = false;
      }
    }
  }

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
    //item
    if(e.keyCode === 90 || e.keyCode === 75){
      keyDown.item = false;
    }
    //item2
    if(e.keyCode === 88 || e.keyCode === 76){
      keyDown.item2 = false;
    }
    //inventory
    if(e.keyCode === 32 && keyDown.inventory === true) {
      keyDown.inventory = false;
    }
  }

  return {
    _playerState: new playerState()
  }

})();
