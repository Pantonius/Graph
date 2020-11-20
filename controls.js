const btnVertex = document.getElementById('vertex');
const btnEdge = document.getElementById('edge');

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
    setSelected(verticies[verticies.length -1]);
  }
});

btnEdge.addEventListener('mousedown', (e) => {
  if(oldSelected != null && selected != null) {
    let newEdge = new Edge(oldSelected, selected);
    for(let edge of edges) {
      if((edge.vertex1 === newEdge.vertex1 && edge.vertex2 === newEdge.vertex2) || (edge.vertex2 === newEdge.vertex1 && edge.vertex1 === newEdge.vertex2))
        return;
    }

    edges.push(newEdge);
  }
});

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();

  e.dataTransfer.dropEffect = "move";
});