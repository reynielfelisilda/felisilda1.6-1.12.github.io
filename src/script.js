import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/3.png");

// Load CubeTexture for Skybox
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
  "textures/matcaps/1.png", // Right
  "textures/matcaps/2.png", // Left
  "textures/matcaps/3.png", // Top
  "textures/matcaps/4.png", // Bottom
  "textures/matcaps/5.png", // Front
  "textures/matcaps/6.png", // Back
]);

// Set it as the scene background
scene.background = environmentMap;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  // First line of text
  const textGeometry1 = new TextGeometry("CARAGA STATE UNIVERSITY", {
    font: font,
    size: 1.6,
    height: 1.3,
    curveSegments: 23,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry1.center();

  // Create a mesh for the first line
  const text1 = new THREE.Mesh(textGeometry1, material);
  text1.position.y = 1.2; // Adjust position to place it above the second line
  scene.add(text1);

  // Second line of text
  const textGeometry2 = new TextGeometry("Ampayon, Butuan City", {
    font: font,
    size: 1.3,
    height: 1.3,
    curveSegments: 23,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry2.center();

  // Create a mesh for the second line
  const text2 = new THREE.Mesh(textGeometry2, material);
  text2.position.y = -0.5; // Adjust position to place it below the first line
  scene.add(text2);

  // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 40;
    donut.position.y = (Math.random() - 0.5) * 40;
    donut.position.z = (Math.random() - 0.5) * 40;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }

  // Sphere
  const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32); // Radius, widthSegments, heightSegments

  for (let i = 0; i < 100; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.x = (Math.random() - 0.5) * 40;
    sphere.position.y = (Math.random() - 0.5) * 40;
    sphere.position.z = (Math.random() - 0.5) * 40;
    sphere.rotation.x = Math.random() * Math.PI;
    sphere.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    sphere.scale.set(scale, scale, scale);

    scene.add(sphere);
  }

  // Box
  const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // Width, height, depth

  for (let i = 0; i < 100; i++) {
    const box = new THREE.Mesh(boxGeometry, material);
    box.position.x = (Math.random() - 0.5) * 40;
    box.position.y = (Math.random() - 0.5) * 40;
    box.position.z = (Math.random() - 0.5) * 40;
    box.rotation.x = Math.random() * Math.PI;
    box.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    box.scale.set(scale, scale, scale);

    scene.add(box);
  }

  // Cylinder
  const cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 32); // RadiusTop, RadiusBottom, Height, RadialSegments

  for (let i = 0; i < 100; i++) {
    const cylinder = new THREE.Mesh(cylinderGeometry, material);
    cylinder.position.x = (Math.random() - 0.5) * 40;
    cylinder.position.y = (Math.random() - 0.5) * 40;
    cylinder.position.z = (Math.random() - 0.5) * 40;
    cylinder.rotation.x = Math.random() * Math.PI;
    cylinder.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    cylinder.scale.set(scale, scale, scale);

    scene.add(cylinder);
  }

  // Cone
  const coneGeometry = new THREE.ConeGeometry(0.3, 1, 32); // Radius, Height, RadialSegments

  for (let i = 0; i < 100; i++) {
    const cone = new THREE.Mesh(coneGeometry, material);
    cone.position.x = (Math.random() - 0.5) * 40;
    cone.position.y = (Math.random() - 0.5) * 40;
    cone.position.z = (Math.random() - 0.5) * 40;
    cone.rotation.x = Math.random() * Math.PI;
    cone.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    cone.scale.set(scale, scale, scale);

    scene.add(cone);
  }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
