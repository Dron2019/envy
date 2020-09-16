$('.catalogue-slider-js').on('init', function(event, slickObject, current, next) {
    slickObject.changeSubtitle = document.querySelector('.slide-text .subtitle');
    slickObject.changeText = document.querySelector('.slide-text>.text');
    slickObject.counterAll = document.querySelector('.main-screen-slider .counter .all');
    slickObject.currentCounter = document.querySelector('.main-screen-slider .counter .current');
    slickObject.counterAll.innerHTML = slickObject.$slides.length;
    initSlickCustomDots(slickObject, document.querySelector('.slide-custom-dots-js'));
    // console.log(slickObject);
})
$('.catalogue-slider-js').on('beforeChange', function(event, slickObject, current, next) {
    gsap.fromTo(slickObject.changeText, { rotationX: -180, autoAlpha: 0 }, { autoAlpha: 1, duration: 1, rotationX: 0 })
    gsap.fromTo(slickObject.changeSubtitle, { rotationX: -180, autoAlpha: 0 }, { autoAlpha: 1, duration: 1, rotationX: 0 })
    slickObject.changeText.innerHTML = slickObject.$slides[next].dataset.text;
    slickObject.changeSubtitle.innerHTML = slickObject.$slides[next].dataset.subtitle;
    slickObject.currentCounter.innerHTML = next + 1;
    switchSlickActiveDot(slickObject, current, next)
})
$('.catalogue-slider-js').slick({
    arrows: false,
    infinite: false,
    easing: 'ease-out',
    dots: false,
    slide: '.slide',
    responsive: [{
        breakpoint: 575,
        settings: {
            slidesToShow: 1.1
        }
    }],
});



let dots = document.querySelectorAll('svg.dot');
let dotsHandler = {};

function initSlickCustomDots(slickObject, destination) {
    renderSlickCustomDots(slickObject.$slides, destination);
    console.log();
    slickObject.customDots = $(`.${destination.classList[0]} .dot`);
    slickObject.customDots.each(function(dot, index) {
        if (document.querySelector('.dot.active') === null) slickObject.customDots[0].classList.add('active')
        this.addEventListener('click', function() {
            document.querySelector('.dot.active').classList.remove('active');
            this.classList.add('active');
            // console.log($('.catalogue-slider-js'));
            $('.catalogue-slider-js').slick('slickGoTo', this.dataset.index);
            console.log(slickObject);

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
    <svg class="dot" data-index="${index}" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="dot-border" cx="4" cy="4" r="3.5" stroke="url(#paint0_linear)"/>
        <circle class="dot-fill" cx="4" cy="4" r="4" fill="url(#paint1_linear)"/>
        <defs>
            <linearGradient id="paint0_linear" x1="8" y1="-4.47035e-06" x2="-0.30671" y2="0.332264" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FAA6A6"/>
                <stop offset="1" stop-color="#F8CEBC"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="8" y1="-4.47035e-06" x2="-0.30671" y2="0.332264" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FAA6A6"/>
                <stop offset="1" stop-color="#F8CEBC"/>
            </linearGradient>
        </defs>
    </svg>
    `;
    container.insertAdjacentHTML('beforeend', customDot);
}

function switchSlickActiveDot(slickObject, prev, next) {
    slickObject.customDots[prev].classList.remove('active');
    slickObject.customDots[next].classList.add('active');
};




/**Каталог выпадайка */
const dropdownHandlerObject = {
    parentSelector: '.catalogue .goods-dropdown',
    childArticle: '.goods-dropdown__article',
    childTitle: '.goods-dropdown__article-title',
    childcontent: '.goods-dropdown__article-content',
    customCallback: function(title, trnsfrmValue) {
        title.querySelector('.icon--birdy').style.transform = `rotate(${trnsfrmValue}deg)`;
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
                config.customCallback(article, 180);
            } else {
                show(article.querySelector(childcontent));
                config.customCallback(article, 0);
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

dropDownMenuHandling(dropdownHandlerObject);