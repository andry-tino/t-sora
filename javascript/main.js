/**
 * Initializing all logic in the page.
 */

var main = function() {
  var _loadPage = function(url) {
    sideManager().loadPage(url, function(e) {
      // Argument `e` contains fetched data
      // Placing content
      sideContent.innerHTML = e.content;
      
      // Causing the page to scroll up
      document.body.scrollTop = 0;
    });
  };
  
  var _isPostPage = function(url) {
    var re = /post\//;
    return url.match(re) !== null;
  };
  
  var _initializeScaleFix = function() {
    scaleFix().initialize();
  };
  
  var _initializeNavigation = function() {
    var sideContent = document.getElementById('sideContent');
    
    /* Place a handler in the body to process a click on anchors. 
    If the anchor has a data-href defined, then go to that link 
    in the side-content! */
    window.addEventListener('click', function(e) {
      var target = e.target;
      if (target.tagName.toLowerCase() !== 'a') return;
      
      var href = target.getAttribute('href');
      if (!href) return;
      if (!_isPostPage(href)) return;
      
      e.preventDefault();
      e.stopPropagation();
      
       _loadPage(href);
    });
  };
  
  var _initialize = function() {
    _initializeScaleFix();
    _initializeNavigation();
  };
  
  return {
    initialize: _initialize
  };
};

// Initializing
(function() {
  window.addEventListener('load', function(e) {
    main().initialize();
  });
})();
