let menuButton = document.querySelector('.mobile-tablet-menu-button'),
    menuContent = document.querySelector('.header-bottom__menu');
menuContent.hide = function() {
    this.style.opacity = 0;
    this.style.pointerEvents = 'none';
}
menuContent.show = function() {
    this.style.opacity = 1;
    this.style.pointerEvents = 'all';
}

menuButton.addEventListener('click', function(evt) {
    menuButton.classList.toggle('opened');
    if (menuButton.classList.contains('opened')) {
        // buttonIconTransform.play();
        menuContent.show();
        menuButton.querySelector('span').innerHTML = menuButton.dataset.stateClose;
    } else {

        menuContent.hide();
        menuButton.querySelector('span').innerHTML = menuButton.dataset.stateOpen;

        // buttonIconTransform.reverse();
    }
});










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