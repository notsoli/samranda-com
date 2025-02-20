let images, speeds;
let frame, highlight;
window.onload = init;

function init() {
  frame = 0;
  highlight = Math.floor(Math.random() * 5);

  images = document.querySelectorAll(".project>picture");
  speeds = new Map();

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
  const inner = img.querySelector('img');

  // Keep the original vertical position from the document layout
  let y_pos = project.getBoundingClientRect().y +
    document.documentElement.scrollTop;
  y_pos += (Math.random() * 50) - 25; // Small random vertical offset

  x_pos = (Math.round(Math.random()))
    ? -inner.offsetWidth / 2
    : window.innerWidth + inner.offsetWidth / 2;

  img.style.left = x_pos + "px";
  img.style.top = y_pos + "px";

  const x_spd = ((Math.round(Math.random()) * 2) - 1) *
    ((Math.random() * 0.5) + 0.5);
  speeds.set(img, { x: x_spd }); // Only store horizontal speed
}

function render() {
  frame++;

  for (const img of images) {
    const speed = speeds.get(img);
    const inner = img.querySelector('img');

    let x = parseFloat(img.style.left);

    // Only update horizontal position
    x += speed.x;

    // Bounce off horizontal edges
    const width = inner.offsetWidth;
    if (x < 0 || x > window.innerWidth - width) {
      speed.x = -speed.x; // Reverse horizontal direction
      x = x < 0 ? 0 : window.innerWidth - width; // Prevent sticking to edges
    }

    // Only update left position, keeping original top position
    img.style.left = x + "px";
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
