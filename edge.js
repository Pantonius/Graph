class Edge {
  
  constructor(vertex1, vertex2) {
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
  }

  draw() {
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(this.vertex1.pos.x, this.vertex1.pos.y);
    ctx.lineTo(this.vertex2.pos.x, this.vertex2.pos.y);
    ctx.stroke();
  }
}