/**
 * earth.js
 * Andrea Tino - 2016
 * 
 * Dependencies:
 * - THREE
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
    urlToImagesFromIndex: "./images/",

    /**
     * Creates the mesh for the Earth.
     * @return {THREE.Mesh} The THREE Mesh object for the Earth.
     */
    createMesh: function() {
        // Create a sphere
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);

        // Define material
        var material = new THREE.MeshPhongMaterial({
            map         : THREE.ImageUtils.loadTexture(sora.planets.earth.urlToImagesFromIndex + "earthmap1k.jpg"),
            bumpMap	    : THREE.ImageUtils.loadTexture(sora.planets.earth.urlToImagesFromIndex + "earthbump1k.jpg"),
            bumpScale   : 0.05,
            specularMap : THREE.ImageUtils.loadTexture(sora.planets.earth.urlToImagesFromIndex + "earthspec1k.jpg"),
            specularMap : new THREE.Color("grey")
        });

        // Generate final mesh
        var mesh = new THREE.Mesh(geometry, material);

        return mesh;
    },

    createMoonMesh: function() {
        // Create a sphere
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);

        // Define material
        var material = new THREE.MeshPhongMaterial({
            map	        : THREE.ImageUtils.loadTexture(sora.planets.earth.urlToImagesFromIndex + "moonmap1k.jpg"),
            bumpMap	    : THREE.ImageUtils.loadTexture(sora.planets.earth.urlToImagesFromIndex + "moonbump1k.jpg"),
            bumpScale   : 0.002
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
        // Create destination canvas
        var canvasResult	= document.createElement('canvas')
        canvasResult.width	= 1024
        canvasResult.height	= 512
        var contextResult	= canvasResult.getContext('2d')

        // load earthcloudmap
        var imageMap	= new Image();
        imageMap.addEventListener("load", function() {
            
            // create dataMap ImageData for earthcloudmap
            var canvasMap	= document.createElement('canvas')
            canvasMap.width	= imageMap.width
            canvasMap.height= imageMap.height
            var contextMap	= canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            var imageTrans	= new Image();
            imageTrans.addEventListener("load", function(){
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans		= document.createElement('canvas')
                canvasTrans.width	= imageTrans.width
                canvasTrans.height	= imageTrans.height
                var contextTrans	= canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
                for(var y = 0, offset = 0; y < imageMap.height; y++){
                    for(var x = 0; x < imageMap.width; x++, offset += 4){
                        dataResult.data[offset+0]	= dataMap.data[offset+0]
                        dataResult.data[offset+1]	= dataMap.data[offset+1]
                        dataResult.data[offset+2]	= dataMap.data[offset+2]
                        dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult,0,0)	
                material.map.needsUpdate = true;
            })
            imageTrans.src	= sora.planets.earth.urlToImagesFromIndex + 'images/earthcloudmaptrans.jpg';
        }, false);
        imageMap.src	= sora.planets.earth.urlToImagesFromIndex + 'images/earthcloudmap.jpg';

        var geometry	= new THREE.SphereGeometry(0.51, 32, 32)
        var material	= new THREE.MeshPhongMaterial({
            map		: new THREE.Texture(canvasResult),
            side		: THREE.DoubleSide,
            transparent	: true,
            opacity		: 0.8,
        })
        var mesh	= new THREE.Mesh(geometry, material)
        return mesh	
    }
};
