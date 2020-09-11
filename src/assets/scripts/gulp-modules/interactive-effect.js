var canStyle = {
    // width: document.documentElement.clientWidth + 'px',
    // height: document.documentElement.clientHeight + 'px',
    position: 'fixed',
    top: '0',
    left: '0',
};
var canvas = document.querySelector('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var ctx = canvas.getContext('2d');
for (const iterator in canStyle) {
    canvas.style[iterator] = canStyle[iterator];
    console.log(canStyle[iterator]);
};
canvas.addEventListener('mousemove', (evt) => {
    canvas.mouseX = evt.clientX;
    canvas.mouseY = evt.clientY;
});
canvas.rectWidth = 100;
const point = 10;
var array = [];
const PLAYER = {
    x: 0,
    y: 0,
}


var clickArray = [];
window.addEventListener('click', function(evt) {
    clickArray.push({ x: evt.clientX, y: evt.y });
});
window.addEventListener('keypress', function(evt) {
    if (evt.code === "Space") clickArray = [];
    console.log(evt);
    switch (evt.key) {
        case 'w':
            PLAYER.y -= 10;
            break;
        case 'a':
            PLAYER.x -= 10;
            break;
        case 'd':
            PLAYER.x += 10;
            break
        case 's':
            PLAYER.y += 10;
            break

        default:
            break;
    }
});


let img = fetch('./assets/images/interactive-effect/3.jpg', {
        type: 'image/jpg'
    })
    .then(el => { return el.blob() })
    .then(el => {
        let image = window.URL.createObjectURL(el);
        canvas.image = image;

    });


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    netRender();
    renderPlayer(PLAYER);
    renderClickedItems(clickArray);
    drawCustomImage();
    drawMouseoverEffect();
    setTimeout(() => {
        requestAnimationFrame(render);
    }, 1000 / 60);
};

function drawMouseoverEffect() {
    var opacity = .5;
    // ctx.fillStyle = `rgba(0,0,0,0.5)`;
    // ctx.fillRect(canvas.mouseX - canvas.rectWidth / 2, canvas.mouseY - canvas.rectWidth / 2, canvas.rectWidth, canvas.rectWidth);
    for (x = canvas.mouseX - 12.5; x < canvas.mouseX + 25; x += 3) {
        for (y = canvas.mouseY - 12.5; y < canvas.mouseY + 25; y += 3) {
            r = Math.floor(Math.random() * 255);
            g = Math.floor(Math.random() * 255);
            b = Math.floor(Math.random() * 255);
            ctx.fillStyle = 'rgba(' + r + ',' + b + ',' + g + ',' + opacity + ')';
            ctx.fillRect(x, y, 2, 2);
        }
    }
}

function drawCustomImage() {
    let img = new Image(canvas.width, canvas.height);
    img.src = canvas.image;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function renderClickedItems(array) {
    array.forEach(el => {
        ctx.fillRect(el.x, el.y, point, point);
    })
}

function renderPlayer(cords) {
    ctx.fillRect(cords.x, cords.y, 20, 20);
}

function netRender() {
    for (i = 0; i < canvas.width; i += canvas.width / point) {
        for (k = 0; k < canvas.height; k += canvas.width / point) {
            ctx.strokeRect(k, i, canvas.width / point, canvas.width / point);
        }
        ctx.strokeRect(i, 0, canvas.width / point, canvas.width / point);
    }
}
render();