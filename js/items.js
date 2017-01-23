var item = (function(){

  var weapons = {
    sword: {
      CV: {damage:1, sprX:0, sprY:195, timer:140, dispX:60, dispY: 195},
      V1: {damage:1, sprX:0, sprY:195, timer:140, dispX:60, dispY: 195},
      V2: {damage:2, sprX:0, sprY:225, timer:140, dispX:60, dispY: 225},
      V3: {damage:3, sprX:0, sprY:255, timer:140, dispX:60, dispY: 255}
    },
    bow: {
      CV: {damage:1, sprX:120, sprY:195, timer:1000, dispX:420, dispY: 255},
      V1: {damage:1, sprX:120, sprY:195, timer:1000, dispX:420, dispY: 255},
      V2: {damage:2, sprX:120, sprY:225, timer:1000, dispX:420, dispY: 255},
      V3: {damage:3, sprX:120, sprY:255, timer:1000, dispX:420, dispY: 255}
    },
    bomb: {
      V1: {damage:2, sprX:360, sprY:225, timer:1240, dispX:360, dispY: 225},
      end: {sprX:360, sprY:136}
    },
    candle: {
      V1: {damage:1, sprX:390, sprY:195, dispX:390, dispY:195},
      V2: {damage:1, sprX:420, sprY:195, dispX:420, dispY:195}
    }
  };

  var inventory = {
    size: 32 * canvas.scale,
    slotA: 0,
    slotB: 0,
    storage: {
      0:weapons.sword.CV,
      1:null,
      2:null,
      3:null,
      4:null,
      5:null,
      6:null,
      7:null,
      8:null
    },
    rupees: 11,
    keys: 0,
    arrows: 14,
    bombs: 6
  };

  var weaponsOut = {},
    weaponsOutIndex = 0;

  function weaponProto() {

    weaponsOutIndex += 1;
    weaponsOut[weaponsOutIndex] = this;

    var oldUpdate = Date.now(),
      counter = 0,
      stopCounter = 0;

    this.id = weaponsOutIndex;
    this.x = player._playerState.x;
    this.y = player._playerState.y;
    this.dir = player._playerState.sprX;
    this.itemX = 0;
    this.itemY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.type = null;
    this.bombs = inventory.bombs;

    this.init = function(type, locX, locY) {

      this.type = type;

      if(type === weapons.sword.CV || type === weapons.bow.CV) {
        stopCounter = type.timer;
        this.itemX = this.dir + type.sprX;
        this.itemY = type.sprY;
        if(type === weapons.bow.CV && inventory.arrows > 0) {
          inventory.arrows -= 1;
        } else if(type === weapons.bow.CV && inventory.arrows <= 0){
          delete weaponsOut[this.id];
        }
        
        switch(this.dir / 30) {
          case 0:
            this.y += maps.tileSize-5*canvas.scale;
            this.x += 1 * canvas.scale;
            if(type === weapons.bow.CV) {
              this.moveY = +4 * canvas.scale;
            }
            break;
          case 1:
            this.x -= maps.tileSize-4*canvas.scale;
            this.y += 1 * canvas.scale;
            if(type === weapons.bow.CV) {
              this.moveX = -(4 * canvas.scale);
            }
            break;
          case 2:
            this.y -= maps.tileSize-4*canvas.scale;
            this.x -= 1 * canvas.scale;
            if(type === weapons.bow.CV) {
              this.moveY = -(4 * canvas.scale);
            }
            break;
          case 3:
            this.x += maps.tileSize-5*canvas.scale;
            this.y += 1 * canvas.scale;
            if(type === weapons.bow.CV) {
              this.moveX = +4 * canvas.scale;
            }
            break;
        }
      }
      else if(type === weapons.bomb.V1) {
        if(this.bombs > 0) {
          inventory.bombs -= 1;
          stopCounter = type.timer;
          this.itemX = type.sprX;
          this.itemY = type.sprY;
        }
      }
      else if(type === weapons.bomb.end) {
        stopCounter = Math.floor((Math.random() * 260) + 160);
        this.itemX = type.sprX;
        this.itemY = type.sprY;
        this.x = locX + Math.floor((Math.random() * (40 * canvas.scale)) + 10 * canvas.scale)-26 * canvas.scale;
        this.y = locY + Math.floor((Math.random() * (40 * canvas.scale)) + 10 * canvas.scale)-26 * canvas.scale;
      }
    }

    this.update = function() {
      var nowUpdate = Date.now();
      var deltaTime = nowUpdate - oldUpdate;
      oldUpdate = nowUpdate;
      counter += deltaTime;
      if(counter > stopCounter/3) {

        if(this.type === weapons.bomb.end) {
          this.itemX = this.type.sprX+17;
        }

      }
      if(counter > stopCounter) {

        if(this.type === inventory.slotA) {}
        if(this.type === inventory.slotB) {
          if(this.bombs > 0) {
            weaponInit(weapons.bomb.end, 5, this.x, this.y);
          }
        }
        delete weaponsOut[this.id];
        counter = 0;

      }
      this.x += this.moveX;
      this.y += this.moveY;
      if(this.x < 0-maps.tileSize) {
        delete weaponsOut[this.id];
      }
      if(this.x > canvas.cWidth) {
        delete weaponsOut[this.id];
      }
      if(this.y < 0-maps.tileSize+item.inventory.size) {
        delete weaponsOut[this.id];
      }
      if(this.y > canvas.cHeight) {
        delete weaponsOut[this.id];
      }
    }

    this.render = function() {
      canvas.gameCtx.drawImage(sprite.chr, this.itemX, this.itemY, 16, 16, this.x, this.y, maps.tileSize, maps.tileSize);
    }

  }

  function weaponInit(type, amt, locX, locY) {
    var amt = amt || 1;

    for(var i = 0; i < amt; i+=1) {
      new weaponProto().init(type, locX, locY);
    }
  }

  function weaponState() {

    this.update = function() {
      for (var i in weaponsOut) {
        weaponsOut[i].update();
      }
    }

    this.render = function() {
      for (var i in weaponsOut) {
        weaponsOut[i].render();
      }
      //inventory draw color also helps cover when items leave the screen
      canvas.gameCtx.fillStyle = "#000";
      canvas.gameCtx.fillRect(0,0,canvas.cWidth,inventory.size);
      //draw area for minimap
      canvas.gameCtx.fillStyle = "#777";
      canvas.gameCtx.fillRect(7 * canvas.scale,4 * canvas.scale,67 * canvas.scale,23.5 * canvas.scale);
      //draw images for amount of things
      canvas.gameCtx.drawImage(sprite.chr, 270, 225, 16, 16, 79.5 * canvas.scale, 4 * canvas.scale, maps.tileSize/1.4, maps.tileSize/1.4);
      canvas.gameCtx.drawImage(sprite.chr, 360, 255, 16, 16, 79.5 * canvas.scale, 16 * canvas.scale, maps.tileSize/1.4, maps.tileSize/1.4);
      canvas.gameCtx.drawImage(sprite.chr, 179, 195, 16, 16, 109.5 * canvas.scale, 4 * canvas.scale, maps.tileSize/1.4, maps.tileSize/1.4);
      canvas.gameCtx.drawImage(sprite.chr, 360, 225, 16, 16, 109.5 * canvas.scale, 16 * canvas.scale, maps.tileSize/1.4, maps.tileSize/1.4);
      //draw text for amount of things
      canvas.gameCtx.font = 10 * canvas.scale + "px Arial";
      canvas.gameCtx.fillStyle = "#CCC";
      canvas.gameCtx.fillText("x"+inventory.rupees+"",90 * canvas.scale,13 * canvas.scale);
      canvas.gameCtx.fillText("x"+inventory.keys+"",90 * canvas.scale,25 * canvas.scale);
      canvas.gameCtx.fillText("x"+inventory.arrows+"",120 * canvas.scale,13 * canvas.scale);
      canvas.gameCtx.fillText("x"+inventory.bombs+"",120 * canvas.scale,25 * canvas.scale);
      //draw inventory slotA
      canvas.gameCtx.beginPath();
      canvas.gameCtx.lineWidth = ""+ 2 * canvas.scale +""
      canvas.gameCtx.strokeStyle = "#33F";
      canvas.gameCtx.rect(150 * canvas.scale,6 * canvas.scale,14 * canvas.scale,20 * canvas.scale);
      canvas.gameCtx.stroke();
      //draw inentory slotB
      canvas.gameCtx.beginPath();
      canvas.gameCtx.rect(170 * canvas.scale,6 * canvas.scale,14 * canvas.scale,20 * canvas.scale);
      canvas.gameCtx.stroke();
      //draw slot text
      canvas.gameCtx.font = 10 * canvas.scale + "px Courier";
      canvas.gameCtx.fillStyle = "#CCC";
      canvas.gameCtx.fillText("A",154 * canvas.scale,8 * canvas.scale);
      canvas.gameCtx.fillText("B",174 * canvas.scale,8 * canvas.scale);
      //draw current item in slot
      canvas.gameCtx.drawImage(sprite.chr, inventory.slotA.dispX, inventory.slotA.dispY, 16, 16, 149.393 * canvas.scale, 9 * canvas.scale, maps.tileSize, maps.tileSize);
      canvas.gameCtx.drawImage(sprite.chr, inventory.slotB.dispX, inventory.slotB.dispY, 16, 16, 169.393 * canvas.scale, 9 * canvas.scale, maps.tileSize, maps.tileSize);
      //draw -life- text
      canvas.gameCtx.font = 14 * canvas.scale + "px Courier";
      canvas.gameCtx.fillStyle = "#C33";
      canvas.gameCtx.fillText("-LIFE-",194 * canvas.scale,11 * canvas.scale);
      //draw current player life
      for(var i = 0; i < player._playerState.maxLife; i+=1) {
        if(i < player._playerState.life) {
          var sprX = 244;
        } else {
          var sprX = 274;
        }
        if(i <= 6) {
          var lifePosX = (192 + i*8) * canvas.scale;
          var lifePosY = 9;
        } else {
          var lifePosX = (192 + (i*8- 56)) * canvas.scale;
          var lifePosY = 18;
        }
        canvas.gameCtx.drawImage(sprite.chr, sprX, 195, 16, 16, lifePosX, lifePosY * canvas.scale, maps.tileSize, maps.tileSize);
      }
    }

  }

  return {
    weapons: weapons,
    inventory: inventory,
    weaponsOut: weaponsOut,
    weaponInit: weaponInit,
    _weaponState: new weaponState()
  }

})();
