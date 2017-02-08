gApp.inv = (function(){
  "use strict";

  var inventory = {
    size: 32 * gApp.scale,
    slotA: 0,
    slotB: 0,
    storage: {
      0:gApp.item.weapons.sword.V1,
      1:gApp.item.weapons.bomb.V1,
      2:gApp.item.weapons.sword.V2,
      3:gApp.item.weapons.sword.V3,
      4:gApp.item.weapons.candle.V1,
      5:gApp.item.weapons.bow.V2,
      6:gApp.item.weapons.bow.V3,
      7:gApp.item.weapons.candle.V2,
      8:gApp.item.weapons.bow.V1,
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
    this.lineWidth = 2 * gApp.scale;
    this.redText = 14 * gApp.scale + "px Courier";
    this.cursorX = 13;
    this.cursorY = 80;
    this.storageSlot = 0;

    this.update = function() {

      if (this.opened === true) {

        /*INVENTORY CURSOR MOVEMENT*/
        /* Order: up, left, down, right, use1, use2*/
        if(gApp.keyDown.up === true && gApp.keyDown.invCursor === false){
          gApp.keyDown.invCursor = true;
          this.cursorY -= 28;
          gApp.inv.State.storageSlot -= 4;
        }
        else if(gApp.keyDown.left === true && gApp.keyDown.invCursor === false){
          gApp.keyDown.invCursor = true;
          this.cursorX -= 25;
          gApp.inv.State.storageSlot -= 1;
        }
        else if(gApp.keyDown.down === true && gApp.keyDown.invCursor === false){
          gApp.keyDown.invCursor = true;
          this.cursorY += 28;
          gApp.inv.State.storageSlot += 4;
        }
        else if(gApp.keyDown.right === true && gApp.keyDown.invCursor === false){
          gApp.keyDown.invCursor = true;
          this.cursorX += 25;
          gApp.inv.State.storageSlot += 1;
        }
        /*INVENTORY ITEM SELECT*/
        else if (gApp.keyDown.use1 === true){
          gApp.keyDown.use1 = false;
          inventory.slotA = inventory.storage[gApp.inv.State.storageSlot];
        }
        else if(gApp.keyDown.use2 === true){
          gApp.keyDown.use2 = false;
          inventory.slotB = inventory.storage[gApp.inv.State.storageSlot];
        }

      }

    };

    this.render = function() {

      /*RENDER INVENTORY STUFF*/
      inventoryTop.bind(this)(gApp.scale, gApp.tileSize, gApp.canvas.gameCtx);
      if(this.opened === true) {
        inventoryFull.bind(this)(gApp.scale, gApp.tileSize, gApp.canvas.gameCtx);
      }
    };
  };

  var inventoryFull = function(scale, tileSize, ctx) {

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

    ctx.fillStyle = "#111";
    ctx.fillRect(0,inventory.size, gApp.canvas.cWidth, gApp.canvas.cHeight-inventory.size);
    //navigation cursor
    ctx.beginPath();
    ctx.strokeStyle = "#F77";
    ctx.moveTo(this.cursorX*scale, this.cursorY*scale);
    ctx.lineTo((this.cursorX+13)*scale, this.cursorY*scale);
    ctx.fillStyle = "#000";
    ctx.stroke();
    //inventory red text
    ctx.font = this.redText;
    ctx.fillStyle = "#C33";
    ctx.fillText("Inventory",18*scale,50*scale);
    //inventory blue box
    ctx.beginPath();
    ctx.strokeStyle = "#33F";
    ctx.rect(10*scale,56*scale,94*scale,142*scale);
    ctx.stroke();
    //inventory items
    for(var i in inventory.storage) {
      if(inventory.storage.hasOwnProperty(i)) {
        itemX = 25 * (i % 4) + 12;
        if(i % 4 === 0) {
          itemY += 28;
        }
        ctx.drawImage(gApp.spr.chr, inventory.storage[i].dispX, inventory.storage[i].dispY, 16, 16, itemX*scale, itemY*scale, tileSize, tileSize);
      }
    }
    //triforce red text
    /*ctx.font = this.redText;
    ctx.fillStyle = "#C33";
    ctx.fillText("Triforce",150*scale,180*scale);*/
  };

  var inventoryTop = function(scale, tileSize, ctx) {

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
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, gApp.canvas.cWidth, inventory.size);
    //draw area for minimap
    ctx.fillStyle = "#777";
    ctx.fillRect(miniMapX, miniMapY, miniMapW, miniMapH);
    //draw images for amount of things
    ctx.drawImage(gApp.spr.chr, 270, 225, 16, 16, rupeeKeyX, rupeeArrowY, amtIconSize, amtIconSize);
    ctx.drawImage(gApp.spr.chr, 360, 255, 16, 16, rupeeKeyX, keyBombY, amtIconSize, amtIconSize);
    ctx.drawImage(gApp.spr.chr, 179, 195, 16, 16, arrowBombX, rupeeArrowY, amtIconSize, amtIconSize);
    ctx.drawImage(gApp.spr.chr, 360, 225, 16, 16, arrowBombX, keyBombY, amtIconSize, amtIconSize);
    //draw text for amount of things
    ctx.font = 10*scale + "px Arial";
    ctx.fillStyle = "#CCC";
    ctx.fillText("x"+inventory.rupees+"", rupeeKeyTxtX, rupeeArrowTxtY);
    ctx.fillText("x"+inventory.keys+"", rupeeKeyTxtX, keyBombTxtY);
    ctx.fillText("x"+inventory.arrows+"", arrowBombTxtX, rupeeArrowTxtY);
    ctx.fillText("x"+inventory.bombs+"", arrowBombTxtX, keyBombTxtY);
    //draw inventory slotA
    ctx.beginPath();
    ctx.lineWidth = ""+ this.lineWidth +"";
    ctx.strokeStyle = "#33F";
    ctx.rect(slotAX, slotY, slotW, slotH);
    ctx.stroke();
    //draw inentory slotB
    ctx.beginPath();
    ctx.rect(slotBX, slotY, slotW, slotH);
    ctx.stroke();
    //draw slot text
    ctx.font = whiteText; 
    ctx.fillStyle = "#CCC";
    ctx.fillText("A", slotTextAX, slotTextY);
    ctx.fillText("B", slotTextBX, slotTextY);
    //draw current item in slot
    ctx.drawImage(gApp.spr.chr, inventory.slotA.dispX, inventory.slotA.dispY, 16, 16, 149.393*scale, 9*scale, tileSize, tileSize);
    ctx.drawImage(gApp.spr.chr, inventory.slotB.dispX, inventory.slotB.dispY, 16, 16, 169.393*scale, 9*scale, tileSize, tileSize);
    //draw -life- text
    ctx.font = this.redText;
    ctx.fillStyle = "#C33";
    ctx.fillText("-LIFE-",194*scale,11*scale);
    //draw current player life
    for(var i = 0; i < gApp.player.State.maxLife; i+=1) {
      var sprX = 0,
        lifePosX = 0,
        lifePosY = 0;

      if(i <= 6) {
        lifePosX = (192 + i*8)* scale;
        lifePosY = 9;
      } else {
        lifePosX = (192 + (i*8- 56))* scale;
        lifePosY = 18;
      }

      ctx.drawImage(gApp.spr.chr, 274, 195, 16, 16, lifePosX, lifePosY*scale, tileSize, tileSize);

      if(i < gApp.player.State.life) {
        if(i+1 > gApp.player.State.life) {
          if(gApp.player.State.life % 1 !== 0) {
            sprX = 304;
          }
        } else {
          sprX = 244;
        }
        ctx.drawImage(gApp.spr.chr, sprX, 195, 16, 16, lifePosX, lifePosY*scale, tileSize, tileSize);
      }

    }
  };

  return {
    inventory: inventory,
    State: new inventoryState()
  };
  
})();
