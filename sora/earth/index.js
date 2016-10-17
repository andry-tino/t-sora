/**
 * index.js
 * Andrea Tino - 2016
 * 
 * Dependencies:
 * - THREE
 */

window.addEventListener("load", function () {
	// Creating the renderer
	var renderer = new THREE.WebGLRenderer({
		antialias: true
	});

	// We make the render fill the all window
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.shadowMapEnabled = true;

	// This array will memorize important information for later
	var onRenderFcts = [];

	// Creating the scene and a camera
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(
		45, 									/* Camera frustum */
		window.innerWidth / window.innerHeight,	/* Camera frustum aspect ratio */
		0.01, 									/* Camera frustum near plane */
		100										/* Camera frustum far plane */
	);
	camera.position.z = 1; /* Set the camera to be 1 unit high from the base plane */

	// Create an omnidirectional light which is dark
	var light = new THREE.AmbientLight(0x222222);
	scene.add(light);

	// Create a directional light which is very bright (white) and has high intensity
	light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5, 5, 5);
	scene.add(light);
	light.castShadow = true;
	light.shadowCameraNear = 0.01;
	light.shadowCameraFar = 15;
	light.shadowCameraFov = 45;
	light.shadowCameraLeft = -1;
	light.shadowCameraRight = 1;
	light.shadowCameraTop = 1;
	light.shadowCameraBottom = -1;
	light.shadowBias = 0.001;
	light.shadowDarkness = 0.2;
	light.shadowMapWidth = 1024;
	light.shadowMapHeight = 1024;

	// Add startfield
	var starSphere = sora.starfield.createMesh();
	scene.add(starSphere);

	// Add object and make it move
	var containerEarth = new THREE.Object3D();
	containerEarth.rotateZ(-23.4 * Math.PI / 180);
	containerEarth.position.z = 0;
	scene.add(containerEarth);

	// Create the Moon
	var moonMesh = sora.planets.earth.createMoonMesh();
	moonMesh.position.set(0.5, 0.5, 0.5);
	moonMesh.scale.multiplyScalar(1 / 5);
	moonMesh.receiveShadow = true;
	moonMesh.castShadow = true;
	containerEarth.add(moonMesh);

	// Create the Earth
	var earthMesh = sora.planets.earth.createMesh();
	earthMesh.receiveShadow = true;
	earthMesh.castShadow = true;
	containerEarth.add(earthMesh);
	onRenderFcts.push(function (delta, now) {
		earthMesh.rotation.y += 1 / 32 * delta;
	});

	// Create the Earth's atmosphere
	var geometry = new THREE.SphereGeometry(0.5, 32, 32);
	var material = sora.shader.createAtmosphereMaterial();
	material.uniforms.glowColor.value.set(0x00b3ff);
	material.uniforms.coeficient.value = 0.8;
	material.uniforms.power.value = 2.0;
	var mesh = new THREE.Mesh(geometry, material);
	mesh.scale.multiplyScalar(1.01);
	containerEarth.add(mesh);

	var geometry = new THREE.SphereGeometry(0.5, 32, 32);
	var material = sora.shader.createAtmosphereMaterial();
	material.side = THREE.BackSide;
	material.uniforms.glowColor.value.set(0x00b3ff);
	material.uniforms.coeficient.value = 0.5;
	material.uniforms.power.value = 4.0;
	var mesh = new THREE.Mesh(geometry, material);
	mesh.scale.multiplyScalar(1.15);
	containerEarth.add(mesh);

	// Create clouds
	var earthCloud = sora.planets.earth.createCloudMesh();
	earthCloud.receiveShadow = true;
	earthCloud.castShadow = true;
	containerEarth.add(earthCloud);
	onRenderFcts.push(function (delta, now) {
		earthCloud.rotation.y += 1 / 8 * delta;
	})

	// Camera controls
	var mouse = { x: 0, y: 0 };
	document.addEventListener('mousemove', function (event) {
		mouse.x = (event.clientX / window.innerWidth) - 0.5;
		mouse.y = (event.clientY / window.innerHeight) - 0.5;
	}, false);
	onRenderFcts.push(function (delta, now) {
		camera.position.x += (mouse.x * 5 - camera.position.x) * (delta * 3);
		camera.position.y += (mouse.y * 5 - camera.position.y) * (delta * 3);
		camera.lookAt(scene.position);
	});

	// Render the scene
	onRenderFcts.push(function () {
		renderer.render(scene, camera);
	})

	// Loop runner
	var lastTimeMsec = null;
	requestAnimationFrame(function animate(nowMsec) {
		// Keep looping
		requestAnimationFrame(animate);
		// Measure time
		lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
		var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
		lastTimeMsec = nowMsec;
		// Call each update function
		onRenderFcts.forEach(function (onRenderFct) {
			onRenderFct(deltaMsec / 1000, nowMsec / 1000);
		});
	});
});
