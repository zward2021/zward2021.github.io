// ===== THREE.JS SCENE =====
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById("bg").appendChild(renderer.domElement);

// ===== PARTICLES =====
const count = 1200;
const positions = [];

for (let i = 0; i < count; i++) {
  positions.push(
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 6
  );
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  size: 0.05,
  color: 0xffffff,
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// ===== CONNECTING LINES (NEURAL EFFECT) =====
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x444444,
  transparent: true,
  opacity: 0.4
});

const linePositions = [];

for (let i = 0; i < count; i += 5) {
  linePositions.push(
    positions[i * 3],
    positions[i * 3 + 1],
    positions[i * 3 + 2],
    positions[(i + 1) * 3],
    positions[(i + 1) * 3 + 1],
    positions[(i + 1) * 3 + 2]
  );
}

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(linePositions, 3)
);

const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lines);

camera.position.z = 3;

// ===== ANIMATION =====
function animate() {
  requestAnimationFrame(animate);

  points.rotation.y += 0.0007;
  points.rotation.x += 0.0003;

  lines.rotation.y += 0.0007;
  lines.rotation.x += 0.0003;

  renderer.render(scene, camera);
}

animate();

// ===== MOUSE PARALLAX =====
document.addEventListener("mousemove", (e) => {
  camera.position.x = (e.clientX / window.innerWidth - 0.5) * 1;
  camera.position.y = -(e.clientY / window.innerHeight - 0.5) * 1;
});

// ===== RESIZE =====
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ===== SCROLL ANIMATIONS =====
const sections = document.querySelectorAll("section");

function reveal() {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(section => {
    if (section.getBoundingClientRect().top < trigger) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
