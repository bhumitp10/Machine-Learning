const BACKGROUND_COLOUR = "#000000";
const LINE_COLOUR = "#FFFFFF";
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;


function prepareCanvas() {
  // console.log("Preparing Canvas");
  canvas = document.getElementById("my-canvas");
  context = canvas.getContext("2d");

  context.fillStyle = BACKGROUND_COLOUR;
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  context.strokeStyle = LINE_COLOUR;
  context.lineWidth = LINE_WIDTH;
  context.lineJoin = "round";

  var isPainting = false;

  document.addEventListener("mousedown", (event) => {
    // console.log("Mouse Pressed");
    isPainting = true;
    currentX = event.clientX - canvas.offsetLeft;
    currentY = event.clientY - canvas.offsetTop;
  });

  document.addEventListener("mousemove", (event) => {
    if (isPainting){

      previousX = currentX;
      previousY = currentY;

      currentX = event.clientX - canvas.offsetLeft;
      currentY = event.clientY - canvas.offsetTop;

      draw();
    }
  });

  document.addEventListener("mouseup", (event) => {
    // console.log("Mouse Released");
    isPainting = false;
  });

  canvas.addEventListener("mouseleave", (event) => {
    isPainting = false;
  });

  // Touch events

  canvas.addEventListener("touchstart", (event) => {
    isPainting = true;
    currentX = event.touches[0].clientX - canvas.offsetLeft;
    currentY = event.touches[0].clientY - canvas.offsetTop;
  })

  canvas.addEventListener('touchmove', (event) => {
    if (isPainting){

        previousX = currentX;
        previousY = currentY;
  
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;
  
        draw();
      }
  })

  canvas.addEventListener("touchend", (event) => {
    isPainting = false;
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
  });

  canvas.addEventListener("touchcancel", (event) => {
    isPainting = false;
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
  });




}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas(){
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}
