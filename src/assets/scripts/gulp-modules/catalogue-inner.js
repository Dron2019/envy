/* beautify preserve:start */
@@include('../libs/ion.rangeSlider/js/ion.rangeSlider.min.js')
/* beautify preserve:end */

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
document.querySelector(dropdownHandlerObject.parentSelector + ' ' + dropdownHandlerObject.childTitle).click();
document.querySelector(dropdownHandlerObject.parentSelector + ' ' + filterItemsDropdown.childTitle).click();






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


/**ranges */

let GET = (function() {
    let array = window.location.search.replace('?', '').split('&').map(el => el.split('='));
    let obj = {};
    array.forEach(el => obj[el[0]] = el[1]);
    if (obj.rooms === undefined) obj.rooms = '1';
    return obj;
})();
let ranges = document.querySelectorAll(".ion-range-block");


ranges.forEach(rangeBlock => {
    console.log(rangeBlock);
    $(rangeBlock.querySelector('.js-range-slider')).ionRangeSlider({
        type: "double",
        min: rangeBlock.dataset.min || 0,
        max: rangeBlock.dataset.max || 901,
        from: GET['arrFilter_P1_MIN'] || rangeBlock.dataset.min || 0,
        to: GET['arrFilter_P1_MAX'] || rangeBlock.dataset.max || 901,
        hide_from_to: 1,
        hide_min_max: 1,
        onChange: function(e, r) {
            e.showInputs.min.value = e.from;
            e.showInputs.max.value = e.to;
            // console.log(r);
        },
        onStart: function(e) {
            configSideValueInputs(e);
        },
    });
    // console.log($(rangeBlock.querySelector('.js-range-slider')).data("ionRangeSlider"));
    rangeBlock.ionGlobalObject = $(rangeBlock.querySelector('.js-range-slider')).data("ionRangeSlider");
});


function configSideValueInputs(ionObject, r) {
    let minInput = ionObject.slider[0].closest('.ion-range-block').querySelector('.min'),
        maxInput = ionObject.slider[0].closest('.ion-range-block').querySelector('.max');
    minInput.value = ionObject.from;
    maxInput.value = ionObject.to;
    minInput.addEventListener('change', function(evt) {
        this.closest('.ion-range-block').ionGlobalObject.update({
            from: minInput.value,
            to: maxInput.value
        });
        console.log(this.value > maxInput.value);
        if (this.value > maxInput.value) this.value = maxInput.value;
        // if (this.value > this.closest('.ion-range-block').ionGlobalObject.from) this.value = this.closest('.ion-range-block').ionGlobalObject.from;
    });
    maxInput.addEventListener('change', function(evt) {
        this.closest('.ion-range-block').ionGlobalObject.update({
            from: minInput.value,
            to: maxInput.value
        });
        if (this.value < minInput.value) this.value = minInput.value;
        // if (this.value > this.closest('.ion-range-block').ionGlobalObject.to) this.value = this.closest('.ion-range-block').ionGlobalObject.to;
        // if (this.value < this.closest('.ion-range-block').ionGlobalObject.from) this.value = this.closest('.ion-range-block').ionGlobalObject.from;
    });

    ionObject.showInputs = {
        min: minInput,
        max: maxInput,
    }

};





/**СОртировка по изменению селекта */

let sortingSelects = document.querySelectorAll('.sort-js');
sortingSelects.forEach(sendSortParams);

function sendSortParams(selectGroup) {
    selectGroup = selectGroup.querySelector('select');
    selectGroup.addEventListener('change', function(evt) {
        console.log(this.value);
        changeLocation(this.value)
    })
}

function changeLocation(newGETS) {
    window.location.href =
        window.location.origin + window.location.pathname + newGETS;;
};