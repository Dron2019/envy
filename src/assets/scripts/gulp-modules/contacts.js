/* beautify preserve:start */

/* beautify preserve:end */


let contactFormTimeRadio = document.querySelector('.time-radio-js'),
    contactFormTimeInput = document.querySelector('.time-group-js'),
    $timeInputs = document.querySelectorAll('input[name=time],input[name=time-input]');


$timeInputs.forEach(input => {
    input.addEventListener('change', function(evt) {
        // console.log(contactFormTimeRadio.checked);
        changeDisplaying(contactFormTimeInput.closest('.input-group'), contactFormTimeRadio.checked)
    });
});


function changeDisplaying(el, status) {
    if (!status) {
        console.log();
        el.querySelector('input').value = '';
        gsap.fromTo(el, {
            height: function(e, target) {
                return getComputedStyle(target).height;
            },
            // marginTop: parseInt(getComputedStyle(el).marginTop),
            autoAlpha: 1,
        }, {
            duration: 0.3,
            // marginTop: 0,
            autoAlpha: 0,
            height: 0,
        });
    } else {
        let tl = gsap.timeline()
        tl.fromTo(el, {
            height: 0,

        }, {
            duration: 0.3,
            height: function(e, target) {
                return target.scrollHeight;
            },
        });
        tl.fromTo(el, {
            autoAlpha: 0,
        }, {
            duration: 0.3,
            autoAlpha: 1,
        });

    }
}


let target = {};
let proxy = new Proxy(target, {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 0; // значение по умолчанию
        }
    }
}); // пустой handler

// proxy.test = 5; // записываем в прокси (1)



let a = ['qwe', 'rty', 'uioе', 'qqsd'];

function longestWord(arr) {
    let max = (arr.reduce((max = "", word, index) => {
        if (word.length > max.length) max = arr[index];
        return max;
    }));

    return `${max} - самое длинное слово(${max.length} символов)`
}

console.log(longestWord(a));


function cookies() {
    elem = {};

    document.cookie.split(';').forEach(el => {
        var tempArr = el.split('=');
        elem[tempArr[0]] = tempArr[1];
        console.log(elem);


    })
    return elem;
};
cookies();