const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let verticies = [];
let edges = [];
let oldSelected;
let selected;

addEventListener('keypress', e => {
  if(selected != null)
    selected.label += e.key;
});
addEventListener('keydown', e => {
  if(selected != null && e.code === 'Backspace')
    selected.label = selected.label.substring(0, selected.label.length -1);
});
addEventListener('mousedown', (e) => {
  if(e.target === canvas) {
    if(oldSelected != null)
      oldSelected.color = '#fff';

    if(selected != null)
      selected.color = '#fff';
  }
});

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

function setSelected(newSelected) {
  if(newSelected != selected) {
    
    if(oldSelected != null) oldSelected.color = '#fff';
    if(selected != null) oldSelected = selected;

    selected = newSelected;
  }

  if(selected != null) selected.color = '#3f3';
  if(oldSelected != null) oldSelected.color = '#7f7';
}

setup();
draw();