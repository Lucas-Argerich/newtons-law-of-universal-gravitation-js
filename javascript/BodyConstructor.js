class Body {
  constructor(mass, force, angle) {
    this.mass = mass || Math.random() * 1000;
    this.displaySize = this.mass / 10;
    this.pos = {
      x: (Math.random() - 0.5) * (maxWidth - this.displaySize),
      y: (Math.random() - 0.5) * (maxHeight - this.displaySize),
    };
    this.vector = {
      x:
        Math.cos(angle || Math.random() * 2 * Math.PI) *
        (force || Math.random() * 10),
      y:
        Math.sin(angle || Math.random() * 2 * Math.PI) *
        (force || Math.random() * 10),
    };
    this.element = document.createElement("div");
  }

  center() {
    this.pos.x = 0;
    this.pos.y = 0;
    this.vector.x = 0;
    this.vector.y = 0;
  }

  updateVelocities(fx, fy) {
    this.vector.x += fx / this.mass;
    this.vector.y += fy / this.mass;
  }

  gravitate(bodies) {
    for (let obj of bodies) {
      const distance = {
        x: obj.pos.x - this.pos.x,
        y: obj.pos.y - this.pos.y,
        t: Math.sqrt(
          Math.pow(obj.pos.x - this.pos.x, 2) +
            Math.pow(obj.pos.y - this.pos.y, 2)
        ),
      };

      const g = (G * this.mass * obj.mass) / distance.t;

      const sin = distance.x / distance.t;
      const cos = distance.y / distance.t;

      const gx = sin * g;
      const gy = cos * g;

      this.updateVelocities(gx, gy);
    }
  }

  setPos(x, y) {
    this.pos.x = x;
    this.element.style.left = `calc(50% + ${this.pos.x}px)`;
    this.pos.y = y;
    this.element.style.top = `calc(50% - ${this.pos.y}px)`;
  }

  run(getBodies) {
    const bodies = getBodies();
    const others = bodies.filter((item) => item !== this);

    this.setPos(this.pos.x + this.vector.x, this.pos.y + this.vector.y);
    this.gravitate(others);

    setTimeout(() => {
      this.run(getBodies);
    }, 10);
  }

  display(ref) {
    this.element.className = "object";
    this.element.style.width = `${this.displaySize}px`;
    this.element.style.height = `${this.displaySize}px`;
    this.element.style.left = `calc(50% + ${this.pos.x}px)`;
    this.element.style.top = `calc(50% - ${this.pos.y}px)`;
    ref.append(this.element);
  }
}
