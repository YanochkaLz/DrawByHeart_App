const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * .85;

let text = "Draw whatever your heart desires";
ctx.fillStyle = "grey";
ctx.font = "40px Arial";
ctx.textAlign = "center";
ctx.fillText(text, canvas.width/2, 60);

const color = [...document.querySelectorAll('.color')];
const clean = document.querySelector('.clean');
const pain = document.querySelector('.pain');
let col = 'black';
let col2 = col;

let isMouseDown = false;
let cx = 0;
let cy = 0;
let arr = [];

let game = 0;
let ii = 0;

const cir = document.querySelector('.pain-circle');
const cirStyle = window.getComputedStyle(cir);
let circ_W = cirStyle.width;
let circW = +(circ_W.slice(0,-2)); 
let gameC;

const bin = document.querySelector('.bin');
const playAn = document.querySelector('.play');

clean.onclick = (e) => { // take eraser
    col = 'white';
    pain.classList.toggle('hid');
    clean.classList.toggle('hid2');
    document.body.style.cssText = `--move-x: ${e.clientX}px; --move-y: ${e.clientY}px;`
    clean.classList.toggle('cursor');
    setTimeout(Wait, 100);
}

function Wait() {  // change cursor
    clean.classList.toggle('hid2');
    pain.classList.toggle('hid');
}
   
color.forEach(elem => {   
    elem.onclick = () => {  // pick color
        if(elem.classList.contains('yellow')) {
            col = 'yellow';
            col2 = col;
        }
        else if(elem.classList.contains('green')) {
            col = 'green';
            col2 = col;
        }
        else if(elem.classList.contains('blue')) {
            col = 'blue';
            col2 = col;
        }
        else if(elem.classList.contains('pink')) {
            col = 'pink';
            col2 = col;
        }
        else if(elem.classList.contains('red')) {
            col = 'red';
            col2 = col;
        }
        else if(elem.classList.contains('black')) {
            col = 'black';
            col2 = col;
        }
        else if(elem.classList.contains('orange')) {
            col = 'orange';
            col2 = col;
        }
    }
});

document.addEventListener('mousedown', function (e) {
    isMouseDown = true;
    cx = e.clientX;
    cy = e.clientY;
    arr.push({
        x: cx,
        y: cy,
        z: col
    });
})

document.addEventListener('mouseup', function () {
    isMouseDown = false;
    arr.push({
        x: false,
        y: false,
        z: col
    });
})

document.addEventListener('mousemove', function (e) {
    if (isMouseDown) {
        ctx.beginPath();

        ctx.fillStyle = col;
        ctx.lineWidth = circW;
        ctx.strokeStyle = col;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        cx = e.clientX;
        cy = e.clientY;
        arr.push({
            x: cx,
            y: cy,
            z: col,
            k: circW
        });
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, circW / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    if(clean.classList.contains('cursor')) {
        document.body.style.cssText = `--move-x: ${e.clientX}px; --move-y: ${e.clientY}px;`
    }
    else {
        document.body.style.cssText = `--movep-x: ${e.clientX}px; --movep-y: ${e.clientY}px;`
        col = col2;
    }
})

// Animation
function Draw() {
    if (ii < arr.length - 1) {
        ctx.fillStyle = arr[ii]['z'];
        ctx.lineWidth = arr[ii+1]['k'];

        if (!arr[ii+1]['x']) { // check line breaks
            ii++;
        }
        else {
            ctx.beginPath();
            ctx.strokeStyle = arr[ii]['z'];
            ctx.moveTo(arr[ii]['x'], arr[ii]['y']);
            ctx.lineTo(arr[ii + 1]['x'], arr[ii + 1]['y']);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(arr[ii + 1]['x'], arr[ii + 1]['y'], arr[ii+1]['k'] / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ii++;
    }
    else {
        ii = 0;
        arr.length = 0;
        clearInterval(game);
    }
}

// Change size
window.addEventListener('wheel', function(e) {
    clearInterval(gameC);
    if(e.deltaY > 0 && circW > 10) {
        circW -= 1;
    }
    else if(e.deltaY < 0 && circW < 80) {
        circW += 1;
    }
    cir.setAttribute('style', `width:${circW}px; height:${circW}px; display: block;`);
    gameC = setTimeout(Circ, 1000);
});

// Change size
function Circ() {
    cir.setAttribute('style', `display: none;`);
}

// Clean
bin.onclick = () => {
    location.reload();
} 

// Animation
playAn.onclick = () => {
    if(arr.length > 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "grey";
        ctx.fillText(text, canvas.width/2, 60);
        game = setInterval(Draw, 20);
    }
} 