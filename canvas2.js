const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 200;
canvas.width = canvas.height * 2;
var x = Math.round(canvas.width / 10) * 9;
var y = Math.round(canvas.height / 10) * 9;
var ox = x;
var oy = y;
var x2 = canvas.width / 10;
var y2 = canvas.height / 10;
var fruitX = Math.round(canvas.width / 2);
var fruitY = Math.round(canvas.height / 2);
var xA2 = x2;
var yA2 = y2;
var xA = x;
var yA = y;
var ox2 = x2;
var oy2 = y2;
var speedX = 0;
var speedY = 0;
var speedX2 = 0;
var speedY2 = 0;
var xt = [];
var yt = [];
var xt2 = [];
var yt2 = [];
var fatcount = 20;
var fatcount2 = 20;
var division2 = 1.5;
var red = 0;
var blue = 0;
var sred = 0;
var sblue = 0;
var speedTime = 10000;

    function RB(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var sfruitX = RB(0,canvas.width);
    var sfruitY = RB(0,canvas.height);

for(let i = 0; i < (canvas.height * canvas.width); i++) {
    xt[i] = 0;
    yt[i] = 0;
    xt2[i] = 0;
    yt2[i] = 0;
}

function RB(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

x2 = RB(0, canvas.width);
y2 = RB(0, canvas.height);

var pos = (a) => {
    if (a < 0) {
        return (0 - a);
    } else if (a >= 0) {
        return a;
    }
}

var test = (x, y, x2, y2, XorY) => {
    let aX = x - x2;
    let aY = y - y2;
    let sumX = 0 - aX;
    let sumY = 0 - aY;
    let division = (pos(aX) + pos(aY));
    if (XorY == "X") {
        return sumX / division;
    } else if (XorY == "Y") {
        return sumY / division;
    }
}

var array2D = (y, x) => {
    var array = [];
    for (let i = 0; i < y; i++) {
        array[i] = [];
        for (let j = 0; j < x; j++) {
            array[i][j] = null;
        }
    }
    return array;
}
var map = array2D(canvas.height, canvas.width);

var keys = [];
onkeydown = onkeyup = (e) => {
    keys[e.keyCode] = e.type == 'keydown';
    if(keys[39]) { // right arrow
        if(speedX < 1) speedX += 0.1;
    }
    if(keys[37]) { // left arrow
        if(speedX > -1) speedX -= 0.1;
    }
    if(keys[38]) { // up arrow
        if(speedY > -1) speedY -= 0.1;
    }
    if(keys[40]) { // down arrow
        if(speedY < 1) speedY += 0.1;
    }
    if(keys[87]) { // w
        if(speedY2 > -1) speedY2 -= 0.1;
    }
    if(keys[83]) { // s
        if(speedY2 < 1) speedY2 += 0.1;
    }
    if(keys[68]) { // d
        if(speedX2 < 1) speedX2 += 0.1;
    }
    if(keys[65]) { // a
        if(speedX2 > -1) speedX2 -= 0.1;
    }
}

window.addEventListener('resize', () => {
    drawing();
})

var drawing = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("RED: "+red+" BLUE: "+blue,0,canvas.height/9,canvas.width);
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            if (map[i][j] == 1) {
                ctx.fillStyle = "white";
                ctx.fillRect(j, i, 1, 1);
            } else if (map[i][j] == 2) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(j, i, 1, 1);
            } else if (map[i][j] == 3) {
                ctx.fillStyle = "red";
                ctx.fillRect(j, i, 1, 1);
            } else if(map[i][j] == 4) {
                ctx.fillStyle = "brown";
                ctx.fillRect(j,i,1,1);
            } else if(map[i][j] == 5) {
                ctx.fillStyle = "blue";
                ctx.fillRect(j,i,1,1);
            } else if(map[i][j] == 6) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(j,i,1,1);
            }
        }
    }

}


