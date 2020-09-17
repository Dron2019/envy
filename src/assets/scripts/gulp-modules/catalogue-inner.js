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