var canvas = (function() {

  var game = document.getElementById('game-canvas'),
    gameCtx = game.getContext('2d'),
    map = document.getElementById('map-canvas'),
    mapCtx = map.getContext('2d'),
    scale = 3,
    cWidth = 256 * scale,
    cHeight = 208 * scale,
    scene = true;

  //Starting Canvas
  function canvasInit() {
    game.width = cWidth;
    game.height = cHeight;
    map.width = cWidth;
    map.height = cHeight;

    this.render = function() {
      gameCtx.clearRect(0, 0, cWidth, cHeight);
    };
  }

  return {
    scene: scene,
    gameCtx: gameCtx,
    mapCtx: mapCtx,
    scale: scale,
    cWidth: cWidth,
    cHeight: cHeight,
    _canvasInit: new canvasInit()
  };

})();
