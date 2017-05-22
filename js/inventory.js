gApp.inv = (function(){
  "use strict";

  var inventory = {
    size: 32 * gApp.scale,
    slotA: 0,
    slotB: 0,
    storage: {
      0:gApp.item.weapons.sword.V1,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0,
      6:0,
      7:0,
      8:0,
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
    rupees: 0,
    keys: 0,
    arrows: 0,
    bombs: 0
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
      inventoryTop.bind(this)(gApp.scale, gApp.tileSize);
      if(this.opened === true) {
        inventoryFull.bind(this)(gApp.scale, gApp.tileSize);
      }
    };
  };

  var inventoryFull = function(scale, tileSize) {

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

    fill("#111");
    rect(0,inventory.size, gApp.cWidth, gApp.cHeight - inventory.size);
    //navigation cursor
    stroke("#F77");
    line(this.cursorX * scale, this.cursorY * scale, (this.cursorX + 13) * scale, this.cursorY * scale)
    fill("#000");
    
    //inventory red text
    textFont(this.redText);
    fill("#C33");
    text("Inventory", 18 * scale, 50 * scale);
    //inventory blue box
    stroke("#33F");
    rect(10 * scale, 56 * scale, 94 * scale, 142 * scale);
    
    //inventory items
    for(var i in inventory.storage) {
      if(inventory.storage.hasOwnProperty(i)) {
        itemX = 25 * (i % 4) + 12;
        if(i % 4 === 0) {
          itemY += 28;
        }
        if (inventory.storage[i].dispX != undefined && inventory.storage[i].dispY != undefined)
          image(gApp.spr.chr, itemX*scale, itemY*scale, tileSize, tileSize, inventory.storage[i].dispX, inventory.storage[i].dispY, 16, 16);
      }
    }
    //triforce red text
    /*ctx.font = this.redText;
    ctx.fillStyle = "#C33";
    ctx.fillText("Triforce",150*scale,180*scale);*/
  };

  var inventoryTop = function(scale, tileSize) {

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
    fill("#000");
    rect(0, 0, gApp.cWidth, inventory.size);
    //draw area for minimap
    fill("#777");
    rect(miniMapX, miniMapY, miniMapW, miniMapH);
    //draw images for amount of things
    image(gApp.spr.chr, rupeeKeyX, rupeeArrowY, amtIconSize, amtIconSize, 270, 225, 16, 16, );
    image(gApp.spr.chr, rupeeKeyX, keyBombY, amtIconSize, amtIconSize, 360, 255, 16, 16, );
    image(gApp.spr.chr, arrowBombX, rupeeArrowY, amtIconSize, amtIconSize, 179, 195, 16, 16, );
    image(gApp.spr.chr, arrowBombX, keyBombY, amtIconSize, amtIconSize, 360, 225, 16, 16, );
    //draw text for amount of things
    textFont(10 * scale + "px Arial");
    fill("#CCC");
    text("x" + inventory.rupees + "", rupeeKeyTxtX, rupeeArrowTxtY);
    text("x" + inventory.keys + "", rupeeKeyTxtX, keyBombTxtY);
    text("x" + inventory.arrows + "", arrowBombTxtX, rupeeArrowTxtY);
    text("x" + inventory.bombs + "", arrowBombTxtX, keyBombTxtY);
    //draw inventory slotA
    strokeWeight(this.lineWidth);
    stroke("#33F");
    rect(slotAX, slotY, slotW, slotH);
    
    //draw inentory slotB
    rect(slotBX, slotY, slotW, slotH);
    
    //draw slot text
    textFont(whiteText); 
    fill("#CCC");
    text("A", slotTextAX, slotTextY);
    text("B", slotTextBX, slotTextY);
    //draw current item in slot
    if (inventory.slotA.dispX != undefined && inventory.slotA.dispY != undefined)
      image(gApp.spr.chr, 149.393*scale, 9*scale, tileSize, tileSize, inventory.slotA.dispX, inventory.slotA.dispY, 16, 16, );
    if (inventory.slotB.dispX != undefined && inventory.slotB.dispY != undefined)
      image(gApp.spr.chr, 169.393*scale, 9*scale, tileSize, tileSize, inventory.slotB.dispX, inventory.slotB.dispY, 16, 16, );
    //draw -life- text
    textFont(this.redText);
    fill("#C33");
    text("-LIFE-", 194 * scale, 11 * scale);
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

      image(gApp.spr.chr, lifePosX, lifePosY*scale, tileSize, tileSize, 274, 195, 16, 16, );

      if(i < gApp.player.State.life) {
        if(i+1 > gApp.player.State.life) {
          if(gApp.player.State.life % 1 !== 0) {
            sprX = 304;
          }
        } else {
          sprX = 244;
        }
        image(gApp.spr.chr, sprX, lifePosX, lifePosY*scale, tileSize, tileSize, 195, 16, 16, );
      }

    }
  };

  return {
    inventory: inventory,
    State: new inventoryState()
  };
  
})();
