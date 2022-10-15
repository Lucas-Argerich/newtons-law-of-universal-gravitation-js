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

const G = 0.001;

function app() {
  const bodies = [];
  
  const getBodies = () => {
    return bodies;
  };
    
  const centerStar = (ref) => {
    ref.pos.x = 0
    ref.pos.y = 0
    ref.vector.x = 0
    ref.vector.y = 0
  }
  
  let star = new Body(1500, 0.0001);
  bodies.push(star);
  centerStar(star)
  star.display(mainRef);
  
  for (let i = 0; i < 5; i++) {
    let body = new Body(Math.random() * 150, 1);
    bodies.push(body);
    body.display(mainRef);
  }
  
  for (let body of bodies) {
    body.run(getBodies);
  }
}

const resetApp = () => {
  mainRef.innerHTML = '<button onclick="resetApp()">Reset</button>'
  app()
}

app()