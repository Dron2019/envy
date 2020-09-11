/* beautify preserve:start */

/* beautify preserve:end */

let buttons = document.querySelectorAll('.button-std');
buttons.forEach(buttonHoverEffect);

function buttonHoverEffect(button) {
    colors = getComputedStyle(button).background.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/gi);
    if (colors === null) return false;
    button.color1 = colors[0].replace('rgb', 'rgba');
    button.color2 = colors[1].replace('rgb', 'rgba');
    button.addEventListener('mouseenter', function(evt) {
        gsap.to(button, 2, { background: ` linear-gradient(267.71deg, ${colors[1]} 0%, ${colors[0]} 100%) repeat` });
    });
    button.addEventListener('mouseleave', function(evt) {
        gsap.to(button, 2, { background: `linear-gradient(267.71deg, ${colors[0]} 0%, ${colors[1]} 100%) repeat` });
        // gsap.to(button, { x: 0 });
    });
}