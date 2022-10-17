let mainRef = document.querySelector("main");
let maxWidth = mainRef.offsetWidth;
let maxHeight = mainRef.offsetHeight;

const updateMaxParams = (ref) => {
  maxWidth = ref.offsetWidth;
  maxHeight = ref.offsetHeight;
};

window.onresize = () => {
  updateMaxParams(mainRef);
};

const G = 0.001;

function app() {
  let bodies = [];
  
  const getBodies = () => {
    return bodies;
  };

  deleteBody = (body) => {
    bodies = bodies.filter((i)=> i !== body)    
  }
  
  let star = new Body(1500, 0.0001);
  bodies.push(star);
  star.center()
  star.display(mainRef);
  
  for (let i = 0; i < 15; i++) {
    let body = new Body(Math.random() * 250, 1);
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