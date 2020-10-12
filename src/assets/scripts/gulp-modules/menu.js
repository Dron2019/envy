let menuButtons = document.querySelectorAll('.mobile-tablet-menu-button-js'),
    menuContent = document.querySelector('.mobile-menu-js');
menuContent.hide = function() {
    this.style.opacity = 0;
    this.style.pointerEvents = 'none';
    document.documentElement.style.overflow = '';
}
menuContent.show = function() {
    this.style.opacity = 1;
    this.style.pointerEvents = 'all';
    document.documentElement.style.overflow = 'hidden';

}

menuButtons.forEach(button => {
    button.addEventListener('click', function(evt) {
        button.classList.toggle('opened');
        let openedGroup = button.querySelector('.open-show'),
            closedGroup = button.querySelector('.close-show');

        let tl = new TimelineMax({ paused: true, duration: 0.7 })
            .fromTo(openedGroup.querySelectorAll('line'), { scale: 1 }, { duration: 0.2, scale: 0 }, '<')
            .to(closedGroup, { duration: 0.2, autoAlpha: 1 })
            .fromTo(closedGroup.querySelectorAll('line'), { scale: 0 }, { duration: 0.2, scale: 1 }, '<')
        if (button.classList.contains('opened')) {
            // buttonIconTransform.play();
            menuContent.show();
            console.log(button.dataset.stateClose);
            if (button.dataset.stateClose !== undefined) {
                tl.play();
                button.querySelector('span').innerHTML = button.dataset.stateClose;
            }
        } else {

            menuContent.hide();
            if (button.dataset.stateOpen !== undefined) {
                tl.reverse(0);
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
});


/**Header Mobile pining */
// if (document.documentElement.clientWidth < 576) {
var header = new Headroom(document.querySelector('header'), {
    offset: 120,
});
header.init();
// }