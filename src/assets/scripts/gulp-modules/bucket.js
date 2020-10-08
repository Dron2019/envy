/* eslint-disable no-undef */
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
        el.addEventListener('click', function() {
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
    // document.querySelector(`[data-id=${idObject[el.id]}]`).style.pointerEvents = 'none';
    // document.querySelector(`[data-id=${idObject[el.id]}]`).style.filter = 'opacity(0.5)';
    // el.addEventListener('click', function(evt) {
    //     for (const key in idObject) {
    //         if (idObject.hasOwnProperty(key)) {
    //             const element = idObject[key];
    //             document.querySelector(`[data-id=${element}]`).style.pointerEvents = 'none';
    //             document.querySelector(`[data-id=${element}]`).style.filter = 'opacity(0.5)';
    //         }
    //     }
    //     document.querySelector(`[data-id=${el.id}]`).style.pointerEvents = 'all';
    //     document.querySelector(`[data-id=${el.id}]`).style.filter = 'opacity(1)';
    // });
});

noSignUpForm.querySelectorAll('select').forEach((select, index) => {
        select.addEventListener('change', function() {
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




/**Выбор отделения новой почты */


const NOVA_KEY = `86d26ccd9042dd62305b46e07eb02b26`;
const NOVA_URL = `https://api.novaposhta.ua/v2.0/json/`;
let searchInput = document.querySelector('.nova-city-search-js');
let citySearchResult = document.querySelector('.nova-city-search-results-js');
let warehouseBlock = document.querySelector('#otdeleniye');

warehouseBlock.addEventListener('change', function() {
    console.log(this.value);
    console.log();
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!noSignUpForm.querySelector(`input[name=${this.id}]`)) {
        noSignUpForm.querySelector(`input[name=${this.id}]`).value = this.value
    } else {

        noSignUpForm.insertAdjacentHTML('beforeend', `
            <div class="input-group hidden">
                <input type="hidden" name="${this.id}" value="${this.value}">
            </div>
        `);
    }
});
let NOVA_WAREHOUSE_BY_CITY = {
    "modelName": "AddressGeneral",
    "calledMethod": "getWarehouses",
    "methodProperties": {
        "Language": "ru",
        "Warehouse": "1"
    },
    "apiKey": NOVA_KEY
}

let novaCitySearch = {
    modelName: "Address",
    calledMethod: "getCities",
    methodProperties: {
        FindByString: "",
    },
    apiKey: NOVA_KEY
};



searchInput.addEventListener('focus', function() {
    citySearchResult.style.visibility = 'visible';
});
searchInput.addEventListener('blur', function() {
    setTimeout(() => {
        citySearchResult.style.visibility = 'hidden';
    }, 100);
});



let citySearchDebounce = throttle((evt) => {
    novaCitySearch.methodProperties.FindByString = evt.target.value;
    // if (evt.target.value.length < 3) return;
    if (evt.target.value.length < 3) {
        citySearchResult.innerHTML = '';
        return;
    }
    novaFetch(NOVA_URL, novaCitySearch, (el) => {
        citySearchResult.innerHTML = '';
        el.data.forEach(city => {
            citySearchResult.insertAdjacentElement('beforeend', getOptionWithHandler(city));
        })
    })

}, 500)
searchInput.addEventListener('input', function(evt) {
    citySearchDebounce(evt)
});


function getOptionWithHandler(data) {
    let div = document.createElement('div');
    div.innerHTML = data.DescriptionRu;
    div.setAttribute('value', data.Ref);
    div.addEventListener('click', function(evt) {
        putWarehouses(this);
        searchInput.value = evt.target.innerHTML;

    });
    return div;
}

function putWarehouses(city) {
    NOVA_WAREHOUSE_BY_CITY.methodProperties.CityRef = city.getAttribute('value');
    // NOVA_HEADER.body = JSON.stringify(NOVA_WAREHOUSE_BY_CITY);
    novaFetch(NOVA_URL, NOVA_WAREHOUSE_BY_CITY, (el) => {
        let warehouseBlock = document.querySelector('#otdeleniye');
        warehouseBlock.innerHTML = '';
        warehouseBlock.insertAdjacentHTML('beforeend', `
            <option value="">Выберите отделение</option>
        `);
        el.data.forEach(warehouse => {
            // warehouseBlock.insertAdjacentHTML('beforeend', `
            //     <option value="${warehouse.Ref}">${warehouse.Description}</option>
            // `);
            warehouseBlock.insertAdjacentHTML('beforeend', `
                <option value="${warehouse.Description}">${warehouse.Description}</option>
            `);
        });
        gsap.fromTo(warehouseBlock, { background: 'rgb(255, 130, 152)' }, { background: 'white' })
    });
}

function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        func.apply(this, arguments); // (1)
        isThrottled = true;
        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}



function novaFetch(url, body, callback) {
    const NOVA_HEADER = {
        headers: {
            "content-type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(body),
        mode: 'cors',
    };
    fetch(url, NOVA_HEADER)
        .then(el => el.json())
        .then(el => {
            callback(el)
        })
}

/**Выбор отделения новой почты  END*/



let svgDash = document.querySelector('.dashoffset');
console.log(svgDash.querySelector('circle').getTotalLength());
/*
*stroke-dashoffset: 1.519104;
    stroke-dasharray: 90.51910400390625 89.519104;

*/