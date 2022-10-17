class Body {
  constructor(mass, force, angle) {
    this.mass = mass || Math.random() * 1000;
    this.displaySize = this.mass / 40;
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
    this.running = true;
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

  mergeVelocities(fx, fy, mass) {
    this.vector.x = (this.mass * this.vector.x + mass * fx) / (this.mass + mass)
    this.vector.y = (this.mass * this.vector.y + mass * fy) / (this.mass + mass)
  }

  updateMass(mass) {
    this.mass = mass;
    this.displaySize = mass / 40;
    this.element.style.width = `${this.displaySize}px`;
    this.element.style.height = `${this.displaySize}px`;
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

  checkCollision(bodies) {
    for (let body of bodies) {
      const area = body.displaySize / 2 + this.displaySize / 2;
      const x = body.pos.x - this.pos.x;
      const y = body.pos.y - this.pos.y;

      if (area > Math.sqrt(x * x + y * y)) {
        body.mass > this.mass ? body.handleMerge(this) : this.handleMerge(body);
      }
    }
  }

  handleMerge(body) {
    this.mergeVelocities(body.vector.x, body.vector.y, body.mass);
    this.updateMass(this.mass + body.mass);
    deleteBody(body);
    body.kill();
  }

  kill() {
    this.running = false;
    this.element.remove();
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
    this.checkCollision(others);
    this.running &&
      setTimeout(() => {
        this.run(getBodies);
      }, maxWidth > 726 ? 10 : 20);
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
