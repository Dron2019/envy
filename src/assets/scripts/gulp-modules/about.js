$('.about-slider-js').slick({
    prevArrow: '.scene-nav--prev',
    nextArrow: '.scene-nav--next',
    slide: 'img',
    responsive: [{
        breakpoint: 576,
        settings: {
            slidesToShow: 1.2,
            infinite: false
        }
    }, ]
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