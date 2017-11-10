;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
				// $('.VirtualKeyboardHolder').each(function () {
		// 	var $keyboard = $(this);
		// 	var $input = $keyboard.prev();
		// 	VirtualKeyboard.toggle( $input.attr('id'), $keyboard.attr('id'));
		// })

		$doc.mouseup(function(e) {
		    var container = $('.dropdown');

		    // if the target of the click isn't the container nor a descendant of the container
		    if (!container.is(e.target) && container.has(e.target).length === 0){
		        container.hide().removeClass('shown');
		    }
		});
        
		$('.tile-actions a:not(.popup-toggle)').each(function () {
			ballonPosition($(this))
		})

		$('.tile-actions a:not(.popup-toggle)').each(function () {
			var $ballon = $($(this).attr('href'));
			var size = $(this).data('size');

			$ballon.addClass( 'tile-' + size );
		})

		var executeFunctions = function() {
			$('.ballon .slider-profiles .slides').slick({
		       dots: false,
		       arrows: true,
		       slidesToShow: 6,
			   slidesToScroll: 1,
			   responsive: [
			      {
			        breakpoint: 1624,
			        settings: {
			          slidesToShow: 5
			        }
			      },
			      {
			        breakpoint: 1424,
			        settings: {
			          slidesToShow: 4,
			        }
			      },
			      {
			        breakpoint: 1224,
			        settings: {
			          slidesToShow: 3
			        }
			      },
			      {
			        breakpoint: 1024,
			        settings: {
			          slidesToShow: 2
			        }
			      },
			      {
			        breakpoint: 678,
			        settings: {
			          slidesToShow: 1
			        }
			      }
				]
			});
		}

       		$('.sponsor-toggle input').on('click', function(e){
			var $input = $(this);
			var id = '#' + $input.attr('name');

			$input
				.closest('li')
					.siblings()
					.find('input')
					.prop( "checked", false )

			$(id)
			.add($('.form-sponsor[data-related="'+ id +'"]'))
				.toggleClass('hidden')
					.siblings('.form-sponsor:not(.form-placeholder)')
					.addClass('hidden')

			if ( $('.form-placeholder ~ .form-sponsor:not(.hidden)').length == 0 ) {
				$('.form-placeholder').show()
			} else {
				$('.form-placeholder').hide()
			}
		})

		$('.btn-make-dedication:not(.link-popup), .btn-toggle').on('click', function(e){
			e.preventDefault()
			var id = $(this).attr('href');

			$(id)
				.removeClass('hidden')
					.siblings('.popup-body')
					.addClass('hidden')
		})


		$('.btn-status').on('click', function(e){
			e.preventDefault()
			var $btn = $(this);

			$btn.addClass('in-progress')

			setTimeout(function () {
				$btn
					.removeClass('in-progress')
					.addClass('completed')
			}, 500)
		})

		$('.next-step').on('click', function(e){
			e.preventDefault()

			$(this).closest('.col-1of3').next('.col-1of3').find('.form-sponsor').removeClass('dissabled')
		})



		$('.link-popup a, a.link-popup, input.link-close').on('click', function(e) {
			e.preventDefault();

			var currentHref = $(this).attr('href');
			if ( $(this).hasClass('link-close') ) {
				var currentHref = '#' + $(this).attr('name');
			}

			var $keyboard = $(currentHref).find('.VirtualKeyboardHolder');
			var $input = $keyboard.prev();
			VirtualKeyboard.toggle( $input.attr('id'), $keyboard.attr('id'));

			$('.nav.visible').removeClass('visible');
			$('.btn-menu').removeClass('open');
			$('.popup').removeClass('shown');
			$(currentHref).toggleClass('shown');

			setTimeout(function () {
				$('html,body').animate({
					 scrollTop: 0 //Scroll to position
				}, 1000);
			}, 250)
		})

		$('.popup .link-close').on('click', function() {
			$(this).closest('.popup').removeClass('shown');
		})

		$( ".wrapper" ).delegate( ".select-speakers select", "change", function() {
		   /*var $tabTarget = $(this).val()

			$('.ballon .slider-profiles').css('opacity', 0)
			$('.tile-box-tab').removeClass('current');

			$($tabTarget).addClass('current');

			setTimeout(function () {
				$('.ballon .slider-profiles .slides').slick('unslick');

				setTimeout(function () {
					executeFunctions();
					$('.ballon .slider-profiles').css('opacity', 1)
				},500)
			},500)*/
		});

		// This class will be added to active tab link
		// and the content container
	   var activeTabClass = 'current';

	   $('.wrapper').on( 'click', '.tabs-nav a', function(event) {
	       var $tabLink = $(this);
	       var $targetTab = $($tabLink.attr('href'));
           var $tileId = $(this).closest('.tile').attr('id');
		   var $tile = $('a[href^="#' + $tileId + '"]').closest('.tile');

		   console.log($tile)

	       $tabLink
	           .parent() // go up to the <li> element
	           .add($targetTab)
	           .addClass(activeTabClass)
	               .siblings()
	               .removeClass(activeTabClass);

	      if ( $(this).parents('.ballon') ) {
		  		var tabHeight = $(this).closest('.tabs').height();

		  		$(this).parents('.ballon:not(.tile-search)').css({ height: tabHeight + 8 })

		  };

          relayout($tile);  
	      
		  event.preventDefault();
	   });

		$('.btn-menu').on('click', function(event){
			event.preventDefault();

			$(this).toggleClass('open');

			$('.nav').toggleClass('visible');
		});

		$('.wrapper').on('click', '.link-star', function(e) {
			e.preventDefault();
			$(this).toggleClass('link-star-active')
		})

		$('.nav-utilities > li > a, .nav-access > li > a').on('click', function(e) {
			e.preventDefault();

			var $thisDropdown = $(this).closest('li').find('.dropdown');

			if ( !$thisDropdown.hasClass('shown') ) {
				$(this).closest('.nav-utilities').find('.dropdown').hide().removeClass('shown');

				$thisDropdown
					.addClass('shown')
					.show()
			} else {
				$thisDropdown
					.hide()
					.removeClass('shown')
			}
		})

		$('.tile-actions a:not(.popup-toggle)').on('click', function (e) {
			e.preventDefault();
			// ballonPosition($(this))

			var $tile = $(this).closest('.tile');

			$('.ballon:not(' + $(this).attr('href') + ')').removeClass('vissible');
			$($(this).attr('href')).toggleClass('vissible');

			setTimeout(function () {
				$('.ballon.visible .slider-profiles .slides').slick('unslick');
				setTimeout(function () {
					try{executeFunctions();}catch(error){console.log(error.message)}
				},500)
			},500)

			relayout($tile);
		})

		$('.wrapper').on('click','.link-close, .link-close-half', function(e) {
			e.preventDefault();
			$('.ballon').removeClass('vissible');
			$('.tile').css('margin-bottom', 7)
		})

		window.mobileAndTabletcheck = function() {
		  var check = false;
		  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		  return check;
		};


		if (!window.mobileAndTabletcheck()) {
			$win.on('resize', function() {
				// close_ballon();
			})
		};

			$win.on('resize', function () {
			if ( $('.ballon.vissible') ) {
				var id = $('.ballon.vissible').attr('id');
				var $tile = $('a[href="#' + id + '"]').closest('.tile')
				$('.ballon.vissible').addClass('animate')

				$('.tile-actions a:not(.popup-toggle)').each(function () {
					ballonPosition($(this))
				})

				setTimeout(function () {
					// $('.ballon.vissible')
					// 	.css('top', $tile.position().top + $tile.outerHeight())
						setTimeout(function () {
							$('.ballon.vissible').removeClass('animate')
						}, 500)
				}, 500)
			}
		})

	});

	var relayout = function ($tile) {
		var timesRun = 0;

		var interval = setInterval(function(){
		    timesRun += 1;
		    if(timesRun === 5){
		        clearInterval(interval);
		    }

		    if ( $('.tile.vissible').length ) {
		    	var tileHeight = $('.tile.vissible').outerHeight() + 14;
		    } else {
		    	var tileHeight = 7;
		    }

		    $tile
		    	.css('margin-bottom', tileHeight)
		    	.siblings('.tile')
		    		.css('margin-bottom', 7)
		}, 100);
	}

	var ballonPosition = function ($this) {
		var $el = $this;
		var $elParent = $el.closest('.tile');
		var $ballon = $($el.attr('href'));

		$ballon.css({
			top: $elParent.position().top + $elParent.height(),
			left: calcLeft($el)
		})

		function calcLeft($el) {
			if ( $el.data('size') === "half" && $el.closest('.tile').offset().left >= $win.width()/2 ) {
				return '50%';
			} else {
				return '0';
			}
		}
	}

})($, window, document);
