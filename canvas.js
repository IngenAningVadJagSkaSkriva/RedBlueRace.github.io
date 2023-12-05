const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.height = 200;
canvas.width = canvas.height * 2;
var x = Math.round(canvas.width / 2);
var y = Math.round(canvas.height / 2);
var ox = x;
var oy = y;
var x2 = canvas.width / 10;
var y2 = canvas.height / 10;
var fruitX = (canvas.width / 10) * 9;
var fruitY = (canvas.height / 10) * 9;
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
var fatcount2 = 40;
var division2 = 1.5;
var red = 0;
var blue = 0;

    function RB(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

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

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "ArrowDown":
            if (speedY < 1) speedY += 0.1;
            break;
        case "ArrowUp":
            if (speedY > -1) speedY -= 0.1;
            break;
        case "ArrowLeft":
            if (speedX > -1) speedX -= 0.1;
            break;
        case "ArrowRight":
            if (speedX < 1) speedX += 0.1;
            break;
        case "e":
            alert(xt);
            alert(yt);
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);

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
            }
        }
    }

}


//game
var game = () => {
    if(x >= canvas.width || x <= 0) {
        speedX = 0 - speedX;
        if(x > canvas.width) {
            x = canvas.width - 1;
        } else if(x < 0) {
            x = 1;
        }

    }
    if(y >= canvas.height - 1 || y <= 1) {
        speedY = 0 - speedY;
        if(y > canvas.height) {
            y = canvas.height - 1;
        } else if(y < 0) {
            y = 1;
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
    xA += speedX;
    yA += speedY;
    speedX2 = test(x2,y2,fruitX,fruitY,"X") / division2;
    speedY2 = test(x2,y2,fruitX,fruitY,"Y") / division2;
    xA2 += speedX2;
    yA2 += speedY2;
    x2 = Math.floor(xA2);
    y2 = Math.floor(yA2);
    x = Math.floor(xA);
    y = Math.floor(yA);
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            map[i + fruitY][j + fruitX] = 4;
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
    } else if(map[y2][x2] == 4) {
        blue++;
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                map[i + fruitY][j + fruitX] = null;
            }
        }
        fruitX = RB(0,canvas.width - 10);
        fruitY = RB(0,canvas.height - 10);
        if(division2 > 0.5) division2 -= 0.05;
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
},100);
