const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize', (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  btnOrganize.click();

  for(let vertex of verticies) {
    vertex.radius = vertexSize();
  }
});

let verticies = [];
let edges = [];
let oldSelected;
let selected;

function setup() {

}

function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let edge of edges) {
    edge.draw();
  }

  let hover = false;
  for(let vertex of verticies) {
    if(vertex.hover) hover = true;
    if(vertex.dragging) setSelected(vertex);

    vertex.draw();
  }

  canvas.classList.toggle('hover', hover);
}

setup();
draw();