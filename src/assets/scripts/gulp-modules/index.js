/* beautify preserve:start */

/* beautify preserve:end */

let buttons = document.querySelectorAll('.button-std');
buttons.forEach(buttonHoverEffect);

function buttonHoverEffect(button) {
    colors = getComputedStyle(button).background.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/gi);
    if (colors === null) {
        colors = [];
        button.color1 = `rgba(255,255,255,0)`;
        button.color2 = `rgba(255,255,255,0)`;
        return;

    } else {

        button.color1 = colors[0].replace('rgb', 'rgba') || `rgb(255,255,255,0)`;
        button.color2 = colors[1].replace('rgb', 'rgba') || `rgb(255,255,255,0)`;
    }
    button.addEventListener('mouseenter', function(evt) {
        gsap.to(button, { duration: 0.5, background: `  linear-gradient(267.71deg, #FF8298 0%, #FFDEAC 100%)` });
    });
    button.addEventListener('mouseout', function(evt) {
        gsap.to(button, { duration: 0.2, background: `linear-gradient(267.71deg, ${ button.color1} 0%, ${ button.color2} 100%) repeat` });
        // gsap.to(button, { x: 0 });
    });
}