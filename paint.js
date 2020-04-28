/*
Joyce Wang
CS337 Homework 9: Paint
4/5/19

This program provides functionality for drawing on panel and changing the settings
and colors.
*/

"use strict";

(function() {
  let mouseDown = false;  //true if mouse is currently pressed
  let justClicked = false;  //true if mouse was just pressed
  let lastX, lastY; //stores last x and y position of mouse

/**
This method processes
*/
  window.onload = function(){
    setUp();
    //display pen size
    updatePen(1);
    //begins with pen mode
    pen();
    //change pen size or colors
    document.getElementById("plus").onclick = increasePen;
    document.getElementById("minus").onclick = decreasePen;
    document.getElementById("colors").onclick = changeColor;
    //processes button modes
    document.getElementById("clear").onclick = clearCanvas;
    document.getElementById("lines").onclick = lines;
    document.getElementById("circles").onclick = circles;
    document.getElementById("squares").onclick = squares;
    document.getElementById("pen").onclick = pen;
  };

/**
This function sets up the main canvas, the color picker canvas, and
the pen size canvas.
*/
  function setUp(){
    //main canvas white
    let canvas =  document.getElementById("canvas");
    let context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, 700, 500);
    context.lineWidth = "1";
    //make color picker canvas
    let colors = document.getElementById("colors");
    let context2 = colors.getContext("2d");
    //horizontal gradient
    let gradientH = context2.createLinearGradient(0,0,100,0);
    gradientH.addColorStop(0, 'rgb(255,0,0)');
    gradientH.addColorStop(0.15, 'rgb(255,0,255)');
    gradientH.addColorStop(0.33, 'rgb(0,0,255)');
    gradientH.addColorStop(0.49, 'rgb(0,255,255)');
    gradientH.addColorStop(0.67, 'rgb(0,255,0)');
    gradientH.addColorStop(0.84, 'rgb(255,255,0)');
    gradientH.addColorStop(1, 'rgb(255,0,0)');
    context2.fillStyle = gradientH;
    context2.fillRect(0,0,100,100);
    //vertical gradient
    let gradientV = context2.createLinearGradient(0,0,0,100);
    gradientV.addColorStop(0, 'rgb(255,255,255,1)');
    gradientV.addColorStop(0.5, 'rgb(255,255,255,0)');
    gradientV.addColorStop(0.5, 'rgb(0,0,0,0)');
    gradientV.addColorStop(1, 'rgb(0,0,0,1)');
    context2.fillStyle = gradientV;
    context2.fillRect(0,0,100,100);
  }

  /**
  This function updates the canvas displaying the pen size.
  @param size the new size
  */
  function updatePen(size){
    let pendisplay = document.getElementById("sizeDisplay");
    let ctx = pendisplay.getContext("2d");
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.arc(25, 25, size/2, 0, 2 * Math.PI);
    ctx.fill();
  }
  /**
  This function increases the pen width by 1.
  */
  function increasePen(){
    let canvas =  document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = ctx.lineWidth+1;
    updatePen(ctx.lineWidth);
  }

  /**
  This function changes the pen color to what pixel was clicked on in
  the color picker canvas.
  */
  function changeColor() {
    let ctx = this.getContext("2d");
    let x = event.layerX;
    let y = event.layerY;
    let pixel = ctx.getImageData(x, y, 1, 1);
    let data = pixel.data;
    let rgba = 'rgba(' + data[0] + ', ' + data[1] +
               ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    let canvas =  document.getElementById("canvas");
    let context = canvas.getContext("2d");
    context.strokeStyle = rgba;
  }
  /**
  This function decreases the pen width by 1.
  */
  function decreasePen(){
    let canvas =  document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = ctx.lineWidth-1;
    updatePen(ctx.lineWidth);
  }

    /**
    This function clears the canvas.
    */
    function clearCanvas(){
      let canvas =  document.getElementById("canvas");
      let context = canvas.getContext("2d");
      context.fillStyle = "White";
      context.fillRect(0,0,700,500);
    }
  /**
  This function is for the pen mode. It calls functions to draw the line
  when the mouse is clicked and dragged.
  */
  function pen(){
    let canvas =  document.getElementById("canvas");
    canvas.onmousemove = function(){
      justClicked = false;
      drawLine(mouseDown,justClicked);
    };
    canvas.onmousedown = function(){
      mouseDown = true;
      justClicked = true;
      drawLine(mouseDown,justClicked);
    };
    canvas.onmouseup = function(){
      mouseDown = false;
    };
  }

  /**
  This function is for the pen mode. It draws lines following the mouse
  when it is clicked and dragged.
  @param mouseDown true if the mouse is pressed
  @param justClicked true if the mouse was just clicked
  */
  function drawLine(mouseDown,justClicked) {
    if (mouseDown){
    	let canvas = document.getElementById("canvas");
    	let ctx = canvas.getContext("2d");
      ctx.beginPath();
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      if (justClicked){
        ctx.moveTo(x,y);
      }
      else{
        ctx.moveTo(lastX,lastY);
      }
    	ctx.lineTo(x,y);
    	ctx.stroke();
      ctx.closePath();
      lastX = x;
      lastY = y;
    }
}

  /**
  This function is for the line mode. It calls functions to draw lines from
  the top left edge when the mouse is clicked and dragged.
  */
  function lines(){
    let canvas =  document.getElementById("canvas");
    canvas.onmousemove = function(){
      justClicked = false;
      drawLines(mouseDown);
    };
    canvas.onmousedown = function(){
      mouseDown = true;
      justClicked = true;
      drawLines(mouseDown);
    };
    canvas.onmouseup = function(){
      mouseDown = false;
    };
  }

  /**
  This function is for the circle mode. It calls functions to draw circles
  when the mouse is clicked and dragged.
  */
  function circles(){
    let canvas =  document.getElementById("canvas");
    canvas.onmousemove = function(){
      justClicked = false;
      drawCircles(mouseDown,justClicked);
    };
    canvas.onmousedown = function(){
      mouseDown = true;
      justClicked = true;
      drawCircles(mouseDown,justClicked);
    };
    canvas.onmouseup = function(){
      mouseDown = false;
    };
  }

  /**
  This function is for the circle mode. It draws circles following the mouse
  when it is clicked and dragged.
  @param mouseDown true if the mouse is pressed
  @param justClicked true if the mouse was just clicked
  */
  function drawCircles(mouseDown,justClicked){
    if (mouseDown){
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      if (justClicked){
        ctx.moveTo(x,y);
      }
      else{
        ctx.moveTo(lastX,lastY);
      }
      ctx.beginPath();
      ctx.arc(x+ctx.lineWidth/2, y+ctx.lineWidth/2, ctx.lineWidth+20, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
      lastX = x;
      lastY = y;
    }
  }
  /**
  This function is for the square mode. It calls functions to draw squares
  when the mouse is clicked and dragged.
  */
  function squares(){
    let canvas =  document.getElementById("canvas");
    canvas.onmousemove = function(){
      justClicked = false;
      drawSquares(mouseDown,justClicked);
    };
    canvas.onmousedown = function(){
      mouseDown = true;
      justClicked = true;
      drawSquares(mouseDown,justClicked);
    };
    canvas.onmouseup = function(){
      mouseDown = false;
    };
  }

  /**
  This function is for the square mode. It draws squares following the mouse
  when it is clicked and dragged.
  @param mouseDown true if the mouse is pressed
  @param justClicked true if the mouse was just clicked
  */
  function drawSquares(mouseDown,justClicked){
    if (mouseDown){
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      if (justClicked){
        ctx.moveTo(x,y);
      }
      else{
        ctx.moveTo(lastX,lastY);
      }
      ctx.rect(x,y,ctx.lineWidth+40,ctx.lineWidth+40);
      ctx.stroke();
      ctx.closePath();
      lastX = x;
      lastY = y;
    }
  }

/**
This function is for the line mode. It draws lines from the top left edge
following the mouse when it is clicked and dragged.
@param mouseDown true if the mouse is pressed
*/
function drawLines(mouseDown){
  if (mouseDown){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    ctx.moveTo(0,0);
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.closePath();
  }
}

})();
