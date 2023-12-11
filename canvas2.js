var single = 1;

var s = () => {
   if(single == 1) {
    if(confirm("DO YOU WANT TO PLAY 2 PLAYER MODE?")) {
        single = 0;
    } 
    } else if(single == 0) {
        if(confirm("DO YOU WANT TO PLAY SINGLE MODE?")) {
            single = 1;
        }
   }
   reset();
}
alert("PRESS SPACE TO SWITCH BETWEEN SINGLE AND TWO PLAYER MODE!");

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
var speedTime = 15000;
var rnumb = 0;
var bnumb = 0;
var rangle = 0;
var bangle = 0;
var coin = new Audio("coin.mp3");
var spring = new Audio("spring.mp3");
var goofy = new Audio("goofy.mp3");
var fast = new Audio("fast.mp3");

    function RB(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var sfruitX = RB(0,canvas.width - 10);
    var sfruitY = RB(0,canvas.height - 10);
    var wfruitX = RB(0,canvas.width - 10);
    var wfruitY = RB(0,canvas.height - 10);

for(let i = 0; i < (canvas.height * canvas.width); i++) {
    xt[i] = 0;
    yt[i] = 0;
    xt2[i] = 0;
    yt2[i] = 0;
}

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
    for (let i = 0 - y / 10; i < y; i++) {
        array[i] = [];
        for (let j = 0 - x / 10; j < x; j++) {
            array[i][j] = null;
        }
    }
    return array;
}
var map = array2D(canvas.height * 10, canvas.width * 10);

var keys = [];
onkeydown = onkeyup = (e) => {
    keys[e.keyCode] = e.type == 'keydown';
    if(rnumb == 0) {
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
    }

    if(bnumb == 0 && single == 0) {
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
    } else if(single == 1 && bnumb == 0) {
        //computer();
    }
    if(keys[32]) { //space
        s();
        keys[32] = 0;
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
                map[i][j] = null;
            } else if (map[i][j] == 2) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(j, i, 1, 1);
                map[i][j] = null;
            } else if (map[i][j] == 3) {
                ctx.fillStyle = "red";
                if((sred == 1 || rangle == 1) && RB(1,2) == 1) ctx.fillStyle = "pink";
                if(rnumb == 1) ctx.fillStyle = "DarkRed";
                ctx.fillRect(j, i, 1, 1);
            } else if(map[i][j] == 4) {
                ctx.fillStyle = "brown";
                ctx.fillRect(j,i,1,1);
            } else if(map[i][j] == 5) {
                ctx.fillStyle = "blue";
                if((sblue == 1 || bangle == 1) && RB(1,2) == 1) ctx.fillStyle = "aqua";
                if(bnumb == 1) ctx.fillStyle = "DarkBlue";
                ctx.fillRect(j,i,1,1);
            } else if(map[i][j] == 6) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(j,i,1,1);
                map[i][j] = null;
            } else if(map[i][j] == 7) {
                if(RB(1,3) == 1) {
                    ctx.fillStyle = "blue";
                } else if(RB(1,3) == 2) {
                    ctx.fillStyle = "red";
                } else if(RB(1,3) == 3) {
                    ctx.fillStyle = "yellow";
                }
                ctx.fillRect(j,i,1,1);
            }
        }
    }

}

var reset = () => {
    red = 0;
    blue = 0;
    x = Math.round(canvas.width / 10) * 9;
    y = Math.round(canvas.height / 10) * 9;
    xA = x;
    yA = y;
    speedX = 0;
    speedY = 0;
    x2 = canvas.width / 10;
    y2 = canvas.height / 10;
    xA2 = x2;
    yA2 = y2;
    speedX2 = 0;
    speedY2 = 0;
    sblue = 0;
    sred = 0;
    for(let i = 0; i < canvas.height; i++) {
        for(let j = 0; j < canvas.width; j++) {
            map[i][j] = 0;
        }
    }
    fatcount = 20;
    fatcount2 = 20;
    game();
    drawing();
}

redwin = () => {
    alert("RED WINS!");
    reset();
}

