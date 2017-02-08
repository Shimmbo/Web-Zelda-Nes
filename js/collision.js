gApp.collision = (function() {
  "use strict";

  var checkMove = function(px, py, pw, ph, ps, pd, entity, shift) {

    for(var y=0; y < gApp.maps.State.mapCurr.length; y+=1) {
      for(var x=0; x < gApp.maps.State.mapCurr[y].length; x+=1) {

        var tileX = x * gApp.tileSize,
          tileY = y * gApp.tileSize + gApp.inv.inventory.size;

        if (gApp.maps.State.mapCurr[y][x] >= 1) {
          if (px < tileX+gApp.tileSize && px + pw > tileX && py < tileY+gApp.tileSize && py + ph > tileY) {
            if (pd === 'right' && px+pw > tileX) {
              entity.x = tileX - pw - ps;
            }
            if (pd === 'left' && px < tileX+gApp.tileSize) {
              entity.x = tileX + pw + ps;
            }
            if (pd === 'up' && py+ph > tileY) {
              entity.y = tileY + ph + ps;
            }
            if (pd === 'down' && py < tileY+gApp.tileSize) {
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
