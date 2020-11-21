class Vertex {

  constructor(x, y, radius) {
    this.pos = new Vector(x, y);

    this.radius = radius;

    this.hover = false;
    this.dragging = false;

    this.label = '';
    this.color = '#fff';
    this.fontColor = '#000';

    this.selected = false;

    addEventListener('mousedown', (e) => this.mousedown(e.clientX, e.clientY));
    addEventListener('mouseup', () => this.mouseup());
    addEventListener('mousemove', (e) => this.mousemove(e.clientX, e.clientY));
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    let fontSize = 24;
    ctx.font = "bold " + fontSize + "px 'Arial'";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.fontColor;
    
    while(ctx.measureText(this.label).width > this.radius * 2) {
      fontSize--;
      ctx.font = "bold " + fontSize + "px 'Arial'";
    }
    ctx.fillText(this.label, this.pos.x, this.pos.y);

    /*if(this.selected) {
      ctx.fillStyle = 'red';
      ctx.beginPath();

      let angle = ((2 * Math.PI) / 8) * 3;
      let x = this.pos.x + Math.sin(angle) * this.radius;
      let y = this.pos.y + Math.cos(angle) * this.radius;
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.font = "bold 18px 'Arial'";
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.fillText('x', x, y);
    }*/
  }

  select() {
    this.color = '#65ec70';
    this.fontColor = '#fff';

    this.selected = true;
  }

  selectSecondary() {
    this.color = '#aaf6a7';
    this.fontColor = '#000';

    this.selected = false;
  }

  deselect() {
    this.color = '#fff';
    this.fontColor = '#000';

    this.selected = false;
  }

  delete() {
    setSelected(null);

    for(let i = 0; i < edges.length; i++) {
      if(edges[i].vertex1 === this || edges[i].vertex2 === this) {
        edges.splice(i, 1);
        i--;
      }
    }

    let index = verticies.indexOf(this);
    if(index != -1) verticies.splice(index, 1);
  }

  checkHit(x, y) {
    let distance = Math.sqrt(Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2));

    return distance < this.radius;
  }

  mousedown(clientX, clientY) {
    let rect = canvas.getBoundingClientRect();
    if(this.checkHit(clientX - rect.left, clientY - rect.top)) {
      this.dragging = true;
    }
  }

  mouseup() {
    if(this.dragging)
      this.dragging = false;
  }

  mousemove(clientX, clientY) {
    if(this.dragging) {
      let rect = canvas.getBoundingClientRect();

      this.pos.x = clientX - rect.left;
      this.pos.y = clientY - rect.top;
    }

    let rect = canvas.getBoundingClientRect();
    if(this.checkHit(clientX - rect.left, clientY - rect.top)) {
      this.hover = true;
    } else {
      this.hover = false;
    }
  }
}