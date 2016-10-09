/**
 * Scale fix for handling devices.
 */

var scaleFix = function() {
  var _initialize = function() {
    var metas = document.getElementsByTagName('meta');
    var i;

    var gestureStart = function() {
      for (i=0; i<metas.length; i++) {
        if (metas[i].name == "viewport") {
          metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
        }
      }
    }
    
    if (navigator.userAgent.match(/iPhone/i)) {
      for (i=0; i<metas.length; i++) {
        if (metas[i].name == "viewport") {
          metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
        }
      }
      document.addEventListener("gesturestart", gestureStart, false);
    }
  };
  
  return {
    initialize: _initialize
  };
};