//game
var game = () => {
    if(x >= canvas.width - 2 || x <= 2) {
        speedX = 0 - speedX;
        if(x > canvas.width) {
            x = canvas.width - 4;
            xA = x;
        } else if(x < 2) {
            x = 4;
            xA = x;

        }

    }
    if(y >= canvas.height - 2 || y <= 2) {
        speedY = 0 - speedY;
        if(y > canvas.height - 2) {
            y = canvas.height - 4;
            yA = y;
        } else if(y < 2) {
            y = 4;
            yA = y;
        }
    }
    if(x2 >= canvas.width - 2 || x2 <= 2) {
        speedX2 = 0 - speedX2;
        if(x2 > canvas.width) {
            x2 = canvas.width - 4;
            xA2 = x2;
        } else if(x2 < 2) {
            x2 = 4;
            xA2 = x2;

        }

    }
    if(y2 >= canvas.height - 2 || y2 <= 2) {
        speedY2 = 0 - speedY2;
        if(y2 > canvas.height - 2) {
            y2 = canvas.height - 4;
            yA2 = y2;
        } else if(y2 < 2) {
            y2 = 4;
            yA2 = y2;
        }
    }
    for(let i = fatcount + 1; i > -1; i--) {
        xt[i + 1] = xt[i];
        xt[0] = x;
        yt[i + 1] = yt[i];
        yt[0] = y;
    }
    for(let i = fatcount2 + 1; i > -1; i--) {
        xt2[i + 1] = xt2[i];
        xt2[0] = x2;
        yt2[i + 1] = yt2[i];
        yt2[0] = y2;
    }
    ox = x;
    oy = y;
    ox2 = x2;
    oy2 = y2;
    if(sred == 1) {
        speedX *= 2;
        speedY *= 2;
    }
    xA += speedX;
    yA += speedY;
    if(sred == 1) {
        speedX /= 2;
        speedY /= 2;
    }
    if(sblue == 1) {
        speedX2 *= 2;
        speedY2 *= 2;
    }
    xA2 += speedX2;
    yA2 += speedY2;
    if(sblue == 1) {
        speedX2 /= 2;
        speedY2 /= 2;
    }
    x2 = Math.floor(xA2);
    y2 = Math.floor(yA2);
    x = Math.floor(xA);
    y = Math.floor(yA);
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            map[i + fruitY][j + fruitX] = 4;
            if(i < 5 && j < 5) map[i + sfruitY][j + sfruitX] = 6;
        }
    }
    if(map[y][x] == 4) {
        red++;
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                map[i + fruitY][j + fruitX] = null;
            }
        }
        fruitX = RB(0,canvas.width - 10);
        fruitY = RB(0,canvas.height - 10);
        if(division2 < 1.5) {
            division2 += 0.05;
        }
    } else if(map[y2][x2] == 4) {
        blue++;
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                map[i + fruitY][j + fruitX] = null;
            }
        }
        fruitX = RB(0,canvas.width - 10);
        fruitY = RB(0,canvas.height - 10);
        if(division2 > 0.5) {
            division2 -= 0.05;
        }
    }
    if(map[y][x] == 6) {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                map[i + sfruitY][j + sfruitX] = null;
            }
        }
        sfruitX = RB(0,canvas.width - 10);
        sfruitY = RB(0,canvas.height - 10);
        if(sred != 1) setTimeout(() => {
            sred = 0;
        }, speedTime);
        sred = 1;

    } else if(map[y2][x2] == 6) {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                map[i + sfruitY][j + sfruitX] = null;
            }
        }
        sfruitX = RB(0,canvas.width - 10);
        sfruitY = RB(0,canvas.height - 10);
        if(sblue != 1) setTimeout(() => {
            sblue = 0;
        }, speedTime);
        sblue = 1;

    }
    map[yt[fatcount]][xt[fatcount]] = null;
    map[yt2[fatcount2]][xt2[fatcount2]] = null;
    map[oy][ox] = 3;
    map[oy2][ox2] = 5;
    map[y2][x2] = 2;
    map[y][x] = 1;
    drawing();
    setTimeout(() => {
        requestAnimationFrame(game);
    }, 1000 / canvas.height)
}
game();
drawing();
//slowdown
setInterval(() => {
    if(speedX < 0.1 && speedX > -0.1) speedX = 0;
    if(speedY < 0.1 && speedY > -0.1) speedY = 0;
    if(speedX > 0) {
        speedX -= 0.05;
    } else if(speedX < 0) speedX += 0.05;
    if(speedY > 0) {
        speedY -= 0.05;
    } else if(speedY < 0) {
        speedY += 0.05;
    }
    if(speedX2 < 0.1 && speedX2 > -0.1) speedX2 = 0;
    if(speedY2 < 0.1 && speedY2 > -0.1) speedY2 = 0;
    if(speedX2 > 0) {
        speedX2 -= 0.05;
    } else if(speedX2 < 0) speedX2 += 0.05;
    if(speedY2 > 0) {
        speedY2 -= 0.05;
    } else if(speedY2 < 0) {
        speedY2 += 0.05;
    }
},100);
