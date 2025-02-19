let images, speeds;
let frame, highlight;
window.onload = init;

function init() {
  frame = 0;
  highlight = Math.floor(Math.random() * 5);

  images = document.querySelectorAll(".project>img");
  speeds = new Map();
  for (const img of images) {
    initImage(img);
    img.style.left = (Math.random() * window.innerWidth) + "px";
    img.style.opacity = 0.2;
  }
  requestAnimationFrame(render);
}

function initImage(img) {
  const project = img.parentElement;
  let y_pos = project.getBoundingClientRect().y +
    document.documentElement.scrollTop;

  x_pos = (Math.round(Math.random()))
    ? -img.width / 2
    : window.innerWidth + img.width / 2;
  y_pos += (Math.random() * 50) - 25;

  img.style.left = x_pos + "px";
  img.style.top = y_pos + "px";

  const x_spd = ((Math.round(Math.random()) * 2) - 1) *
    ((Math.random() * 0.5) + 0.5);
  const y_spd = ((Math.random() * 0.4) - 0.2) * x_spd;
  speeds.set(img, { x: x_spd, y: y_spd });
}

function render() {
  frame++;

  for (const img of images) {
    const speed = speeds.get(img);

    const x = parseFloat(img.style.left);
    const y = parseFloat(img.style.top);

    img.style.left = (x + speed.x) + "px";
    img.style.top = (y + speed.y) + "px";

    if (x < -img.width / 2 || x > window.innerWidth + img.width / 2) {
      initImage(img);
    }
  }

  if (frame % 240 == 0) {
    const project = images[highlight].parentElement;
    project.classList.add("hover");
    setTimeout(() => {
      project.classList.remove("hover");
    }, 3000);
    highlight = Math.floor(Math.random() * 17);
  }

  requestAnimationFrame(render);
}
