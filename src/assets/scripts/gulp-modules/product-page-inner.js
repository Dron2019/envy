/* beautify preserve:start */
@@include('../libs/magnific-popup/dist/jquery.magnific-popup.min.js')
/* beautify preserve:end */




const productPageInnerDropdown = {
    parentSelector: '.goods-dropdown',
    childArticle: '.goods-dropdown__article',
    childTitle: '.goods-dropdown__article-title',
    childcontent: '.goods-dropdown__article-content',
    customCallback: function(title, closing) {
        // title.querySelector('.icon--birdy').style.transform = `rotate(${trnsfrmValue}deg)`;
        if (!closing) {

        } else {

            // gsap.fromTo(`${this.childcontent}  a`, { autoAlpha: 0, y: -100 }, { stagger: 0.025, autoAlpha: 1, y: 0, duration: 0.1, });
        }

    }

}

function dropDownMenuHandling(config) {
    let { childArticle, parentSelector, childTitle, childcontent } = config;
    let parrentEl = document.querySelector(parentSelector);
    parrentEl.querySelectorAll(childArticle).forEach((article, index) => hide(article.querySelector(childcontent)));
    parrentEl.querySelectorAll(childArticle).forEach((article, index) => {
        article.querySelector(childTitle).status = true;
        article.querySelector(childTitle).addEventListener('click', function(evt) {
            this.status = !this.status;
            if (this.status) {
                hide(article.querySelector(childcontent));
                config.customCallback(article, false);
            } else {
                show(article.querySelector(childcontent));
                config.customCallback(article, true);
            }
        });
    })

    function hide(el) {
        el.style.opacity = 0;
        el.style.height = 0;
        el.style.padding = 0;
        el.style.width = 0;
        el.style.opacity = 0;
        el.style.overflow = 'hidden';
    }

    function show(el) {
        el.style.opacity = 1;
        el.style.height = '';
        el.style.padding = '';
        el.style.width = '';
        el.style.opacity = 1;
        el.style.overflow = 'auto';
    }
};

dropDownMenuHandling(productPageInnerDropdown);



/**Card Slider */
const ImgHeightRatioCoef = 0.95;
$('.product-page-slider__top-js').on('init', function(event, slickObject, current, next) {
    initSlickCustomDots(slickObject, document.querySelector('.mobile-dots-container'));



    console.log(slickObject);
    slickObject.$slides.each((i, el) => {
        console.log(el);
        el.style.height = slickObject.slideWidth * ImgHeightRatioCoef + 'px';
    })

});

$('.product-page-slider__top-js').on('beforeChange', function(event, slickObject, current, next) {
    switchSlickActiveDot(slickObject, current, next)
});
var topSlider = $('.product-page-slider__top-js').slick({
    asNavFor: $('.product-page-slider__nav-js'),
    infinite: false,
    slide: '.product-page-slider__top-slide',
    nextArrow: '.slider-arrows .next',
    prevArrow: '.slider-arrows .prev',
    responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1.2
            },

        },

    ]

});
var bottomSlider = $('.product-page-slider__nav-js').slick({
    slidesToShow: 4,
    infinite: false,
    slide: 'img',
    arrows: false,
    focusOnSelect: true,
    asNavFor: $('.product-page-slider__top-js'),
    responsive: [{
        breakpoint: 768,
        settings: 'unslick',
    }, ],

});

/**Card Slider End */


/**Sizes Popup Handler */
$('.sizes-popup-js').magnificPopup({
    items: [{
        src: $('.sizes-popup-content-js'), // Dynamically created element
        type: 'inline'
    }, ]

});
$('.payment-details-popup-js').magnificPopup({
    items: [{
        src: $('.payment-details-popup-content-js'), // Dynamically created element
        type: 'inline'
    }, ]

});
/**Sizes Popup Handler end*/






/**custom dots logic */

function initSlickCustomDots(slickObject, destination) {
    renderSlickCustomDots(slickObject.$slides, destination);

    slickObject.customDots = $(`.${destination.classList[0]} .dot`);
    slickObject.customDots.each(function(dot, index) {
        if (document.querySelector('.dot.active') === null) slickObject.customDots[0].classList.add('active')
        this.addEventListener('click', function() {
            document.querySelector('.dot.active').classList.remove('active');
            this.classList.add('active');
            slickObject.$slider.slick('slickGoTo', this.dataset.index);
        })
    });
}

function renderSlickCustomDots($slides, renderDestination) {
    $slides.each((slide, index) => {
        console.log(slide);
        renderDot(slide, renderDestination);
    })
}

function renderDot(index, container) {
    let customDot = `
    <svg width="6" height="6"  class="dot product-inner-dot" data-index="${index}" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="5" height="5" fill="white" stroke="#222222"/>
        <rect width="6" height="6" fill="#222222"/>
        </svg>
    `;
    container.insertAdjacentHTML('beforeend', customDot);
}

function switchSlickActiveDot(slickObject, prev, next) {
    slickObject.customDots[prev].classList.remove('active');
    slickObject.customDots[next].classList.add('active');
};
/**custom dots logic end*/

/**MOBILE SLIDER MOVING */
if (document.documentElement.clientWidth < 769) {
    let sliderInner = document.querySelector('.product-page-slider'),
        blockToInsert = document.querySelector('.product-page-content__wrap-for-mobile');

    blockToInsert.insertAdjacentElement('beforeend', sliderInner)
}
/**MOBILE SLIDER MOVING end */

/** additional produtcs sliders*/

$('.add-prod-js').slick({
    slidesToShow: 4,
    slide: '.product-card',
    infinite: false,
    nextArrow: '.add-prod-js .arrows .arrow-next',
    prevArrow: '.add-prod-js .arrows .arrow-prev',
    responsive: [{
            breakpoint: 1680,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2.1,
            },
        },
    ],
})
$('.same-prod-js').slick({
        slidesToShow: 4,
        slide: '.product-card',
        infinite: false,
        nextArrow: '.same-prod-js .arrows .arrow-next',
        prevArrow: '.same-prod-js .arrows .arrow-prev',
        responsive: [{
                breakpoint: 1680,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2.1,
                },
            },
        ],
    })
    /** additional produtcs sliders END*/