const btnHide = document.getElementById('hide');

const divToolbar = document.getElementById('toolbar');
const btnVertex = document.getElementById('vertex');
const btnEdge = document.getElementById('edge');

const btnOrganize = document.getElementById('organize');

const info = document.getElementById('info');

// Hide
btnHide.addEventListener('click', () => {
  if(btnHide.innerText === 'visibility') {
    btnHide.innerText = 'visibility_off';
    divToolbar.style.visibility = 'hidden';
    info.style.visibility = 'hidden';
  } else if(btnHide.innerText === 'visibility_off') {
    btnHide.innerText = 'visibility';
    divToolbar.style.visibility = 'visible';
    info.style.visibility = 'visible';
  };
});

// Drag + Drop Toolbar
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

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();

  e.dataTransfer.dropEffect = "move";
});


// Click Edge Toolbar
btnEdge.addEventListener('click', () => {
  if(oldSelected != null && selected != null) {
    let newEdge = new Edge(oldSelected, selected);
    for(let edge of edges) {
      if((edge.vertex1 === newEdge.vertex1 && edge.vertex2 === newEdge.vertex2) || (edge.vertex2 === newEdge.vertex1 && edge.vertex1 === newEdge.vertex2))
        return;
    }

    edges.push(newEdge);
  }
});

// Organize Graph
btnOrganize.addEventListener('click', () => {
  for(let i = 0; i < verticies.length; i++) {
    let posVar = ((2 * Math.PI) / verticies.length) * i;
    let factor = (Math.min(canvas.height, canvas.width) / 2) * .6;

    let x = Math.cos(posVar) * factor;
    let y = Math.sin(posVar) * factor;

    verticies[i].pos = new Vector(x + canvas.width / 2, y + canvas.height / 2);

    console.log(x, y);
  }
});