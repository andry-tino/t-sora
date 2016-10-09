/**
 * Responsible for loading articles in the side area.
 */

var sideManager = function() {
  var _status = {
    OK: 0,
    ERROR: 1
  };
  
  /**
   * Triggers the load of a page.
   * 
   * url [string]: The URL to open.
   * callback [(e) => string]: A function which is called once the loading is completed. The argument will contain the fetched page as a string. 
   */
  var _loadPage = function(url, callback) {
    if (!url) throw 'Parameter `url` cannot be null';
    if (!callback) throw 'Parameter `callback` cannot be null';
    
    var req = new XMLHttpRequest();
    req.addEventListener('load', function(e) {
      callback(
        { 
          status: _status.OK, 
          content: req.responseText
        }
      );
    });
    req.addEventListener('error', function(e) {
      callback(
        { 
          status: _status.ERROR, 
          content: 'An error occurred!' 
        }
      );
    });
    req.addEventListener('abort', function(e) {
      callback(
        { 
          status: _status.ERROR, 
          content: 'Aborted!' 
        }
      );
    });
    req.open('GET', url, true);
    req.send();
  };
  
  return {
    STATUS: _status,
    loadPage: _loadPage
  }
};
