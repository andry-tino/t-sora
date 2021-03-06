/**
 * shading.js
 * Andrea Tino - 2016
 * 
 * Dependencies:
 * - THREE
 */

var sora = sora || {};

/**
 * Shader.
 */
sora.shader = {
    /**
     * Creates the atmosphere material.
     */
    createAtmosphereMaterial: function () {
        var vertexShader = [
            "varying vec3 vVertexWorldPosition;",
            "varying vec3 vVertexNormal;",

            "void main(){",
            "	vVertexNormal = normalize(normalMatrix * normal);",

            "	vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;",

            "	// set gl_Position",
            "	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
            "}"
        ].join("\n");

        var fragmentShader = [
            "uniform vec3 glowColor;",
            "uniform float coeficient;",
            "uniform float power;",

            "varying vec3 vVertexNormal;",
            "varying vec3 vVertexWorldPosition;",

            "void main(){",
            "	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;",
            "	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;",
            "	viewCameraToVertex = normalize(viewCameraToVertex);",
            "	float intensity	 = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);",
            "	gl_FragColor = vec4(glowColor, intensity);",
            "}"
        ].join("\n");

        // Create custom material from the shader code above.
        // Those values are just defaults and not final. They are changed by the code later.
        var material = new THREE.ShaderMaterial({
            uniforms: {
                coeficient: {
                    type: "f",
                    value: 1.0
                },
                power: {
                    type: "f",
                    value: 2.0
                },
                glowColor: {
                    type: "c",
                    value: new THREE.Color("blue")
                },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthWrite: false,
        });

        return material;
    }
};