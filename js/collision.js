var collision = (function() {
  "use strict";

  var tileSize = maps.tileSize,
    inventory = inventoryF.inventory;

  var checkMove = function(px, py, pw, ph, ps, pd, entity, shift) {

    var map = maps._mapState.mapCurr;

    for(var y=0; y < map.length; y+=1) {
      for(var x=0; x < map[y].length; x+=1) {

        var tileX = x * tileSize,
          tileY = y * tileSize + inventory.size;

        if (map[y][x] >= 1) {
          if (px < tileX+tileSize && px + pw > tileX && py < tileY+tileSize && py + ph > tileY) {
            if (pd === 'right' && px+pw > tileX) {
              entity.x = tileX - pw - ps;
            }
            if (pd === 'left' && px < tileX+tileSize) {
              entity.x = tileX + pw + ps;
            }
            if (pd === 'up' && py+ph > tileY) {
              entity.y = tileY + ph + ps;
            }
            if (pd === 'down' && py < tileY+tileSize) {
              entity.y = tileY - ph - shift - ps;
            }
          }
        }
      }
    }
  };

  return {
    checkMove: checkMove
  };

})();