bluewin = () => {
    alert("BLUE WINS!");
    reset();
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
    if(rangle == 1) {
        speedX = test(x,y,fruitX + 5,fruitY + 5,"X") * 4.5;
        speedY = test(x,y,fruitX + 5,fruitY + 5,"Y") * 4.5;
    } else if(bangle == 1) {
        speedX2 = test(x2,y2,fruitX + 5,fruitY + 5,"X") * 4.5;
        speedY2 = test(x2,y2,fruitX + 5,fruitY + 5,"Y") * 4.5;
    }
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
    if(single == 1) {
        speedX2 *= 1.5;
        speedY2 *= 1.5;
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
    if(single == 1) {
        speedX2 /= 1.5;
        speedY2 /= 1.5;
    }
    x2 = Math.floor(xA2);
    y2 = Math.floor(yA2);
    x = Math.floor(xA);
    y = Math.floor(yA);
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            map[i + fruitY][j + fruitX] = 4;
            if(i < 5 && j < 5 && sfruitY < canvas.height) {
                map[i + sfruitY][j + sfruitX] = 6;
                map[i + wfruitY][j + wfruitX] = 7;
            }
        }
    }
    if(map[y][x] == 4) {
        red++;
        fatcount++;
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
        if(red >= 30) {
            redwin();
            return 0;
        }
        coin.play();
    } else if(map[y2][x2] == 4) {
        blue++;
        fatcount2++;
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
        if(blue >= 30) {
            bluewin();
            return 0;
        }
        coin.play();
        if(single == 1) {
            computer();
        }
    }
    if(map[y][x] == 6) {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                map[i + sfruitY][j + sfruitX] = null;
            }
        }
        sfruitX = canvas.width * 2;
        sfruitY = canvas.height * 2;
        setTimeout(() => {
            sfruitX = RB(0,canvas.width - 10);
            sfruitY = RB(0,canvas.height - 10);
        },30000);
        if(sred != 1) setTimeout(() => {
            sred = 0;
        }, speedTime);
        sred = 1;
        fast.play();

    } else if(map[y2][x2] == 6) {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                map[i + sfruitY][j + sfruitX] = null;
            }
        }
        sfruitX = canvas.width * 2;
        sfruitY = canvas.height * 2;
        setTimeout(() => {
            sfruitX = RB(0,canvas.width - 10);
            sfruitY = RB(0,canvas.height - 10);
        },30000);
        if(sblue != 1) setTimeout(() => {
            sblue = 0;
        }, speedTime);
        sblue = 1;
        fast.play();

    }
    if(map[y][x] == 5) {
        if(bnumb == 0 && rnumb == 0) {
            speedX2 = 0 - speedX2 * 2;
        speedY2 = 0 - speedY2 * 2;
        bnumb = 1;
        setTimeout(() => {
            bnumb = 0;
        }, 3000);
        }
        if(RB(1,2) == 1) {
            goofy.play();
        } else if(RB(1,2) == 2) {
            spring.play();
        }
    } else if(map[y2][x2] == 3) {
        if(rnumb == 0 && bnumb == 0) {
            speedX = 0 - speedX * 2;
        speedY = 0 - speedY * 2;
        rnumb = 1;
        setTimeout(() => {
            rnumb = 0;
        }, 3000);
        }
        if(RB(1,2) == 1) {
            goofy.play();
        } else if(RB(1,2) == 2) {
            spring.play();
        }
    }
    if(map[y][x] == 7) {
        if(rangle == 0 && bangle == 0) {
            rangle = 1;
        setTimeout(() => {
            rangle = 0;
        }, 5000);
        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                map[i + wfruitY][j + wfruitX] = null;
                map[i + sfruitY][j + sfruitX] = null;
            }
        }
        sfruitY = canvas.height * 2;
        sfruitX = canvas.width * 2;
        wfruitY = canvas.height * 2;
        wfruitX = canvas.width * 2;
        setTimeout(() => {
            wfruitX = RB(0,canvas.width - 10);
            wfruitY = RB(0,canvas.height - 10);
        },60000);
        sblue = 1;
        setTimeout(() => {
            sblue = 0;
            sfruitX = RB(0,canvas.width - 10);
            sfruitY = RB(0,canvas.height - 10);
        }, 30000);
        }
        fast.play();
    } else if(map[y2][x2] == 7) {
        if(rangle == 0 && bangle == 0) {
            bangle = 1;
        setTimeout(() => {
            bangle = 0;   
        }, 5000);
        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                map[i + wfruitY][j + wfruitX] = null;
                map[i + sfruitY][j + sfruitX] = null;
            }
        }
        sfruitY = canvas.height * 2;
        sfruitX = canvas.width * 2;
        wfruitY = canvas.height * 2;
        wfruitX = canvas.width * 2;
        setTimeout(() => {
            wfruitX = RB(0,canvas.width - 10);
            wfruitY = RB(0,canvas.height - 10);
        },60000);
        sred = 1;
        setTimeout(() => {
            sred = 0;
            sfruitX = RB(0,canvas.width - 10);
            sfruitY = RB(0,canvas.height - 10);
        }, 30000);
        }
        fast.play();
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
    }, 1000 / canvas.height);
}
game();
drawing();

var computer = () => {
    if(bnumb == 0) {
        let posX = test(x2,y2,(fruitX + 5),(fruitY + 5),"X");
        let posY = test(x2,y2,(fruitX + 5),(fruitY + 5),"Y");
        let cspeedX = 0.05;
        let cspeedY = 0.05;
    if(speedX2 > posX) {
        speedX2 -= cspeedX;
    } else if(speedX2 < posX) speedX2 += cspeedX;
    if(speedY2 > posY) {
        speedY2 -= cspeedY;
    } else if(speedY2 < posY) {
        speedY2 += cspeedY;
    }
    }
    if(speedX2 > 1) {
        speedX2 = 1;
    } else if(speedX2 < -1) {
        speedX2 = -1;
    }
    if(speedY2 > 1) {
        speedY2 = 1;
    } else if(speedY2 < -1) {
        speedY2 = -1;
    }
}
//slowdown
setInterval(() => {
    if(rnumb == 0) {
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
    }
    if(single == 0) {
        if(bnumb == 0) {
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
        }
    } else if(single == 1) {
        computer();
    }
},100);
