var maps = (function() {

  var tileSize = 16 * canvas.scale,
    gridWidth = canvas.cWidth / tileSize,
    gridHeight = (canvas.cHeight-40) / tileSize,
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
    ];
    mapList = [
    [map6, map5, map4],
    [map3, map2, map1],
    ];
    
  function mapState() {
    this.tileX = 0;
    this.tileY = 0;
    this.shiftX = 0;
    this.shiftY = 0;
    this.mapX = 2;
    this.mapY = 1;
    this.mapCurr = mapList[this.mapY][this.mapX];
    
    this.update = function() {

      /*CLEAR ITEMS WHEN CHANGING ROOMS*/
      for(var i in item.weaponsOut) {
        delete item.weaponsOut[i];
      }
      this.mapCurr = mapList[this.mapY][this.mapX];
       
    }

    this.render = function() {

      /*DRAWING CURRENT ROOM*/
      for(var y=0; y < this.mapCurr.length; y+=1) {
        for(var x=0; x < this.mapCurr[y].length; x+=1) {

          this.tileX = x * tileSize;
          this.tileY = y * tileSize + inventoryF.inventory.size;

          if(this.mapCurr[y][x] === 0) {
            canvas.mapCtx.drawImage(sprite.tiles, 32, 0, sprite.size, sprite.size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 01) {
            canvas.mapCtx.drawImage(sprite.tiles, 16, 0, sprite.size, sprite.size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 02) {
            canvas.mapCtx.drawImage(sprite.tiles, 16, 16, sprite.size, sprite.size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 03) {
            canvas.mapCtx.drawImage(sprite.tiles, 0, 0, sprite.size, sprite.size, this.tileX, this.tileY, tileSize, tileSize);
          }
          //green tiles
          if(this.mapCurr[y][x] === 04) {
            canvas.mapCtx.drawImage(sprite.tiles, 112, 16, sprite.size, sprite.size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 05) {
            canvas.mapCtx.drawImage(sprite.tiles, 112, 0, sprite.size, sprite.size, this.tileX, this.tileY, tileSize, tileSize);
          }
          if(this.mapCurr[y][x] === 06) {
            canvas.mapCtx.drawImage(sprite.tiles, 100, 0, sprite.size, sprite.size, this.tileX, this.tileY, tileSize, tileSize);
          } 

        }
      }
    }

  }

  return {
    tileSize: tileSize,
    _mapState: new mapState()
  }

})();
