/**
 * earth.js
 * Andrea Tino - 2016
 * 
 * Dependencies:
 * - THREE
 * - utils
 */

var sora = sora || {};
sora.planets = sora.planets || {};

/**
 * The Earth object.
 */
sora.planets.earth = {
    /**
     * URL leading to the images folder from the index file running the application. 
     * This must include the final slash character.
     */
    urlToImagesFromIndex: "../images/",

    /**
     * Creates the mesh for the Earth.
     * @return {THREE.Mesh} The THREE Mesh object for the Earth.
     */
    createMesh: function() {
        // Create a sphere
        var geometry = new THREE.SphereGeometry(0.5, 32, 32); /* (radius, segmentWidth, segmentHeight) */

        // Define material
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshPhongMaterial({
            map         : loader.load(sora.planets.earth.urlToImagesFromIndex + "earthmap1k.jpg"),
            bumpMap	    : loader.load(sora.planets.earth.urlToImagesFromIndex + "earthbump1k.jpg"),
            bumpScale   : 0.05, /* Bump scale factor */
            specularMap : loader.load(sora.planets.earth.urlToImagesFromIndex + "earthspec1k.jpg")
        });

        // Generate final mesh
        var mesh = new THREE.Mesh(geometry, material);

        return mesh;
    },

    /**
     * Creates the mesh for the Moon.
     * @return {THREE.Mesh} The THREE Mesh object for the Earth.
     */
    createMoonMesh: function() {
        // Create a sphere
        var geometry = new THREE.SphereGeometry(0.5, 32, 32); /* (radius, segmentWidth, segmentHeight) */

        // Define material
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshPhongMaterial({
            map	        : loader.load(sora.planets.earth.urlToImagesFromIndex + "moonmap1k.jpg"),
            bumpMap	    : loader.load(sora.planets.earth.urlToImagesFromIndex + "moonbump1k.jpg"),
            bumpScale   : 0.002 /* Bump scale factor */
        });

        // Generate final mesh
        var mesh = new THREE.Mesh(geometry, material);

        return mesh;
    },

    /**
     * Creates the mesh for the cloud.
     * @return {THREE.Mesh} The THREE Mesh object for the cloud.
     */
    createCloudMesh: function() {
        return sora.utils.createCloudMesh(
            sora.planets.earth.urlToImagesFromIndex + "earthcloudmaptrans.jpg", 
            sora.planets.earth.urlToImagesFromIndex + "earthcloudmap.jpg");
    }
};
