;(function( window ) {
    var wSettings = window.wSettings = {};

    /*==============================
     Smooth Scroll
     ==============================*/

    lp.jQuery(function( $ ) {

        // The speed of the scroll in milliseconds
        var speed = wSettings.scrollSpeed || 1000;

        // Find links that are #anchors and scroll to them
        $('a[href^=#]').not('.lp-pom-form .lp-pom-button').unbind('click.smoothScroll').bind('click.smoothScroll', function( event ) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, speed);
        });

    });

    /*==============================
     Retina Images
     ==============================*/

    $(function() {
        wSettings.retina = wSettings.retina || [];

        function getImageRatio() {
            var ratio = 'x1';
            if (window.matchMedia) {
                var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
                if (mq && mq.matches || (window.devicePixelRatio > 1)) {
                    if (window.devicePixelRatio == 3) {
                        ratio = 'x3';
                    } else {
                        ratio = 'x2';
                    }
                }
            }
            return ratio;
        }

        var ratio = getImageRatio();
        $.each(wSettings.retina, function( index, image ) {
            var $element = $(image.element);
            var $img = $element.find('img');
            $img.attr('src', image[ratio]);
            $img.on('load', function() {
                $img.attr('src', image[ratio]);
            });
        });
    });

    /*==============================
     Favicon
     ==============================*/

    $(function() {
        var fav = $("link[rel*='icon']"), url = wSettings.favicon || 'http://d9hhrg4mnvzow.cloudfront.net/www.clickhackers.com/megatemplate/54c527e6-favicon.png';

        if (fav.length) {
            // favicon exists
            fav.attr("href", url);
        } else {
            var link = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'icon';
            link.href = url;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    });

    /*==============================
     Sticky header
     ==============================*/
    (function() {
        function initStickyHeader() {
            if (!wSettings.header || !wSettings.header.element || !wSettings.header.headerElements)
                return;

            if (wSettings.header.sticky === 'no')
                return;

            var headerContainer = wSettings.header.element,
                headerElements = wSettings.header.headerElements,
                showAt = wSettings.header.triggerPoint || 200,
                isAlwaysVisible = wSettings.header.alwaysVisible === 'yes',
                $headerContainer = $(headerContainer),
                headerHeight = $headerContainer.outerHeight(),
                $win = $(window);

            $headerContainer.css({
                position: 'fixed',
                top     : 0,
                zIndex  : '999'
            });

            if (wSettings.header.dropShadow === 'yes') {
                $headerContainer.addClass('header-with-shadow')
            }

            $headerContainer.next().css({
                paddingTop: headerHeight
            });

            $.each(headerElements, function( index, element ) {
                var $element = $(element);
                $element.detach().appendTo($headerContainer.children('.lp-pom-block-content'));
            });

            if (!isAlwaysVisible) {
                $('body').css({
                    marginTop: headerHeight * -1
                });
                $headerContainer.css({
                    top     : headerHeight * -1
                });

                //$headerContainer.slideUp(0);

                $win.scroll(function() {
                    var top = $win.scrollTop();

                    if ($headerContainer.is(':animated')){
                        return;
                    }

                    if (top > showAt) {
                        if (!$headerContainer.hasClass('active')) {

                            $headerContainer.stop(false, true).animate({'top': 0}, 300, function() {
                                $(this).addClass('active');
                            });
                        }
                    } else {
                        if ($headerContainer.hasClass('active')) {

                            $headerContainer.stop(false, true).animate({'top': $headerContainer.outerHeight() * - 1}, 300, function() {
                                $(this).removeClass('active');
                            });
                        }
                    }
                }).trigger('scroll');
            }
        }

        jQuery(function( $ ) {
            initStickyHeader();

        });
    })();

    /*==============================
     Vertical Tabs
     ==============================*/

    $(function() {
        wSettings.verticalTabsButton = wSettings.verticalTabsButton || {};
        wSettings.verticalTabs = wSettings.verticalTabs || [];

        var vTabsButtonsCss = {
            normalState: {
                backgroundColor: wSettings.verticalTabsButton.normalState || '#a8a8a8'
            },
            activeState: {
                backgroundColor: wSettings.verticalTabsButton.activeState || '#434343'
            }
        };

        $.each(wSettings.verticalTabs, function( index, tab ) {
            var $button = $(tab.button);
            var $element = $(tab.element);

            $button.css({
                cursor: 'pointer'
            }).hover(function() {
                $button.css(vTabsButtonsCss.activeState);
            },function() {
                if (!$button.hasClass('active')) {
                    $button.css(vTabsButtonsCss.normalState);
                }
            }).on('click', function() {
                $.each(wSettings.verticalTabs, function( _index, _tab ) {
                    if (index !== _index) {
                        var $_element = $(_tab.element);
                        $_element.fadeOut();

                        var $_button = $(_tab.button);
                        $_button.removeClass('active').css(vTabsButtonsCss.normalState);
                    }
                });

                $button.addClass('active').css(vTabsButtonsCss.activeState);

                $element.fadeIn();
            })

            if (index === 0) {
                $button.trigger('click');
            }
        });
    });

    /*==============================
     Horizontal Tabs
     ==============================*/
    $(function() {
        wSettings.horisontalTabsButton = wSettings.horisontalTabsButton || {};
        wSettings.horisontalTabs = wSettings.horisontalTabs || [];

        var hTabsButtonsCss = {
            normalState: {
                backgroundColor: wSettings.horisontalTabsButton.normalState || '#a8a8a8'
            },
            activeState: {
                backgroundColor: wSettings.horisontalTabsButton.activeState || '#434343'
            }
        };

        $.each(wSettings.horisontalTabs, function( index, tab ) {
            var $button = $(tab.button);
            var $element = $(tab.element);

            $button.css({
                cursor: 'pointer'
            }).hover(function() {
                $button.css(hTabsButtonsCss.activeState);
            },function() {
                if (!$button.hasClass('active')) {
                    $button.css(hTabsButtonsCss.normalState);
                }
            }).on('click', function() {
                $.each(wSettings.horisontalTabs, function( _index, _tab ) {
                    if (index !== _index) {
                        var $_element = $(_tab.element);
                        $_element.fadeOut();

                        var $_button = $(_tab.button);
                        $_button.removeClass('active').css(hTabsButtonsCss.normalState);
                    }
                });

                $button.addClass('active').css(hTabsButtonsCss.activeState);

                $element.fadeIn();
            });

            if (index === 0) {
                $button.trigger('click');
            }
        });
    });

    /*==============================
     Countdown Timer
     ==============================*/
    jQuery(function( $ ) {
        if (!wSettings.timerElements || !wSettings.countdownTime)
            return;

        var $elements = {
            days   : $(wSettings.timerElements.days),
            hours  : $(wSettings.timerElements.hours),
            minutes: $(wSettings.timerElements.minutes),
            seconds: $(wSettings.timerElements.seconds)
        };

        if ($elements.days.children().length) {
            $elements.days = $elements.days.children();
            $elements.hours = $elements.hours.children();
            $elements.minutes = $elements.minutes.children();
            $elements.seconds = $elements.seconds.children();
        }

        var updateTime = function() {
            var now = new Date();
            if (wSettings.countdownTime.indexOf(' ') == -1) {
                var _date = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
                wSettings.countdownTime = _date + ' ' + wSettings.countdownTime;
            }
            var date = new Date(wSettings.countdownTime);
            var deltaDate = date - now;

            var aDay = 3600 * 24 * 1000;
            var anHour = 3600 * 1000;
            var aMinute = 60 * 1000;
            var aSecond = 1000;
            var deltaDays = Math.floor(deltaDate / aDay);

            //var timeArr = [];
            if (deltaDays < 0) {
                //$p.html(overdueMessage);
            } else {
                var deltaHours = Math.floor((deltaDate - (deltaDays * aDay)) / anHour);
                var deltaMinutes = Math.floor((deltaDate - (deltaDays * aDay) - (deltaHours * anHour)) / aMinute);
                var deltaSeconds = Math.floor((deltaDate - (deltaDays * aDay) - (deltaHours * anHour) - (deltaMinutes * aMinute)) / aSecond);
                /*if (deltaDays > 0) {
                 timeArr.push(deltaDays + (deltaDays == 1 ? ' day' : ' days'));
                 }
                 timeArr.push(deltaHours + (deltaHours == 1 ? ' hour' : ' hours'));
                 timeArr.push(deltaMinutes + (deltaMinutes == 1 ? ' minute' : ' minutes'));
                 timeArr.push(deltaSeconds + (deltaSeconds == 1 ? ' second' : ' seconds'));*/

                $elements.days.text(deltaDays);
                $elements.hours.text(deltaHours);
                $elements.minutes.text(deltaMinutes);
                $elements.seconds.text(deltaSeconds);
            }
        };

        setInterval(updateTime, 1000);
    });

    /*==============================
     Modal Window
     ==============================*/

    (function() {
        var supportsTransitions = (function() {
            var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
                v = ['ms', 'O', 'Moz', 'Webkit']; // 'v' for vendor

            if (s['transition'] == '') return true; // check first for prefeixed-free support
            while (v.length) // now go over the list of vendor prefixes and check support until one is found
                if (v.pop() + 'Transition' in s)
                    return true;
            return false;
        })();

        function createCookie( name, value, days ) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function readCookie( name ) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function makeNamespace() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function initPopup( popupData ) {
            if (!popupData.element)
                return;

            var popupElement = popupData.element || '#lp-pom-block-489',
                $body = $('body'),
                popupTriggers = popupData.triggers || [],
                $el = $(popupElement).appendTo($('#lp-pom-root')),
                animation = popupData.animation || '3dSign',
                showOnLeave = popupData.showOnLeave === 'yes',
                $triggers = $(popupTriggers.join(', ')),
                closeButton = popupData.closeButton || '#lp-code-496',
                $closeButton = $(closeButton),
                formContainerId = popupData.formContainerId || '#lp-pom-form-24',
                $form = $(formContainerId + ' form'),
                $shade = $('.md-overlay'),
                leavePopupInterval = popupData.showOnLeaveInterval || 2,
                nameSpace = makeNamespace();


            $shade = $shade.length ? $shade : $('<div class="md-overlay"/>').insertBefore($el);

            switch (animation.toUpperCase()) {
                case 'FADEINSCALE':
                    animation = 1;
                    break;
                case 'SLIDEINRIGHT':
                    animation = 2;
                    break;
                case 'SLIDEINBOTTOM':
                    animation = 3;
                    break;
                case 'NEWSPAPER':
                    animation = 4;
                    break;
                case 'FALL':
                    animation = 5;
                    break;
                case 'SIDEFALL':
                    animation = 6;
                    break;
                case 'STICKYUP':
                    animation = 7;
                    break;
                case '3DFLIPHORIZONTAL':
                    animation = 8;
                    break;
                case '3DFLIPVERTICAL':
                    animation = 9;
                    break;
                case '3DSIGN':
                    animation = 10;
                    break;
                case 'SUPERSCALED':
                    animation = 11;
                    break;
                case 'JUSTME':
                    animation = 12;
                    break;
                case '3DSLID':
                    animation = 13;
                    break;
                case '3DROTATEBOTTOM':
                    animation = 14;
                    break;
                case '3DROTATEINLEFT':
                    animation = 15;
                    break;
            }

            $el.addClass('md-modal').addClass('md-effect-' + animation).css('display', 'block').children().wrapAll('<div class="md-content" />');

            $shade.addClass('md-effect-' + animation);

            $el.find('.md-content').css({
                'height'      : $el.height(),
                'width'       : $el.width(),
                'background'  : $el.css('background'),
                'border'      : $el.css('border'),
                'borderRadius': $el.css('borderRadius')
            });

            $el.css({
                'height'    : 'auto',
                'width'     : 'auto',
                'background': 'transparent',
                'border'    : '0 none'
            });

            function showPopup() {
                if ($body.hasClass('popup-opened'))
                    return;

                $body.addClass('popup-opened');

                $shade.addClass('md-show');
                $el.addClass('md-show');

                if (!supportsTransitions) {
                    $el.css('marginLeft', $el.width() / 2 * -1);
                }
            }

            function hidePopup() {
                $('body').removeClass('popup-opened');
                $el.removeClass('md-show');
                $shade.removeClass('md-show');
                $('.lp-form-errors').css("display", "none");
            }

            if (showOnLeave && !readCookie('mouseleave_popup_' + popupElement)) {
                $(document).on('mouseout.' + nameSpace, function( e ) {
                    e = e ? e : window.event;
                    var from = e.relatedTarget || e.toElement;
                    var tflag;

                    if (e.target) {
                        tflag = e.target.tagName.toUpperCase() != 'SELECT';
                    } else {
                        tflag = true;
                    }

                    if ((!from || from.nodeName == 'HTML') && e.clientY <= 20 && tflag) {
                        var el = document.activeElement;
                        if (el && el.tagName.toLowerCase() == 'select') el.blur();

                        createCookie('mouseleave_popup_' + popupElement, 'shown', leavePopupInterval);
                        showPopup();

                        $(document).off('mouseout.' + nameSpace);
                    }
                });
            }

            if ($triggers.length) {
                $triggers.on('click', function( e ) {
                    e.preventDefault();

                    showPopup();
                });
            }

            $closeButton.add($shade).on('click', function( e ) {
                e.preventDefault();

                hidePopup();
            });

            $closeButton.css({
                'cursor': 'pointer',
                'opacity': '0.7'
            }).on({
                'mouseover': function() {
                    $(this).stop(true, true).animate('opacity', 1);
                },
                'mouseout': function () {
                    $(this).stop(true, true).animate('opacity', 0.7);
                }
            });


            $(document).ajaxSuccess(function(e, xhr) {
                if (xhr.url.indexOf($form.attr('action')) === 0) {
                    hidePopup();
                }
            });
        }

        $(function() {
            wSettings.popups = wSettings.popups || [];

            for (var i = 0; i < wSettings.popups.length; i++) {
                initPopup(wSettings.popups[i]);
            }
        });
    })();

    /*==============================
     Carousels
     ==============================*/
    (function() {
        function initSlider( data ) {
            if (!data || !data.elements || !data.elements[0] || !data.leftArrow || !data.rightArrow)
                return;

            var $carouselContainer = $('<div class="carousel-container" style="position: absolute; overflow: hidden; display: none;" />'),
                $slides = [],

                $firstSlide = $(data.elements[0]),
                $previousArrow = $(data.leftArrow),
                $nextArrow = $(data.rightArrow),
                $wrapper = $firstSlide.parent(),
                wrapperCss = {
                    left   : ($wrapper.outerWidth() - $firstSlide.outerWidth()) / 2,
                    top    : $firstSlide.css('top'),
                    height : $firstSlide.outerHeight(),
                    width  : $firstSlide.outerWidth(),
                    display: 'block'
                },
                slidesCount = data.elements.length,
                slideWidth = parseInt($firstSlide.show().css('width')),
                _current = 0,
                $navList,
                arrowCss = {cursor: 'pointer', zIndex: 800};

            $carouselContainer.appendTo('.lp-positioned-content').css(wrapperCss);

            function generateNav () {
                var theme = data.theme || 'dark';
                var $navContainerWrapper = $('<div class="dotstyle-wrapper dostyle-theme-' + theme + '"/>'),
                    $navContainer = $('<div class="dotstyle dotstyle-scaleup"/>').appendTo($navContainerWrapper);

                $navList = $('<ul />');
                $navList.append('<li class="current" data-index="0"><a href="#"></a></li>');

                for (var i = 1; i < data.elements.length; i++) {
                    $navList.append('<li data-index="'+ i +'"><a href="#"></a></li>');
                }

                $navList.appendTo($navContainer);
                $navContainerWrapper
                    .css({
                        'top': parseInt(wrapperCss.top) + wrapperCss.height + 25
                    })
                    .insertAfter($carouselContainer);

                $navList.on('click', 'a', function(e) {
                    var $par = $(this).parent();

                    e.preventDefault();

                    goToSlide($par.index());
                });

                $navList = $navList.find('li');
            }

            function setNavActive() {
                $navList.removeClass('current')
                    .filter('[data-index="'+_current+'"]')
                    .addClass('current');
            }

            function goToSlide(index) {
                _current = index;

                $($slides[_current])
                    .stop(false, true)
                    .css('left', slideWidth);

                $.each($slides, function (index, $carousel) {
                    $carousel.stop(false, true).animate({left: '-='+slideWidth+'px'}, 'fast', 'easeInOutQuad');
                });

                setNavActive();
            }

            generateNav();

            $.each(data.elements, function( index, slide ) {
                var $slide = $(slide);

                $slide.show().css({
                    display: 'block',
                    top    : 0,
                    left   : index * slideWidth
                }).detach().appendTo($carouselContainer);

                $slides.push($slide);
            });

            $previousArrow.css(arrowCss);
            $nextArrow.css(arrowCss);

            $previousArrow.on('click', function () {
                _current = _current - 1 >= 0 ? _current - 1 : slidesCount - 1;

                $($slides[_current])
                    .stop(false, true)
                    .css('left', '-'+slideWidth+'px');

                $.each($slides, function (index, $carousel) {
                    $carousel
                        .stop(false, true)
                        .animate({left: '+='+slideWidth+'px'}, 'fast', 'easeInOutQuad');
                });

                setNavActive();
            });

            $nextArrow.on('click', function () {
                _current = _current + 1 < slidesCount ? _current + 1 : 0;

                $($slides[_current])
                    .stop(false, true)
                    .css('left',  slideWidth );

                $.each($slides, function (index, $carousel) {
                    $carousel.stop(false, true).animate({left: '-='+slideWidth+'px'}, 'fast', 'easeInOutQuad');
                });

                setNavActive();
            });
        }

        jQuery(function( $ ) {
            initSlider(wSettings.carouselOne);
            initSlider(wSettings.carouselTwo);
        });
    })();

    $(function() {
        if (jQuery(window).width() > 600) {
            if (!wSettings.flipBoxes)
                return;

            var cards = wSettings.flipBoxes ? wSettings.flipBoxes : [];

            $.each(cards, function( index, card ) {
                var $front = $(card.front);
                var $back = $(card.back);

                var top = parseInt($front.css('top'));
                var left = parseInt($front.css('left'));
                var width = parseInt($front.css('width'));
                var height = parseInt($front.css('height'));

                var $cardContainer = $('<div class="flip-container flip-container-' + (index + 1) + '" ontouchstart="this.classList.toggle(\'hover\');"/>');
                var $flipper = $('<div class="flipper"/>').appendTo($cardContainer);
                var $frontContainer = $('<div class="front"/>').appendTo($flipper);
                var $backContainer = $('<div class="back"/>').appendTo($flipper);

                $cardContainer.appendTo('.lp-positioned-content').css({
                    position: 'absolute',
                    top     : top,
                    left    : left,
                    width   : width,
                    height  : height
                });

                $front.css({
                    top : 0,
                    left: 0
                }).detach().appendTo($frontContainer);

                $back.css({
                    top : 0,
                    left: 0
                }).detach().appendTo($backContainer);

                if (card.text) {
                    $(card.text).css({
                        top : 120,
                        left: 0
                    }).detach().appendTo($frontContainer);
                }
            });

        }
    });

    jQuery(function($) {
        function initSlider( data ) {
            if (!data || !data.elements || !data.elements[0])
                return;

            var $carouselContainer = $('<div class="carousel-container" style="position: absolute; overflow: hidden; display: none;" />'),
                $slides = [],
                $firstSlide = $(data.elements[0]),
                $previousArrow = $('#lp-code-875'),
                $nextArrow = $('#lp-code-874'),
                gutterSize = 40,
                shift = 10,
                wrapperCss = {
                    top    : $firstSlide.css('top'),
                    height : 660,
                    width  : $(data.elements[0]).parent().width() + shift * 2,
                    display: 'block'
                },
                slidesCount = data.elements.length,
                slideWidth = parseInt($firstSlide.show().css('width')) + gutterSize,
                slidesInView = Math.ceil(wrapperCss.width / slideWidth) - 1,
                _current = 0,
                arrowCss = {cursor: 'pointer', left: '+='+ shift};

            $carouselContainer.appendTo('.lp-positioned-content').css(wrapperCss);

            $.each(data.elements, function( index, slide ) {
                var $slide = $(slide);

                $slide.show().css({
                    display: 'block',
                    top: '20px',
                    left: index * slideWidth + shift
                })
                    .animate({
                        boxShadow: 'none'
                    })
                    .hover(function () {
                        $(this).stop(false, true).animate({
                            top: '0',
                            boxShadow: '0 5px 8px rgba(0, 0, 0, 0.25)'
                        }, 'fast', 'easeInOutQuad');
                    }, function () {
                        $(this).stop(false, true).animate({
                            top: '20px',
                            boxShadow: 'none'
                        }, 'fast', 'easeInOutQuad');
                    })
                    .detach().appendTo($carouselContainer);

                $slides.push($slide);
            });

            $previousArrow.css(arrowCss);
            $nextArrow.css(arrowCss);

            $previousArrow.on('click', function () {
                _current = _current - 1 >= 0 ? _current - 1 : slidesCount - 1;

                $($slides[_current])
                    .stop(false, true)
                    .css('left', '-'+(slideWidth - shift)+'px');

                $.each($slides, function (index, $carousel) {
                    $carousel
                        .stop(false, true)
                        .animate({left: '+='+slideWidth+'px'}, 'fast', 'easeInOutQuad');
                });
            });

            $nextArrow.on('click', function () {
                var tempCur;

                _current = _current + 1 < slidesCount ? _current + 1 : 0;

                tempCur = _current + slidesInView;

                if (tempCur > slidesCount - 1) {
                    tempCur = tempCur - slidesCount;
                }

                $($slides[tempCur])
                    .stop(false, true)
                    .css('left', (slidesInView + 1) * slideWidth + shift);


                $.each($slides, function (index, $carousel) {
                    $carousel.stop(false, true).animate({left: '-='+slideWidth+'px'}, 'fast', 'easeInOutQuad');
                });
            });
        }

        if (jQuery(window).width() > 600) {
            initSlider(wSettings.animatedBoxesOne);
        }
    });

    jQuery(function($) {
        function initSlider( data ) {
            if (!data || !data.elements || !data.elements[0] || !data.sectionId)
                return;

            var $carouselContainer = $('<div class="carousel-container" style="position: absolute; overflow: hidden; display: none;" />'),
                $slides = [],
                $firstSlide = $(data.elements[0]),
                $previousArrow = $('#lp-code-878'),
                $nextArrow = $('#lp-code-879'),
                gutterSize = 54,
                shift = 0,
                wrapperCss = {
                    top    : $(data.sectionId).position().top + 37,
                    height : 603,
                    width  : $(data.elements[0]).parent().width() + shift * 2,
                    display: 'block'
                },
                slidesCount = data.elements.length,
                slideWidth = parseInt($firstSlide.show().css('width')) + gutterSize,
                slidesInView = Math.ceil(wrapperCss.width / slideWidth) - 1,
                _current = 0,
                arrowCss = {cursor: 'pointer', left: '+='+ shift};


            $carouselContainer.appendTo('.lp-positioned-content').css(wrapperCss);

            $.each(data.elements, function( index, slide ) {
                var $slide = $(slide);

                $slide.show().css({
                    display: 'block',
                    left: index * slideWidth,
                    height: 405,
                    top: 173
                });
                $slide.attr('style', $slide.attr('style') + '; overflow: visible !important');

                $slide
                    .animate({
                        boxShadow: 'none'
                    })
                    .animate({
                        boxShadow: 'none'
                    })
                    .hover(function () {
                        $slide.addClass('active').stop(false, true).animate({
                            top: '-=20',
                            height: '+=40'
                        }, 'fast', 'easeInOutQuad', function () {
                            $slide.css({
                                boxShadow: '0 10px 0 -5px rgba(0, 0, 0, 0.1)'
                            });
                        });
                    }, function () {
                        $slide.removeClass('active').stop(false, true).animate({
                            top: '+=20',
                            height: '-=40'
                        }, 'fast', 'easeInOutQuad', function () {
                            $slide.css({
                                boxShadow: 'none'
                            });
                        });
                    })
                    .detach().appendTo($carouselContainer);

                $slides.push($slide)
            });

            $previousArrow.css(arrowCss);
            $nextArrow.css(arrowCss);

            $previousArrow.on('click', function () {
                _current = _current - 1 >= 0 ? _current - 1 : slidesCount - 1;

                $($slides[_current])
                    .stop(false, true)
                    .css('left', '-'+(slideWidth - shift)+'px');

                $.each($slides, function (index, $carousel) {
                    $carousel
                        .stop(false, true)
                        .animate({left: '+='+slideWidth+'px'}, 'fast', 'easeInOutQuad');
                });
            });

            $nextArrow.on('click', function () {
                var tempCur;

                _current = _current + 1 < slidesCount ? _current + 1 : 0;

                tempCur = _current + slidesInView;

                if (tempCur > slidesCount - 1) {
                    tempCur = tempCur - slidesCount;
                }

                $($slides[tempCur])
                    .stop(false, true)
                    .css('left', wrapperCss.width + gutterSize);

                $.each($slides, function (index, $carousel) {
                    $carousel.stop(false, true).animate({left: '-='+slideWidth+'px'}, 'fast', 'easeInOutQuad');
                });
            });
        }

        if (jQuery(window).width() > 600) {
            initSlider(wSettings.animatedBoxesTwo);
        }
    });

    /*==============================
     Parallax
     ==============================*/

    jQuery(function($) {
        wSettings.parallax = wSettings.parallax || [];

        $(wSettings.parallax.join(', ')).addClass('parallax-effect');
    });

})(window);