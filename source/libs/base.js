/**
 * Comments below are jshint related and overwrites
 * default values of the definitions in `.jshintrc`
 * to supress warnings on undefined variables and such.
 *
 * Accordingly the values should be set to `true`
 * on code cleanup as they are useful for spotting leaking
 * and mistyped variables.
 */

// jshint undef:false
// jshint unused:false



App = (function() {

  'use strict';

  // Private variables and methods
  // var _privateMethod = function() {};

  // Public variables and methods
  // var publicMethod = function() {};

  var init = function() {

    // See FastClick bower plugin
    FastClick.attach(document.body);

    // Fluidvids initialisation
    // fluidvids.init({
    //   selector: 'iframe', // runs querySelectorAll()
    //   players: ['player.vimeo.com'] // players to support
    // });

  };

  // Public API
  return {

    init: init

  };

})();



/**
 * If DOM is ready...
 */

$(function() {

  'use strict';

  App.init();

});
