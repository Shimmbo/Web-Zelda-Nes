var inventoryF = (function(){
  "use strict";

  var weapons = item.weapons,
    scale = canvas.scale,
    gameCtx = canvas.gameCtx,
    cWidth = canvas.width,
    cHeight = canvas.height,
    chr = sprite.chr,
    tileSize = maps.tileSize;

  var inventory = {
    size: 32 * scale,
    slotA: 0,
    slotB: 0,
    storage: {
      0:weapons.sword.V1,
      1:weapons.bomb.V1,
      2:weapons.sword.V2,
      3:weapons.sword.V3,
      4:weapons.candle.V1,
      5:weapons.bow.V2,
      6:weapons.bow.V3,
      7:weapons.candle.V2,
      8:weapons.bow.V1,
      9:0,
      10:0,
      11:0,
      12:0,
      13:0,
      14:0,
      15:0,
      16:0,
      17:0,
      18:0,
      19:0
    },
    rupees: 11,
    keys: 0,
    arrows: 14,
    bombs: 6
  };

  var inventoryState = function() {
    this.opened = false;
    this.lineWidth = 2 * scale;
    this.redText = 14 * scale + "px Courier";
    this.cursorX = 13;
    this.cursorY = 80;
    this.storageSlot = 0;

    this.update = function() {

    };

    this.render = function() {

      /*RENDER INVENTORY STUFF*/
      inventoryTop.bind(this)();
      if(this.opened === true) {
        inventoryFull.bind(this)();
      }
    };
  };

  var inventoryFull = function() {

    var itemX = 0,
      itemY = 34;

    if (this.cursorX < 13) {
      this.storageSlot += 1;
      this.cursorX = 13;
    } else if (this.cursorY < 80) {
      this.cursorY = 80;
      this.storageSlot += 4;
    } else if (this.cursorX > 88) {
      this.cursorX = 88;
      this.storageSlot -= 1;
    } else if (this.cursorY > 192) {
      this.cursorY = 192;
      this.storageSlot -= 4;
    }

    gameCtx.fillStyle = "#111";
    gameCtx.fillRect(0,inventory.size,cWidth,cHeight-inventory.size);
    //navigation cursor
    gameCtx.beginPath();
    gameCtx.strokeStyle = "#F77";
    gameCtx.moveTo(this.cursorX*scale, this.cursorY*scale);
    gameCtx.lineTo((this.cursorX+13)*scale, this.cursorY*scale);
    gameCtx.fillStyle = "#000";
    gameCtx.stroke();
    //inventory red text
    gameCtx.font = this.redText;
    gameCtx.fillStyle = "#C33";
    gameCtx.fillText("Inventory",18*scale,50*scale);
    //inventory blue box
    gameCtx.beginPath();
    gameCtx.strokeStyle = "#33F";
    gameCtx.rect(10*scale,56*scale,94*scale,142*scale);
    gameCtx.stroke();
    //inventory items
    for(var i in inventory.storage) {
      if(inventory.storage.hasOwnProperty(i)) {
        itemX = 25 * (i % 4) + 12;
        if(i % 4 === 0) {
          itemY += 28;
        }
        gameCtx.drawImage(chr, inventory.storage[i].dispX, inventory.storage[i].dispY, 16, 16, itemX*scale, itemY*scale, tileSize, tileSize);
      }
    }
    //triforce red text
    /*gameCtx.font = this.redText;
    gameCtx.fillStyle = "#C33";
    gameCtx.fillText("Triforce",150*scale,180*scale);*/
  };

  var inventoryTop = function() {

    /*INVENTORY TOP DISPLAY*/
    var miniMapX = 7 * scale,
      miniMapY = 4 * scale,
      miniMapW = 67 * scale,
      miniMapH = 23.5 * scale,
      amtIconSize = tileSize/1.4,
      rupeeKeyX = 79.5 * scale,
      rupeeArrowY = 4 * scale,
      arrowBombX = 109.5 * scale, 
      keyBombY = 16 * scale,
      rupeeKeyTxtX = 90 * scale,
      arrowBombTxtX = 120 * scale,
      rupeeArrowTxtY = 13 * scale,
      keyBombTxtY = 25 * scale,
      slotY = 6 * scale,
      slotW = 14 * scale,
      slotH = 20 * scale,
      slotAX = 150 * scale,
      slotBX = 170 * scale,
      whiteText = 10 * scale + "px Courier",
      slotTextY = 8 * scale,
      slotTextAX = 154 * scale,
      slotTextBX = 174 * scale;

    //inventory draw color also helps cover when items leave the screen
    gameCtx.fillStyle = "#000";
    gameCtx.fillRect(0,0,cWidth,inventory.size);
    //draw area for minimap
    gameCtx.fillStyle = "#777";
    gameCtx.fillRect(miniMapX, miniMapY, miniMapW, miniMapH);
    //draw images for amount of things
    gameCtx.drawImage(chr, 270, 225, 16, 16, rupeeKeyX, rupeeArrowY, amtIconSize, amtIconSize);
    gameCtx.drawImage(chr, 360, 255, 16, 16, rupeeKeyX, keyBombY, amtIconSize, amtIconSize);
    gameCtx.drawImage(chr, 179, 195, 16, 16, arrowBombX, rupeeArrowY, amtIconSize, amtIconSize);
    gameCtx.drawImage(chr, 360, 225, 16, 16, arrowBombX, keyBombY, amtIconSize, amtIconSize);
    //draw text for amount of things
    gameCtx.font = 10*scale + "px Arial";
    gameCtx.fillStyle = "#CCC";
    gameCtx.fillText("x"+inventory.rupees+"", rupeeKeyTxtX, rupeeArrowTxtY);
    gameCtx.fillText("x"+inventory.keys+"", rupeeKeyTxtX, keyBombTxtY);
    gameCtx.fillText("x"+inventory.arrows+"", arrowBombTxtX, rupeeArrowTxtY);
    gameCtx.fillText("x"+inventory.bombs+"", arrowBombTxtX, keyBombTxtY);
    //draw inventory slotA
    gameCtx.beginPath();
    gameCtx.lineWidth = ""+ this.lineWidth +"";
    gameCtx.strokeStyle = "#33F";
    gameCtx.rect(slotAX, slotY, slotW, slotH);
    gameCtx.stroke();
    //draw inentory slotB
    gameCtx.beginPath();
    gameCtx.rect(slotBX, slotY, slotW, slotH);
    gameCtx.stroke();
    //draw slot text
    gameCtx.font = whiteText; 
    gameCtx.fillStyle = "#CCC";
    gameCtx.fillText("A", slotTextAX, slotTextY);
    gameCtx.fillText("B", slotTextBX, slotTextY);
    //draw current item in slot
    gameCtx.drawImage(chr, inventory.slotA.dispX, inventory.slotA.dispY, 16, 16, 149.393*scale, 9*scale, tileSize, tileSize);
    gameCtx.drawImage(chr, inventory.slotB.dispX, inventory.slotB.dispY, 16, 16, 169.393*scale, 9*scale, tileSize, tileSize);
    //draw -life- text
    gameCtx.font = this.redText;
    gameCtx.fillStyle = "#C33";
    gameCtx.fillText("-LIFE-",194*scale,11*scale);
    //draw current player life
    for(var i = 0; i < player._playerState.maxLife; i+=1) {
      var sprX = 0,
        lifePosX = 0,
        lifePosY = 0;

      if(i < player._playerState.life) {
        sprX = 244;
      } else {
        sprX = 274;
      }
      if(i <= 6) {
        lifePosX = (192 + i*8)* scale;
        lifePosY = 9;
      } else {
        lifePosX = (192 + (i*8- 56))* scale;
        lifePosY = 18;
      }
      gameCtx.drawImage(chr, sprX, 195, 16, 16, lifePosX, lifePosY*scale, tileSize, tileSize);
    }
  };

  return {
    inventory: inventory,
    _inventoryState: new inventoryState()
  };
  
})();
