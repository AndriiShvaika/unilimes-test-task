import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var myCanvas = document.getElementById("myCanvasId");
const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(10, 10, 5);

const directionalLight1 = new THREE.DirectionalLight(0xffffff);
directionalLight1.position.set(10, 10, 5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff);
directionalLight2.position.set(-10, -10, -5);
scene.add(directionalLight2);

const controls = new OrbitControls(camera, renderer.domElement);

const list = document.getElementById("list");

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

const createGeometry = (geometryType, scale) => {
  const geometryMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const geometry = new THREE.Mesh(geometryType, geometryMaterial);
  geometry.scale.set(scale, scale, scale);

  const randomNum = Math.random() * 10;

  geometry.position.set(randomNum, randomNum, randomNum);
  scene.add(geometry);

  const newLi = document.createElement("li");
  const liButton = document.createElement("button");
  newLi.innerHTML = `<p>${geometry.uuid}</p>`;
  liButton.innerHTML = `x`;

  newLi.appendChild(liButton);
  list.appendChild(newLi);
  liButton.addEventListener("click", function () {
    scene.remove(geometry);
    newLi.remove();
  });
};

document.getElementById("button").addEventListener("click", function () {
  const geometryType = document.getElementById("geometry").value;
  const scale = document.getElementById("input").value;

  switch (geometryType) {
    case "cube":
      const boxGeometry = new THREE.BoxGeometry();
      createGeometry(boxGeometry, scale);
      break;
    case "sphere":
      const sphereGeometry = new THREE.SphereGeometry();
      createGeometry(sphereGeometry, scale);
      break;
    case "pyramid":
      var pyramidGeometry = new THREE.CylinderGeometry(0, 1, 1, 4, 1);
      createGeometry(pyramidGeometry, scale);
      break;
  }
});

animate();
