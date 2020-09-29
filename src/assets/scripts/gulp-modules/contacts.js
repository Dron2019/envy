/* beautify preserve:start */
@@include('../libs/datetimepicker/datetimepicker.js')
/* beautify preserve:end */

$.datetimepicker.setLocale('en');
$('input[name=time-input]').datetimepicker({});
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
        el.querySelector('input').value = '';
        gsap.fromTo(el, {
            height: function(e, target) {
                return getComputedStyle(target).height;
            },
            autoAlpha: 1,
        }, {
            autoAlpha: 0,
            height: 0,
        });
    } else {
        gsap.fromTo(el, {
            height: 0,
            autoAlpha: 0,
        }, {
            height: function(e, target) {
                return target.scrollHeight;
            },
            autoAlpha: 1,
        });
    }
}