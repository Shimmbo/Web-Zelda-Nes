gApp.collision = (function() {
  "use strict";

  var checkMove = function(px, py, pw, ph, ps, pd, entity, shift, isPlayer) {

    for(var y=0; y < gApp.maps.State.mapCurr.length; y+=1) {
      for(var x=0; x < gApp.maps.State.mapCurr[y].length; x+=1) {

        var tileX = x * gApp.tileSize,
          tileY = y * gApp.tileSize + gApp.inv.inventory.size;
        if (gApp.maps.State.mapCurr[y][x] >= 1 && gApp.maps.State.mapCurr[y][x] < 7) {
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
        if (isPlayer && gApp.maps.State.mapCurr[y][x] >= 7) {
          var type = gApp.maps.State.mapCurr[y][x] === 7 ? "red_m" : gApp.maps.State.mapCurr[y][x] === 8 ? "blue_m" :
                     gApp.maps.State.mapCurr[y][x] === 9 ? "red_c" : gApp.maps.State.mapCurr[y][x] === 10 ? "blue_c" : "dodongo";

          if (px < tileX+gApp.tileSize && px + pw > tileX && py < tileY+gApp.tileSize && py + ph > tileY) {
            if (pd === 'right' && px+pw > tileX && entity.inmuneCount == 0) {
              entity.gotHurt(gApp.enemy.Enemies[type].damage);
            }
            if (pd === 'left' && px < tileX+gApp.tileSize && entity.inmuneCount == 0) {
              entity.gotHurt(gApp.enemy.Enemies[type].damage);
            }
            if (pd === 'up' && py+ph > tileY && entity.inmuneCount == 0) {
              entity.gotHurt(gApp.enemy.Enemies[type].damage);
            }
            if (pd === 'down' && py < tileY+gApp.tileSize && entity.inmuneCount == 0) {
              entity.gotHurt(gApp.enemy.Enemies[type].damage);
            }
          }
        }
      }
    }
  };

  var checkHit = function(px, py, pw, ph, damage, isPlayer) {
    if (isPlayer) {
      for(var y=0; y < gApp.maps.State.mapCurr.length; y+=1) {
        for(var x=0; x < gApp.maps.State.mapCurr[y].length; x+=1) {

          var tileX = x * gApp.tileSize,
              tileY = y * gApp.tileSize + gApp.inv.inventory.size;
          if (isPlayer && gApp.maps.State.mapCurr[y][x] >= 7) {
            var entity = gApp.enemy.State.enemies.filter(function(enemy) {
              return enemy.mapX === x && enemy.mapY === y
            })[0];
            if (px < tileX+gApp.tileSize && px + pw > tileX && py < tileY+gApp.tileSize && py + ph > tileY) {
              entity.gotHurt(damage);
            }
          }
        }
      }
    } else {
      if (px < gApp.player.State.x+gApp.tileSize && px + pw > gApp.player.State.x && py < gApp.player.State.y+gApp.tileSize && py + ph > gApp.player.State.y)
        gApp.player.State.gotHurt(damage);
    }
  }

  return {
    checkMove: checkMove,
    checkHit: checkHit
  };

})();
