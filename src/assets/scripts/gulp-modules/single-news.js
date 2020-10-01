function dqsA(selector) {
    return document.querySelectorAll(selector)
};

let videos = dqsA('.video-container');

videos.forEach(video => {
    let snglVideo = video.querySelector('video');
    let buttonPlay = video.querySelector('.video-play-button');
    snglVideo.addEventListener('click', function(evt) {
        snglVideo.paused ?
            buttonPlay.style.opacity = `0` :
            buttonPlay.style.opacity = `1`;
        console.log('scsc');

    });
});


$('.single-news-container .slider').slick({
    slide: '.slide',
    prevArrow: '.arrow-prev',
    speed: 1000,
    cssEase: 'cubic-bezier(.18,1,.56,1)',
    nextArrow: '.arrow-next',
    responsive: [{
            breakpoint: 575,
            settings: {
                slidesToShow: 1.2,
                infinite: false,
                arrows: false
            }
        },

    ],
})

$('.same-news-container ').slick({
    slide: '.news-card',
    arrows: false,
    slidesToShow: 4,
    infinite: false,
    responsive: [{
            breakpoint: 1680,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1.2,
                infinite: false,
                arrows: false
            }
        },

    ],
})