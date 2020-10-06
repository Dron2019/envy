/* beautify preserve:start */
@@include('../libs/magnific-popup/dist/jquery.magnific-popup.min.js')
@@include('../libs/elevate-zoom/elevate-zoom.js')
/* beautify preserve:end */




const productPageInnerDropdown = {
    parentSelector: '.goods-dropdown',
    childArticle: '.goods-dropdown__article',
    childTitle: '.goods-dropdown__article-title',
    childcontent: '.goods-dropdown__article-content',
    customCallback: function(title, closing) {
        // title.querySelector('.icon--birdy').style.transform = `rotate(${trnsfrmValue}deg)`;
        if (!closing) {} else {
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

    slickObject.$slides.each((i, el) => {
        el.style.height = slickObject.slideWidth * ImgHeightRatioCoef + 'px';
    })

});

$('.product-page-slider__top-js').on('beforeChange', function(event, slickObject, current, next) {
    switchSlickActiveDot(slickObject, current, next)
});


var topSlider = $('.product-page-slider__top-js').slick({
    asNavFor: $('.product-page-slider__nav-js'),
    infinite: true,
    slide: 'img',
    slidesToShow: 1,
    draggable: false,
    centerMode: true,
    adaptiveHeight: true,
    swipe: false,

    fade: true,
    nextArrow: '.slider-arrows .next',
    prevArrow: '.slider-arrows .prev',
    responsive: [{
        breakpoint: 768,
        settings: {
            draggable: true,
            swipe: true,
            fade: false,
            slidesToShow: 1.2,
            centerMode: false,
            infinite: false,
        },
    }, ]

});
if (document.documentElement.clientWidth > 768) $('.xzoom').elevateZoom();
var bottomSlider = $('.product-page-slider__nav-js').slick({
    slidesToShow: 4,
    infinite: true,
    slide: 'img',
    arrows: false,
    focusOnSelect: true,
    asNavFor: $('.product-page-slider__top-js'),
    responsive: [{
        breakpoint: 768,
        settings: 'unslick',
        infinite: false,
    }, ],

});



/**Card Slider End */


/**Sizes Popup Handler */
var $sizePopup = document.querySelector('.sizes-popup-content-js');
$('.sizes-popup-js').magnificPopup({
    removalDelay: 500,
    items: [{
        src: $('.sizes-popup-content-js'), // Dynamically created element
        type: 'inline'
    }, ],
    callbacks: {
        beforeOpen: function() {
            gsap.fromTo($sizePopup, { y: -500 }, { y: 0 })
        },
        beforeClose: function() {
            var $sizePopup = document.querySelector('.sizes-popup-content-js')
            gsap.fromTo($sizePopup, { y: 0 }, { y: -1000 })
        },
    }

});

var $paymentDetails = document.querySelector('.payment-details-popup-content-js')
$('.payment-details-popup-js').magnificPopup({
    removalDelay: 500,
    items: [{
        src: $('.payment-details-popup-content-js'), // Dynamically created element
        type: 'inline'
    }, ],
    callbacks: {
        beforeOpen: function() {
            gsap.fromTo($paymentDetails, { y: -500 }, { y: 0 })
        },
        beforeClose: function() {
            var $paymentDetails = document.querySelector('.payment-details-popup-content-js')
            gsap.fromTo($paymentDetails, { y: 0 }, { y: -1000 })
        },
    }

});
/**Sizes Popup Handler end*/
/**OneClick Popup Handler  */

var $oneClickPopup = document.querySelector('.one-click-popup-js');
/**Общий обьект для добавления данных для отправки */
var PRODUCT__DATA = {
    price: document.querySelector('.product-page-content__price').innerText,
}
$('.one-click-js').magnificPopup({
    removalDelay: 500,
    items: [{
        src: $('.one-click-popup-js'), // Dynamically created element
        type: 'inline'
    }, ],

    callbacks: {
        open: onClickPopupAddActualInfo.bind(null, $oneClickPopup, PRODUCT__DATA),
        beforeOpen: function() {
            gsap.fromTo($oneClickPopup, { y: -500 }, { y: 0 })
        },
        beforeClose: function() {
            var $paymentDetails = document.querySelector('.one-click-popup-js')
            gsap.fromTo($oneClickPopup, { y: 0 }, { y: -1000 })
        },
    }
});

function onClickPopupAddActualInfo(popup, dataObj) {
    var priceShowEl = popup.querySelector('.one-click-price-show-el-js');
    var oneClickForm = popup.querySelector('form');
    priceShowEl.innerText = dataObj.price;
    // popup;
    for (const key in dataObj) {
        oneClickForm.insertAdjacentHTML('beforeend', `
            <div class="input-group hidden">
                <input type="hidden" name="${key}" value="${dataObj[key]}">
            </div>
        `);
    }

};


/**sizeList Handler */

var $sizeWrap = document.querySelector('ul.sizes-list');
$sizeWrap.querySelectorAll('li').forEach((evt) => {
    switchSelectedSize(evt, $sizeWrap);
});

function switchSelectedSize(el, parentList) {
    console.log(el);
    el.addEventListener('click', function(evt) {
        parentList.querySelector('.selected').classList.remove('selected');
        this.classList.add('selected');
        PRODUCT__DATA.size = this.innerText;
    });
}


/**sizeList Handler END */
/**OneClick Popup Handler END */





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