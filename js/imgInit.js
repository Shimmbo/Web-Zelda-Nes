var sprite = (function() {
  "use strict";

  var size = 16;

  var tiles = new Image();
    tiles.src = 'img/Overworld.png';
  
  var chr = new Image();
    chr.src = 'img/Character.png';

  var enemy = new Image();
    enemy.src = 'img/Enemies.png';

  return {
    tiles: tiles,
    chr: chr,
    size: size
  };

})();
