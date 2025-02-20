let images, speeds;
let frame, highlight;
window.onload = init;

function init() {
  frame = 0;
  highlight = Math.floor(Math.random() * 5);

  images = document.querySelectorAll(".project>picture");
  speeds = new Map();

  // Wait for images to load before initializing
  Promise.all(Array.from(images).map(img => {
    return new Promise(resolve => {
      if (img.querySelector('img').complete) {
        resolve();
      } else {
        img.querySelector('img').onload = resolve;
      }
    });
  })).then(() => {
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
  const inner = img.querySelector('img'); // Get the actual img element
  let y_pos = project.getBoundingClientRect().y +
    document.documentElement.scrollTop;

  x_pos = (Math.round(Math.random()))
    ? -inner.offsetWidth / 2
    : window.innerWidth + inner.offsetWidth / 2;
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
    const inner = img.querySelector('img'); // Get the actual img element

    let x = parseFloat(img.style.left);
    let y = parseFloat(img.style.top);

    // Update position
    x += speed.x;
    y += speed.y;

    // Wrap horizontally
    const width = inner.offsetWidth;
    if (x < -width) {
      x = window.innerWidth;
    } else if (x > window.innerWidth) {
      x = -width;
    }

    // Apply new position
    img.style.left = x + "px";
    img.style.top = y + "px";
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
