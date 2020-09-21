/**Каталог выпадайка */
const dropdownHandlerObject = {
    parentSelector: '.goods-dropdown',
    childArticle: '.goods-dropdown__article',
    childTitle: '.goods-dropdown__article-title',
    childcontent: '.goods-dropdown__article-content',
    customCallback: function(title, trnsfrmValue) {
        title.querySelector('.icon--birdy').style.transform = `rotate(${trnsfrmValue}deg)`;
    }

}
const filterItemsDropdown = {
    parentSelector: '.goods-dropdown-filter',
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
dropDownMenuHandling(filterItemsDropdown);






if (document.documentElement.clientWidth < 576) {
    innerCatalogueMobilePopup();
}

function innerCatalogueMobilePopup() {
    let filterCall = document.querySelector('.filter-call-js');
    let filterCallList = document.querySelectorAll('.filter-call-js');
    let container = document.querySelector('.invisible-block');
    let transferBlock = document.querySelector('.goods-dropdown-filter');
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
        transferBlock = document.querySelector(this.dataset.content);
        transferBlock.parent = transferBlock.parentElement;
        transferBlock.prevSibling = transferBlock.previousElementSibling;
        setStyles(container, stylePopupOpened);
        show(transferBlock);
        container.querySelector('.button-std').insertAdjacentElement('beforebegin', transferBlock);
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