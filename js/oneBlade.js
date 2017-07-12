"use strict";

$(document).ready(function() {

	$.fn.dataImg = function(options) {

		var settings = $.extend({
			xsml: 450,
			sml: 701,
			med: 961
		}, options);

		var elements = $(this);
		var getHeight;

		function getSrc(element) {
			var screen = $(window).width();
			if (screen >= settings.med) {
				getHeight = 'lrg';
				return element.data('lrg');
			} else if (screen <= settings.med && screen > settings.sml) {
				getHeight = 'med';
				return element.data('med');
			} else if (screen <= settings.sml && screen > settings.xsml) {
				getHeight = 'sml';
				return element.data('sml');
			} else {
				getHeight = 'xsml';
				return element.data('xsml');
			}
		}

		function breakpoints() {
			elements.each(function() {
				var e = $(this);
				var src = getSrc(e);
				var customHeight = $(this).attr("data-customheight") ? JSON.parse($(this).attr("data-customheight").replace(/'/g, '"')) : {};
				if (src != undefined) {
					if (e.is('img')) {
						e.attr('src', src);
					} else {
						e.css('background-image', 'url(' + src + ')');
						e.css('min-height', ''+ customHeight[getHeight] +'');
					}
				}
			});
		}
		breakpoints();

		if (settings.resize == true) {
			$(window).resize(function() {
				breakpoints();
			});
		}
	};

	$('.data-img').dataImg({
		resize: true
	});

	$(".video-img").click(function() {
		$('.video-img').hide();
		$('.video-close').show();
		$('.play').hide();
		$('.video').html('<iframe width="939" height="528" id="ytvideo" frameborder="0" allowfullscreen src="http://www.youtube.com/embed/'+$(this).attr("data-vidid")+'?autoplay=1"></iframe>').show();
	});

	$(".play").click(function() {
		$('.video-img').hide();
		$('.video-close').show();
		$('.play').hide();
		$('.video').html('<iframe width="939" height="528" id="ytvideo" frameborder="0" allowfullscreen src="http://www.youtube.com/embed/'+$(".video-img").attr("data-vidid")+'?autoplay=1"></iframe>').show();
	});


	$('.video-close').click(function(){
		$('.video-img').show();
		$('.video-close').hide();
		// $('.video').hide();
		$('.play').show();
		$('.video').html('<iframe width="939" height="528" id="ytvideo" frameborder="0" allowfullscreen src="http://www.youtube.com/embed/'+$(this).attr("data-vidid")+'?autoplay=1"></iframe>').hide();
	});

	$('.small-video').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		'titleShow' : 'true',
		'titlePostition': 'outside',
		helpers : {
			media : {}
		}
	});

	$(".content").fancybox({
		'titlePosition' : 'inside',
		'transitionIn' : 'none',
		'transitionOut' : 'none',
		'titleShow' : 'true',
		'titlePostition': 'outside'
	});

	$('.slider').owlCarousel({
		loop: true,
		items: 1,
		center: true,
		margin: 0,
        nav: true,
        dots: true,
		//autoWidth: true,
		autoHeight: true,
		autoplay: true,
		autoplayTimeout: 10000
	});
});