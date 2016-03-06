/**
 * Comment below is eslint related and overwrites
 * default values of the definitions in `.eslintrc`
 * to supress warnings on undefined variables and such
 * in dev mode.
 *
 * Accordingly the values should be set to `true`
 * on code cleanup as they are useful for spotting leaks
 * and mistyped variables.
 */

/*eslint-disable no-undef */


var App = (function() {

  'use strict';

  // Private variables and methods
  // var _privateMethod = function() {};

  // Public variables and methods
  // var publicMethod = function() {};

  var init = function() {

    // FastClick initialisation
    FastClick.attach(document.body);

    // svg4everybody initialisation
    svg4everybody();

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

  // Init smooth scrolling
  $('a').smoothScroll({
    speed: 500
  });


  // Init fluidbox
  $('a[rel="fluidbox"]').fluidbox({
    immediateOpen: true
  })
  .one('openstart', function() {
    $(this).find('.fluidbox-ghost')
    .append('<div class="is-loading-fluidbox"><div class="progress progress--large"></div></div>');
  })
  .on('imageloaddone', function() {
    $(this).find('.is-loading-fluidbox').remove();
  });


  // Init carousel demo
  $('.owl-carousel').owlCarousel({
    itemsCustom: [
      [0, 2],
      [450, 4],
      [600, 7],
      [700, 9],
      [1000, 10],
      [1200, 12],
      [1400, 13],
      [1600, 15]
    ],
    navigation: true
  });


  // Init carousel demo 2
  $('.owl-carousel-single').owlCarousel({
    navigation: true, // Show next and prev buttons
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    autoHeight: true
  });


  // Formular Validation
  $('#guestbook-form').validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      mesg: "required"
    },
    messages: {
      name: {
        required: "Bitte tragen Sie Ihren Namen ein"
      },
      email: {
        required: "Bitte geben Sie Ihre E-Mail Adresse an",
        email: "Sicher, dass die E-Mail Adresse richtig geschrieben ist?"
      },
      mesg: {
        required: "Ein Gästebucheintrag ohne Nachricht...? ;-)"
      }
    }
  });


});
