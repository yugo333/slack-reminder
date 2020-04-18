"use strict";

window.addEventListener("DOMContentLoaded", init);
function init() {
  let scene, camera, renderer;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.set(400, 70, 100);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("main").appendChild(renderer.domElement);

  let text3D = new THREE.FontLoader();
  text3D.load("./helvetiker_regular.typeface.json", function (font) {
    createText(font);
  });
  function createText(font) {
    text3D = new THREE.Mesh(
      new THREE.TextGeometry("SLACK", {
        font: font,
        size: 100,
        height: 30,
      }),
      new THREE.MeshLambertMaterial({
        // color: 0xffc355,
        curveSegments: 20,
        side: THREE.DoubleSide,
      })
    );
    text3D.position.set(-80, 0, -20);
    text3D.castShadow = true;
    text3D.Color = new THREE.Color(0.672, 0.637, 0.585);
    scene.add(text3D);
    // console.log(text3D);
  }

  let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  plane.position.set(0, -2, 0);
  plane.rotation.x = (90 * Math.PI) / 180;
  plane.receiveShadow = true;
  scene.add(plane);

  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(60, 100, -150);
  light.castShadow = true;
  scene.add(light);
  let ambient = new THREE.AmbientLight(0x808080);
  scene.add(ambient);

  renderer.shadowMap.enabled = true;
  light.shadow.camera.right = 200;
  light.shadow.camera.left = -400;
  light.shadow.camera.top = 600;
  light.shadow.camera.bottom = -200;

  function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
  }
  render();
}
