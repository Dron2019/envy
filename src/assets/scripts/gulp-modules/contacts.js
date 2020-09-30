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
            marginTop: parseInt(getComputedStyle(el).marginTop),
            autoAlpha: 1,
        }, {
            duration: 0.3,
            marginTop: 0,
            autoAlpha: 0,
            height: 0,
        });
    } else {
        gsap.fromTo(el, {
            height: 0,
            autoAlpha: 0,
            marginTop: 0,
        }, {
            duration: 0.3,
            height: function(e, target) {
                return target.scrollHeight;
            },
            marginTop: '',
            autoAlpha: 1,
        });
    }
};


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