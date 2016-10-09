/**
 * index.js
 * Andrea Tino - 2016
 */

window.addEventListener("load", function() {
    // Define the scene
    var scene = new THREE.Scene();
    // Define the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    // Setting up the renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Setting up geometries in the scene
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Setting the camera position in the scene
    camera.position.z = 5;

    // Defining the function to use to animate the geometry
    var render = function () {
        requestAnimationFrame(render);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    // Starting it
    render();
});
