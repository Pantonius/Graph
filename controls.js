const btnHide = document.getElementById('hide');

const divToolbar = document.getElementById('toolbar');
const divToolbarContainer = document.getElementById('toolbar-container');
const divInfo = document.getElementById('info');

const btnVertex = document.getElementById('vertex');
const btnEdge = document.getElementById('edge');

const btnOrganize = document.getElementById('organize');

// Hide
const stanVisInfo = divInfo.style.visibility;
btnHide.addEventListener('click', () => {
  if(btnHide.innerText === 'visibility') {
    btnHide.innerText = 'visibility_off';

    divToolbarContainer.style.right = '16px';

    divToolbar.style.visibility = 'hidden';
    divInfo.style.visibility = 'hidden';
  } else if(btnHide.innerText === 'visibility_off') {
    btnHide.innerText = 'visibility';

    divToolbarContainer.style.right = 'auto';

    divToolbar.style.visibility = 'visible';
    divInfo.style.visibility = stanVisInfo;
  };
});

// Vertex Label
addEventListener('keypress', e => {
  if(selected != null) {
    selected.label += e.key;
    e.preventDefault();
  }
});
addEventListener('keydown', e => {
  if(selected != null && e.code === 'Backspace') {
    selected.label = selected.label.substring(0, selected.label.length -1);
    e.preventDefault();
  } else if(selected != null && e.code === 'Delete') {
    selected.delete();
    e.preventDefault();
  }
});

// Vertex coloring
addEventListener('mousedown', (e) => {
  if(e.target === canvas) {
    if(oldSelected != null) oldSelected.deselect();

    if(selected != null) selected.deselect();
  }
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
    verticies.push(new Vertex(e.clientX - rect.left, e.clientY - rect.top, vertexSize()));
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
  }
});

// FUNCTIONS
function setSelected(newSelected) {
  if(newSelected === null) {
    if(oldSelected != null) {
      selected = oldSelected;
      selected.select();
    } else {
      selected = null;
    }

    oldSelected = null;

    return;
  }

  if(newSelected != selected) {
    if(oldSelected != null) oldSelected.deselect();
    if(selected != null) oldSelected = selected;

    selected = newSelected;
  }

  if(selected != null) selected.select();
  if(oldSelected != null) oldSelected.selectSecondary();
}

function vertexSize() {
  return Math.min(canvas.width, canvas.height) / 45 + 20;
}