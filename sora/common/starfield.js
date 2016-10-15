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
     * Creates the starfield mesh.
     */
    createMesh: function() {
        var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL + "images/galaxy_starfield.png");
        var material = new THREE.MeshBasicMaterial({
            map	: texture,
            side : THREE.BackSide
        });
        
        var geometry = new THREE.SphereGeometry(100, 32, 32);
        var mesh = new THREE.Mesh(geometry, material);
        
        return mesh;
    }
};
