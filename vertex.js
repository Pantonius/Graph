class Vertex {

  constructor(x, y, radius) {
    this.pos = new Vector(x, y);

    this.radius = radius;

    this.hover = false;
    this.dragging = false;

    this.label = '';
    this.color = '#fff';

    addEventListener('mousedown', (e) => this.mousedown(e.clientX, e.clientY));
    addEventListener('mouseup', () => this.mouseup());
    addEventListener('mousemove', (e) => this.mousemove(e.clientX, e.clientY));
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = "bold 24px 'Arial'";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText(this.label, this.pos.x, this.pos.y);
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