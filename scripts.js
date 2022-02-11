/* Grabbing the elements */
const container = document.querySelector('.container');
let length = 16;
let isDrawing = false;

/* Creating the divs */
for (let i = 0; i < length; i++) {
  for (let i = 0; i < length; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    container.appendChild(div);
  }
}
const gridSquares = document.querySelectorAll('.square');

/* Sets the number of columns */
container.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
container.style.gridTemplateRows = `repeat(${length}, 1fr)`;

/* Event Handlers */
function handleHover() {
  this.classList.add('hovered');

  if (isDrawing) this.classList.add('drawn');
}

function handleDepart() {
  this.classList.remove('hovered');
}

/* Event Listeners */
gridSquares.forEach(square => square.addEventListener('mouseover', handleHover));
gridSquares.forEach(square => square.addEventListener('mouseout', handleDepart));
container.addEventListener('mousedown', () => isDrawing = true);
container.addEventListener('mouseup', () => isDrawing = false);
// APPARENTLY MOUSEOUT APPLIES TO CHILDREN TOO, WHICH DOESN'T WORK WELL SINCE EACH SQUARE IS A
container.addEventListener('mouseleave', () => isDrawing = false);