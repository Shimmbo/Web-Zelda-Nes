var item = (function(){
  "use strict";

  /*ALL ITEMS FOR ATTACK*/
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

  /*ALL ITEMS THAT HELP DEFENCE*/
  var defence = {
    ring: {
      CV: {type: 'ring'},
      V1: {type: 'ring', defence:1, sprX:0, sprY:195, dispX:60, dispY: 195},
      V2: {type: 'ring', defence:2, sprX:0, sprY:225, dispX:60, dispY: 225}
    },
    heart: {
      V1: {sprX:1, sprY:195, dispX:60, dispY: 195}
    },
    heal: {
      V1: {sprX:1, sprY:195, dispX:60, dispY: 195}
    },

  };

  var _playerState = null,
    inventory = null,
    scale = canvas.scale,
    cWidth = canvas.width,
    cHeight = canvas.height,
    gameCtx = canvas.gameCtx,
    tileSize = maps.tileSize,
    chr = sprite.chr;

  var weaponsOut = {},
    weaponsOutIndex = 0;

  /*WEAPON CREATION FOR PLAYER USE*/
  var weaponProto = function() {

    weaponsOutIndex += 1;
    weaponsOut[weaponsOutIndex] = this;

    var oldUpdate = Date.now(),
      counter = 0,
      stopCounter = 0;

    _playerState = player._playerState;
    inventory = inventoryF.inventory;

    this.id = weaponsOutIndex;
    this.x = _playerState.x;
    this.y = _playerState.y;
    this.dir = _playerState.sprX;
    this.itemX = 0;
    this.itemY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.type = null;
    this.bombsAmt = inventory.bombs;

    this.init = function(type, locX, locY) {

      this.type = type;

      /*DIFFERENT ITEM FUNCTIONALITY ON CREATION*/
      if(type.type === weapons.sword.CV.type || type.type === weapons.bow.CV.type) {
        stopCounter = type.timer;
        this.itemX = this.dir + type.sprX;
        this.itemY = type.sprY;
        if(type.type === weapons.bow.CV.type && inventory.arrows > 0) {
          inventory.arrows -= 1;
        } else if(type.type === weapons.bow.CV.type && inventory.arrows <= 0){
          delete weaponsOut[this.id];
        }
        
        switch(this.dir / 30) {
          case 0:
            this.y += tileSize-5* scale;
            this.x += 1* scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveY = +4* scale;
            }
            break;
          case 1:
            this.x -= tileSize-4* scale;
            this.y += 1* scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveX = -(4* scale);
            }
            break;
          case 2:
            this.y -= tileSize-4* scale;
            this.x -= 1* scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveY = -(4* scale);
            }
            break;
          case 3:
            this.x += tileSize-5* scale;
            this.y += 1* scale;
            if(type.type === weapons.bow.CV.type) {
              this.moveX = +4* scale;
            }
            break;
        }
      }
      else if(type === weapons.bomb.V1) {
        if (this.bombsAmt > 0) {
          inventory.bombs -= 1;
          stopCounter = type.timer;
          this.itemX = type.sprX;
          this.itemY = type.sprY;
        }
      }
      else if(type === weapons.bomb.end) {
        stopCounter = Math.floor((Math.random()* 260) + 160);
        this.itemX = type.sprX;
        this.itemY = type.sprY;
        this.x = locX + Math.floor((Math.random()* (40* scale)) + 10* scale)-26* scale;
        this.y = locY + Math.floor((Math.random()* (40* scale)) + 10* scale)-26* scale;
      }
    };

    this.update = function() {

      /*BASICALLY SETTIMEOUT TO REMOVE ITEMS AFTER TIME*/
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
      if(this.x < 0-tileSize) {
        delete weaponsOut[this.id];
      }
      if(this.x > cWidth) {
        delete weaponsOut[this.id];
      }
      if(this.y < 0-tileSize+inventory.size) {
        delete weaponsOut[this.id];
      }
      if(this.y > cHeight) {
        delete weaponsOut[this.id];
      }
    };

    this.render = function() {
      gameCtx.drawImage(chr, this.itemX, this.itemY, 16, 16, this.x, this.y, tileSize, tileSize);
    };
  };

  /*ITEM CREATION FUNCTION*/
  function weaponInit(type, amt, locX, locY) {
    amt = amt || 1;

    for(var i = 0; i < amt; i+=1) {
      new weaponProto().init(type, locX, locY);
    }
  }

  /*LOOPS FOR UPDATING AND DRAWING ITEMS*/
  var weaponState = function() {

    this.update = function() {
      for (var i in weaponsOut) {
        if(weaponsOut.hasOwnProperty(i)) {
          weaponsOut[i].update();
        }
      }
    };

    this.render = function() {
      for (var i in weaponsOut) {
        if(weaponsOut.hasOwnProperty(i)) {
          weaponsOut[i].render();
        }
      }
    };
  };

  return {
    weapons: weapons,
    weaponsOut: weaponsOut,
    weaponInit: weaponInit,
    _weaponState: new weaponState()
  };

})();
