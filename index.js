function main() {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  const colorInput = document.querySelector("#colorInput");
  const backgroundColorInput = document.querySelector("#backgroundColorInput");
  const saveDrawingButton = document.querySelector("button");
  const column2 = document.querySelector("#column2");
  const reset = document.querySelector("#reset");
  //canvas size
  canvas.height = window.innerHeight / 1.5;
  canvas.width = window.innerWidth / 2.1;
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  /*
  //rectangle or squares
  context.fillStyle = "green";
  context.lineWidth = 5;
  context.fillRect(50, 50, 200, 200); //rectanle, 4 params x&y, height and width. You can change the colors etc.. or get a strock (line)
  context.strokeStyle = "red";
  context.strokeRect(100, 100, 200, 500);

  //draw lines
  context.beginPath();
  context.moveTo(100, 100); //starting position x, y
  context.lineTo(200, 100); // where the line goes
  context.stroke(); //this makes the line visible
  context.closePath(); //will close the open ends together
  */

  //variables
  let painting = false;

  //functions
  function startPosition(event) {
    painting = true;
    draw(event); // we can draw dots now
  }

  function finishedPosition() {
    painting = false;
    context.beginPath(); //so that when you stop drawing, then later want to start again the line is not connected still. It resets.
  }

  function draw(event) {
    if (!painting) return;
    context.lineWidth = 10;
    context.lineCap = "round"; //makes line round
    context.strokeStyle = changeColor;

    context.lineTo(event.clientX, event.clientY); //draw line to whereever the mouse is.. x and y position.
    context.stroke(); //so you can see the line

    //for a smoother kind of line:
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
  }

  function changeColor(event) {
    context.strokeStyle = event.target.value;
  }

  function changeBackgroundColor(event) {
    console.log("value test:", event.target.value);
    context.fillStyle = event.target.value;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function onSaveDrawing() {
    console.log("saved it!");
    const dataURL = canvas.toDataURL();
    const image = document.createElement("img");
    image.src = dataURL;
    image.style = `height:${canvas.height / 4};width:${
      canvas.width / 4
    };margin:10px;`;
    image.border = 2;

    column2.append(image);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = changeBackgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function resizeCanvas() {
    //resizing
    canvas.height = window.innerHeight / 1.5;
    canvas.width = window.innerWidth / 2.1;
    colorInput.value = "#000000";
    backgroundColorInput.value = "#FFFFFF";
  }

  function resetCanvas() {
    console.log("reset!");
    context.strokeStyle = "#000000";
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    colorInput.value = "#000000";
    backgroundColorInput.value = "#FFFFFF";
  }

  //user can change the color
  colorInput.addEventListener("input", changeColor);
  backgroundColorInput.addEventListener("input", changeBackgroundColor);

  //EventListeners
  window.addEventListener("resize", resizeCanvas);
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);

  //save drawing
  saveDrawingButton.addEventListener("click", onSaveDrawing);

  //reset canvas
  reset.addEventListener("click", resetCanvas);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
