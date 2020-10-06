/**
    * Табы
    * 
    * @param {string} navContainer - Селектор контейнера
    * @returns nothing

*/

function tab(navContainer) {
    navContainer = document.querySelector(navContainer);
    let switchClassName = 'active';
    let tabList = {};
    let tabs = navContainer.querySelectorAll('.tab');
    let activeContentContainer = document.createElement('div');
    navContainer.append(activeContentContainer);
    tabList.activeContentContainer = activeContentContainer;
    tabs.forEach((el, index) => {
        el.selfKey = el.classList[0] + index;
        tabList[el.classList[0] + index] = {
            link: '.' + el.classList[0] + index,
            contentElement: el.querySelector('.tab__content'),
        };
        el.addEventListener('click', function(evt) {
            if (tabList.activeContentContainer.querySelector('div') !== null) {
                tabList.activeContentContainer.querySelector('div').remove();
            }
            tabList.activeContentContainer.append(tabList[this.selfKey].contentElement)
            navContainer.querySelector('.' + switchClassName).classList.remove(switchClassName)
            el.classList.add(switchClassName);
        });
    });

    tabs[0].classList.add(switchClassName)
    tabList.activeContentContainer.append(tabList[tabs[0].selfKey].contentElement)

    function addTabsFunctionalStyling() {
        navContainer.insertAdjacentHTML('afterend', `
            <style>
                    .tab>.tab__content {
                        opacity:0;
                        height:0;
                        padding:0;
                        margin:0;
                        visibility:hidden;
                        width:0;
                        pointer-events:none;
                        overflow:hidden;
                    }
            </style>
        `)
    }
    addTabsFunctionalStyling();
}
tab('.tabs');






/**Оформление заказа не зарегистрированого пользователя */

let noSignUpForm = document.querySelector('.order-no-sign-up');
let idObject = {};
noSignUpForm.querySelectorAll('.label-radio-group input').forEach(el => {
    idObject[el.id] = el.id;
    el.addEventListener('click', function(evt) {
        for (const key in idObject) {
            if (idObject.hasOwnProperty(key)) {
                const element = idObject[key];
                document.querySelector(`[data-id=${element}]`).style.pointerEvents = 'none';
                document.querySelector(`[data-id=${element}]`).style.filter = 'opacity(0.5)';
            }
        }
        document.querySelector(`[data-id=${el.id}]`).style.pointerEvents = 'all';
        document.querySelector(`[data-id=${el.id}]`).style.filter = 'opacity(1)';
    });
});

noSignUpForm.querySelectorAll('select').forEach((select, index) => {
        select.addEventListener('change', function(evt) {
            if (noSignUpForm.querySelector(`#${select.dataset.id}${index}`) === null) {
                noSignUpForm.insertAdjacentHTML('beforeend', `
                <div id="${select.dataset.id}${index}" class="input-group hidden">
                    <input type="hidden" name="${this.id}" value="${this.value}">
                </div>
            `);
            } else {
                noSignUpForm.querySelector(`[name=${this.id}`).value = this.value;
            }
        });
    })
    /**Оформление заказа не зарегистрированого пользователя END */