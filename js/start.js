window.onload = function() {
  "use strict";

  var gameCtx = canvas.gameCtx,
    mapCtx = canvas.mapCtx;

  var gameControl = function() {

    this.update = function() {
      player._playerState.update();
      if(canvas.scene === true) {
        maps._mapState.update();
      }
      item._weaponState.update();
    };

    this.draw = function() {
      if(canvas.scene === true) {
        canvas.scene = false;
        maps._mapState.render();
      }
      canvas._canvasInit.render();
      item._weaponState.render();
      player._playerState.render();
      inventoryF._inventoryState.render();
    };
  };

  gameCtx.webkitImageSmoothingEnabled = false;
  gameCtx.mozImageSmoothingEnabled = false;
  gameCtx.imageSmoothingEnabled = false;
  mapCtx.webkitImageSmoothingEnabled = false;
  mapCtx.mozImageSmoothingEnabled = false;
  mapCtx.imageSmoothingEnabled = false;

  //Game Loop
  var _gameControl = new gameControl();
  function gameLoop() {
    _gameControl.update();
    _gameControl.draw();
    window.requestAnimationFrame(gameLoop);
  }
  gameLoop();

};
