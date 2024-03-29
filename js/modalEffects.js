/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );

			function removeModal() {
        $(modal).removeClass('md-show');
			}

			function removeModalHandler() {
				removeModal(); 
			}

			el.addEventListener( 'click', function( ev ) {
        $(modal).addClass('md-show');
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

        ev.preventDefault();
        return false;
			});

      if(close) {
        close.addEventListener( 'click', function( ev ) {
          ev.stopPropagation();
          removeModalHandler();

          ev.preventDefault();
          return false;
        });
      }

		} );

	}

	init();

})();
