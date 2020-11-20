const btnVertex = document.getElementById('vertex');

btnVertex.addEventListener('dragstart', dragstartHandler);

function dragstartHandler(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.effectAllowed = "move";
}

canvas.addEventListener('drop', (e) => {
  e.preventDefault();

  let id = e.dataTransfer.getData("text");
  
  let rect = canvas.getBoundingClientRect();

  if(id === btnVertex.id) {
    verticies.push(new Vertex(e.clientX - rect.left, e.clientY - rect.top, 40));
  }
});

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();

  e.dataTransfer.dropEffect = "move";
});