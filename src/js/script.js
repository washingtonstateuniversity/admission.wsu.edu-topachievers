( function( $, window ) {
	var check_sticky = function() {
		var $sticky_images = $( ".stick-image" );
		$sticky_images.each( function() {
			var $this = $( this );
			var dist = $this.offset().top - $( window ).scrollTop();

			if ( dist <= 0 && !$this.hasClass( "sticky" ) ) {
				$this.addClass( "sticky" );
			}

			if ( dist > 0 && $this.hasClass( "sticky" ) ) {
				$this.removeClass( "sticky" );
			}
		} );

		var $sticky_nav = $( ".stick-nav" );
		var sticky_nav_offset = $sticky_nav.offset().top;
		var sticky_nav_height = $sticky_nav.height();
		$sticky_nav.css( "height", sticky_nav_height );

		$sticky_nav.each( function() {
			var $this = $( this );
			var dist = sticky_nav_height - ( $( window ).scrollTop() - sticky_nav_offset );

			if ( dist <= 75 && !$this.hasClass( "sticky" ) ) {
				$this.addClass( "sticky" );
			}

			if ( dist > 75 && $this.hasClass( "sticky" ) ) {
				$this.removeClass( "sticky" );
			}
		} );
	};
	$( window ).on( "load scroll resize", check_sticky );
}( jQuery, window ) );

/** Super Simple Slider by @intllgnt **/
( function( $, window, document, undefined ) {

	$.fn.sss = function( options ) {

		var settings = $.extend( {
			slideShow: false,
			startOn: 0,
			speed: 3500,
			transition: 400,
			arrows: true
		}, options );

		return this.each( function() {

			var	wrapper = $( this ),
				slides = wrapper.children().wrapAll( "<div class='sss'/>" ).addClass( "ssslide" ),
				slider = wrapper.find( ".sss" ),
				slide_count = slides.length,
				transition = settings.transition,
				starting_slide = settings.startOn,
				target = starting_slide > slide_count - 1 ? 0 : starting_slide,
				animating = false,
				clicked,
				timer,
				key,
				prev,
				next,
				reset_timer = settings.slideShow ? function() {
					clearTimeout( timer );
					timer = setTimeout( next_slide, settings.speed );
				} : $.noop;

			function get_height( target ) {
				return ( ( slides.eq( target ).height() / slider.width() ) * 100 ) + "%";
			}

			function animate_slide( target ) {
				if ( !animating ) {
					animating = true;
					var target_slide = slides.eq( target );

					target_slide.fadeIn( transition );
					slides.not( target_slide ).fadeOut( transition );

					slider.animate( { paddingBottom: get_height( target ) }, transition, function() {
						animating = false;
					} );

					reset_timer();

				}
			}

			function next_slide() {
				target = target === slide_count - 1 ? 0 : target + 1;
				animate_slide( target );
			}

			function prev_slide() {
				target = target === 0 ? slide_count - 1 : target - 1;
				animate_slide( target );
			}

			if ( settings.arrows ) {
				slider.append( "<div class='sssprev'/>", "<div class='sssnext'/>" );
			}

			next = slider.find( ".sssnext" );
			prev = slider.find( ".sssprev" );

			$( window ).load( function() {

				slider.css( { paddingBottom: get_height( target ) } ).click( function( e ) {
					clicked = $( e.target );
					if ( clicked.is( next ) ) {
						next_slide();
					} else if ( clicked.is( prev ) ) {
						prev_slide();
					}
				} );

				animate_slide( target );

				$( document ).keydown( function( e ) {
					key = e.keyCode;
					if ( key === 39 ) {
						next_slide();
					} else if ( key === 37 ) {
						prev_slide();
					}
				} );
			} );
		} );

	};
} )( jQuery, window, document );

jQuery( function( $ ) {
	$( ".camp-slider" ).sss();
} );

jQuery( function( $ ) {
	$( ".nav-block" ).on( "click", "a", function( e ) {
	    e.preventDefault();

	    $( "body, html" ).animate( {
	        scrollTop: $( $( this ).attr( "href" ) ).offset().top
	    }, 750 );
	} );
} );

( function( $ ) {
	"use strict";

	$( document ).ready( function() {
		var $js_accordion = $( ".js-accordion" );

		// In any element with the .js-accordion class, add the aria-controls attribute to all h3 tags.
		// Add a corresponding id to any div immediately following an h3, and hide the div.
		$js_accordion.find( "h3" ).each( function( index ) {
			var content_id = "accordion-content-" + index;

			$( this ).attr( "aria-controls", content_id ).attr( "aria-expanded", "false" ).
			next( "div" ).attr( "id", content_id ).attr( "aria-hidden", "true" ).hide();
		} );

		// When an h3 is clicked, toggle the visibility of the div immediately following it.
		$js_accordion.on( "click", "h3", function() {
			if ( "false" === $( this ).attr( "aria-expanded" ) ) {
				$( this ).attr( "aria-expanded", "true" ).
				next( "div" ).attr( "aria-hidden", "false" ).slideDown( "fast" );
			} else {
				$( this ).attr( "aria-expanded", "false" ).
				next( "div" ).attr( "aria-hidden", "true" ).slideUp( "fast" );
			}
		} );
	} );
}( jQuery ) );
