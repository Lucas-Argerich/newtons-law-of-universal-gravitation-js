const updateMaxParams = (ref) => {
  maxWidth = ref.offsetWidth;
  maxHeight = ref.offsetHeight;
};

let mainRef = document.querySelector("main");

let maxWidth = 0;
let maxHeight = 0;

updateMaxParams(mainRef);

window.onresize = () => {
  updateMaxParams(mainRef);
};

const bodies = [];

const getBodies = () => {
  return bodies;
};

const G = 0.015;

let body = new Body(1500, 0.0001);
bodies.push(body);
body.display(mainRef);

for (let i = 0; i < 6; i++) {
  let body = new Body(Math.random() * 150, 0.0001);
  bodies.push(body);
  body.display(mainRef);
}

for (let body of bodies) {
  body.run(getBodies);
}
