var player = (function(){

  var keyDown = {
    up: false,
    down: false,
    left: false,
    right: false,
    attack: false,
    item: false
  };

  //item.weapons.sword.CV = item.weapons.sword.V1;
  item.inventory.slotA = item.weapons.sword.CV;
  item.inventory.slotB = item.weapons.bomb.V1;

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

      // attack
      if (keyDown.attack === false && keyInput === 'attack' && this.aniAttack === false){
        this.aniAttack = true;
        keyDown.attack = true;

        if (this.aniAttack === true){
          this.sprY = 60;
          item.weaponInit(item.inventory.slotA);
          setTimeout(function(){
            this.sprY = 0;
            this.aniAttack = false;
          }.bind(this),140);
        } else {
          this.aniCounter = 0;
        }
      }
      // item
      if (keyDown.item === false && keyInput === 'item' && this.aniAttack === false){
        keyDown.item = true;
        item.weaponInit(item.inventory.slotB);
      }

    }

    this.update = function() {

      //up
      if (keyDown.up === true && this.aniAttack === false){
        this.sprY = 0;
        this.sprX = 60;
        this.aniWalk = true;
        if (this.y > 0 + item.inventory.size) {
          checkMove(this.x, this.y-this.speed+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'up', this);
          this.y -= this.speed;
        } else {
          maps._mapState.mapY -= 1;
          canvas.scene = true;
          this.y = canvas.cHeight-maps.tileSize;
        }

      }
      // left
      else if (keyDown.left === true && this.aniAttack === false){
        this.sprY = 0;
        this.sprX = 30;
        this.aniWalk = true;
        if (this.x > 0) {
          checkMove(this.x-this.speed, this.y+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'left', this);
          this.x -= this.speed;
        } else {
          maps._mapState.mapX -= 1;
          canvas.scene = true;
          this.x = canvas.cWidth-maps.tileSize;
        }
      }
      // down
      else if (keyDown.down === true && this.aniAttack === false){
        this.sprY = 0;
        this.sprX = 0;
        this.aniWalk = true;
        if ((this.y + maps.tileSize) < canvas.cHeight) {
          checkMove(this.x, this.y+this.speed+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'down', this, 6*canvas.scale);
          this.y += this.speed;
        } else {
          maps._mapState.mapY += 1;
          canvas.scene = true;
          this.y = 0 + item.inventory.size;
        }

      }
      // right
      else if (keyDown.right === true && this.aniAttack === false){
        this.sprY = 0;
        this.sprX = 90;
        this.aniWalk = true;
        if ((this.x + maps.tileSize) < canvas.cWidth) {
          checkMove(this.x+this.speed, this.y+6*canvas.scale, maps.tileSize, maps.tileSize-6*canvas.scale, this.speed, 'right', this);
          this.x += this.speed;
        } else {
          maps._mapState.mapX += 1;
          canvas.scene = true;
          this.x = 0;
        }

      }

      if (this.aniWalk === true){
        this.aniCounter += 0.16; 
        this.sprY = Math.floor(this.aniCounter) % 2 * 30;
        this.aniWalk = false;
      }

    }

    this.render = function() {
      canvas.gameCtx.drawImage(sprite.chr, this.sprX, this.sprY, sprite.size, sprite.size, this.x, this.y, maps.tileSize, maps.tileSize);
    }

  }

  window.onkeydown = function(e) {
    // up
    if (e.keyCode === 87 || e.keyCode === 38) {
      keyDown.up = true;
    }
    // left
    if (e.keyCode === 65 || e.keyCode === 37){
      keyDown.left = true;
    }
    // down
    if (e.keyCode === 83 || e.keyCode === 40){
      keyDown.down = true;
    }
    // right
    if (e.keyCode === 68 || e.keyCode === 39){
      keyDown.right = true;
    }
    //attack
    if (e.keyCode === 90 || e.keyCode === 75){
      player._playerState.pressed('attack');
    }
    //item
    if (e.keyCode === 88 || e.keyCode === 76){
      player._playerState.pressed('item');
    }
  }

  window.onkeyup = function(e) {
    // left
    if (e.keyCode === 65 || e.keyCode === 37){
      keyDown.left = false;
    } 
    // right
    if (e.keyCode === 68 || e.keyCode === 39){
      keyDown.right = false;
    } 
    // down
    if (e.keyCode === 83 || e.keyCode === 40){
      keyDown.down =  false;
    } 
    // up
    if (e.keyCode === 87 || e.keyCode === 38){
      keyDown.up = false;
    }
    //attack
    if (e.keyCode === 90 || e.keyCode === 75){
      keyDown.attack = false;
    }
    //item
    if (e.keyCode === 88 || e.keyCode === 76){
      keyDown.item = false;
    }
  }

  return {
    _playerState: new playerState()
  }

})();
