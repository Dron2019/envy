$('.main-screen-slider-js').on('init', function(event, slickObject, current, next) {
    slickObject.changeSubtitle = document.querySelector('.slide-text .subtitle');
    slickObject.changeText = document.querySelector('.slide-text>.text');
    slickObject.counterAll = document.querySelector('.main-screen-slider .counter .all');
    slickObject.currentCounter = document.querySelector('.main-screen-slider .counter .current');
    slickObject.counterAll.innerHTML = slickObject.$slides.length;
})
$('.main-screen-slider-js').on('beforeChange', function(event, slickObject, current, next) {

    gsap.fromTo(slickObject.changeText, { rotationX: -180, autoAlpha: 0 }, { autoAlpha: 1, duration: 1, rotationX: 0 })
    gsap.fromTo(slickObject.changeSubtitle, { rotationX: -180, autoAlpha: 0 }, { autoAlpha: 1, duration: 1, rotationX: 0 })
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
    initialSlide: 2,
    responsive: [{
            breakpoint: 1680,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 975,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 575,
            settings: {

                slidesToShow: 1.2
            }
        }
    ],
})