/**
 * utils.js
 * Andrea Tino - 2016
 */

var sora = sora || {};

sora.utils = {
    /**
     * Creates the mesh for the cloud.
     * @param cloudMapTransImageName {string} The relative image path to the trans map image.
     * @param cloudMapImageName {string} The relative image path to the map image.
     * @return {THREE.Mesh} The THREE Mesh object for the cloud.
     */
    createCloudMesh: function (cloudMapTransImageName, cloudMapImageName) {
        // Create destination canvas
        var canvasResult = document.createElement("canvas");
        canvasResult.width = 1024;
        canvasResult.height = 512;
        var contextResult = canvasResult.getContext("2d");

        // Load the Earth cloud map
        var imageMap = new Image();
        imageMap.addEventListener("load", function () {
            // Create dataMap ImageData for earthcloudmap
            var canvasMap = document.createElement("canvas");
            canvasMap.width = imageMap.width;
            canvasMap.height = imageMap.height;
            var contextMap = canvasMap.getContext("2d");
            contextMap.drawImage(imageMap, 0, 0);
            var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

            // Load earthcloudmaptrans
            var imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // Create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans = document.createElement("canvas");
                canvasTrans.width = imageTrans.width;
                canvasTrans.height = imageTrans.height;
                var contextTrans = canvasTrans.getContext("2d");
                contextTrans.drawImage(imageTrans, 0, 0);
                var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);

                // merge dataMap + dataTrans into dataResult
                var dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height);
                for (var y = 0, offset = 0; y < imageMap.height; y++) {
                    for (var x = 0; x < imageMap.width; x++ , offset += 4) {
                        dataResult.data[offset + 0] = dataMap.data[offset + 0];
                        dataResult.data[offset + 1] = dataMap.data[offset + 1];
                        dataResult.data[offset + 2] = dataMap.data[offset + 2];
                        dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0];
                    }
                }

                // Update texture with result
                contextResult.putImageData(dataResult, 0, 0);
                material.map.needsUpdate = true;
            });

            imageTrans.src = cloudMapTransImageName;
        }, false);

        imageMap.src = cloudMapImageName;

        // Creating the spherre geometry
        var geometry = new THREE.SphereGeometry(0.51, 32, 32); /* (radius, segmentWidth, segmentHeight) */
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8 /* 0..1 - 0 = invisible, 1 = fully visible */
        });

        var mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }
};
