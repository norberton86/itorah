;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		$doc.mouseup(function(e) {
		    var container = $('.dropdown');

		    // if the target of the click isn't the container nor a descendant of the container
		    if (!container.is(e.target) && container.has(e.target).length === 0){
		        container.hide().removeClass('shown');
		    }
		});

		var executeFunctions = function() {
			$('#ballon .slider-profiles .slides').slick({
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
			      }]
			});
		}

        $('.link-donate').on('click', function(e) {
			e.preventDefault();
			
			var currentHref = $(this).attr('href');
			
			$(currentHref).toggleClass('shown');
		})
		
		$('.donate .link-close').on('click', function() {
			$(this).closest('.donate').toggleClass('shown');
		})

		$( ".wrapper" ).delegate( ".select-speakers select", "change", function() {
		   // $('.tile-box-tab').removeClass('current'); //original

		   //  var $tabTarget = $(this).val()

		     //$($tabTarget).addClass('current');  //original  
           //-----------------------------------------------------------------------------------
		    /* if($tabTarget=="#tile-tab-1")
			 {
				 $('#ballon .current').html($('app-speaker #tile-tab-1').html());
			 }
			 else
			 if($tabTarget=="#tile-tab-2")
			 {
				 $('#ballon .current').html($('app-speaker #tile-tab-2').html());
			 }
			 else
			 {
				$('#ballon .current').html($('app-speaker #tile-tab-3').html()); 
			 }*/
		});

		// This class will be added to active tab link
		// and the content container
	   var activeTabClass = 'current';

	   $('.wrapper').on( 'click', '.tabs-nav a', function(event) {
	       var $tabLink = $(this);
	       var $targetTab = $($tabLink.attr('href'));

	       $tabLink
	           .parent() // go up to the <li> element
	           .add($targetTab)
	           .addClass(activeTabClass)
	               .siblings()
	               .removeClass(activeTabClass);

	      if ( $(this).parents('#ballon') ) {
	      		var tabHeight = $(this).closest('.tabs').height();

	      		$(this).parents('#ballon').css({ height: tabHeight + 8 })

	      		$('.tile-col').isotope({ sortBy: 'sorting' });
	      };

	      event.preventDefault();
	   });

		$('.btn-menu').on('click', function(event){
			event.preventDefault();

			$(this).toggleClass('open');

			$('.nav').toggleClass('visible');
		});

		var $grid = $('.tiles');

		$grid.isotope({
			layoutMode: 'packery',
			getSortData : {
			  sorting : function ( elem ) {
				var sortnum = $(elem).find('.sorting').text();
				var parse = parseInt(sortnum, 10);
				return parse;
			  },
			  resorting : function ( elem ) {
				var sortnum = $(elem).find('.resorting').text();
				var parse = parseInt(sortnum, 10);
				return parse;
			  }
			},
		})

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

		$('.tile-actions a[data-size="full"]').on('click', function(e) {
			e.preventDefault();

			var el = $(this);
			var thisDataId = $(this).closest('.tile').attr('id');
			var thisHref = $(this).attr('href');

			if ( $('.tile-col').length ) {
				$('.tile-col').isotope('destroy');
				$('.tile-col').contents().unwrap();

				$('.tile').removeClass('tiled')

				$('.tiles').isotope({
					layoutMode: 'packery',
					getSortData : {
					  sorting : function ( elem ) {
						var sortnum = $(elem).find('.sorting').text();
						var parse = parseInt(sortnum, 10);
						return parse;
					  },
					  resorting : function ( elem ) {
						var sortnum = $(elem).find('.resorting').text();
						var parse = parseInt(sortnum, 10);
						return parse;
					  }
					}
				})

			$('.tiles').isotope({ sortBy: 'sorting' });
				setTimeout(function() {
					if ( !$('#ballon').length ) {
						$(this).addClass('ballon-opened');

						open_ballon(this.id, thisDataId, el, thisHref);
					};
				}, 400)
			};

			if ( !$(this).hasClass('ballon-opened') ) {
				$('.ballon').remove();

				$('a').removeClass('ballon-opened');
				$(this).addClass('ballon-opened');

				open_ballon(this.id, thisDataId, el, thisHref);

			} else {
				$(this).removeClass('ballon-opened');

				close_ballon()

			}
		});

		$('.tile-actions a[data-size="half"]').on('click', function(e) {
			e.preventDefault();

			var el = $(this);
			var thisDataId = $(this).closest('.tile').attr('id');
			var thisHref = $(this).attr('href');

			if ( !$(this).hasClass('ballon-opened') ) {
				$('.ballon').remove();

				$('a').removeClass('ballon-opened');
				$(this).addClass('ballon-opened');

				open_ballon_half(this.id, thisDataId, el, thisHref);

			} else {
				$(this).removeClass('ballon-opened');

				close_ballon_half()
			}
		});

		$('.wrapper').on('click','.link-close', function(e) {
			e.preventDefault();

			$('.ballon-opened').removeClass('ballon-opened');

			close_ballon()


		})

		$('.wrapper').on('click','.link-close-half', function(e) {
			e.preventDefault();

			$('[href="#item-content-7"]').removeClass('ballon-opened');

			close_ballon_half()


		})

		function showArrow(elLeft, elTop, elWidth) {
			var arrowTop = elTop;
			var arrowLeft = elLeft;
			var moveTop = 12;
			var moveLeft = elWidth/2

			$('.ico-ballon-arrow')
				.addClass('ico-ballon-arrow-shown')
				.css({
					left : arrowLeft + moveLeft,
					top : arrowTop - moveTop,
					marginLeft : -7
				})
		}

		function hideArrow() {
			$('.ico-ballon-arrow').removeClass('ico-ballon-arrow-shown')
		}

		function open_ballon(id, dataId, el, elHref) {
			var thisEl = el
			var elem = $('#'+id);
			var currentDataId = dataId;
			var elemHref = elHref;

			var main_width = $('.main').width();
			var num = 4;

			var colore = "";
			var $htmlcontents = $(elemHref).children().clone(true);
			var sorting = 0;
			var isoElems = $grid.isotope('getItemElements');

			sorting = parseInt(thisEl.closest('.tile').find('.sorting').text()) + 0.5;

			if (thisEl.closest('.tile').prev().hasClass('tile-high') && $win.width() >= 1024) {
				sorting = sorting - 2;
			}

			var $ballonEl = $('<div id="ballon" data-item-id="'+ id + '" class="tile ballon">');
			var $sorting = $('<p class="sorting">'+sorting+'</p></div>');
			var body_pos =	$('#top').offset();
			var ballonHeight = $(elemHref).outerHeight();

			$ballonEl.append($htmlcontents).append($sorting);

			$grid.append( $ballonEl ).isotope('appended', $ballonEl);

			$('#ballon').css({
				height : ballonHeight
			});

			$grid.isotope({ sortBy: 'sorting' });

			setTimeout(function  () {
				var ballonTop = 0;
					ballonTop = $('#ballon').offset().top

				showArrow(thisEl.offset().left, ballonTop, thisEl.outerWidth())

				executeFunctions()
			}, 500)
		}

		function open_ballon_half(id, dataId, el, elHref) {
			var thisEl = el
			var elem = $('#'+id);
			var currentDataId = dataId;
			var elemHref = elHref;

			var main_width = $('.main').width();

			var num = 4;

			if ( !$('.tile-col').length ) {
				$('.tile').each(function() {
					var currentLeft =  $(this).position().left

					$(this).attr('data-left', currentLeft)
				});

				$grid.isotope('destroy');

				var tilesWidth = $('.tiles').width();

				$('.tile').removeClass('tiled')
				var $tileLeft = $(".tile").filter(function() {
							   return $(this).attr('data-left') >= tilesWidth/2 - 10;
						   });
				$tileLeft.addClass('tiled').wrapAll('<div class="tile-col">');

				$('.tile:not(.tiled)').wrapAll('<div class="tile-col">')

				$gridCol = $('.tile-col')

				$gridCol.isotope({
					// percentPosition: true,
					layoutMode: 'packery',
					getSortData : {
					  sorting : function ( elem ) {
						var sortnum = $(elem).find('.sorting').text();
						var parse = parseInt(sortnum, 10);
						return parse;
					  },
					  resorting : function ( elem ) {
						var sortnum = $(elem).find('.resorting').text();
						var parse = parseInt(sortnum, 10);
						return parse;
					  }
					},
				})
			};

			var $htmlcontents = $(elemHref).children().clone(true);
			var sorting = 0;
			var isoElems = $gridCol.isotope('getItemElements');

			sorting = parseInt(thisEl.closest('.tile').find('.sorting').text()) + 0.5;

			if (thisEl.closest('.tile').prev().hasClass('tile-high') && $win.width() >= 1024) {
				sorting = sorting - 2;
			}

			var $ballonEl = $('<div id="ballon" data-item-id="'+ id + '" class="tile ballon ballon-half">');
			var $sorting = $('<p class="sorting">'+sorting+'</p></div>');

			$ballonEl.append($htmlcontents).append($sorting);

			var body_pos = $('#top').offset();

			var ballonHeight = $(elemHref).outerHeight();

			var currentGrid = thisEl.closest('.tile-col')

			currentGrid.append( $ballonEl ).isotope('appended', $ballonEl);

			$('#ballon').css({
				height : ballonHeight
			});

			$gridCol.isotope({ sortBy: 'sorting' });

			setTimeout(function  () {
				var ballonTop = 0;
					ballonTop = $('#ballon').offset().top

				showArrow(thisEl.offset().left, ballonTop, thisEl.outerWidth())

				executeFunctions()
			}, 500)
		}

		function close_ballon() {
			$('.tile').removeClass('tiled')

			$('#ballon').remove();

			hideArrow();

			$grid.isotope({ sortBy: 'sorting' });
		}

		function close_ballon_half() {
			$('.tile').removeClass('tiled')

			$('#ballon').remove();

			hideArrow();
						
			$gridCol = $('.tile-col')
			
			if ( $gridCol.length ) {
				$gridCol.isotope({ sortBy: 'sorting' }); 
			};		
		}

		window.mobileAndTabletcheck = function() {
		  var check = false;
		  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		  return check;
		};


		if (!window.mobileAndTabletcheck()) {
			$win.on('resize', function() {
				close_ballon()
				close_ballon_half()
			})
		};

	});

})($, window, document);
