(function($){
   	
   	/* 
    * Preloader 
    */	 
   	$(window).load(function() { 
       	$('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow'); 
        $('body').delay(350).css({'overflow':'visible'});
        $('#countdown').addClass('animated bounceInDown');
    }); 

	$(document).ready(function() {

		/* 
        * Animation scroll
        */
		$('a[href*=#]').bind('click', function(e) {
			var anchor = $(this);

			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 500);
			e.preventDefault();
		});

        /*
        * Background slideshow
        */
        $.backstretch('assets/images/bg6.jpg');

		/* 
        * Countdown
        */
		$('#countdown').countdown('2015/01/01', function(event) {	// your date here 
        	$(this).html(event.strftime(''
                + '<div><div>%D</div><i>Days</i></div>' 
                + '<div><div>%H</div><i>Hours</i></div>'
                + '<div><div>%M</div><i>Minutes</i></div>'
                + '<div><div>%S</div><i>Seconds</i></div>'
        	));
    	});

        /*  
        * A jQuery plugin for fluid width video embeds
        */
        $(".video").fitVids();

        /*
        * Reveal Animations When You Scroll
        */
        new WOW().init();

        /*
        * Google Map
        */
        map = new GMaps({
            el: '#map',
            scrollwheel: false,
            disableDefaultUI: true,
            lat: -12.043333,
            lng: -77.028333,
            styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]

        });

        map.addMarker({
            lat: -12.044333,
            lng: -77.028333,
            title: 'We are here',
            infoWindow: {
                content: '<p><strong>We are here</strong><br/>Welcome</p>'
            }
        });

	});

})(jQuery);
