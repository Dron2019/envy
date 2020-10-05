/*Для страниц каталог и страница открытого товара */

/* beautify preserve:start */
@@include('../libs/magnific-popup/dist/jquery.magnific-popup.min.js')
/* beautify preserve:end */



let $prodCards = document.querySelectorAll('.product-card');
let productAddPopup = document.querySelector('.product-addition-popup-content-js');
productAddPopup.image = productAddPopup.querySelector('img');
productAddPopup.productName = productAddPopup.querySelector('.product-addition-popup-content__name');
$prodCards.forEach(card => {
    card.querySelector('.product-card__buy-button').addEventListener('click', openPopup);
    let cardImg = card.querySelector('img');
    if (cardImg.dataset.src && cardImg.dataset.hoverSrc) {
        cardImg.style.transition = `0.5s ease-out`;
        card.addEventListener('mouseenter', function(evt) {
            cardImg.style.opacity = 0.5;
            cardImg.src = cardImg.dataset.hoverSrc;


            cardImg.style.opacity = 1;

        });
        card.addEventListener('mouseleave', function(evt) {
            cardImg.src = cardImg.dataset.src;
        });
    }
});

function openPopup(evt) {
    const card = this.closest('.product-card');
    putInfoOnCard(card)
    $.magnificPopup.open({
        items: [{
            src: $(productAddPopup), // Dynamically created element
            type: 'inline'
        }, ]
    })
}

function putInfoOnCard(card) {
    // console.log(card);
    if (card !== null) {
        productAddPopup.image.src = card.querySelector('.product-card__img').src;
        productAddPopup.productName.innerHTML = card.querySelector('.product-card__name').innerText;
        return;
    }
    productAddPopup.image.src = document.querySelector('.product-page-slider__top img').src;
    productAddPopup.productName.innerHTML = document.querySelector('.product-page-content .title').innerText;

}
let separateButtons = document.querySelectorAll('.buy-button-js');
separateButtons.forEach(but => {
    but.separate = true;
    but.addEventListener('click', openPopup);
});



//корректировка поведения ссылок


let $cards = document.querySelectorAll('a.product-card');
if (document.documentElement.clientWidth > 769) {
    $cards.forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('.button-std') !== null || e.target.closest('.product-card__like-button') !== null) {
                e.preventDefault();
            }

        })
    })
} else if (document.documentElement.clientWidth < 769) {
    $cards.forEach(el => {
        el.addEventListener('click', (e) => {
            // e.preventDefault();
            if (e.target.classList.value.match(/button-std/) !== null) {
                e.preventDefault();
            }

        })
    })
};