jQuery(document).ready(function($) {


  /* Initial events */
  displayCookieBanner()

  // Main nav menu events
  $('.menu-btn').on('click', function() {
    $('.menu-icon').toggleClass('active')
    $('.main-nav-wrap .menu-home-container .menu-item:first a:first').trigger(
      'mouseenter'
    )

    $('.main-nav-wrap').toggleClass('active')
    $('body').toggleClass('menu-on')
  })

  // Manage click/tap outside Menu to close.
  $(document).on('click', function(e) {
    var $menu = $('.main-nav-wrap')
    var $menuBtn = $('.menu-btn')

    // Event click/tap target is menu wrap or children from menu wrap?
    var tapOnMenu = $menu.is(e.target) || $menu.has(e.target).length !== 0
    // Tame as above but with menu button.
    var tapOnMenuBtn =
      $menuBtn.is(e.target) || $menuBtn.has(e.target).length !== 0

    if (!tapOnMenu && !tapOnMenuBtn) {
      $('.menu-icon').removeClass('active')
      $('.main-nav-wrap').removeClass('active')
      $('body').removeClass('menu-on')
    }
  })

  $('.menu-home-container .menu-item').on({
    mouseenter: function() {
      $('.menu-home-container li > a').removeClass('hover arrow')
      var $link = $(this).find('a')
      $link.addClass('hover')
      $('.sub-nav-child').removeClass('active')
      var activeMenuID = $(this)
        .attr('class')
        .match(/menu-item-(\d+)/)[1]
      // Check if submenu has items, then show sub-nav and arrow.
      var $subItemsCount = $('.sub-nav-child[data-id="' + activeMenuID + '"] .sub-nav__col a').length
      if ($subItemsCount) {
        $link.addClass('arrow')
        $('.sub-nav-child[data-id="' + activeMenuID + '"]').addClass('active')
      }
    }
  })

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      $('.menu-icon').removeClass('active')
      $('.main-nav-wrap').removeClass('active')
      $('body').removeClass('menu-on')
    }
  })

  // Custom hover effect in homepage
  $('.kb-block-category__show-link').hover(
    function() {
      var id = $(this).data('category-id')
      $('.kb-block-category__title[data-category-id="' + id + '"]').addClass(
        'hover'
      )
    },
    function() {
      var id = $(this).data('category-id')
      $('.kb-block-category__title[data-category-id="' + id + '"]').removeClass(
        'hover'
      )
    }
  )

  var options = {
    scriptUrl: '//' + window.disqusUsername + '.disqus.com/embed.js',
    laziness: 1,
    throttle: 500,
    disqusConfig: function() {
      this.page.url = window.disqusURL
      this.page.identifier = window.disqusURL
    }
  }
  $.disqusLoader('.disqus', options)
  // Equal heights for Pro/Con lists
  var $procons = $('.procon-col')
  var count = 1
  // For each pair of pro/cons, wrap the two lists in aa procon-wrap,
  // in order to use flexbox and force same heights
  for (var i = 0; i < $procons.length; i += 2) {
    var $wrap = jQuery('<div/>', { class: 'procon-wrap' })
    $procons[i].before($wrap[0])
    $wrap.append($procons[i])
    $wrap.append($procons[i + 1])
  }

  // Citations tooltips
  $('.tooltip').tooltipster({
    interactive: true,
    delay: 0,
    minWidth: 240,
    maxWidth: 360,
    animation: 'fade',
    animationDuration: 400,
    side: ['right', 'top', 'bottom', 'left'],
    theme: 'tooltipster-shadow',
    trigger: 'custom',
    triggerOpen: {
      mouseenter: false,
      click: true,
      tap: true
    },
    triggerClose: {
      mouseenter: false,
      click: true,
      scroll: true,
      tap: true
    }
  })

  $('.js-kb-cookie-accept').on('click', function () {
    $('.kb-cookie-banner').removeClass('active')
    setCookie('kb_cookie_banner', true, 365)
  })

  function displayCookieBanner () {
    if (document.cookie.indexOf('kb_cookie_banner') === -1) {
      $('.kb-cookie-banner').addClass('active')
    }
  }

  function setCookie (name, value, days) {
    var expires = ''
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  // article author/s
	// scroll reset to initial author display
	function scrollReset(){
		$(window).on("scroll", function(){
			$(".kb_pm_author.main-author .kb_pma_bio").slideDown(300);
			$(".kb_pm_extra_authors .kb_pma_bio").slideUp(300);
			$(".kb_pma_show").removeClass("active");
			$(".main-author .kb_pma_show").addClass("active");
			if ($(".kb_pm_authors_btn").length){
				$(".kb_pm_authorship .kb_pm_extra_authors").slideUp(300);
				$(".kb_pm_authorship .kb_pm_authors_btn").slideDown(300);
				$(".kb_pm_authorship .kb_pma_portrait.indicator").removeClass("active");
			}
		});
	}
	// author accordion
	var scrollReady = null;
	$(".kb_pma_show").on("click", function(){
		if ($(this).parent().siblings(".kb_pma_bio").is(":hidden")){
			$(".kb_pma_bio").slideUp(300);
			$(this).parent().siblings(".kb_pma_bio").slideDown(300);
			$(".kb_pma_show").removeClass("active");
			$(this).addClass("active");
		}
		clearTimeout(scrollReady);
		$(window).off("scroll");
		scrollReady = setTimeout(scrollReset, 3000);
	});
	// expand extra authors
	$(".kb_pm_authors_btn > div").on("click", function() {
		$(".kb_pma_portrait.indicator").addClass("active");
		$(".kb_pm_authors_btn").slideUp(300);
		$(".kb_pm_extra_authors").slideDown(300);
		clearTimeout(scrollReady);
		$(window).off("scroll");
		scrollReady = setTimeout(scrollReset, 3000);
	});

  // faq accordion
  $(".kb-about-faq:first-of-type").addClass("active");
  $(".kb-about-faq:first-of-type > .kb-about-faq-a").slideDown(300);
	$(".kb-about-faq-q").on("click", function() {
		if ($(this).parent().hasClass("active")) {
			$(this).parent().removeClass("active");
			$(this).siblings(".kb-about-faq-a").slideUp(300);
		} else {
			$(".kb-about-faq-q").parent().removeClass("active");
			$(this).parent().addClass("active");
			$(".kb-about-faq-a").slideUp(300);
			$(this).siblings(".kb-about-faq-a").slideDown(300);
		}
  });

  // expand extra posts at 404
	$(".load-more-404 > span").on("click", function() {
		$(this).slideUp(300);
		$(".extra-post-404").slideDown(300);
  });

  // move toc to sidebar in blank pages
  $('body.page #primary > #toc_container').appendTo( $('body.page #sidebar') );

  // expand extra writers, our team shortcode
	$('.load-more-writers').on('click', function() {
		$(this).slideUp(300);
    $(this).siblings('.kb-extra-writer').slideDown(300);
  });

  // remove auto p's and auto br's
  $( '.postgrid > p' ).remove();
  $( '.kb_product a:empty' ).remove();
  $( '.kb_aawp_image br' ).remove();
  $( '.kb_product_image br' ).remove();

  // clear sidebar attributes injected by google ads
  function clearsidebar(){
    $('aside').removeAttr('style');
	}
  var i = setInterval(clearsidebar,3000);
  setTimeout( function(){ clearInterval( i ); }, 12000);

  // initialize featured posts slick slider
  $('.posts-slider').slick({
    swipeToSlide: true,
    dots: false,
    arrows: true,
    prevArrow: '<div class="post_slider_arrow prev"><svg viewbox="0 0 16 16"><line x1="6" y1="8" x2="9" y2="5"/><line x1="6" y1="8" x2="9" y2="11"/></svg></div>',
    nextArrow: '<div class="post_slider_arrow next"><svg viewbox="0 0 16 16"><line x1="10" y1="8" x2="7" y2="5"/><line x1="10" y1="8" x2="7" y2="11"/></svg></div>',
    infinite: true,
    slidesToShow: 3,
    speed: 250,
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
    ]
  });
  $(window).on('resize orientationchange', function() {
    $('.posts-slider').slick('resize');
  });

  // initialize product grid slick slider
  $('.kb-product-slider').slick({
    swipeToSlide: true,
    dots: false,
    arrows: true,
    prevArrow: '<div class="product_grid_arrow prev"><svg viewbox="0 0 16 16"><line x1="6" y1="8" x2="9" y2="5"/><line x1="6" y1="8" x2="9" y2="11"/></svg></div>',
    nextArrow: '<div class="product_grid_arrow next"><svg viewbox="0 0 16 16"><line x1="10" y1="8" x2="7" y2="5"/><line x1="10" y1="8" x2="7" y2="11"/></svg></div>',
    infinite: true,
    slidesToShow: 3,
    speed: 250,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
        }
      }
    ]
  });
  // product grid figcaption height equilizer
  function calcHeight() {
    $('.kb-product-grid').each(function(){
      var maximum = null;
      $( $(this).find('figcaption') ).each(function(){
        var value = parseFloat( $(this).height() );
        maximum = (value > maximum) ? value : maximum;
      });
      $( $(this).find('figcaption') ).height(maximum);
    });
  }
  calcHeight();
  $(window).resize( function(){
    $('.kb-product-grid figcaption').height('auto');
    maximum = null;
    calcHeight();
  });

  // initialize product image slider
  $('.kb_product_image_slider figure').slick({
    swipeToSlide: true,
    dots: true,
    arrows: true,
    prevArrow: '<div class="product_slider_arrow prev"><svg><use xlink:href="#chevron" stroke-width="3"/></svg></div>',
    nextArrow: '<div class="product_slider_arrow next"><svg><use xlink:href="#chevron" stroke-width="3"/></svg></div>',
    fade: true,
    speed: 300,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          fade: false,
        }
      }
    ]
  });

  // footer categories accordion
	$('#all-categories .menu-item-has-children svg').on('click', function() {
		if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).siblings('.sub-menu').slideUp(200);
		} else {
			$('#all-categories .menu-item-has-children svg').removeClass('active');
			$('#all-categories .sub-menu').slideUp(200);
			$(this).addClass('active');
      $(this).siblings('.sub-menu').slideDown(200);
		}
  });

})
