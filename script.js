// ===== THREE.JS BACKGROUND =====
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bg").appendChild(renderer.domElement);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1200;

const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0xffffff,
  transparent: true,
  opacity: 0.7
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 2;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0003;

  renderer.render(scene, camera);
}
animate();

// Resize fix
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ===== Scroll animations =====
const sections = document.querySelectorAll("section");

function reveal() {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
