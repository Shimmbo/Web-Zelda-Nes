gApp.canvas = (function() {
  "use strict";

  var game = document.getElementById('game-canvas'),
    gameCtx = game.getContext('2d'),
    map = document.getElementById('map-canvas'),
    mapCtx = map.getContext('2d'),
    cWidth = 256 * gApp.scale,
    cHeight = 208 * gApp.scale;

  //Starting Canvas
  var canvasInit = function() {
    game.width = cWidth;
    game.height = cHeight;
    map.width = cWidth;
    map.height = cHeight;

    this.render = function() {
      gameCtx.clearRect(0, 0, cWidth, cHeight);
    };
  };

  return {
    gameCtx: gameCtx,
    mapCtx: mapCtx,
    cWidth: cWidth,
    cHeight: cHeight,
    Init: new canvasInit()
  };

})();
