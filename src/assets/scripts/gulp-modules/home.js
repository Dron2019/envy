/* beautify preserve:start */
@@include('../libs/locomotive-scroll/dist/locomotive-scroll.min.js')
@@include('../libs/gsap/dist/ScrollTrigger.min.js')
/* beautify preserve:end */


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




if (document.documentElement.clientWidth > 950) customCursorEffect('.main-screen-slider-js');


function customCursorEffect(container) {
    const CLIENT_WIDTH = document.documentElement.clientWidth;
    const CLIENT_HEIGHT = document.documentElement.clientHeight;
    //Создание СВГ курсора
    let msSlider = document.querySelector(container);
    let msCustomCursor = `
    <svg style="position:absolute; left:0;top:0; " width="178" height="187" viewBox="-20 -20 139 145" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="square-to-transform"  style="transform-origin:75px 75px !important;" d="M118 63.5C118 95.8087 85.8087 124.5 53.5 124.5C21.1913 124.5 1 95.8087 1 63.5C1 31.1913 35.6913 1 68 1C100.309 1 118 31.1913 118 63.5Z" stroke="white" stroke-width="0.5"/>
    <path style="transform:scale(0.79); transform-origin:center; transform-box:fill-box;" d="M24.1155 58.48H30.9075V67H29.8275V59.44H25.1955V67H24.1155V58.48ZM37.6423 67.06C37.0423 67.06 36.4943 66.94 35.9983 66.7C35.5103 66.452 35.0903 66.128 34.7383 65.728C34.3863 65.32 34.1143 64.856 33.9223 64.336C33.7303 63.816 33.6343 63.284 33.6343 62.74C33.6343 62.172 33.7343 61.628 33.9343 61.108C34.1423 60.588 34.4263 60.128 34.7863 59.728C35.1463 59.328 35.5703 59.012 36.0583 58.78C36.5543 58.54 37.0903 58.42 37.6663 58.42C38.2663 58.42 38.8103 58.548 39.2983 58.804C39.7863 59.052 40.2063 59.38 40.5583 59.788C40.9103 60.196 41.1823 60.66 41.3743 61.18C41.5663 61.692 41.6623 62.216 41.6623 62.752C41.6623 63.32 41.5583 63.864 41.3503 64.384C41.1503 64.904 40.8703 65.364 40.5103 65.764C40.1583 66.156 39.7343 66.472 39.2383 66.712C38.7503 66.944 38.2183 67.06 37.6423 67.06ZM34.7263 62.74C34.7263 63.172 34.7943 63.592 34.9303 64C35.0743 64.4 35.2743 64.756 35.5303 65.068C35.7863 65.38 36.0943 65.628 36.4543 65.812C36.8143 65.996 37.2143 66.088 37.6543 66.088C38.1103 66.088 38.5183 65.992 38.8783 65.8C39.2383 65.6 39.5423 65.344 39.7903 65.032C40.0463 64.712 40.2383 64.352 40.3663 63.952C40.5023 63.552 40.5703 63.148 40.5703 62.74C40.5703 62.308 40.4983 61.892 40.3543 61.492C40.2183 61.084 40.0183 60.728 39.7543 60.424C39.4983 60.112 39.1903 59.864 38.8303 59.68C38.4783 59.496 38.0863 59.404 37.6543 59.404C37.1983 59.404 36.7903 59.5 36.4303 59.692C36.0703 59.884 35.7623 60.136 35.5063 60.448C35.2583 60.76 35.0663 61.116 34.9303 61.516C34.7943 61.916 34.7263 62.324 34.7263 62.74ZM50.237 59.44H47.297V67H46.217V59.44H43.277V58.48H50.237V59.44ZM57.0821 67V63.7H55.1141L53.1581 67H51.8981L54.0101 63.544C53.7621 63.456 53.5301 63.332 53.3141 63.172C53.1061 63.004 52.9261 62.812 52.7741 62.596C52.6221 62.38 52.5021 62.144 52.4141 61.888C52.3341 61.632 52.2941 61.364 52.2941 61.084C52.2941 60.764 52.3581 60.448 52.4861 60.136C52.6141 59.824 52.7901 59.548 53.0141 59.308C53.2461 59.06 53.5181 58.86 53.8301 58.708C54.1501 58.556 54.4981 58.48 54.8741 58.48H58.1621V67H57.0821ZM57.0821 59.44H54.9341C54.7261 59.44 54.5261 59.484 54.3341 59.572C54.1501 59.66 53.9861 59.78 53.8421 59.932C53.7061 60.076 53.5941 60.248 53.5061 60.448C53.4261 60.648 53.3861 60.86 53.3861 61.084C53.3861 61.3 53.4221 61.508 53.4941 61.708C53.5661 61.908 53.6661 62.084 53.7941 62.236C53.9221 62.388 54.0741 62.512 54.2501 62.608C54.4341 62.696 54.6381 62.74 54.8621 62.74H57.0821V59.44ZM68.2987 58.48V67H67.2187V63.124H62.5267V67H61.4467V58.48H62.5267V62.164H67.2187V58.48H68.2987ZM72.5841 67.084C72.4321 67.084 72.2641 67.068 72.0801 67.036C71.8961 67.012 71.7401 66.972 71.6121 66.916V65.992C71.7481 66.048 71.8961 66.088 72.0561 66.112C72.2241 66.136 72.3761 66.148 72.5121 66.148C72.7841 66.148 73.0241 66.064 73.2321 65.896C73.4481 65.728 73.6601 65.396 73.8681 64.9L70.7721 58.48H71.9121L74.3721 63.724L76.7001 58.48H77.8401L74.8401 64.96C74.6641 65.344 74.4921 65.672 74.3241 65.944C74.1561 66.208 73.9841 66.428 73.8081 66.604C73.6321 66.772 73.4441 66.896 73.2441 66.976C73.0441 67.048 72.8241 67.084 72.5841 67.084ZM86.3847 59.44H83.4447V67H82.3647V59.44H79.4247V58.48H86.3847V59.44ZM88.8358 58.48H89.9158V61.624H91.7398C92.1398 61.624 92.5118 61.684 92.8558 61.804C93.2078 61.916 93.5118 62.084 93.7678 62.308C94.0238 62.532 94.2238 62.812 94.3678 63.148C94.5198 63.484 94.5958 63.872 94.5958 64.312C94.5958 64.752 94.5198 65.14 94.3678 65.476C94.2158 65.812 94.0078 66.092 93.7438 66.316C93.4878 66.54 93.1838 66.712 92.8318 66.832C92.4878 66.944 92.1238 67 91.7398 67H88.8358V58.48ZM89.9158 66.064H91.7398C92.3318 66.064 92.7718 65.908 93.0598 65.596C93.3558 65.276 93.5038 64.848 93.5038 64.312C93.5038 63.776 93.3518 63.352 93.0478 63.04C92.7438 62.72 92.3078 62.56 91.7398 62.56H89.9158V66.064Z" fill="white"/>
    <path style="transform:scale(0.79) translateX(-10px); transform-origin:center; transform-box:fill-box;" d="M101.068 69.9327C101.088 69.9539 101.112 69.9707 101.138 69.9823C101.165 69.9939 101.193 69.9999 101.222 70C101.251 69.9999 101.279 69.9939 101.306 69.9823C101.332 69.9707 101.356 69.9539 101.376 69.9327L107.935 63.1634C107.955 63.1426 107.972 63.1178 107.983 63.0904C107.994 63.0631 108 63.0337 108 63.004C108 62.9743 107.994 62.945 107.983 62.9176C107.972 62.8902 107.955 62.8655 107.935 62.8447L101.376 56.0664C101.356 56.0453 101.332 56.0287 101.306 56.0173C101.279 56.0059 101.251 56 101.222 56C101.193 56 101.165 56.0059 101.138 56.0173C101.112 56.0287 101.088 56.0453 101.068 56.0664C101.027 56.1084 101.004 56.1653 101.004 56.2246C101.004 56.2839 101.027 56.3408 101.068 56.3829L107.474 62.995L101.068 69.6072C101.046 69.6282 101.029 69.6534 101.018 69.6814C101.006 69.7094 101 69.7395 101 69.7699C101 69.8004 101.006 69.8305 101.018 69.8585C101.029 69.8864 101.046 69.9117 101.068 69.9327Z" fill="white" stroke="white" stroke-width="0.3"/>
    <path style="transform:scale(0.79) translateX(10px); transform-origin:center; transform-box:fill-box;" d="M17.9227 56.0664C17.8995 56.0453 17.8721 56.0287 17.8418 56.0173C17.8115 56.0059 17.779 56 17.7462 56C17.7134 56 17.6809 56.0059 17.6506 56.0173C17.6203 56.0287 17.5929 56.0453 17.5698 56.0664L10.0746 62.8357C10.0511 62.8565 10.0324 62.8813 10.0196 62.9086C10.0068 62.936 10.0001 62.9653 10 62.995C10.0001 63.0247 10.0068 63.0541 10.0196 63.0815C10.0324 63.1088 10.0511 63.1336 10.0746 63.1544L17.5698 69.9327C17.5928 69.9539 17.6202 69.9707 17.6505 69.9823C17.6808 69.9939 17.7133 69.9999 17.7462 70C17.7956 70.0003 17.8439 69.9872 17.885 69.9626C17.9262 69.9379 17.9582 69.9028 17.9772 69.8616C17.9961 69.8204 18.001 69.7751 17.9913 69.7314C17.9816 69.6877 17.9577 69.6476 17.9227 69.6162L10.6014 63.004L17.9227 56.3918C17.9471 56.3709 17.9665 56.3456 17.9798 56.3177C17.9931 56.2897 18 56.2595 18 56.2291C18 56.1987 17.9931 56.1686 17.9798 56.1406C17.9665 56.1126 17.9471 56.0874 17.9227 56.0664Z" fill="white" stroke="white" stroke-width="0.3"/>
    </svg>`;
    //Вставка в контейнер
    msSlider.insertAdjacentHTML('beforeend', msCustomCursor);
    let customCursorDOMel = msSlider.querySelector('svg'),
        squareToTransform = customCursorDOMel.querySelector('.square-to-transform');


    //Применение стартовых свойств
    squareToTransform.style.transform = `scale(0.95)`;
    squareToTransform.style.transformOrigin = `75px 75px !important`;
    msSlider.style.cursor = `none`;
    msSlider.style.position = `relative`;
    customCursorDOMel.style.opacity = `0`;
    customCursorDOMel.style.pointerEvents = `none`;

    //Запись параметров курсора
    customCursorDOMel.selfHeight = customCursorDOMel.getBoundingClientRect().height;
    customCursorDOMel.selftWidth = customCursorDOMel.getBoundingClientRect().width;

    msSlider.addEventListener('mousemove', function(evt) {
        gsap.to(customCursorDOMel, {
            x: evt.clientX - msSlider.getBoundingClientRect().left - customCursorDOMel.selftWidth * 0.5,
            y: evt.clientY - msSlider.getBoundingClientRect().top - customCursorDOMel.selfHeight * 0.5,
        });
        squareTransform(evt);

    });
    msSlider.addEventListener('mouseenter', function(evt) {
        fade(customCursorDOMel, 1)
    });
    msSlider.addEventListener('mouseleave', function(evt) {
        fade(customCursorDOMel, 0)
    });

    const skewCoef = 1.5;
    let squareTransform = throttle((evt) => {
        gsap.to(squareToTransform, {
            skewX: (randomInteger(-skewCoef, skewCoef) * ((evt.clientX * 100 / CLIENT_WIDTH)) / 10),
            skewY: (randomInteger(-skewCoef, skewCoef) * ((evt.clientX * 100 / CLIENT_HEIGHT)) / 10),
        })
    }, 200)



    function fade(el, action) {
        el.style.opacity = action;
    }

    function randomInteger(min, max) {
        return Math.random() * (max - min) + min;
    };

    function throttle(func, ms) {
        let isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {
            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }
            func.apply(this, arguments); // (1)
            isThrottled = true;
            setTimeout(function() {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }
        return wrapper;
    }
};


(function() {
    const locoScroll = new LocomotiveScroll({
        el: document.body,
        smooth: true,
        smoothMobile: false,
        inertia: 1.1
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.body.style.transform ? "transform" : "fixed"
    });
    gsap.registerPlugin(ScrollTrigger);
    gsap.set('.home-block2__part-people-photo', { top: 100 })
    ScrollTrigger.create({
        trigger: ".main-screen-slider",
        start: "top",
        endTrigger: ".main-screen-slider",
        // markers: true,
        end: "bottom",
        onToggle: self => console.log("toggled, isActive:", self.isActive),
        onUpdate: self => {
            gsap.to('.home-block2__part-people-photo', { y: (self.progress) * -100 })
            gsap.to('.home-block2 .title-large', { y: (self.progress) * 150 })
            console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        }
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

})();