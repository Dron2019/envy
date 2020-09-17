$('.main-screen-slider-js').on('init', function(event, slickObject, current, next) {
    slickObject.changeSubtitle = document.querySelector('.slide-text .subtitle');
    slickObject.changeText = document.querySelector('.slide-text>.text');
    slickObject.counterAll = document.querySelector('.main-screen-slider .counter .all');
    slickObject.currentCounter = document.querySelector('.main-screen-slider .counter .current');
    slickObject.counterAll.innerHTML = slickObject.$slides.length;
})
$('.main-screen-slider-js').on('beforeChange', function(event, slickObject, current, next) {


    // gsap.fromTo(slickObject.changeText, { scaleY: 0, autoAlpha: 0 }, { transformOrigin: 'top', scaleY: 1, autoAlpha: 1, duration: 1, })
    // gsap.fromTo(slickObject.changeSubtitle, { scaleY: 0, autoAlpha: 0 }, { transformOrigin: 'top', scaleY: 1, autoAlpha: 1, duration: 1, })
    slickObject.changeText.innerHTML = slickObject.$slides[next].dataset.text;
    slickObject.changeSubtitle.innerHTML = slickObject.$slides[next].dataset.subtitle;
    slickObject.currentCounter.innerHTML = next + 1;
})
$('.main-screen-slider-js').slick({
    arrows: false,
    infinite: false,
    easing: 'ease-out',
    slide: '.slide'
})


$('.home-news-slider').slick({
    infinite: false,
    slidesToShow: 4,
    slide: '.news-card',
    arrows: false,
    touchThreshold: 10,
    initialSlide: 0,
    responsive: [{
            breakpoint: 1480,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 975,
            settings: {
                slidesToShow: 1.8
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1.2
            }
        }
    ],
});

const doubleSlidesToShow = 4;
$('.brands__slider-top-js').slick({
    infinite: false,
    slidesToShow: doubleSlidesToShow,
    slide: 'img',
    nextArrow: '.brands__slider-js .arrow-next',
    prevArrow: '.brands__slider-js .arrow-prev',
    asNavFor: '.brands__slider-bottom-js',
    // arrows: false,
    initialSlide: 0,
    responsive: [{
            breakpoint: 975,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1
            }
        }
    ],

});
$('.brands__slider-bottom-js').slick({
    infinite: false,
    slidesToShow: doubleSlidesToShow,
    slide: 'img',
    nextArrow: '.brands .arrow-next',
    prevArrow: '.brands .arrow-prev',
    asNavFor: '.brands__slider-top-js',
    initialSlide: 0,
    responsive: [{
            breakpoint: 975,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1
            }
        }
    ],

});



let homeBlock2Parts = document.querySelectorAll('.home-block2__part');

homeBlock2Parts.forEach(part => {
    part.hoverGradient = part.querySelectorAll('linearGradient')[1].id;
    part.regularGradient = part.querySelectorAll('linearGradient')[0].id;
    console.log(part.hoverGradient);
    console.log(part.regularGradient);
    part.addEventListener('mouseover', function(evt) {
        part.querySelector('rect').setAttribute('stroke', `url(#${part.hoverGradient})`);
    });
    part.addEventListener('mouseout', function(evt) {
        part.querySelector('rect').setAttribute('stroke', `url(#${part.regularGradient})`);
    });
})