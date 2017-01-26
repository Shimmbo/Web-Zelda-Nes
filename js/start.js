window.onload = function() {

  function gameControl() {

    this.update = function() {
      player._playerState.update();
      if(canvas.scene === true) {
        maps._mapState.update();
      }
      item._weaponState.update();
    }

    this.draw = function() {
      if(canvas.scene === true) {
        canvas.scene = false;
        maps._mapState.render();
      }
      canvas._canvasInit.render();
      item._weaponState.render();
      player._playerState.render();
      inventoryF._inventoryState.render();
    }
  }

  canvas.gameCtx.webkitImageSmoothingEnabled = false;
  canvas.gameCtx.mozImageSmoothingEnabled = false;
  canvas.gameCtx.imageSmoothingEnabled = false;
  canvas.mapCtx.webkitImageSmoothingEnabled = false;
  canvas.mapCtx.mozImageSmoothingEnabled = false;
  canvas.mapCtx.imageSmoothingEnabled = false;

  //Game Loop
  var _gameControl = new gameControl();
  function gameLoop() {
    _gameControl.update();
    _gameControl.draw();
    window.requestAnimationFrame(gameLoop);
  }
  gameLoop();

}

//Collision with map tiles
function checkMove(px, py, pw, ph, ps, pd, entity, shift) {

  var map = maps._mapState.mapCurr,
    entity = entity;

  for(var y=0; y < map.length; y+=1) {
    for(var x=0; x < map[y].length; x+=1) {

      var tileX = x * maps.tileSize,
        tileY = y * maps.tileSize + inventoryF.inventory.size;

      if (map[y][x] >= 1) {
        if (px < tileX+maps.tileSize && px + pw > tileX && py < tileY+maps.tileSize && py + ph > tileY) {
          if (pd === 'right' && px+pw > tileX) {
            entity.x = tileX - pw - ps;
          }
          if (pd === 'left' && px < tileX+maps.tileSize) {
            entity.x = tileX + pw + ps;
          }
          if (pd === 'up' && py+ph > tileY) {
            entity.y = tileY + ph + ps;
          }
          if (pd === 'down' && py < tileY+maps.tileSize) {
            entity.y = tileY - ph - shift - ps;
          }
        }
      }
    }
  }
}
