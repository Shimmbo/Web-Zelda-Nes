var item = (function(){

  var weapons = {
    sword: {
      CV: {type: 'sword'},
      V1: {type: 'sword', damage:1, sprX:0, sprY:195, timer:140, dispX:60, dispY: 195},
      V2: {type: 'sword', damage:2, sprX:0, sprY:225, timer:140, dispX:60, dispY: 225},
      V3: {type: 'sword', damage:3, sprX:0, sprY:255, timer:140, dispX:60, dispY: 255}
    },
    bow: {
      CV: {type: 'bow'},
      V1: {type: 'bow', damage:1, sprX:120, sprY:195, timer:1000, dispX:420, dispY: 255},
      V2: {type: 'bow', damage:2, sprX:120, sprY:225, timer:1000, dispX:420, dispY: 135},
      V3: {type: 'bow', damage:3, sprX:120, sprY:255, timer:1000, dispX:420, dispY: 105}
    },
    bomb: {
      V1: {damage:2, sprX:360, sprY:225, timer:1240, dispX:360.5, dispY: 225},
      end: {sprX:360, sprY:136}
    },
    candle: {
      CV: {type: 'candle'},
      V1: {type: 'candle', damage:1, sprX:390, sprY:195, dispX:390, dispY:195},
      V2: {type: 'candle', damage:1, sprX:420, sprY:195, dispX:420, dispY:195}
    }
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
    this.bombsAmt = inventoryF.inventory.bombs;

    this.init = function(type, locX, locY) {

      this.type = type;

      /*DIFFERENT ITEM FUNCTIONALITY ON CREATION*/
      if(type === weapons.sword.V1 || type === weapons.sword.V2 || type === weapons.sword.V3 || type === weapons.bow.V1 || type === weapons.bow.V2 || type === weapons.bow.V3) {
        stopCounter = type.timer;
        this.itemX = this.dir + type.sprX;
        this.itemY = type.sprY;
        if(type.type === weapons.bow.CV.type && inventoryF.inventory.arrows > 0) {
          inventoryF.inventory.arrows -= 1;
        } else if(type.type === weapons.bow.CV.type && inventoryF.inventory.arrows <= 0){
          delete weaponsOut[this.id];
        }
        
        switch(this.dir / 30) {
          case 0:
            this.y += maps.tileSize-5*canvas.scale;
            this.x += 1 * canvas.scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveY = +4 * canvas.scale;
            }
            break;
          case 1:
            this.x -= maps.tileSize-4*canvas.scale;
            this.y += 1 * canvas.scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveX = -(4 * canvas.scale);
            }
            break;
          case 2:
            this.y -= maps.tileSize-4*canvas.scale;
            this.x -= 1 * canvas.scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveY = -(4 * canvas.scale);
            }
            break;
          case 3:
            this.x += maps.tileSize-5*canvas.scale;
            this.y += 1 * canvas.scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveX = +4 * canvas.scale;
            }
            break;
        }
      }
      else if(type === weapons.bomb.V1) {
        if (this.bombsAmt > 0) {
          inventoryF.inventory.bombs -= 1;
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

      /*BASICALLY SETTIMEOUT TO REMOVE ITEMS AFTER SET TIME*/
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

        if(this.type === weapons.bomb.V1) {
          if(this.bombsAmt > 0) {
            weaponInit(weapons.bomb.end, 5, this.x, this.y);
          }
        }
        delete weaponsOut[this.id];
        counter = 0;

      }

      /*REMOVES ITEMS OUTSIDE OF VIEW*/
      this.x += this.moveX;
      this.y += this.moveY;
      if(this.x < 0-maps.tileSize) {
        delete weaponsOut[this.id];
      }
      if(this.x > canvas.cWidth) {
        delete weaponsOut[this.id];
      }
      if(this.y < 0-maps.tileSize+inventoryF.inventory.size) {
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

    /*ITEM CREATION FUNCTION*/
    var amt = amt || 1;

    for(var i = 0; i < amt; i+=1) {
      new weaponProto().init(type, locX, locY);
    }
  }

  function weaponState() {

    /*LOOPS FOR UPDATING AND DRAWING ITEMS*/
    this.update = function() {
      for (var i in weaponsOut) {
        weaponsOut[i].update();
      }
    }

    this.render = function() {
      for (var i in weaponsOut) {
        weaponsOut[i].render();
      }
    }

  }

  return {
    weapons: weapons,
    weaponsOut: weaponsOut,
    weaponInit: weaponInit,
    _weaponState: new weaponState()
  }

})();
