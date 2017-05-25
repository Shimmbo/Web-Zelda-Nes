"use strict";
window.gApp = {};
var gameState;
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
gApp.cWidth = 256 * gApp.scale;
gApp.cHeight = 208 * gApp.scale;

function preload() {
  gApp.spr = (function() {
    var size = 16;
    var tiles = loadImage('./img/Overworld.png');
    var chr = loadImage('./img/Character.png');
    var enemy = loadImage('./img/Enemies.png');
    var bosses = loadImage('./img/Bosses.png');
    return {
      tiles: tiles,
      chr: chr,
      enemies: enemy,
      bosses: bosses,
      size: size
    }
  })();
}

function setup() {
  var canvas = createCanvas(gApp.cWidth, gApp.cHeight);
  canvas.parent("canvasDiv");
  gameState = new gameControl();
}

function draw() {
  gameState.update();
  gameState.draw();
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    gApp.keyDown.up = true;
  }
  if(keyCode === LEFT_ARROW){
    gApp.keyDown.left = true;
  }
  if(keyCode === DOWN_ARROW){
    gApp.keyDown.down = true;
  }
  if(keyCode === RIGHT_ARROW){
    gApp.keyDown.right = true;
  }
  //uses
  if(keyCode === 90){
    gApp.player.State.pressed('use1');
    gApp.keyDown.use1 = true;
  }
  if(keyCode === 88){
    gApp.player.State.pressed('use2');
    gApp.keyDown.use2 = true;
  }
  //inventory
  if(keyCode === 32 && gApp.keyDown.invOpen === false) {
    gApp.keyDown.invOpen = true;
    if(gApp.inv.State.opened === false) {
      gApp.inv.State.opened = true;
    } else if(gApp.inv.State.opened === true) {
      gApp.inv.State.opened = false;
    }
  }
}

function keyReleased() {
  if(keyCode === UP_ARROW){
    gApp.keyDown.up = false;
    gApp.keyDown.invCursor = false;
  }
  if(keyCode === LEFT_ARROW){
    gApp.keyDown.left = false;
    gApp.keyDown.invCursor = false;
  } 
  if(keyCode === DOWN_ARROW){
    gApp.keyDown.down =  false;
    gApp.keyDown.invCursor = false;
  } 
  if(keyCode === RIGHT_ARROW){
    gApp.keyDown.right = false;
    gApp.keyDown.invCursor = false;
  } 
  //use
  if(keyCode === 90){
    gApp.keyDown.use1 = false;
  }
  if(keyCode === 88){
    gApp.keyDown.use2 = false;
  }
  //inventory
  if(keyCode === 32 && gApp.keyDown.invOpen === true) {
    gApp.keyDown.invOpen = false;
  }
}

var gameControl = function() {
  this.update = function() {
    gApp.player.State.update();
    if(gApp.scene === true) {
      gApp.maps.State.update();
      gApp.enemy.State.enemies = [];
      gApp.maps.State.createEnemies();
    }
    gApp.enemy.State.update();
    gApp.item.State.update();
    gApp.inv.State.update();
  };

  this.draw = function() {
    if(gApp.scene === true) {
        gApp.scene = false;
      }
      gApp.maps.State.render();
      gApp.enemy.State.render();
      gApp.item.State.render();
      gApp.player.State.render();
      gApp.inv.State.render();
    };
};