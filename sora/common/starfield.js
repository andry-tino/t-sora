/**
 * starfield.js
 * Andrea Tino - 2016
 */

var sora = sora || {};

/**
 * Starfield.
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
        var texture	= THREE.ImageUtils.loadTexture(sora.starfield.urlToImagesFromIndex + "galaxy_starfield.png");
        var material = new THREE.MeshBasicMaterial({
            map	: texture,
            side : THREE.BackSide
        });
        
        var geometry = new THREE.SphereGeometry(100, 32, 32);
        var mesh = new THREE.Mesh(geometry, material);
        
        return mesh;
    }
};
