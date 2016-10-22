/**
 * starfield.js
 * Andrea Tino - 2016
 */

var sora = sora || {};

/**
 * Defines the background starfield.
 */
sora.starfield = {
    /**
     * URL leading to the images folder from the index file running the application. 
     * This must include the final slash character.
     */
    urlToImagesFromIndex: "../images/",

    /**
     * Creates the starfield mesh.
     */
    createMesh: function() {
        var loader = new THREE.TextureLoader();
        var texture	= loader.load(sora.starfield.urlToImagesFromIndex + "galaxy_starfield.png");
        
        var material = new THREE.MeshBasicMaterial({
            map	    : texture,
            side    : THREE.BackSide
        });
        
        var geometry = new THREE.SphereGeometry(100, 32, 32); /* (radius, segmentWidth, segmentHeight) */
        var mesh = new THREE.Mesh(geometry, material);
        
        return mesh;
    }
};
