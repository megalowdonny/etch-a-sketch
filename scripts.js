/* GRABBING THE ELEMENTS */

const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
let isDrawing = false; // Flag for mousedown/up
let length = 16;
let gridSquares = [];


/* CREATING THE DIVS */

function drawDivs() {
  for (let i = 0; i < length; i++) {
    for (let i = 0; i < length; i++) {
      const div = document.createElement('div');
      div.classList.add('square');
      div.dataset.lightness = '100'; // For adding darkness on each passthrough
      container.appendChild(div);
    }
  }
  gridSquares = Array.from(document.querySelectorAll('.square')); // Nodelist in array form
  /* Adjusts css-grid to match new grid size */
  container.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${length}, 1fr)`;
  /* Dynamic event listeners so it still works after resizing */
  gridSquares.forEach(square => square.addEventListener('mouseover', handleHover));
  gridSquares.forEach(square => square.addEventListener('mouseout', handleDepart));
}

/* EVENT HANDLERS */

function handleHover() {
  this.classList.add('hovered');
  /* If you're holding down the mouse button... */
  if (isDrawing) {
    const random = Math.random() * (360 - 0);
    this.dataset.lightness -= 10;
    this.style.backgroundColor = `hsl(${random}, 100%, ${this.dataset.lightness}%)`;
  }
}/* In case you leave container while still drawing */
function handleDepart() {
  this.classList.remove('hovered');
}

function handleClear() {
  gridSquares.forEach(square => {
    square.remove(); // Actually removes elements
  });
  gridSquares.length = 0; // Clears out the nodelist/Array
}

function handleChange() {
  handleClear(); // Need to clear everything before redrawing
  /* Get the new side length from user */
  while (true) { // Loop checks for invalid numbers and non-number inputs
    length = window.prompt('Please input the desired grid side length:', 16);
    if (length > 100 || length < 1 || !parseInt(length)) { // The last one makes sure it's a number
      alert('Sorry, please input a number between 1 and 100')
      continue
    } 
    break;
  }
  length = parseInt(length); // If input is float, round to nearest int
  drawDivs();
}

drawDivs(); // Initial draw on load, uses length = 16


/* EVENT LISTENERS */

container.addEventListener('mousedown', () => isDrawing = true);
container.addEventListener('mouseup', () => isDrawing = false);
// APPARENTLY MOUSEOUT APPLIES TO CHILDREN TOO, WHICH DOESN'T WORK WELL SINCE EACH SQUARE IS A
container.addEventListener('mouseleave', () => isDrawing = false);
clearButton.addEventListener('click', handleChange);