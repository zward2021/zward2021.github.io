// Scroll
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth"
  });
}

// Typing effect
const words = ["Computer Engineer", "Builder", "Problem Solver"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  current = words[i];
  document.getElementById("typing").textContent = current.substring(0, j);

  if (!deleting && j++ === current.length) {
    deleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (deleting && j-- === 0) {
    deleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(type, deleting ? 50 : 100);
}
type();

// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));


// THREE.JS BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const light = new THREE.PointLight(0xffffff);
light.position.set(20, 20, 20);
scene.add(light);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();
