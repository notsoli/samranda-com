let images, speeds;
let frame, highlight;
window.onload = init;

const LEFT_BOUND = 100;
const RIGHT_BOUND = 100;

function init() {
  frame = 0;
  highlight = Math.floor(Math.random() * 5);

  images = document.querySelectorAll(".project>picture");
  speeds = new Map();

  Promise.all(
    Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.querySelector("img").complete) {
          resolve();
        } else {
          img.querySelector("img").onload = resolve;
        }
      });
    }),
  ).then(() => {
    for (const img of images) {
      initImage(img);
      img.style.left = (Math.random() * window.innerWidth) + "px";
      img.style.opacity = 0.2;
    }
    requestAnimationFrame(render);
  });
}

function initImage(img) {
  const project = img.parentElement;

  let y_pos = project.getBoundingClientRect().y +
    document.documentElement.scrollTop;
  y_pos += (Math.random() * 50) - 25;

  img.style.top = y_pos + "px";

  const x_spd = ((Math.round(Math.random()) * 2) - 1) *
    ((Math.random() * 0.5) + 0.5);
  speeds.set(img, { x: x_spd });
}

function render() {
  frame++;

  for (const img of images) {
    const speed = speeds.get(img);

    let x = parseFloat(img.style.left);
    x += speed.x;

    // Use the manual boundary offsets
    if (x <= LEFT_BOUND) {
      speed.x = Math.abs(speed.x);
      x = LEFT_BOUND;
    } else if (x >= window.innerWidth - RIGHT_BOUND) {
      speed.x = -Math.abs(speed.x);
      x = window.innerWidth - RIGHT_BOUND;
    }

    img.style.left = x + "px";
  }

  if (frame % 240 == 0) {
    const picture = images[highlight];
    const projectLink = picture.parentElement;
    projectLink.classList.add("hover");
    setTimeout(() => {
      projectLink.classList.remove("hover");
    }, 3000);
    highlight = (highlight + Math.floor(Math.random() * 3) + 1) % images.length;
  }

  requestAnimationFrame(render);
}
