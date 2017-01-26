var inventoryF = (function(){

  var inventory = {
    size: 32 * canvas.scale,
    slotA: 0,
    slotB: 0,
    storage: {
      0:item.weapons.sword.V1,
      1:item.weapons.bomb.V1,
      2:item.weapons.sword.V2,
      3:item.weapons.sword.V3,
      4:item.weapons.candle.V1,
      5:item.weapons.bow.V2,
      6:item.weapons.bow.V3,
      7:item.weapons.candle.V2,
      8:item.weapons.bow.V1,
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

  function inventoryState() {
    this.opened = false;
    this.lineWidth = 2 * canvas.scale;
    this.redText = 14 * canvas.scale + "px Courier";
    this.cursorX = 13;
    this.cursorY = 80;
    this.storageSlot = 0;

    this.update = function() {

    }

    this.render = function() {

      /*RENDER INVENTORY STUFF*/
      inventoryTop.bind(this)();
      if(this.opened === true) {
        inventoryFull.bind(this)();
      }
    }
  }

  function inventoryFull() {

    /*MAIN INVENTORY DRAWING && SOME FUNCTIONALITY*/
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

    canvas.gameCtx.fillStyle = "#111";
    canvas.gameCtx.fillRect(0,inventory.size,canvas.cWidth,canvas.cHeight-inventory.size);
    //navigation cursor
    canvas.gameCtx.beginPath();
    canvas.gameCtx.strokeStyle = "#F77";
    canvas.gameCtx.moveTo(this.cursorX * canvas.scale, this.cursorY * canvas.scale);
    canvas.gameCtx.lineTo((this.cursorX+13) * canvas.scale, this.cursorY * canvas.scale);
    canvas.gameCtx.fillStyle = "#000";
    canvas.gameCtx.stroke();
    //inventory red text
    canvas.gameCtx.font = this.redText;
    canvas.gameCtx.fillStyle = "#C33";
    canvas.gameCtx.fillText("Inventory",18 * canvas.scale,50 * canvas.scale);
    //inventory blue box
    canvas.gameCtx.beginPath();
    canvas.gameCtx.strokeStyle = "#33F";
    canvas.gameCtx.rect(10 * canvas.scale,56 * canvas.scale,94 * canvas.scale,142 * canvas.scale);
    canvas.gameCtx.stroke();
    //inventory items
    for(var i in inventory.storage) {
      itemX = 25 * (i % 4) + 12;
      if(i % 4 === 0) {
        itemY += 28;
      }
      canvas.gameCtx.drawImage(sprite.chr, inventory.storage[i].dispX, inventory.storage[i].dispY, 16, 16, itemX * canvas.scale, itemY * canvas.scale, maps.tileSize, maps.tileSize);
    }
    //triforce red text
    /*canvas.gameCtx.font = this.redText;
    canvas.gameCtx.fillStyle = "#C33";
    canvas.gameCtx.fillText("Triforce",150 * canvas.scale,180 * canvas.scale);*/
  }

  function inventoryTop() {

    /*INVENTORY TOP DISPLAY*/
    var miniMapX = 7 * canvas.scale,
      miniMapY = 4 * canvas.scale,
      miniMapW = 67 * canvas.scale,
      miniMapH = 23.5 * canvas.scale,
      amtIconSize = maps.tileSize/1.4,
      rupeeKeyX = 79.5 * canvas.scale,
      rupeeArrowY = 4 * canvas.scale,
      arrowBombX = 109.5 * canvas.scale, 
      keyBombY = 16 * canvas.scale,
      rupeeKeyTxtX = 90 * canvas.scale,
      arrowBombTxtX = 120 * canvas.scale,
      rupeeArrowTxtY = 13 * canvas.scale,
      keyBombTxtY = 25 * canvas.scale,
      slotY = 6 * canvas.scale,
      slotW = 14 * canvas.scale,
      slotH = 20 * canvas.scale,
      slotAX = 150 * canvas.scale,
      slotBX = 170 * canvas.scale,
      whiteText = 10 * canvas.scale + "px Courier",
      slotTextY = 8 * canvas.scale,
      slotTextAX = 154 * canvas.scale,
      slotTextBX = 174 * canvas.scale;

    //inventory draw color also helps cover when items leave the screen
    canvas.gameCtx.fillStyle = "#000";
    canvas.gameCtx.fillRect(0,0,canvas.cWidth,inventory.size);
    //draw area for minimap
    canvas.gameCtx.fillStyle = "#777";
    canvas.gameCtx.fillRect(miniMapX, miniMapY, miniMapW, miniMapH);
    //draw images for amount of things
    canvas.gameCtx.drawImage(sprite.chr, 270, 225, 16, 16, rupeeKeyX, rupeeArrowY, amtIconSize, amtIconSize);
    canvas.gameCtx.drawImage(sprite.chr, 360, 255, 16, 16, rupeeKeyX, keyBombY, amtIconSize, amtIconSize);
    canvas.gameCtx.drawImage(sprite.chr, 179, 195, 16, 16, arrowBombX, rupeeArrowY, amtIconSize, amtIconSize);
    canvas.gameCtx.drawImage(sprite.chr, 360, 225, 16, 16, arrowBombX, keyBombY, amtIconSize, amtIconSize);
    //draw text for amount of things
    canvas.gameCtx.font = 10 * canvas.scale + "px Arial";
    canvas.gameCtx.fillStyle = "#CCC";
    canvas.gameCtx.fillText("x"+inventory.rupees+"", rupeeKeyTxtX, rupeeArrowTxtY);
    canvas.gameCtx.fillText("x"+inventory.keys+"", rupeeKeyTxtX, keyBombTxtY);
    canvas.gameCtx.fillText("x"+inventory.arrows+"", arrowBombTxtX, rupeeArrowTxtY);
    canvas.gameCtx.fillText("x"+inventory.bombs+"", arrowBombTxtX, keyBombTxtY);
    //draw inventory slotA
    canvas.gameCtx.beginPath();
    canvas.gameCtx.lineWidth = ""+ this.lineWidth +""
    canvas.gameCtx.strokeStyle = "#33F";
    canvas.gameCtx.rect(slotAX, slotY, slotW, slotH);
    canvas.gameCtx.stroke();
    //draw inentory slotB
    canvas.gameCtx.beginPath();
    canvas.gameCtx.rect(slotBX, slotY, slotW, slotH);
    canvas.gameCtx.stroke();
    //draw slot text
    canvas.gameCtx.font = whiteText; 
    canvas.gameCtx.fillStyle = "#CCC";
    canvas.gameCtx.fillText("A", slotTextAX, slotTextY);
    canvas.gameCtx.fillText("B", slotTextBX, slotTextY);
    //draw current item in slot
    canvas.gameCtx.drawImage(sprite.chr, inventory.slotA.dispX, inventory.slotA.dispY, 16, 16, 149.393 * canvas.scale, 9 * canvas.scale, maps.tileSize, maps.tileSize);
    canvas.gameCtx.drawImage(sprite.chr, inventory.slotB.dispX, inventory.slotB.dispY, 16, 16, 169.393 * canvas.scale, 9 * canvas.scale, maps.tileSize, maps.tileSize);
    //draw -life- text
    canvas.gameCtx.font = this.redText;
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

  return {
    inventory: inventory,
    _inventoryState: new inventoryState()
  }
  
})();
