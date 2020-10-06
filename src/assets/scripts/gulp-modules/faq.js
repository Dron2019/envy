const filterItemsDropdown = {
    parentSelector: '.faq',
    childArticle: '.faq-part',
    childTitle: '.faq-part__question',
    childcontent: '.faq-part__answer',
    customCallback: function(title, trnsfrmValue) {
        let answerBlock = title.querySelector(this.childcontent);
        gsap.to(title.querySelector('.faq-part__close'), {
            rotate: trnsfrmValue
        });
        gsap.set(title.querySelector(this.childTitle), { perspective: 10, z: 10 })
        gsap.fromTo(title.querySelector(this.childcontent + ' div'), { y: -30 }, { y: 0 });
        if (trnsfrmValue == 0) {
            gsap.fromTo(
                answerBlock, { height: 0 }, { height: function(e, target) { return answerBlock.scrollHeight; } })
        } else {
            gsap.fromTo(
                answerBlock, {
                    height: answerBlock.getBoundingClientRect().height,
                }, {
                    marginTop: 0,
                    height: 0,
                })

        }
    }

}
dropDownMenuHandling(filterItemsDropdown)

function dropDownMenuHandling(config) {
    let { childArticle, parentSelector, childTitle, childcontent } = config;
    let parrentEl = document.querySelector(parentSelector);
    parrentEl.querySelectorAll(childArticle).forEach((article, index) => hide(article.querySelector(childcontent)));
    parrentEl.querySelectorAll(childArticle).forEach((article, index) => {
        article.querySelector(childTitle).status = true;
        article.querySelector(childTitle).addEventListener('click', function(evt) {
            this.status = !this.status;
            if (this.status) {


                config.customCallback(article, 180);

                hide(article.querySelector(childcontent));

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
        el.style.margin = 0;
        el.style.overflow = 'hidden';
    }

    function show(el) {
        el.style.opacity = 1;
        el.style.height = '';
        el.style.padding = '';
        el.style.width = '';
        el.style.opacity = 1;
        el.style.margin = '';
        el.style.overflow = 'auto';
    }
};