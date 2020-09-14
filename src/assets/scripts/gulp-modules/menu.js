let menuButtons = document.querySelectorAll('.mobile-tablet-menu-button-js'),
    menuContent = document.querySelector('.mobile-menu-js');
menuContent.hide = function() {
    this.style.opacity = 0;
    this.style.pointerEvents = 'none';
}
menuContent.show = function() {
    this.style.opacity = 1;
    this.style.pointerEvents = 'all';
}

menuButtons.forEach(button => {
    button.addEventListener('click', function(evt) {
        button.classList.toggle('opened');
        if (button.classList.contains('opened')) {
            // buttonIconTransform.play();
            menuContent.show();
            console.log(button.dataset.stateClose);
            if (button.dataset.stateClose !== undefined) {
                gsap.fromTo(button.querySelector('span'), { rotationX: -180, autoAlpha: 0 }, { autoAlpha: 1, duration: 1, rotationX: 0 });
                button.querySelector('span').innerHTML = button.dataset.stateClose;
            }
        } else {

            menuContent.hide();
            if (button.dataset.stateOpen !== undefined) {
                gsap.fromTo(button.querySelector('span'), { rotationX: -180, autoAlpha: 0 }, { autoAlpha: 1, duration: 1, rotationX: 0 });
                button.querySelector('span').innerHTML = button.dataset.stateOpen;
            }

            // buttonIconTransform.reverse();
        }
    });
})




let tabs = {
    tab: '.mobile-menu__tab',
    activeClass: '.active',
}

function tabHandle(config) {
    let tabArray = document.querySelectorAll(config.tab);
    tabArray.forEach(singleTab => singleTab.addEventListener('click', switchTab));

    function switchTab(evt) {
        document.querySelector(`${config.tab}${config.activeClass}`).classList.remove(config.activeClass.replace(/\./, ''));
        this.classList.add(config.activeClass.replace(/\./, ''));
    }
}
tabHandle(tabs);



let buttonIconTransform = new TimelineMax({ paused: true });
buttonIconTransform.to('.mobile-tablet-menu-button line', {
    rotation: function(some, target) {
        if (+target.dataset.number === 2) return -45;
        if (+target.dataset.number === 1) return 45;
    },
    x: function(some, target) {
        // if (+target.dataset.number === 1) return '5px';
        // if (+target.dataset.number === 2) return '2px';
        // if (target.dataset.number === '2') return -45;
    },
    y: function(some, target) {
        // if (+target.dataset.number === 1) return '0';
        if (+target.dataset.number === 2) return '5px';
        // if (target.dataset.number === '2') return -45;
    },
    transformOrigin: "10px 10px"

})