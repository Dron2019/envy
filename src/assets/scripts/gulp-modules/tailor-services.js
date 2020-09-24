if (document.documentElement.clientWidth < 576) {
    innerCatalogueMobilePopup();
}

function innerCatalogueMobilePopup() {
    let filterCall = document.querySelector('.mobile-open-button-js');
    let filterCallList = document.querySelectorAll('.mobile-open-button-js');
    let container = document.querySelector('.invisible-block');
    let transferBlock = document.querySelectorAll('.faq-menu a');
    var stylePopupOpened = {
        position: `fixed`,
        left: `0`,
        top: `0`,
        width: `100%`,
        display: `flex`,
        zIndex: 10,
        background: `white`,
        transformOrigin: `top`,
    };

    filterCallList.forEach(callButton => {
        callButton.addEventListener('click', openPopup);
        container.querySelector('.close').addEventListener('click', closePopup);
        // window.addEventListener('resize', () => {
        //     container.querySelector('.close').removeEventListener('click', closePopup);
        //     callButton.removeEventListener('click', openPopup);
        //     innerCatalogueMobilePopup();
        // })
    });

    function setStyles(el, styles = {}) {
        for (const key in styles) {
            el.style[key] = styles[key];
        }
    }

    function openPopup(evt) {
        transferBlock = document.querySelectorAll(this.dataset.content);
        transferBlock.parent = transferBlock.parentElement;
        transferBlock.prevSibling = transferBlock.previousElementSibling;
        setStyles(container, stylePopupOpened);
        // show(transferBlock);
        console.log(container);
        transferBlock.forEach(elem => {
            container.insertAdjacentElement('beforeend', elem);
        })
        console.log(container.children);
        gsap.fromTo(container.children, {
            y: function(some, target) {
                return -100;
                // return -target.getBoundingClientRect().height;
            },
            autoAlpha: 0,

        }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.025,
            ease: Power4.easeOut,
        });
    };

    function closePopup(evt) {
        let tl = new TimelineLite();
        tl.fromTo(container.children, { y: 0, autoAlpha: 1, }, {
            y: function(some, target) {
                return -100;
                // return target.getBoundingClientRect().height * -1;
            },
            ease: null,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.025,
        })

        .add(function() {
            container.style.display = `none`;
        })
        transferBlock.parent.insertAdjacentElement('afterend', transferBlock);
        hide(transferBlock);
    };

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
}