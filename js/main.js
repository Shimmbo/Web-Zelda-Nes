(function() {
  "use strict";

  window.gApp = {};

	gApp.scale = 3;
	gApp.tileSize = 16 * gApp.scale;
	gApp.scene = true;

  gApp.keyDown = {
    up: false,
    down: false,
    left: false,
    right: false,
    use1: false,
    use2: false,
    invOpen: false,
    invCursor: false
  };

  window.onload = function() {

    var keyInput = function(e) {
      /* Order: up, left, down, right, use1, use2, inventory */
      if(e.keyCode === 87 || e.keyCode === 38) {
        gApp.keyDown.up = true;
      }
      if(e.keyCode === 65 || e.keyCode === 37){
        gApp.keyDown.left = true;
      }
      if(e.keyCode === 83 || e.keyCode === 40){
        gApp.keyDown.down = true;
      }
      if(e.keyCode === 68 || e.keyCode === 39){
        gApp.keyDown.right = true;
      }
      //uses
      if(e.keyCode === 90 || e.keyCode === 75){
        gApp.player.State.pressed('use1');
        gApp.keyDown.use1 = true;
      }
      if(e.keyCode === 88 || e.keyCode === 76){
        gApp.player.State.pressed('use2');
        gApp.keyDown.use2 = true;
      }
      //inventory
      if(e.keyCode === 32 && gApp.keyDown.invOpen === false) {
        gApp.keyDown.invOpen = true;
        if(gApp.inv.State.opened === false) {
          gApp.inv.State.opened = true;
        } else if(gApp.inv.State.opened === true) {
          gApp.inv.State.opened = false;
        }
      }
    };

    var keyRelease = function(e) {
      /* Order: up, left, down, right, use1, use2, inventory */
      if(e.keyCode === 87 || e.keyCode === 38){
        gApp.keyDown.up = false;
        gApp.keyDown.invCursor = false;
      }
      if(e.keyCode === 65 || e.keyCode === 37){
        gApp.keyDown.left = false;
        gApp.keyDown.invCursor = false;
      } 
      if(e.keyCode === 83 || e.keyCode === 40){
        gApp.keyDown.down =  false;
        gApp.keyDown.invCursor = false;
      } 
      if(e.keyCode === 68 || e.keyCode === 39){
        gApp.keyDown.right = false;
        gApp.keyDown.invCursor = false;
      } 
      //use
      if(e.keyCode === 90 || e.keyCode === 75){
        gApp.keyDown.use1 = false;
      }
      if(e.keyCode === 88 || e.keyCode === 76){
        gApp.keyDown.use2 = false;
      }
      //inventory
      if(e.keyCode === 32 && gApp.keyDown.invOpen === true) {
        gApp.keyDown.invOpen = false;
      }
    };

    window.addEventListener('keydown', keyInput, false);
    window.addEventListener('keyup', keyRelease, false);

    /*MAIN GAME UPDATE, RENDER, AND LOOP*/
    var gameControl = function() {

      this.update = function() {
        gApp.player.State.update();
        if(gApp.scene === true) {
          gApp.maps.State.update();
        }
        gApp.item.State.update();
        gApp.inv.State.update();
      };

      this.draw = function() {
        if(gApp.scene === true) {
          gApp.scene = false;
          gApp.maps.State.render();
        }
        gApp.canvas.Init.render();
        gApp.item.State.render();
        gApp.player.State.render();
        gApp.inv.State.render();
      };
    };

    gApp.canvas.gameCtx.webkitImageSmoothingEnabled = false;
    gApp.canvas.gameCtx.mozImageSmoothingEnabled = false;
    gApp.canvas.gameCtx.imageSmoothingEnabled = false;
    gApp.canvas.mapCtx.webkitImageSmoothingEnabled = false;
    gApp.canvas.mapCtx.mozImageSmoothingEnabled = false;
    gApp.canvas.mapCtx.imageSmoothingEnabled = false;

    //Game Loop
    var gameState = new gameControl();
    var gameLoop = function() {
      gameState.update();
      gameState.draw();
      window.requestAnimationFrame(gameLoop);
    };
    gameLoop();

  };

}());
