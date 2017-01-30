var maps = (function() {
  "use strict";

  var scale = canvas.scale,
    cWidth = canvas.width,
    cHeight = canvas.height,
    mapCtx = canvas.mapCtx,
    tiles = sprite.tiles,
    size = sprite.size;

  var tileSize = 16 * scale,
    gridWidth = cWidth / tileSize,
    gridHeight = (cHeight-40) / tileSize,
    map1 = [
    [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,2,0,0,1,1,0,0,0,0,0,0,0,0,0,2],
    [2,2,0,0,1,1,0,0,0,0,0,0,0,0,0,2],
    [2,2,0,0,1,1,0,0,0,0,0,0,0,0,0,2],
    [4,2,0,0,1,1,1,0,0,0,0,0,0,0,0,2],
    [4,4,0,0,1,1,1,0,0,0,0,0,0,0,0,2],
    [4,4,0,0,1,1,1,0,0,0,0,0,0,3,0,2],
    [4,4,2,2,1,1,1,2,2,2,2,2,2,2,2,2],
    ],
    map2 = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,1,1,0,0,0,0,4],
    [4,4,2,2,2,2,2,2,1,1,1,1,2,2,2,2],
    ],
    map3 = [
    [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ],
    map4 = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,4],
    [2,0,0,0,0,2,2,2,2,2,2,0,0,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,4],
    [4,4,2,2,2,2,2,2,2,0,0,2,2,2,2,2],
    ],
    map5 = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [2,0,0,0,0,2,2,2,2,2,2,2,2,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,2,0,0,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
    [4,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
    [4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ],
    map6 = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,0,0,0,0,2,2,2,2,0,0,2,2,2,2,4],
    [4,0,0,0,0,0,0,0,2,0,0,2,2,4,4,4],
    [4,0,0,0,0,0,0,0,2,0,0,2,2,4,4,2],
    [4,0,0,0,0,0,0,0,2,0,0,2,2,4,4,2],
    [4,4,2,2,2,2,2,2,2,0,0,2,2,2,2,2],
    ],
    mapList = [
      [map6, map5, map4],
      [map3, map2, map1],
    ];
    
  var mapState = function() {
    this.tileX = 0;
    this.tileY = 0;
    this.shiftX = 0;
    this.shiftY = 0;
    this.mapX = 2;
    this.mapY = 1;
    this.mapCurr = mapList[this.mapY][this.mapX];
    
    this.update = function() {

      var weaponsOut = item.weaponsOut;

      /*CLEAR ITEMS WHEN CHANGING ROOMS*/
      for(var i in weaponsOut) {
        if(weaponsOut.hasOwnProperty(i)) {
          delete weaponsOut[i];
        }
      }
      this.mapCurr = mapList[this.mapY][this.mapX];
       
    };

    this.render = function() {

      var inventory = inventoryF.inventory;

      /*DRAWING CURRENT ROOM*/
      for(var y=0; y < this.mapCurr.length; y+=1) {
        for(var x=0; x < this.mapCurr[y].length; x+=1) {

          this.tileX = x * tileSize;
          this.tileY = y * tileSize + inventory.size;

          if(this.mapCurr[y][x] === 0) {
            mapCtx.drawImage(tiles, 32, 0, size, size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 1) {
            mapCtx.drawImage(tiles, 16, 0, size, size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 2) {
            mapCtx.drawImage(tiles, 16, 16, size, size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 3) {
            mapCtx.drawImage(tiles, 0, 0, size, size, this.tileX, this.tileY, tileSize, tileSize);
          }
          //green tiles
          if(this.mapCurr[y][x] === 4) {
            mapCtx.drawImage(tiles, 112, 16, size, size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 5) {
            mapCtx.drawImage(tiles, 112, 0, size, size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 6) {
            mapCtx.drawImage(tiles, 100, 0, size, size, this.tileX, this.tileY, tileSize, tileSize);
          } 

        }
      }
    };
  };

  return {
    tileSize: tileSize,
    _mapState: new mapState()
  };

})();
