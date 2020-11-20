const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let verticies = [];
let edges = [];
let selected;

function setup() {
  let vertex1 = new Vertex(canvas.width / 3, canvas.height / 2, 40);
  let vertex2 = new Vertex(canvas.width - canvas.width / 3, canvas.height / 2, 40);
  let vertex3 = new Vertex((canvas.width / 5) * 3, canvas.height / 3, 40);
  let vertex4 = new Vertex(canvas.width - (canvas.width / 5) * 3, canvas.height - canvas.height / 3, 40);
  let vertex5 = new Vertex(canvas.width - canvas.width / 10, canvas.height - (canvas.height / 5) * 2, 40);

  verticies.push(vertex1, vertex2, vertex3, vertex4, vertex5);
  edges.push(new Edge(vertex1, vertex2), new Edge(vertex1, vertex3), new Edge(vertex1, vertex4), new Edge(vertex2, vertex3), new Edge(vertex2, vertex4), new Edge(vertex2, vertex5), new Edge(vertex3, vertex5));
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
    if(vertex.dragging) selected = vertex;

    vertex.draw();
  }

  canvas.classList.toggle('hover', hover);
}

setup();
draw();