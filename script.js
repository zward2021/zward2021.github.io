import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// Main object
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0x4da3ff,
  wireframe: true
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lights
scene.add(new THREE.AmbientLight(0x1a2a3a));
const light = new THREE.PointLight(0x4da3ff, 2);
light.position.set(20, 20, 20);
scene.add(light);

// Stars
for (let i = 0; i < 200; i++) {
  const starGeo = new THREE.SphereGeometry(0.2, 12, 12);
  const starMat = new THREE.MeshStandardMaterial({ color: 0x4da3ff });
  const star = new THREE.Mesh(starGeo, starMat);

  star.position.set(
    (Math.random() - 0.5) * 200,
    (Math.random() - 0.5) * 200,
    (Math.random() - 0.5) * 200
  );

  scene.add(star);
}

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
