
function IsPC() {
    
    return false
}
function bomb(a, b) {
    this.x = b,
    this.y = a,
    this.k = 0,
    this.r = 6,
    this.j = 0
}
function stage(a, b, c, d, e) {
    this.dn3 = a,
    this.dn4 = d,
    this.t = 0,
    this.speed = c,
    this.text = b,
    this.img = e,
    this.title = [Attack.imgDx[81], Attack.imgDx[84]]
}
function explode(a, b, c) {
    this.x = a,
    this.y = b,
    this.r = 0,
    this.die = 0,
    this.type = c,
    this.t = 0
}
function sp(a, b, c, d, e, f, g, h) {
    this.x = a,
    this.y = b,
    this.h = c,
    this.m = g,
    this.n = h,
    this.img = e,
    this.die = 0,
    this.cos1 = Math.cos(d),
    this.sin1 = Math.sin(d),
    this.type = f,
    this.t = 0
}
function chena(a, b, c, d, e, f, g, h) {
    this.x = a,
    this.y = b,
    this.img = c,
    this.die = 0,
    this.mfx = d,
    this.type = e,
    this.width = f,
    this.hight = g,
    this.arc = h
}
function yun(a, b, c, d, e) {
    this.x = a,
    this.y = b,
    this.img = c,
    this.die = 0,
    this.fx = d,
    this.type = e,
    this.speed_x = random(1, 8),
    this.speed_y = random(1, 8)
}
function star(a, b, c) {
    this.x = a,
    this.y = b,
    this.rad = Math.PI / 10 * random(1, 21),
    1 == c ? this.img = Attack.imgDx[28] : 2 == c ? this.img = Attack.imgDx[29] : 3 == c && (this.img = Attack.imgDx[30]),
    this.type = c,
    this.die = 0,
    this.st = 0
}
function random(a, b) {
    return Math.floor(a + Math.random() * (b - a))
}
function drStar() {
    var a = random(0, 2),
    b = random(1, 8),
    c = random(0, 4),
    d = [Attack.imgDx[27], Attack.imgDx[28], Attack.imgDx[29], Attack.imgDx[30]],
    e = new yun(50 * b, -250, d[c], a);
    Attack.s.push(e)
}
function enemyZc(a) {
    for (var b = Attack.enemylist.length,
    c = b; b + 6 > c; c++) Attack.enemylist[c] = new enemy(50 * (c - b) - 330, 30 * (c - b) - 220, Attack.imgDx[2], a, 50, 44, 1, 1, 50 + 6 * c, 30, 50, 1, 1)
}
function enemyZc2() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(50, 660, Attack.imgDx[84], 233, 222, 166, 14, 1, 30, 30, 50, 1, 1);
    var b = Attack.enemylist[a];
    b.fpao = function() {
        printbosspd15(b)
    }
}
function enemyZc3(a) {
    for (var b = Attack.enemylist.length,
    c = b; b + 6 > c; c++) Attack.enemylist[c] = new enemy(50 * (c - b) + 360, 30 * (c - b) + Attack.pos_y / 2 + 30, Attack.imgDx[2], a, 50, 44, 1, 1, 50 + 6 * c, 30, 70, 1, 1),
    Attack.enemylist[c].arc = Math.PI
}
function sBossZc5() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy( - 240, 160, Attack.imgDx[55], 20, 55, 48, 8, 10, 78, 30, 65, 1, 1, 4);
    var b = Attack.enemylist[a];
    b.fpao = function() {
        printbosspd12(b)
    }
}
function sBossZc6() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy( - 80, 120, Attack.imgDx[55], 12, 55, 48, 11, 10, 78, 30, 65, 1, 1, 4),
    Attack.enemylist[a].arc = -Math.PI / 2;
    var b = Attack.enemylist[a];
    b.fpao = function() {
        printbosspd13(b)
    }
}
function sBossZc6_2() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(380, 120, Attack.imgDx[55], 12, 55, 48, 11, 10, 78, 30, 65, 1, 1, 4),
    Attack.enemylist[a].arc = Math.PI / 2;
    var b = Attack.enemylist[a];
    b.fpao = function() {
        printbosspd13(b)
    }
}
function sBossZc6_3(a) {
    var b = Attack.enemylist.length;
    Attack.enemylist[b] = new enemy(a, -70, Attack.imgDx[55], 12, 55, 48, 11, 10, 78, 30, 65, 1, 1, 4),
    Attack.enemylist[b].arc = 0;
    var c = Attack.enemylist[b];
    c.fpao = function() {
        printbosspd13(c)
    }
}
function sBossZc4() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(100, -100, Attack.imgDx[51], 1510, 100, 92, 9, 6, 78, 46, 105, 2, 1, 3);
    var b = Attack.enemylist[a];
    b.fpao = function() {
        printbosspd11(b)
    }
}
function sBossZc2() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy( - 100, 10, Attack.imgDx[4], 20, 27, 66, 12, 6, 78, 30, 55, 1, 1, 1);
    var b = Attack.enemylist[a];
    b.fpao = function() {
        printbosspd3(b)
    }
}
function sBossZc12() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(600, 10, Attack.imgDx[4], 20, 27, 66, 13, 6, 78, 26, 55, 1, 1, 1);
    var b = Attack.enemylist[a];
    b.fpao = function() {
        printbosspd3(b)
    }
}
function crzdj() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(115, 646, Attack.imgDx[24], 2590, 28, 46, 7, 3, 0, 75, 110, 1, 1),
    Attack.enemylist[a].tank = 5,
    Attack.enemylist[a + 1] = new enemy(105, 646, Attack.imgDx[25], 1190, 28, 46, 6, 3, 0, 45, 110, 1, 1),
    Attack.enemylist[a + 1].tank = 5,
    Attack.enemylist[a + 2] = new enemy(100, 600, Attack.imgDx[15], 1100, 48, 174, 5, 3, 0, 60, 80, 2, 1, 2),
    Attack.enemylist[a + 2].tank = 5;
    var b = Attack.enemylist[a + 2];
    b.fpao = function() {
        printbosspd6(b)
    };
    var c = Attack.enemylist[a + 1];
    c.fpao = function() {
        printbosspd8(c)
    };
    var d = Attack.enemylist[a];
    d.fpao = function() {
        printbosspd9(d)
    }
}
function boss() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(200, 600, Attack.imgDx[75], 940, 24, 268, 5, 3, 0, 80, 120, 1, 1),
    Attack.enemylist[a].tank = 6,
    Attack.enemylist[a + 1] = new enemy(11, 650, Attack.imgDx[76], 940, 189, 88, 5, 3, 0, 80, 120, 1, 1),
    Attack.enemylist[a + 2] = new enemy(224, 650, Attack.imgDx[77], 940, 189, 88, 5, 3, 0, 80, 120, 1, 1),
    Attack.enemylist[a + 3] = new enemy(154, 830, Attack.imgDx[78], 940, 116, 56, 5, 3, 0, 80, 120, 1, 1)
}
function boss2() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(184, 772, Attack.imgDx[81], 940, 120, 118, 15, 3, 0, 80, 120, 1, 1),
    Attack.enemylist[a].tank = 7;
    var b = Attack.enemylist[a];
    b.fpao = function() {
        bosspd2(b)
    },
    Attack.enemylist[a + 1] = new enemy(40, 600, Attack.imgDx[80], 940, 406, 174, 15, 3, 0, 80, 120, 1, 1),
    Attack.enemylist[a + 1].tank = 6;
    var c = Attack.enemylist[a + 1];
    c.fpao = function() {
        bosspd(c)
    }
}
function crPt3(a, b) {
    var c = Attack.tanklist.length,
    d = {
        img: Attack.imgDx[50],
        mfx: 1,
        type: 0
    };
    Attack.tanklist[c] = new enemy(a, b, Attack.imgDx[49], 16, 30, 30, 4, 3, 0, 0, 0, 1, 1, 0, d),
    Attack.tanklist[c].tank = 2;
    var e = Attack.tanklist[c];
    e.fpao = function() {
        printbosspd4(e)
    }
}
function crPt5() {
    var a = Attack.tanklist.length,
    b = {
        img: Attack.imgDx[47],
        mfx: 1,
        type: 0
    };
    Attack.tanklist[a] = new enemy(250, -100, Attack.imgDx[9], 34, 26, 46, 10, 3, 0, 0, 0, 1, 1, 0, b),
    Attack.tanklist[a].tank = 1;
    var c = Attack.tanklist[a];
    c.fpao = function() {
        printbosspd7(c)
    }
}
function crPt2() {
    var a = Attack.tanklist.length,
    b = {
        img: Attack.imgDx[47],
        mfx: 1,
        type: 0
    };
    Attack.tanklist[a] = new enemy(300, -100, Attack.imgDx[9], 24, 26, 46, 3, 3, 0, 0, 0, 1, 1, 0, b),
    Attack.tanklist[a].tank = 1;
    var c = Attack.tanklist[a];
    c.fpao = function() {
        printbosspd7(c)
    }
}
function crPt7(a, b) {
    var c = Attack.tanklist.length,
    d = {
        img: Attack.imgDx[47],
        mfx: 1,
        type: 0
    };
    Attack.tanklist[c] = new enemy(a, b, Attack.imgDx[9], 26, 26, 46, 2, 3, 0, 0, 0, 1, 1, 0, d),
    Attack.tanklist[c].tank = 1;
    var e = Attack.tanklist[c];
    e.fpao = function() {
        printbosspd7(e)
    }
}
function crPt6(a, b) {
    var c = Attack.tanklist.length,
    d = {
        img: Attack.imgDx[47],
        mfx: 1,
        type: 0
    };
    Attack.tanklist[c] = new enemy(a, b, Attack.imgDx[72], 60, 26, 46, 3, 3, 0, 0, 0, 1, 1, 0, d),
    Attack.tanklist[c].tank = 4;
    var e = Attack.tanklist[c];
    e.fpao = function() {
        printbosspd17(e)
    }
}
function crPt4(a, b) {
    var c = Attack.tanklist.length,
    d = {
        img: Attack.imgDx[60],
        mfx: 1,
        type: 0
    };
    Attack.tanklist[c] = new enemy(a, b, Attack.imgDx[58], 16, 30, 37, 4, 3, 0, 0, 0, 1, 1, 0, d),
    Attack.tanklist[c].tank = 3;
    var e = Attack.tanklist[c];
    e.fpao = function() {
        printbosspd10(e)
    }
}
function sBossZc3() {
    var a = Attack.enemylist.length;
    Attack.enemylist[a] = new enemy(360, -250, Attack.imgDx[19], 340, 241, 114, 8, 3, 0, 30, 120, 1, 2);
    var b = Attack.enemylist[a];
    b.arc = Math.PI,
    b.fpao = function() {
        printbosspd2(b, 34)
    },
    Attack.enemylist[a + 1] = new enemy( - 10, -200, Attack.imgDx[19], 340, 241, 114, 9, 3, 0, 30, 120, 1, 2);
    var c = Attack.enemylist[a + 1];
    c.arc = Math.PI,
    c.fpao = function() {
        printbosspd2(c, 14)
    }
}
function printbosspd(a, b, c) {
    a.t > 75 && a.t2 == c && (a.arc = Math.PI / 10 * Math.sin(Math.PI / 40 * a.t * b), a.fire(a.x + 18, a.y + 66, 22, 0, 34, Math.PI - a.arc), a.fire(a.x + 33, a.y + 66, 22, 0, 34, Math.PI - a.arc)),
    a.t2 == c && (a.t2 = 0)
}
function printbosspd3(a) { (0 == a.t2 % 120 || 16 == a.t2 % 120) && a.fire(a.x + 14, a.y + 34, 3, 3, 3, 0, 3 + a.t2 % 120 / 32)
}
function printbosspd8(a) {
    if (1 == a.t2 && (sj_8 = random(1, 4)), a.t2 > 176 && a.t2 < 276 && 240 == a.t2 && a.fire(a.x + 20, a.y + 9, 7, 0, 0), 176 == a.t2) {
        var b = a.x + a.width / 2 - Attack.player.x - 43,
        c = a.y + a.hight / 2 - Attack.player.y - 36,
        d = Math.sqrt(b * b + c * c),
        e = b / d;
        a.arc3 = c > 0 ? Math.PI - Math.asin(e) : Math.asin(e),
        a.moveto(a.arc3)
    }
    if (a.t2 > 176 && a.t2 <= 196 && (a.arc2 -= a.a_arc), 1 == sj_8 && a.t2 > 176 && a.t2 < 226 && 0 == a.t2 % 4 && (a.arc2 -= Math.PI / 50, a.fire(a.x + 14 + 3, a.y + 48, 18, 0, 0, Math.PI - a.arc2, (a.t2 - 176) / 8 + 4), a.fire(a.x + 14 - 3, a.y + 48, 18, 0, 0, Math.PI - a.arc2, (a.t2 - 176) / 8 + 4)), 2 == sj_8 && a.t2 > 196 && a.t2 < 226 && 0 == a.t2 % 5 && (a.arc2 += Math.PI / 100, a.fire(a.x + 14 + 3, a.y + 48, 9, 0, 0, Math.PI - a.arc2, (a.t2 - 196) / 10 + 4), a.fire(a.x + 14 - 3, a.y + 48, 9, 0, 0, Math.PI - a.arc2, (a.t2 - 176) / 10 + 4)), 3 == sj_8 && a.t2 > 196 && a.t2 < 206 && 0 == a.t2 % 3) for (var g = 0; 8 > g; g++) {
        var h = random( - 4, 4);
        a.fire(a.x + 14, a.y + 48, 6, 8, 10, Math.PI - a.arc2 + Math.PI / 20 * h + 1 * Math.PI / 14, (a.t2 - 196) / 6 + 3)
    }
    302 == a.t2 && (a.t2 = 0)
}
function printbosspd9(a) {
    if (a.t2 > 176 && a.t2 < 276 && 240 == a.t2 && a.fire(a.x + 20, a.y + 9, 8, 0, 0), 176 == a.t2) {
        var b = a.x + a.width / 2 - Attack.player.x - 43,
        c = a.y + a.hight / 2 - Attack.player.y - 36,
        d = Math.sqrt(b * b + c * c),
        e = b / d;
        a.arc3 = c > 0 ? Math.PI - Math.asin(e) : Math.asin(e),
        a.moveto(a.arc3)
    }
    if (a.t2 > 176 && a.t2 <= 196 && (a.arc2 -= a.a_arc), 1 == sj_8 && a.t2 > 176 && a.t2 < 226 && 0 == a.t2 % 4 && (a.arc2 += Math.PI / 50, a.fire(a.x + 14 + 3, a.y + 48, 18, 0, 0, Math.PI - a.arc2, (a.t2 - 176) / 8 + 4), a.fire(a.x + 14 - 3, a.y + 48, 18, 0, 0, Math.PI - a.arc2, (a.t2 - 176) / 8 + 4)), 2 == sj_8 && a.t2 > 196 && a.t2 < 226 && 0 == a.t2 % 5 && (a.arc2 -= Math.PI / 100, a.fire(a.x + 14 + 3, a.y + 48, 9, 0, 0, Math.PI - a.arc2, (a.t2 - 196) / 10 + 4), a.fire(a.x + 14 - 3, a.y + 48, 9, 0, 0, Math.PI - a.arc2, (a.t2 - 176) / 10 + 4)), 3 == sj_8 && a.t2 > 196 && a.t2 < 206 && 0 == a.t2 % 3) for (var g = 0; 8 > g; g++) {
        var h = random( - 4, 4);
        a.fire(a.x + 14, a.y + 48, 6, 8, 10, Math.PI - a.arc2 + Math.PI / 20 * h + 1 * Math.PI / 14, (a.t2 - 196) / 6 + 3)
    }
    302 == a.t2 && (a.t2 = 0)
}
function printbosspd11(a) {
    if (0 == a.t2 % 150 && (sj_11 = random(1, 6)), 1 == sj_11 && (108 == a.t2 % 150 || 128 == a.t2 % 150)) {
        a.arc3 -= Math.PI / 20;
        for (var b = 0; 12 > b; b++) a.fire(a.x + 50, a.y + 46, 15, 8, 16, Math.PI / 6 * b - a.arc3)
    }
    if (4 == sj_11 && 2 == a.t2 % 150 % 5 && (a.arc3 -= Math.PI / 8, a.fire(a.x + 50, a.y + 46, 25, 16, 16, a.arc3, 4), a.fire(a.x + 50, a.y + 46, 25, 16, 16, Math.PI + a.arc3, 4)), 5 == sj_11 && 2 == a.t2 % 150 % 8 && (a.arc3 -= Math.PI / 10, a.fire(a.x + 50, a.y + 46, 15, 8, 16, a.arc3), a.fire(a.x + 50, a.y + 46, 15, 8, 16, Math.PI + a.arc3)), 1 == sj_11 && (88 == a.t2 % 150 || 98 == a.t2 % 150 || 78 == a.t2 % 150)) {
        a.arc3 -= Math.PI / 20;
        for (var b = 0; 10 > b; b++) a.fire(a.x + 50, a.y + 46, 26, 16, 16, Math.PI / 5 * b - a.arc3, 3)
    }
    if (2 == sj_11 && 0 == a.t2 % 150 % 75) {
        var c = a.x + a.width / 2 - Attack.player.x - 43,
        d = a.y + a.hight / 2 - Attack.player.y - 36,
        e = Math.sqrt(c * c + d * d),
        f = c / e;
        a.arc3 = d > 0 ? Math.PI - Math.asin(f) : Math.asin(f)
    }
    if (2 == sj_11 && 0 == a.t2 % 150 % 75 % 6 && a.t2 % 150 % 75 < 24) {
        a.arc3 += Math.PI / 80;
        for (var b = 0; 5 > b; b++) a.fire(a.x + 50, a.y + 27, 23, 3, 6, Math.PI - Math.PI / 14 * (3 - b) - a.arc3, a.t2 % 150 % 75 / 12 + 5)
    }
    3 == sj_11 && 5 == a.t2 % 150 % 25 && a.t2 % 150 < 120 && (a.fire(a.x + 60, a.y + 66, 8, 0, 0), a.fire(a.x + 85, a.y + 66, 7, 0, 0))
}
function printbosspd15(a) {
    if (0 == a.t2 % 150) {
        var b = a.x + a.width / 2 - Attack.player.x - 43,
        c = a.y + a.hight / 2 - Attack.player.y - 36,
        d = Math.sqrt(b * b + c * c),
        e = b / d;
        a.arc3 = c > 0 ? Math.PI - Math.asin(e) : Math.asin(e)
    }
    if (88 == a.t2 % 150 || 98 == a.t2 % 150 || 78 == a.t2 % 150) {
        a.arc3 -= Math.PI / 20;
        for (var g = 0; 5 > g; g++) a.fire(a.x + 111 + 70, a.y + 47, 6, 0, 0, Math.PI / 5 * g - a.arc3 + Math.PI / 2, (a.t2 % 150 - 88) / 10 + 3),
        a.fire(a.x + 111 - 70, a.y + 47, 6, 0, 0, Math.PI / 5 * g - a.arc3 + Math.PI / 2, (a.t2 % 150 - 88) / 10 + 3),
        a.fire(a.x + 111, a.y + 47, 26, 10, 10, Math.PI / 5 * g - a.arc3 + Math.PI / 2, 3)
    }
}
function printbosspd12(a) {
    if (68 == a.t2) {
        var b = random( - 10, 10);
        a.fire(a.x + 41, a.y + 36, 11, 16, 16, Math.PI - Math.PI / 20 * b)
    }
    150 == a.t2 && (a.t2 = 0)
}
function printbosspd13(a) {
    if (0 == a.t2 % 30) {
        var b = random( - 10, 10);
        a.fire(a.x + 41, a.y + 36, 17, 2, 2, 1 * b * Math.PI / 5)
    }
    if (10 == a.t2 % 30) {
        var b = random( - 10, 10);
        a.fire(a.x + 41, a.y + 36, 17, 2, 2, 1 * b * Math.PI / 5)
    }
}
function bosspd(a) {
    var b = a.t % 200;
    if (1 == b && (sj_1 = random(1, 4)), 2 == sj_1 || 3 == sj_1) {
        var c = a.x + a.width / 2 - Attack.player.x - 43,
        d = a.y + a.hight / 2 - Attack.player.y - 36,
        e = Math.sqrt(c * c + d * d),
        f = c / e;
        a.arc3 = d > 0 ? Math.PI - Math.asin(f) : Math.asin(f),
        a.moveto(a.arc3)
    }
    if (1 == sj_1 && 79 == b) {
        var c = a.x + a.width / 2 - Attack.player.x - 43,
        d = a.y + a.hight / 2 - Attack.player.y - 36,
        e = Math.sqrt(c * c + d * d),
        f = c / e;
        a.arc3 = d > 0 ? Math.PI - Math.asin(f) : Math.asin(f),
        a.moveto(a.arc3)
    }
    if (2 == sj_1 && 20 >= b && (a.arc2 -= a.a_arc), 3 == sj_1 && 20 >= b && (a.arc2 -= a.a_arc), 1 == sj_1 && b > 80 && 100 >= b && (a.arc2 -= a.a_arc), 1 == sj_1 && b > 100 && 170 > b && 0 == b % 5) for (var h = 0; 5 > h; h++) a.fire(a.x + 199, a.y + 122, 25, 0, 0, Math.PI - a.arc2 + Math.PI / 15 * (3 - h), (b - 100) % 35 / 10 + 6, 2),
    a.fire(a.x + 207, a.y + 122, 25, 0, 0, Math.PI - a.arc2 - Math.PI / 15 * (3 - h), (b - 100) % 35 / 10 + 6, 2);
    if (2 == sj_1 && b > 20 && 140 > b && (a.arc2 += Math.PI / 30, a.fire(a.x + 199, a.y + 122, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 30 + 4, 2), a.fire(a.x + 207, a.y + 122, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 30 + 4, 2)), 2 == sj_1 && b > 20 && 140 == b && (a.arc2 -= 4 * Math.PI), 3 == sj_1 && b > 20 && 30 > b && 0 == b % 2) for (var h = 0; 10 > h; h++) {
        var i = random( - 4, 4);
        a.fire(a.x + 199, a.y + 122, 6, 14, 20, Math.PI - a.arc2 + Math.PI / 20 * i + 1 * Math.PI / 14, (b - 20) / 4 + 3, 2),
        a.fire(a.x + 207, a.y + 122, 6, 14, 20, Math.PI - a.arc2 + Math.PI / 20 * i + 1 * Math.PI / 14, (b - 20) / 4 + 3, 2)
    }
}
function bosspd2(a) {
    var b = a.t % 200;
    if (1 == sj_1 && 20 > b && (a.arc2 = 0), 1 == sj_1 && b > 20 && 60 > b && 0 == b % 3 && (a.arc2 -= Math.PI / 50, a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 3), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 3), a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 4), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 4)), 1 == sj_1 && b > 60 && 100 > b && 0 == b % 3 && (a.arc2 += Math.PI / 30, a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 3), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 3), a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 4), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc2, (b - 20) / 20 + 4, 4)), 1 == sj_1 && 20 > b && (a.arc4 = 0), 1 == sj_1 && b > 20 && 60 > b && 0 == b % 2 && (a.arc4 += Math.PI / 50, a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 5), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 5), a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 6), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 6)), 1 == sj_1 && b > 60 && 100 > b && 0 == b % 2 && (a.arc4 -= Math.PI / 50, a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 5), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 5), a.fire(a.x + 56, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 6), a.fire(a.x + 64, a.y + 95, 23, 0, 0, Math.PI - a.arc4, (b - 20) / 20 + 4, 6)), 3 == sj_1 && b > 40 && 50 > b && 0 == b % 2) for (var c = 0; 10 > c; c++) {
        var d = random( - 4, 4);
        a.fire(a.x + 56, a.y + 95, 6, 14, 20, Math.PI - a.arc4 + Math.PI / 15 * d + 1 * Math.PI / 14, (b - 40) / 4 + 3, 6),
        a.fire(a.x + 64, a.y + 95, 6, 14, 20, Math.PI - a.arc4 + Math.PI / 15 * d + 1 * Math.PI / 14, (b - 40) / 4 + 3, 6)
    }
    if (3 == sj_1 && b > 60 && 70 > b && 0 == b % 2) for (var c = 0; 10 > c; c++) {
        var d = random( - 4, 4);
        a.fire(a.x + 56, a.y + 95, 6, 14, 20, Math.PI - a.arc4 + Math.PI / 15 * d + 1 * Math.PI / 14, (b - 60) / 4 + 3, 5),
        a.fire(a.x + 64, a.y + 95, 6, 14, 20, Math.PI - a.arc4 + Math.PI / 15 * d + 1 * Math.PI / 14, (b - 60) / 4 + 3, 5)
    }
}
function printbosspd6(a) {
    var b = random( - 20, 20),
    c = a.t % 140;
    if (1 == c) {
        rad4 = random(1, 6);
        var d = a.x + a.width / 2 - Attack.player.x - 43,
        e = a.y + a.hight / 2 - Attack.player.y - 36,
        f = Math.sqrt(d * d + e * e),
        g = d / f;
        a.arc3 = e > 0 ? Math.PI - Math.asin(g) : Math.asin(g),
        a.moveto(a.arc3)
    }
    if (20 >= c && (a.arc2 -= a.a_arc), 1 == rad4 && c > 20 && 50 > c && 0 == c % 3 && (a.arc2 += Math.PI / 40, a.fire(a.x + 24 - 3, a.y + 112, 4, 0, 0, Math.PI - a.arc2, (c - 20) / 6 + 4), a.fire(a.x + 24 + 3, a.y + 112, 4, 0, 0, Math.PI - a.arc2, (c - 20) / 6 + 4)), 1 == rad4 && c > 50 && 80 > c && 0 == c % 3 && (a.fire(a.x + 24 - 3, a.y + 112, 4, 0, 0, Math.PI - a.arc2 - Math.PI / 50 * (c - 50) / 6, (c - 50) / 6 + 4), a.fire(a.x + 24 + 3, a.y + 112, 4, 0, 0, Math.PI - a.arc2 + Math.PI / 50 * (c - 50) / 6, (c - 50) / 6 + 4)), 1 == rad4 && c > 80 && 110 > c && 0 == c % 3 && (a.arc2 -= Math.PI / 20, a.fire(a.x + 24 - 3, a.y + 112, 4, 0, 0, Math.PI - a.arc2, (c - 80) / 6 + 4), a.fire(a.x + 24 + 3, a.y + 112, 4, 0, 0, Math.PI - a.arc2, (c - 80) / 6 + 4)), 2 == rad4 && c > 80 && 110 > c && 0 == c % 6) for (var i = 0; 5 > i; i++) a.fire(a.x + 24 - 3, a.y + 112, 9, 0, 0, Math.PI - a.arc2 + Math.PI / 15 * (3 - i), 6),
    a.fire(a.x + 24 + 3, a.y + 112, 9, 0, 0, Math.PI - a.arc2 + Math.PI / 15 * (3 - i), 6);
    if (2 == rad4 && c > 20 && 70 > c && 0 == c % 6 && (a.fire(a.x + 24 - 3, a.y + 112, 9, 0, 0, Math.PI - a.arc2 - Math.PI / 50 * (c / 6), (c - 20) / 6 + 3), a.fire(a.x + 24 + 3, a.y + 112, 9, 0, 0, Math.PI - a.arc2 + Math.PI / 50 * (c / 6), (c - 20) / 6 + 3)), 3 == rad4 && c > 20 && 40 > c && 0 == c % 4) {
        a.arc2 -= Math.PI / 20;
        var b = random( - 4, 4);
        a.fire(a.x + 24, a.y + 112, 15, 12, 20, Math.PI - a.arc2 + Math.PI / 20 * b + 1 * Math.PI / 14, (c - 20) / 4 + 3)
    }
    if (3 == rad4 && c > 40 && 60 > c && 0 == c % 4 && (a.arc2 += Math.PI / 20, a.fire(a.x + 24, a.y + 112, 15, 8, 20, Math.PI - a.arc2, (c - 40) / 4 + 3)), 4 == rad4 && c > 20 && 120 > c && 0 == c % 2 && (40 > c ? (a.arc2 += Math.PI / 16, a.fire(a.x + 24 - 3, a.y + 112, 18, 0, 0, Math.PI - a.arc2, (c - 20) / 8 + 3), a.fire(a.x + 24 + 3, a.y + 112, 18, 0, 0, Math.PI - a.arc2, (c - 20) / 8 + 3)) : 80 > c ? (a.arc2 -= Math.PI / 16, a.fire(a.x + 24 - 3, a.y + 112, 18, 0, 0, Math.PI - a.arc2, (c - 40) / 8 + 4), a.fire(a.x + 24 + 3, a.y + 112, 18, 0, 0, Math.PI - a.arc2, (c - 40) / 8 + 4)) : 120 > c && (a.arc2 += Math.PI / 16, a.fire(a.x + 24 - 3, a.y + 112, 18, 0, 0, Math.PI - a.arc2, (c - 80) / 8 + 5), a.fire(a.x + 24 + 3, a.y + 112, 18, 0, 0, Math.PI - a.arc2, (c - 80) / 8 + 5))), 5 == rad4 && c > 20 && 1 == c % 30) {
        var d = a.x + a.width / 2 - Attack.player.x - 43,
        e = a.y + a.hight / 2 - Attack.player.y - 36,
        f = Math.sqrt(d * d + e * e),
        g = d / f;
        a.arc3 = e > 0 ? Math.PI - Math.asin(g) : Math.asin(g),
        a.moveto(a.arc3)
    }
    if (5 == rad4 && c > 20 && 20 > c % 30 && (a.arc2 -= a.a_arc), 5 == rad4 && 0 == c % 30 % 3 && c % 30 > 20 && 30 > c % 30) {
        a.arc2 -= Math.PI / 20;
        for (var i = 0; 3 > i; i++) a.fire(a.x + 24, a.y + 112, 26, 10, 10, Math.PI - Math.PI / 20 * (2 - i) - a.arc2, c % 30 / 9 + 3)
    }
}
function printbosspd17(a) {
    var b = a.x - Attack.player.x - 20,
    c = a.y - Attack.player.y - 25,
    d = Math.sqrt(b * b + c * c),
    e = b / d;
    a.arc3 = c > 0 ? Math.PI - Math.asin(e) : Math.asin(e),
    1 == a.t2 && a.moveto(a.arc3),
    a.t2 <= 20 && (a.arc2 -= a.a_arc),
    a.t2 > 20 && a.t2 < 52 && 0 == a.t2 % 100 % 10 && (a.fire(a.x + 11 - 3, a.y + 56, 19, 7, 10, Math.PI - a.arc2, (a.t2 - 20) % 100 / 20 + 5), a.fire(a.x + 11 + 3, a.y + 56, 19, 7, 10, Math.PI - a.arc2 + Math.PI / 40, (a.t2 - 20) % 100 / 20 + 5), a.fire(a.x + 11 + 3, a.y + 56, 19, 7, 10, Math.PI - a.arc2, (a.t2 - 20) % 100 / 20 + 5), a.fire(a.x + 11 - 3, a.y + 56, 19, 7, 10, Math.PI - a.arc2 - Math.PI / 40, (a.t2 - 20) % 100 / 20 + 5)),
    130 == a.t2 && (a.t2 = 0)
}
function printbosspd7(a) {
    var b = a.x - Attack.player.x - 20,
    c = a.y - Attack.player.y - 25,
    d = Math.sqrt(b * b + c * c),
    e = b / d;
    a.arc3 = c > 0 ? Math.PI - Math.asin(e) : Math.asin(e),
    1 == a.t2 && a.moveto(a.arc3),
    a.t2 <= 20 && (a.arc2 -= a.a_arc),
    a.t2 > 20 && a.t2 < 50 && 0 == a.t2 % 9 && (a.arc2 += Math.PI / 180, a.fire(a.x + 13, a.y + 46, 19, 7, 10, Math.PI - a.arc2, (a.t2 - 20) / 45 + 4)),
    100 == a.t2 && (a.t2 = 0)
}
function printbosspd10(a) {
    var b = a.x - Attack.player.x - 20,
    c = a.y - Attack.player.y - 25,
    d = Math.sqrt(b * b + c * c),
    e = b / d;
    arc5 = c > 0 ? Math.PI - Math.asin(e) : Math.asin(e),
    1 == a.t2 && a.moveto(arc5),
    a.t2 <= 20 && (a.arc2 -= a.a_arc),
    21 == a.t2 && a.fire(a.x + 16, a.y + 43, 5, 7, 10, Math.PI - a.arc2, 3),
    84 == a.t2 && (a.t2 = 0)
}
function printbosspd5(a) {
    if (86 == a.t2 || 88 == a.t2 || 90 == a.t2 || 92 == a.t2 || 94 == a.t2 || 96 == a.t2 || 98 == a.t2 || 100 == a.t2) {
        var b = random( - 13, 13);
        a.fire(a.x + 12, a.y + 65, 23, 0, 0, Math.PI - a.arc + b * Math.PI / 100),
        a.fire(a.x + 76, a.y + 65, 23, 0, 0, Math.PI - a.arc + b * Math.PI / 100),
        a.fire(a.x + 40, a.y + 65, 22, 0, 0, Math.PI - a.arc + b * Math.PI / 100)
    }
    if (102 == a.t2 || 103 == a.t2 || 104 == a.t2 || 106 == a.t2 || 107 == a.t2) {
        var b = random( - 13, 13);
        a.fire(a.x + 12, a.y + 65, 23, 0, 0, Math.PI - a.arc + b * Math.PI / 100),
        a.fire(a.x + 76, a.y + 65, 23, 0, 0, Math.PI - a.arc + b * Math.PI / 100)
    }
    110 == a.t2 && (a.t2 = 0)
}
function printbosspd4(a) {
    var b = a.x - Attack.player.x - 20,
    c = a.y - Attack.player.y - 25,
    d = Math.sqrt(b * b + c * c),
    e = b / d;
    arc6 = c > 0 ? Math.PI - Math.asin(e) : Math.asin(e),
    1 == a.t2 && a.moveto(arc6),
    a.t2 <= 20 && (a.arc2 -= a.a_arc),
    (22 == a.t2 || 44 == a.t2) && (a.arc2 += Math.PI / 120, a.fire(a.x + 15, a.y + 40, 18, 3, 3, Math.PI - a.arc2, (a.t2 - 22) / 44 + 4)),
    150 == a.t2 && (a.t2 = 0)
} !
function(a) {
    var b = function() {
        var c = {},
        d = arguments[0],
        e = d.canvas,
        f = e.width,
        g = e.height;
        return e.getContext("2d"),
        c = {
            objList: [],
            imgList: {},
            getImg: function(a) {
                return this.imgList[a]
            },
            canvas: e,
            fps: d.fps,
            timeline: 0,
            ctx: e.getContext("2d"),
            canWidth: f,
            canHeight: g,
            loading: function(a, b) {
                this.l_t = 0,
                this.imgList.length = 0;
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    this.imgList[d.id] = new Image,
                    this.imgList[d.id].src = d.url,
                    this.imgList.length++
                }
                this.loadfuc = b;
                var e = this;
                this.loadTimer = setInterval(function() {
                    e.drawLoading()
                },
                30)
            },
            setEmpty: function() {
                this.objList = [],
                this.offtimefuc(),
                b.eventList = {}
            },
            createLayer: function(a) {
                var b = [];
                return ! a || a >= this.objList.length - 1 ? this.objList.push(b) : 0 >= a ? this.objList.unshift(b) : this.objList.splice(a, 0, b),
                b
            },
            drawLoading: function() {
                var a = 0,
                b = this.ctx,
                c = this.canWidth,
                d = this.canHeight,
                e = this.imgList.length;
                for (i in this.imgList)"length" != i && this.imgList[i].complete && a++;
                b.beginPath(),
                b.clearRect(0, 0, c, d),
                b.fillStyle = "#000",
                b.fillRect(0, 0, c, d),
                b.drawImage(loadImg1, 55, d / 2 - 17),
                b.beginPath(),
                b.fillStyle = "#4B9D3C",
                b.fillRect(72, d / 2 - 10, (c - 146) / e * a, 23),
                b.fill(),
                b.beginPath(),
                b.arc(72 + (c - 146) / e * a, d / 2 + 2, 11, Math.PI / 2, 3 * Math.PI / 2, 1),
                b.fillStyle = "#4B9D3C",
                b.fill(),
                b.closePath(),
                b.beginPath(),
                b.arc(72, d / 2 + 2, 11, 3 * Math.PI / 2, Math.PI / 2, 1),
                b.fillStyle = "#4B9D3C",
                b.fill(),
                b.closePath(),
                b.save(),
                b.beginPath(),
                b.fillStyle = "#fff",
                b.font = "bold 18px Arial",
                b.shadowColor = "#000",
                b.shadowOffsetY = 1,
                b.textAlign = "center",
                b.fillText("\u5df2\u52a0\u8f7d" + Math.floor(100 * (a / e)) + "%", c / 2, d / 2 + 7),
                b.fill(),
                b.restore(),
                a == e && (clearInterval(this.loadTimer), b.clearRect(0, 0, c, d), this.init(), this.loadfuc())
            },
            gameStart: function() {
                this.stimer = this.requestAnimFrame(function() {
                    this.gameStart()
                }.bind(this)),
                this.timeline && (this.tlinefuc(this.timeline), this.timeline++);
                var a = (new Date).getTime();
                this.__render(a - this.lastAnimationFrameTime),
                this.lastAnimationFrameTime = a
            },
            gameOver: function() {
                this.cancelAFrame(this.stimer)
            },
            ontimefuc: function(a) {
                this.timeline = 1,
                this.tlinefuc = a
            },
            offtimefuc: function() {
                this.timeline = 0
            },
            addEventListener: function(a) {
                function d(d) {
                    if (eG.eventList[a]) {
                        1 == d.targetTouches.length && (d.preventDefault(), d = d.targetTouches[0]),
                        "touchend" == a && (d = d.changedTouches[0]);
                        for (var e = eG.eventList[a], f = 0, g = e.length, h = new b.OBB(new eG.Vector2(d.pageX * c.p_x, d.pageY * c.p_x + c.pos_y), 0, 0, 0); g > f; f++) {
                            var i = e[f];
                            if (eG.OBBvsOBB(h, i.testObb())) for (var j = 0,
                            k = i.eventFuc[a].length; k > j; j++) i.eventFuc[a][j](d)
                        }
                    }
                }
                this.canvas.addEventListener(a, d);
                var c = this
            },
            __drawFPS: function(a) {
                var b = 1e3 / (a - this.lastAnimationFrameTime);
                this.lastAnimationFrameTime = a,
                a - this.lastFpsUpdateTime > 2e3 && (this.lastFpsUpdateTime = a, this._fps = b)
            },
            __render: function(a) {
                for (var b = 0,
                c = this.objList.length; c > b; b++) {
                    for (var d = 0,
                    e = 0,
                    f = this.objList[b]; e < f.length; e++) f[e].die && f.splice(e, 1);
                    for (var g = f.length; g > d; d++) {
                        var h = f[d];
                        h.static || (h.x += this.__viewport.speed_x * a, h.y += this.__viewport.speed_y * a),
                        h.update(a),
                        h.render(a)
                    }
                }
            },
            __viewport: {
                speed_x: 0,
                speed_y: 0
            },
            setviewPort: function(a, b) {
                this.__viewport.speed_x = a || 0,
                this.__viewport.speed_y = b || 0
            },
            init: function() {
                this.lastAnimationFrameTime = (new Date).getTime(),
                this.lastFpsUpdateTime = 0,
                this.p_x = this.canWidth / document.documentElement.clientWidth,
                this.p_y = this.canHeight / document.documentElement.clientHeight,
                this.pos_y = Math.abs(this.canvas.offsetTop * this.p_x),
                this.requestAnimFrame = function() {
                    var b, c = d.fps;
                    return b = c ?
                    function(b) {
                        a.setTimeout(b, 1e3 / c)
                    }: a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame ||
                    function(b) {
                        a.setTimeout(b, 1e3 / 60)
                    }
                }.bind(this)().bind(),
                this.cancelAFrame = function() {
                    return a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.oCancelAnimationFrame ||
                    function(b) {
                        a.clearTimeout(b)
                    }
                } ().bind()
            }
        },
        c.extend = function() {
            var a, b, c, d, e = this;
            if (null != (a = arguments[0])) for (b in a) c = e[b],
            d = a[b],
            e !== d && (e[b] = d);
            return e
        },
        c
    };
    b.versions = function() {
        var a = navigator.userAgent;
        return navigator.appVersion,
        {
            trident: a.indexOf("Trident") > -1,
            presto: a.indexOf("Presto") > -1,
            webKit: a.indexOf("AppleWebKit") > -1,
            gecko: a.indexOf("Gecko") > -1 && -1 == a.indexOf("KHTML"),
            ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
            iPhone: a.indexOf("iPhone") > -1,
            iPad: a.indexOf("iPad") > -1,
            webApp: -1 == a.indexOf("Safari")
        }
    } (),
    b.inherit = function(a, b) {
        var c = new Function;
        c.prototype = b.prototype,
        a.prototype = new c,
        a.prototype.constructor = a,
        a.superclass = b.prototype,
        a.prototype.constructor == Object.prototype.constructor && (a.prototype.constructor = b)
    },
    b.extend = function(a, b) {
        var c;
        for (c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    },
    b.createSprite = function(a) {
        var c = function(c) {
            b.extend(this, a),
            b.Sprite.call(this, c)
        };
        return b.inherit(c, b.Sprite),
        c
    },
    b.createBitmap = function(a) {
        var c = function(c) {
            b.extend(this, a),
            b.Bitmap.call(this, c)
        };
        return b.inherit(c, b.Bitmap),
        c
    },
    b.eventList = {},
    b.DisplayObject = function(a) {
        this.x = 0,
        this.y = 0,
        this.width = 0,
        this.height = 0,
        this.alpha = 1,
        this.die = 0,
        this.rotation = 0,
        this.visible = 0,
        this.scaleX = 1,
        this.scaleY = 1,
        this.globalCompositeOperation = "",
        this.ctx = null,
        this.obb = [],
        this.eventFuc = {},
        this.static = 0,
        this.timeline = 0,
        this.ontween = 0,
        b.extend(this, a),
        this.__init()
    },
    b.DisplayObject.prototype = {
        __transform: function(a) {
            a.translate(this.x, this.y),
            this.alpha < 1 && (a.globalAlpha = this.alpha),
            this.rotation && a.rotate(this.rotation),
            (1 != this.scaleX || 1 != this.scaleY) && a.scale(this.scaleX, this.scaleY),
            this.globalCompositeOperation && (a.globalCompositeOperation = this.globalCompositeOperation)
        },
        render: function(a) {
            if (this.__tween(a), this.timeline++, !this.visible) {
                var b = this.ctx;
                b.save(),
                this.__transform(b),
                this.draw(b),
                b.restore()
            }
        },
        addEventListener: function(a, c) {
            b.eventList[a] || (b.eventList[a] = []),
            this.eventFuc[a] || (this.eventFuc[a] = []),
            b.eventList[a].push(this),
            this.eventFuc[a].push(c.bind(this))
        },
        removeEventListener: function(a) {
            b.eventList[a].splice(b.eventList[a].indexOf(this), 1),
            this.eventFuc[a] = []
        },
        testObb: function() {
            return new b.OBB(new b.Vector2(this.x - this.__obb_x, this.y - this.__obb_y), this.__w, this.__h, this.rotation)
        },
        __init: function() {
            this.__w = this.obb[2] - this.obb[0],
            this.__h = this.obb[3] - this.obb[1],
            this.__obb_x = this.width / 2 - this.obb[0] - this.__w / 2,
            this.__obb_y = this.height / 2 - this.obb[1] - this.__h / 2,
            this.w = this.width,
            this.h = this.height
        },
        setObb: function(a) {
            this.obb = a
        },
        checkBorder: function() {
            return b.OBBvsOBB(this.testObb(), new OBB(new b.Vector2(canvas_w / 2, canvas_h / 2), canvas_w, canvas_h, 0))
        },
        remove: function() {
            this.die = 1;
            for (var a in this.eventFuc) this.removeEventListener(a)
        },
        to: function(a, b, c, d, e, f) {
            this.duration = b,
            this.pattern = c || "Linear",
            this.ease = d || "easeIn",
            this.tween_obj = a,
            this.ontween = 1,
            this.current = 0,
            this.delaytime = e || 0,
            this.delaytime_t = 0,
            this.fuc = f || null,
            this.d_obj = {};
            for (i in a) this.d_obj[i] = this[i]
        },
        __tween: function(a) {
            if (this.ontween) if (this.delaytime_t >= this.delaytime) {
                this.current += a;
                for (i in this.tween_obj) this[i] = "Linear" == this.pattern ? b.Tween.Linear(this.current, this.d_obj[i], this.tween_obj[i] - this.d_obj[i], this.duration) : b.Tween[this.pattern][this.ease](this.current, this.d_obj[i], this.tween_obj[i] - this.d_obj[i], this.duration);
                if (this.current >= this.duration) {
                    for (i in this.tween_obj) this[i] = this.tween_obj[i];
                    this.ontween = 0,
                    this.delaytime_t = 0,
                    this.fuc && this.fuc()
                }
            } else this.delaytime_t += a
        }
    },
    b.Tween = {
        Linear: function(a, b, c, d) {
            return c * a / d + b
        },
        Quad: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a + b
            },
            easeOut: function(a, b, c, d) {
                return - c * (a /= d) * (a - 2) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a + b: -c / 2 * (--a * (a - 2) - 1) + b
            }
        },
        Cubic: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a * a + b
            },
            easeOut: function(a, b, c, d) {
                return c * ((a = a / d - 1) * a * a + 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a + b: c / 2 * ((a -= 2) * a * a + 2) + b
            }
        },
        Quart: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a * a * a + b
            },
            easeOut: function(a, b, c, d) {
                return - c * ((a = a / d - 1) * a * a * a - 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a * a + b: -c / 2 * ((a -= 2) * a * a * a - 2) + b
            }
        },
        Quint: {
            easeIn: function(a, b, c, d) {
                return c * (a /= d) * a * a * a * a + b
            },
            easeOut: function(a, b, c, d) {
                return c * ((a = a / d - 1) * a * a * a * a + 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a * a * a * a + b: c / 2 * ((a -= 2) * a * a * a * a + 2) + b
            }
        },
        Sine: {
            easeIn: function(a, b, c, d) {
                return - c * Math.cos(a / d * (Math.PI / 2)) + c + b
            },
            easeOut: function(a, b, c, d) {
                return c * Math.sin(a / d * (Math.PI / 2)) + b
            },
            easeInOut: function(a, b, c, d) {
                return - c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
            }
        },
        Expo: {
            easeIn: function(a, b, c, d) {
                return 0 == a ? b: c * Math.pow(2, 10 * (a / d - 1)) + b
            },
            easeOut: function(a, b, c, d) {
                return a == d ? b + c: c * ( - Math.pow(2, -10 * a / d) + 1) + b
            },
            easeInOut: function(a, b, c, d) {
                return 0 == a ? b: a == d ? b + c: (a /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (a - 1)) + b: c / 2 * ( - Math.pow(2, -10 * --a) + 2) + b
            }
        },
        Circ: {
            easeIn: function(a, b, c, d) {
                return - c * (Math.sqrt(1 - (a /= d) * a) - 1) + b
            },
            easeOut: function(a, b, c, d) {
                return c * Math.sqrt(1 - (a = a / d - 1) * a) + b
            },
            easeInOut: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b: c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
            }
        },
        Elastic: {
            easeIn: function(a, b, c, d, e, f) {
                if (0 == a) return b;
                if (1 == (a /= d)) return b + c;
                if (f || (f = .3 * d), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return - (e * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - g) * 2 * Math.PI / f)) + b
            },
            easeOut: function(a, b, c, d, e, f) {
                if (0 == a) return b;
                if (1 == (a /= d)) return b + c;
                if (f || (f = .3 * d), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return e * Math.pow(2, -10 * a) * Math.sin((a * d - g) * 2 * Math.PI / f) + c + b
            },
            easeInOut: function(a, b, c, d, e, f) {
                if (0 == a) return b;
                if (2 == (a /= d / 2)) return b + c;
                if (f || (f = d * .3 * 1.5), !e || e < Math.abs(c)) {
                    e = c;
                    var g = f / 4
                } else var g = f / (2 * Math.PI) * Math.asin(c / e);
                return 1 > a ? -.5 * e * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * d - g) * 2 * Math.PI / f) + b: .5 * e * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * d - g) * 2 * Math.PI / f) + c + b
            }
        },
        Back: {
            easeIn: function(a, b, c, d, e) {
                return void 0 == e && (e = 1.70158),
                c * (a /= d) * a * ((e + 1) * a - e) + b
            },
            easeOut: function(a, b, c, d, e) {
                return void 0 == e && (e = 1.70158),
                c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
            },
            easeInOut: function(a, b, c, d, e) {
                return void 0 == e && (e = 1.70158),
                (a /= d / 2) < 1 ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b: c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
            }
        },
        Bounce: {
            easeIn: function(a, b, c, d) {
                return c - this.easeOut(d - a, 0, c, d) + b
            },
            easeOut: function(a, b, c, d) {
                return (a /= d) < 1 / 2.75 ? c * 7.5625 * a * a + b: 2 / 2.75 > a ? c * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b: 2.5 / 2.75 > a ? c * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b: c * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
            },
            easeInOut: function(a, b, c, d) {
                return d / 2 > a ? .5 * this.easeIn(2 * a, 0, c, d) + b: .5 * this.easeOut(2 * a - d, 0, c, d) + .5 * c + b
            }
        }
    },
    b.Bitmap = function(a) {
        b.DisplayObject.call(this, a)
    },
    b.inherit(b.Bitmap, b.DisplayObject),
    b.Bitmap.prototype.draw = function(a) {
        a.drawImage(this.img, 0, 0, this.width, this.height, -this.w / 2, -this.h / 2, this.w, this.h)
    },
    b.Bitmap.prototype.update = function() {},
    b.Sprite = function(a) {
        this.anim = null,
        b.DisplayObject.call(this, a)
    },
    b.inherit(b.Sprite, b.DisplayObject),
    b.Sprite.prototype.draw = function(a) {
        a.drawImage(this.anim.img, this.anim.x, this.anim.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height)
    },
    b.Sprite.prototype.setAnim = function(a) {
        this.anim = a
    },
    b.Animdata = function(a, b, c) {
        for (var d = [], e = a.height / b, f = a.width / c, g = 0; b > g; g++) for (var h = 0; c > h; h++) d.push([h * f, e * g]);
        return d
    },
    b.Animation = function(a) {
        this.ctx = null,
        this.img = null,
        this.frames = [],
        this.loop = 0,
        this.speed = 1,
        this.__speed_t = 0,
        this.duration = 0,
        this.frameIndex = 0,
        this.onplay = 1,
        b.extend(this, a),
        this.len = this.frames.length
    },
    b.Animation.prototype = {
        update: function(a) {
            this.onplay && (this.__speed_t += a * this.speed, this.__speed_t >= this.duration && this.__nextFrame(Math.floor(this.__speed_t / this.duration)), this.x = this.frames[this.frameIndex][0], this.y = this.frames[this.frameIndex][1])
        },
        setEndfuc: function(a) {
            this.endfuc = a
        },
        setSpeed: function(a) {
            this.speed = a,
            this.__speed_t = 0
        },
        stop: function() {
            this.onplay = 0
        },
        play: function() {
            this.onplay = 1
        },
        __nextFrame: function(a) {
            this.frameIndex < this.len - a ? this.goframe(this.frameIndex + a) : this.loop ? this.goframe(0) : (this.endfuc && this.endfuc(), this.stop())
        },
        goframe: function(a) {
            this.frameIndex = a,
            this.__speed_t = 0
        }
    },
    b.TextField = function(a) {
        this.type = "text",
        this.color = "#000",
        this.size = "12px",
        this.family = "Verdana",
        this.text = "",
        this.weight = "normal",
        this.textAlign = "left",
        b.DisplayObject.call(this, a)
    },
    b.inherit(b.TextField, b.DisplayObject),
    b.TextField.prototype.draw = function(a) {
        a.fillStyle = this.color,
        a.shadowColor = "#000",
        a.shadowOffsetX = 2,
        a.shadowOffsetY = 2,
        a.textAlign = this.textAlign,
        a.font = this.weight + " " + this.size + "px " + this.family,
        a.fillText(this.text, 0, 0),
        a.fill()
    },
    b.TextField.prototype.update = function() {},
    b.Math = {
        random: function(a, b) {
            return Math.floor(Math.random() * (b - a + 1) + a)
        },
        coordinate: function(a, b, c, d, e) {
            var f = (a - c) * Math.cos(e),
            g = (b - d) * Math.sin(e);
            return [Math.round(f - g + c), Math.round(f + g + c)]
        }
    },
    b.OBB = function(a, c, d, e) {
        this.centerPoint = a,
        this.extents = [c / 2, d / 2],
        this.axes = [new b.Vector2(Math.cos(e), Math.sin(e)), new b.Vector2( - Math.sin(e), Math.cos(e))],
        this._width = c,
        this._height = d,
        this._rotation = e
    },
    b.OBB.prototype.getRadius = function(a) {
        return this.extents[0] * Math.abs(a.dot(this.axes[0])) + this.extents[1] * Math.abs(a.dot(this.axes[1]))
    },
    b.Vector2 = function(a, b) {
        this.x = a || 0,
        this.y = b || 0
    },
    b.Vector2.prototype = {
        sub: function(a) {
            return new b.Vector2(this.x - a.x, this.y - a.y)
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y
        }
    },
    b.OBBvsOBB = function(a, b) {
        var c = a.centerPoint.sub(b.centerPoint),
        d = a.axes[0],
        e = a.axes[1],
        f = b.axes[0],
        g = b.axes[1];
        return a.getRadius(g) + b.getRadius(g) <= Math.abs(c.dot(g)) || a.getRadius(f) + b.getRadius(f) <= Math.abs(c.dot(f)) || a.getRadius(e) + b.getRadius(e) <= Math.abs(c.dot(e)) || a.getRadius(d) + b.getRadius(d) <= Math.abs(c.dot(d)) ? 0 : 1
    },
    a.eG = a.easyGame = b
} (window);
var buzz = {
    defaults: {
        autoplay: !1,
        duration: 5e3,
        formats: [],
        loop: !1,
        placeholder: "--",
        preload: "metadata",
        volume: 80
    },
    types: {
        mp3: "audio/mpeg",
        ogg: "audio/ogg",
        wav: "audio/wav",
        aac: "audio/aac",
        m4a: "audio/x-m4a"
    },
    sounds: [],
    el: document.createElement("audio"),
    sound: function(a, b) {
        function c(a) {
            for (var b = [], c = a.length - 1, d = 0; c >= d; d++) b.push({
                start: a.start(c),
                end: a.end(c)
            });
            return b
        }
        function d(a) {
            return a.split(".").pop()
        }
        function e(a, b) {
            var c = document.createElement("source");
            c.src = b,
            buzz.types[d(b)] && (c.type = buzz.types[d(b)]),
            a.appendChild(c)
        }
        b = b || {};
        var f = 0,
        g = [],
        h = {},
        i = buzz.isSupported();
        if (this.load = function() {
            return i ? (this.sound.load(), this) : this
        },
        this.play = function() {
            return i ? (this.sound.play(), this) : this
        },
        this.togglePlay = function() {
            return i ? (this.sound.paused ? this.sound.play() : this.sound.pause(), this) : this
        },
        this.pause = function() {
            return i ? (this.sound.pause(), this) : this
        },
        this.isPaused = function() {
            return i ? this.sound.paused: null
        },
        this.stop = function() {
            return i ? (this.setTime(this.getDuration()), this.sound.pause(), this) : this
        },
        this.isEnded = function() {
            return i ? this.sound.ended: null
        },
        this.loop = function() {
            return i ? (this.sound.loop = "loop", this.bind("ended.buzzloop",
            function() {
                this.currentTime = 0,
                this.play()
            }), this) : this
        },
        this.unloop = function() {
            return i ? (this.sound.removeAttribute("loop"), this.unbind("ended.buzzloop"), this) : this
        },
        this.mute = function() {
            return i ? (this.sound.muted = !0, this) : this
        },
        this.unmute = function() {
            return i ? (this.sound.muted = !1, this) : this
        },
        this.toggleMute = function() {
            return i ? (this.sound.muted = !this.sound.muted, this) : this
        },
        this.isMuted = function() {
            return i ? this.sound.muted: null
        },
        this.setVolume = function(a) {
            return i ? (0 > a && (a = 0), a > 100 && (a = 100), this.volume = a, this.sound.volume = a / 100, this) : this
        },
        this.getVolume = function() {
            return i ? this.volume: this
        },
        this.increaseVolume = function(a) {
            return this.setVolume(this.volume + (a || 1))
        },
        this.decreaseVolume = function(a) {
            return this.setVolume(this.volume - (a || 1))
        },
        this.setTime = function(a) {
            return i ? (this.whenReady(function() {
                this.sound.currentTime = a
            }), this) : this
        },
        this.getTime = function() {
            if (!i) return null;
            var a = Math.round(100 * this.sound.currentTime) / 100;
            return isNaN(a) ? buzz.defaults.placeholder: a
        },
        this.setPercent = function(a) {
            return i ? this.setTime(buzz.fromPercent(a, this.sound.duration)) : this
        },
        this.getPercent = function() {
            if (!i) return null;
            var a = Math.round(buzz.toPercent(this.sound.currentTime, this.sound.duration));
            return isNaN(a) ? buzz.defaults.placeholder: a
        },
        this.setSpeed = function(a) {
            return i ? (this.sound.playbackRate = a, void 0) : this
        },
        this.getSpeed = function() {
            return i ? this.sound.playbackRate: null
        },
        this.getDuration = function() {
            if (!i) return null;
            var a = Math.round(100 * this.sound.duration) / 100;
            return isNaN(a) ? buzz.defaults.placeholder: a
        },
        this.getPlayed = function() {
            return i ? c(this.sound.played) : null
        },
        this.getBuffered = function() {
            return i ? c(this.sound.buffered) : null
        },
        this.getSeekable = function() {
            return i ? c(this.sound.seekable) : null
        },
        this.getErrorCode = function() {
            return i && this.sound.error ? this.sound.error.code: 0
        },
        this.getErrorMessage = function() {
            if (!i) return null;
            switch (this.getErrorCode()) {
            case 1:
                return "MEDIA_ERR_ABORTED";
            case 2:
                return "MEDIA_ERR_NETWORK";
            case 3:
                return "MEDIA_ERR_DECODE";
            case 4:
                return "MEDIA_ERR_SRC_NOT_SUPPORTED";
            default:
                return null
            }
        },
        this.getStateCode = function() {
            return i ? this.sound.readyState: null
        },
        this.getStateMessage = function() {
            if (!i) return null;
            switch (this.getStateCode()) {
            case 0:
                return "HAVE_NOTHING";
            case 1:
                return "HAVE_METADATA";
            case 2:
                return "HAVE_CURRENT_DATA";
            case 3:
                return "HAVE_FUTURE_DATA";
            case 4:
                return "HAVE_ENOUGH_DATA";
            default:
                return null
            }
        },
        this.getNetworkStateCode = function() {
            return i ? this.sound.networkState: null
        },
        this.getNetworkStateMessage = function() {
            if (!i) return null;
            switch (this.getNetworkStateCode()) {
            case 0:
                return "NETWORK_EMPTY";
            case 1:
                return "NETWORK_IDLE";
            case 2:
                return "NETWORK_LOADING";
            case 3:
                return "NETWORK_NO_SOURCE";
            default:
                return null
            }
        },
        this.set = function(a, b) {
            return i ? (this.sound[a] = b, this) : this
        },
        this.get = function(a) {
            return i ? a ? this.sound[a] : this.sound: null
        },
        this.bind = function(a, b) {
            if (!i) return this;
            a = a.split(" ");
            for (var c = this,
            d = function(a) {
                b.call(c, a)
            },
            e = 0; e < a.length; e++) {
                var f = a[e],
                h = f;
                f = h.split(".")[0],
                g.push({
                    idx: h,
                    func: d
                }),
                this.sound.addEventListener(f, d, !0)
            }
            return this
        },
        this.unbind = function(a) {
            if (!i) return this;
            a = a.split(" ");
            for (var b = 0; b < a.length; b++) for (var c = a[b], d = c.split(".")[0], e = 0; e < g.length; e++) {
                var f = g[e].idx.split("."); (g[e].idx == c || f[1] && f[1] == c.replace(".", "")) && (this.sound.removeEventListener(d, g[e].func, !0), delete g[e])
            }
            return this
        },
        this.bindOnce = function(a, b) {
            if (!i) return this;
            var c = this;
            h[f++] = !1,
            this.bind(f + a,
            function() {
                h[f] || (h[f] = !0, b.call(c)),
                c.unbind(f + a)
            })
        },
        this.trigger = function(a) {
            if (!i) return this;
            a = a.split(" ");
            for (var b = 0; b < a.length; b++) for (var c = a[b], d = 0; d < g.length; d++) {
                var e = g[d].idx.split(".");
                if (g[d].idx == c || e[0] && e[0] == c.replace(".", "")) {
                    var f = document.createEvent("HTMLEvents");
                    f.initEvent(e[0], !1, !0),
                    this.sound.dispatchEvent(f)
                }
            }
            return this
        },
        this.fadeTo = function(a, b, c) {
            function d() {
                setTimeout(function() {
                    a > e && g.volume < a ? (g.setVolume(g.volume += 1), d()) : e > a && g.volume > a ? (g.setVolume(g.volume -= 1), d()) : c instanceof Function && c.apply(g)
                },
                f)
            }
            if (!i) return this;
            b instanceof Function ? (c = b, b = buzz.defaults.duration) : b = b || buzz.defaults.duration;
            var e = this.volume,
            f = b / Math.abs(e - a),
            g = this;
            return this.play(),
            this.whenReady(function() {
                d()
            }),
            this
        },
        this.fadeIn = function(a, b) {
            return i ? this.setVolume(0).fadeTo(100, a, b) : this
        },
        this.fadeOut = function(a, b) {
            return i ? this.fadeTo(0, a, b) : this
        },
        this.fadeWith = function(a, b) {
            return i ? (this.fadeOut(b,
            function() {
                this.stop()
            }), a.play().fadeIn(b), this) : this
        },
        this.whenReady = function(a) {
            if (!i) return null;
            var b = this;
            0 === this.sound.readyState ? this.bind("canplay.buzzwhenready",
            function() {
                a.call(b)
            }) : a.call(b)
        },
        i) {
            for (var j in buzz.defaults) buzz.defaults.hasOwnProperty(j) && (b[j] = b[j] || buzz.defaults[j]);
            if (this.sound = document.createElement("audio"), a instanceof Array) for (var k in a) a.hasOwnProperty(k) && e(this.sound, a[k]);
            else if (b.formats.length) for (var l in b.formats) b.formats.hasOwnProperty(l) && e(this.sound, a + "." + b.formats[l]);
            else e(this.sound, a);
            b.loop && this.loop(),
            b.autoplay && (this.sound.autoplay = "autoplay"),
            this.sound.preload = b.preload === !0 ? "auto": b.preload === !1 ? "none": b.preload,
            this.setVolume(b.volume),
            buzz.sounds.push(this)
        }
    },
    group: function(a) {
        function b() {
            for (var b = c(null, arguments), d = b.shift(), e = 0; e < a.length; e++) a[e][d].apply(a[e], b)
        }
        function c(a, b) {
            return a instanceof Array ? a: Array.prototype.slice.call(b)
        }
        a = c(a, arguments),
        this.getSounds = function() {
            return a
        },
        this.add = function(b) {
            b = c(b, arguments);
            for (var d = 0; d < b.length; d++) a.push(b[d])
        },
        this.remove = function(b) {
            b = c(b, arguments);
            for (var d = 0; d < b.length; d++) for (var e = 0; e < a.length; e++) if (a[e] == b[d]) {
                delete a[e];
                break
            }
        },
        this.load = function() {
            return b("load"),
            this
        },
        this.play = function() {
            return b("play"),
            this
        },
        this.togglePlay = function() {
            return b("togglePlay"),
            this
        },
        this.pause = function(a) {
            return b("pause", a),
            this
        },
        this.stop = function() {
            return b("stop"),
            this
        },
        this.mute = function() {
            return b("mute"),
            this
        },
        this.unmute = function() {
            return b("unmute"),
            this
        },
        this.toggleMute = function() {
            return b("toggleMute"),
            this
        },
        this.setVolume = function(a) {
            return b("setVolume", a),
            this
        },
        this.increaseVolume = function(a) {
            return b("increaseVolume", a),
            this
        },
        this.decreaseVolume = function(a) {
            return b("decreaseVolume", a),
            this
        },
        this.loop = function() {
            return b("loop"),
            this
        },
        this.unloop = function() {
            return b("unloop"),
            this
        },
        this.setTime = function(a) {
            return b("setTime", a),
            this
        },
        this.setduration = function(a) {
            return b("setduration", a),
            this
        },
        this.set = function(a, c) {
            return b("set", a, c),
            this
        },
        this.bind = function(a, c) {
            return b("bind", a, c),
            this
        },
        this.unbind = function(a) {
            return b("unbind", a),
            this
        },
        this.bindOnce = function(a, c) {
            return b("bindOnce", a, c),
            this
        },
        this.trigger = function(a) {
            return b("trigger", a),
            this
        },
        this.fade = function(a, c, d, e) {
            return b("fade", a, c, d, e),
            this
        },
        this.fadeIn = function(a, c) {
            return b("fadeIn", a, c),
            this
        },
        this.fadeOut = function(a, c) {
            return b("fadeOut", a, c),
            this
        }
    },
    all: function() {
        return new buzz.group(buzz.sounds)
    },
    isSupported: function() {
        return !! buzz.el.canPlayType
    },
    isOGGSupported: function() {
        return !! buzz.el.canPlayType && buzz.el.canPlayType('audio/ogg; codecs="vorbis"')
    },
    isWAVSupported: function() {
        return !! buzz.el.canPlayType && buzz.el.canPlayType('audio/wav; codecs="1"')
    },
    isMP3Supported: function() {
        return !! buzz.el.canPlayType && buzz.el.canPlayType("audio/mpeg;")
    },
    isAACSupported: function() {
        return !! buzz.el.canPlayType && (buzz.el.canPlayType("audio/x-m4a;") || buzz.el.canPlayType("audio/aac;"))
    },
    toTimer: function(a, b) {
        var c, d, e;
        return c = Math.floor(a / 3600),
        c = isNaN(c) ? "--": c >= 10 ? c: "0" + c,
        d = b ? Math.floor(a / 60 % 60) : Math.floor(a / 60),
        d = isNaN(d) ? "--": d >= 10 ? d: "0" + d,
        e = Math.floor(a % 60),
        e = isNaN(e) ? "--": e >= 10 ? e: "0" + e,
        b ? c + ":" + d + ":" + e: d + ":" + e
    },
    fromTimer: function(a) {
        var b = a.toString().split(":");
        return b && 3 == b.length && (a = 3600 * parseInt(b[0], 10) + 60 * parseInt(b[1], 10) + parseInt(b[2], 10)),
        b && 2 == b.length && (a = 60 * parseInt(b[0], 10) + parseInt(b[1], 10)),
        a
    },
    toPercent: function(a, b, c) {
        var d = Math.pow(10, c || 0);
        return Math.round(100 * a / b * d) / d
    },
    fromPercent: function(a, b, c) {
        var d = Math.pow(10, c || 0);
        return Math.round(b / 100 * a * d) / d
    }
},
game = function(a) {
    this.over_t = 0,
    this.onStart = 0,
    this.bzlist = [],
    this.splist = [],
    this.enemylist = [],
    this.tanklist = [],
    this.stage = null,
    this.s = [],
    this.s2 = [],
    this.drPd = [],
    this.drJg = [],
    this.drDpd = [],
    this.splist = [],
    this.chenaList = [],
    this.zd = "a",
    this.player = null,
    this.stimer = null,
    this.sL = 0,
    this.gd = 0,
    this.lastAnimationFrameTime = 0,
    this.lastFpsUpdateTime = 0,
    this.fps = 0,
    this.leg = 0,
    this.c = a,
    this.st = 0,
    this.t = 0,
    IsPC() ? (gameEnter.style.width = "320px", this.pos_y = a.height, this.p_x = 1) : (this.p_x = this.c.width / document.documentElement.clientWidth, this.pos_y = document.documentElement.clientHeight * this.p_x, a.height = this.pos_y),
    this._x = 230,
    this._y = 440,
    this.easyGameList = [],
    this.ctx2 = a.getContext("2d"),
    this.ctx3 = score.getContext("2d"),
    this.ctx4 = hit.getContext("2d"),
    this.mub_list = [null, null, null, null, null, null, null, null, null],
    this.all_mub = "000000000",
    this.hit_list = [null, null, null],
    this.hit_mub = "000",
    this.imgList = ["img/startbg.jpg", "img/startBtn.png", "img/dr1.png", "img/pt.png", "img/dr2.png", "img/fire2.png", "img/pd.png", "img/pd2.png", "img/lxj.png", "img/dr8.png", "img/pd4.png", "img/pd3.png", "img/pd10.png", "img/pd8.png", "img/logo.png", "img/dr4.png", "img/hit.png", "img/bz3.png", "img/fire.png", "img/pd2.png", "img/pd11.png", "img/over.png", "img/restart.png", "img/pd6.png", "img/dr5.png", "img/dr6.png", "img/pd4.png", "img/hero.png", "img/s1.png", "img/s2.png", "img/s3.png", "img/share.png", "img/bg6.jpg", "img/dr6.png", "img/pd7.png", "img/pd8.png", "img/pd9.png", "img/pd10.png", "img/bz4.png", "img/dr5.png", "img/pd12.png", "img/pd5.png", "img/bz2.png", "img/jn2.png", "img/lxj2.png", "img/pd7.png", "img/dr10.png", "img/chena1.png", "img/pt2.png", "img/dr3.png", "img/chena2.png", "img/dr7.png", "img/lxj3.png", "img/pd22.png", "img/fire3.png", "img/dr9.png", "img/pd13.png", "img/pd14.png", "img/dr10.png", "img/pt3.png", "img/chena3.png", "img/lxj4.png", "img/fire4.png", "img/plane2.png", "img/fx.png", "img/plane3.png", "img/pd15.png", "img/pd17.png", "img/pd16.png", "img/pd19.png", "img/pd20.png", "img/pd21.png", "img/dr11.png", "img/pt4.png", "img/pt5.png", "img/p2.jpg", "img/power.png", "img/bg5.jpg", "img/hp.png", "img/pt6.png", "img/mis.png", "img/m1.png", "img/pd24.png", "img/pd25.png", "img/m2.png", "img/mu0.png", "img/mu1.png", "img/mu2.png", "img/mu3.png", "img/mu4.png", "img/mu5.png", "img/mu6.png", "img/mu7.png", "img/mu8.png", "img/mu9.png", "img/pt12.png", "img/pt13.png", "img/pt14.png", "img/pt15.png", "img/pt10.png", "img/pt11.png", "img/pd26.png", "img/pd27.png", "img/pd28.png", "img/pd29.png", "img/pd30.png", "img/pd31.png", "img/p4.jpg", "img/cop.png", "img/next.png", "img/ct.png"],
    this.imgDx = [];
    for (var c = 0; c < this.imgList.length; c++) this.imgDx[c] = new Image,
    this.imgDx[c].src = this.imgList[c]
};
game.prototype.addEventListener = function(a) {
    function c(c) {
        if ("touchstart" == a && eG.eventList[a]) {
            "touchstart" == a && 1 == c.targetTouches.length && (c.preventDefault(), c = c.targetTouches[0]),
            "touchend" == a && (c = c.changedTouches[0]);
            for (var d = eG.eventList[a], e = 0, f = d.length, g = new easyGame.OBB(new eG.Vector2(c.pageX * b.p_x, c.pageY * b.p_x), 0, 0, 0); f > e; e++) {
                var h = d[e];
                if (eG.OBBvsOBB(g, h.testObb())) for (var i = 0,
                j = h.eventFuc[a].length; j > i; i++) h.eventFuc[a][i](c)
            }
        }
        if ("click" == a && eG.eventList.touchstart) {
            "touchstart" == a && 1 == c.targetTouches.length && (c.preventDefault(), c = c.targetTouches[0]),
            "touchend" == a && (c = c.changedTouches[0]);
            for (var d = eG.eventList.touchstart,
            e = 0,
            f = d.length,
            g = new easyGame.OBB(new eG.Vector2(c.pageX * b.p_x, c.pageY * b.p_x), 0, 0, 0); f > e; e++) {
                var h = d[e];
                if (eG.OBBvsOBB(g, h.testObb())) for (var i = 0,
                j = h.eventFuc.touchstart.length; j > i; i++) h.eventFuc.touchstart[i](c)
            }
        }
    }
    this.c.addEventListener(a, c);
    var b = this
},
game.prototype.drawFPS = function(a) {
    var b = 1e3 / (a - this.lastAnimationFrameTime);
    this.lastAnimationFrameTime = a,
    a - this.lastFpsUpdateTime > 1e3 && (this.lastFpsUpdateTime = a, this.fps = b),
    this.ctx2.font = "18px Arial bold",
    this.ctx2.fillText(this.fps.toFixed(0) + "FPS", 10, 626)
},
game.prototype.score_init = function(a) {
    for (var b = "",
    c = 0; c < this.mub_list.length - a.toString().length; c++) b += " ";
    a = b + a;
    for (var d = a.toString().split(""), e = Attack.all_mub.toString().split(""), c = 0; c < Attack.mub_list.length; c++)" " != d[c] && (" " == e[c] && (e[c] = "0"), Attack.mub_list[c] = new a_mub(parseInt(e[c]), 14 * c + 3, parseInt(d[c]), 4, 28, this.ctx3));
    Attack.all_mub = a.toString()
},
game.prototype.hit_init = function(a) {
    for (var b = "",
    c = 0; c < this.hit_list.length - a.toString().length; c++) b += " ";
    a = b + a;
    var d = a.toString().split(""),
    e = Attack.hit_mub.toString().split("");
    Attack.hit_mub = a.toString();
    for (var c = 0; c < Attack.hit_list.length; c++)" " != d[c] && (" " == e[c] && (e[c] = "0"), Attack.hit_list[c] = new a_mub(parseInt(e[c]), 36 * c - 36, parseInt(d[c]), 5, 74, this.ctx4))
},
game.prototype.loading = function() {
    this.stimer = setInterval(function() {
        this.ready()
    }.bind(this), 100)
},
game.prototype.ready = function() {
    for (var a = 0,
    b = 0; b < this.imgList.length; b++) this.imgDx[b].complete && a++;
    var c = this.ctx2;
    if (this.imgList.length, c.beginPath(), c.fillStyle = "#000", c.fillRect(0, 0, 320, 600), c.beginPath(), c.fillStyle = "#fff", c.font = "bold 19px Arial", c.textAlign = "center", c.fillText("LOADING...  " + Math.floor(100 * (a / this.imgList.length)) + "%", 160, this.pos_y / 2), c.fill(), this.t++, a == this.imgList.length) {
        clearInterval(this.stimer),
        this.stimer3 = setInterval(function() {
            this.ui()
        }.bind(this), 20),
        c.clearRect(0, 0, 320, 600);
        var e = this.createrBtn(Attack.imgDx[0], 160, 285, 1),
        f = this.createrBtn(Attack.imgDx[1], 160, this.pos_y + 100, 0),
        g = this.createrBtn(Attack.imgDx[1], 160, this.pos_y + 100, 1);
        f.update = function() {
            this.ct++,
            f.alpha = 1 - .3 * Math.sin(this.ct % 30 * Math.PI / 30)
        },
        f.to({
            y: Attack.pos_y - 100
        },
        30, "Back", "easeOut", 6),
        g.to({
            y: Attack.pos_y - 100
        },
        30, "Back", "easeOut", 6);
        var h = this.createrBtn(Attack.imgDx[14], 160, -100, 1);
        h.to({
            y: 120
        },
        30, "Bounce", "easeOut", 0,
        function() {
            h.update = function() {
                this.ct++,
                h.alpha = 1 - .2 * Math.sin(this.ct % 50 * Math.PI / 50)
            }
        });
        var i = this.createrBtn(Attack.imgDx[75], 153, 120, 0);
        return i.update = function() {
            if (this.ct++, this.ct % 180 >= 150) {
                this.alpha = 1;
                var b = Math.sin((this.ct % 180 - 150) * Math.PI / 30);
                this.w = this.h = 110 * b,
                this.rotation += Math.PI / 20
            } else this.alpha = 0
        },
        this.easyGameList.push(e, g, f, h, i),
        this.addEventListener("touchstart"),
        this.addEventListener("click"),
        f.addEventListener("touchstart",
        function() {
            g.to({
                y: Attack.pos_y + 100
            },
            10, "Back", "easeIn", 2),
            f.to({
                y: Attack.pos_y + 100
            },
            10, "Back", "easeIn", 2,
            function() {
                Attack.onStart = 1,
                Attack.easyGameList = [],
                easyGame.eventList = {}
            })
        }),
        void 0
    }
},
game.prototype.createrBtn = function(a, b, c, d) {
    var f, e = a.width,
    g = a.height;
    f = d ? "": "lighter";
    var h = new easyGame.Bitmap({
        ctx: Attack.ctx2,
        img: a,
        globalCompositeOperation: f,
        width: e,
        height: g,
        "static": 1,
        x: b,
        alpha: 1,
        ct: 0,
        y: c,
        ct: 0,
        obb: [0, 0, e, g]
    });
    return h
},
game.prototype.ui = function() {
    for (var a = 0,
    b = 0,
    c = 1,
    d = this.easyGameList; b < d.length; b++) d[b].die && d.splice(b, 1);
    for (var e = d.length; e > a; a++) {
        var f = d[a];
        f.static || (f.x += this.__viewport.speed_x * c, f.y += this.__viewport.speed_y * c),
        f.update(c),
        f.render(c)
    }
    this.onStart && (clearInterval(this.stimer3), setTimeout(function() {
        this.start()
    }.bind(this), 100))
},
game.prototype.information = function() {
    var a = this.ctx2,
    b = this.player;
    a.drawImage(score, 120, 4),
    a.save(),
    a.globalCompositeOperation = "lighter",
    a.drawImage(hit, 5, 55),
    a.restore(),
    this.ctx3.clearRect(0, 0, 144, 30),
    this.ctx4.clearRect(0, 0, 160, 74),
    b.htime > 0 && b.hit >= 1 ? (a.save(), b.htime--, a.globalCompositeOperation = "lighter", a.drawImage(Attack.imgDx[16], 102, 90), a.restore()) : (b.hit > b.maxHit && (b.maxHit = b.hit), this.hit_mub = "0000", b.hit = 0, this.hit_list = [null, null, null, null])
},
game.prototype.drObj = function() {
    this.stimer = requestAnimFrame(function() {
        Attack.drObj()
    });
    for (var a = this.enemylist,
    b = this.tanklist,
    c = this.bzlist,
    d = this.splist,
    e = this.drPd,
    f = this.drDpd,
    g = this.player,
    h = this.s2,
    i = 0; i < c.length; i++) c[i].die && c.splice(i, 1);
    for (var i = 0; i < d.length; i++) d[i].die && d.splice(i, 1);
    for (var i = 0; i < h.length; i++) h[i].die && h.splice(i, 1);
    for (var i = 0; i < a.length; i++) a[i].die && a.splice(i, 1);
    for (var i = 0; i < b.length; i++) b[i].die && b.splice(i, 1);
    for (var i = 0; i < f.length; i++) f[i].die && f.splice(i, 1);
    for (var i = 0; i < e.length; i++) e[i].die && e.splice(i, 1);
    this.stage.drBg(),
    this.stage.sT();
    for (var i = 0; i < b.length; i++) b[i].move(),
    b[i].check() && (b[i].dr(), b[i].fpao());
    for (var i = 0; i < a.length; i++) a[i].move(),
    a[i].check() && (a[i].dr(), a[i].fpao());
    for (var i = 0; i < c.length; i++) c[i].dr(),
    c[i].bao();
    for (var i = 0; i < d.length; i++) d[i].dr(),
    d[i].bao();
    for (var i = 0; i < h.length; i++) h[i].dr(),
    h[i].move();
    for (var i = 0,
    j = e.length; j > i; i++) e[i].move2(),
    e[i].dr();
    for (var i = 0,
    j = f.length; j > i; i++) f[i].move(),
    f[i].dr();
    if (!g.die) {
        g.moveZd(),
        g.dr(),
        g.fpao();
        for (var i = 0; 4 > i; i++) null != Attack.hit_list[i] && (Attack.hit_list[i].dr(), Attack.hit_list[i].move());
        this.information();
        for (var i = 0; 9 > i; i++) null != Attack.mub_list[i] && (Attack.mub_list[i].dr(), Attack.mub_list[i].move())
    }
    "a" != this.zd && (this.zd.dr(), this.zd.run());
    for (var j = 0,
    k = 0,
    l = 1,
    m = this.easyGameList; k < m.length; k++) m[k].die && m.splice(k, 1);
    for (var n = m.length; n > j; j++) {
        var o = m[j];
        o.static || (o.x += this.__viewport.speed_x * l, o.y += this.__viewport.speed_y * l),
        o.update(l),
        o.render(l)
    }
},
game.prototype.gameover = function() {
	
    var a = this.createrBtn(Attack.imgDx[21], 160, -100, 0);
    a.to({
        y: Attack.pos_y / 2 - 120
    },
    30, "Bounce", "easeOut", 0);
    var b = this.createrBtn(Attack.imgDx[22], -160, this.pos_y - 130, 0);
    b.update = function() {
        this.ct++,
        b.alpha = 1 - .3 * Math.sin(this.ct % 30 * Math.PI / 30)
    },
    b.to({
        x: 160
    },
    30, "Back", "easeOut", 6),
    b.addEventListener("touchstart",
    function() {
        Attack.init(),
        Attack.restart()
    });
	 var m = this.createrBtn(Attack.imgDx[31], -160, this.pos_y - 60, 0);
     m.update = function() {
        this.ct++,
        m.alpha = 1 - .3 * Math.sin(this.ct % 30 * Math.PI / 30)
    },
    m.to({
        x: 160
    },
    30, "Back", "easeOut", 6),
    m.addEventListener("touchstart",
    function() {
       dp_share();
    }),
    this.fxBox = new easyGame.Bitmap({
        x: 160,
        y: 290,
        "static": 1,
        img: Attack.imgDx[64],
        width: 320,
        height: 587,
        alpha: 1,
        ctx: Attack.ctx2
    });
    var c = new easyGame.TextField({
        x: 150,
        y: Attack.pos_y / 2,
        text: "BREAK UP :",
        "static": 1,
        color: "#fff",
        weight: "bold",
        alpha: 0,
        ctx: Attack.ctx2,
        n: 0,
        size: 16,
        textAlign: "right"
    });
    c.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 20);
    var d = new easyGame.TextField({
        x: 170,
        y: Attack.pos_y / 2,
        text: 0,
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 20,
        textAlign: "left"
    });
    d.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 20,
    function() {
        d.update = function() {
            //this.n <= Attack.player.kill && (this.n += Attack.player.kill / 20, this.text = this.n.toFixed(0))
			this.text=Attack.player.kill;
        }
    });
    var e = new easyGame.TextField({
        x: 150,
        y: Attack.pos_y / 2 - 40,
        text: "MAX-HIT :",
        "static": 1,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        alpha: 0,
        size: 16,
        textAlign: "right"
    });
    e.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 0);
    var f = new easyGame.TextField({
        x: 170,
        y: Attack.pos_y / 2 - 40,
        text: 0,
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 20,
        textAlign: "left"
    });
    f.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 0,
    function() {
        f.update = function() {
           // this.n <= Attack.player.maxHit && (this.n += Attack.player.maxHit / 20, this.text = this.n.toFixed(0))
		   this.text=Attack.player.maxHit;
        }
    });
    var g = new easyGame.TextField({
        x: 150,
        y: Attack.pos_y / 2 + 40,
        text: "SCORE :",
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 16,
        textAlign: "right"
    });
    g.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 40);
    var h = new easyGame.TextField({
        x: 170,
        y: Attack.pos_y / 2 + 40,
        text: 0,
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 20,
        textAlign: "left"
    });
    h.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 40,
    function() {
        h.update = function() {
           // this.n <= parseInt(Attack.all_mub) && (this.n += parseInt(Attack.all_mub) / 20, this.text = this.n.toFixed(0))
		   this.text=parseInt(Attack.all_mub);
        }
    }),
    this.easyGameList.push(this.fxBox, a, b, e, f, c, d, g, h,m);
	dp_submitScore(parseInt(Attack.all_mub));
},
game.prototype.getItext = function(){
	return "我击破"+Attack.player.kill+"架机体，最高连击数为"+Attack.player.maxHit+"最终得分"+parseInt(Attack.all_mub)+"快来挑战我吧！！！"
},
game.prototype.result = function() {

    var a = this.createrBtn(Attack.imgDx[108], 160, -100, 0);
    if (a.to({
        y: Attack.pos_y / 2 - 120
    },
    30, "Bounce", "easeOut", 0), this.stageI <= 0) {
        var b = this.createrBtn(Attack.imgDx[109], -160, this.pos_y - 90, 0);
        b.update = function() {
            this.ct++,
            b.alpha = 1 - .3 * Math.sin(this.ct % 30 * Math.PI / 30)
        },
        b.to({
            x: 160
        },
        30, "Back", "easeOut", 6),
        b.addEventListener("touchstart",
        function() {
            a.to({
                x: -160
            },
            30, "Back", "easeOut", 0),
            b.to({
                x: 480
            },
            30, "Back", "easeOut", 6),
            Attack.fxBox.to({
                alpha: 0
            },
            20, "Linear", "easeIn", 5,
            function() {
                Attack.init(),
                Attack.next()
            })
        })
    } else {
        var b = this.createrBtn(Attack.imgDx[110], -160, this.pos_y - 90, 0);
        b.update = function() {
            this.ct++,
            b.alpha = 1 - .3 * Math.sin(this.ct % 30 * Math.PI / 30)
        },
        b.to({
            x: 160
        },
        30, "Back", "easeOut", 6),
        b.addEventListener("touchstart",
        function() {
            a.to({
                x: -160
            },
            30, "Back", "easeOut", 0),
            b.to({
                x: 480
            },
            30, "Back", "easeOut", 6),
            Attack.fxBox.to({
                alpha: 0
            },
            20, "Linear", "easeIn", 5,
            function() {
                Attack.init(),
                Attack.stageI = 0,
                Attack.player.kill > 300 && Attack.player.maxHit > 100 && 100 * Math.random() < 12 && (Attack.gd = 1),
                Attack.restart()
            })
        })
    }
    this.fxBox = new easyGame.Bitmap({
        x: 160,
        y: 290,
        "static": 1,
        img: Attack.imgDx[64],
        width: 320,
        height: 587,
        alpha: 1,
        ctx: Attack.ctx2
    });
    var c = new easyGame.TextField({
        x: 150,
        y: Attack.pos_y / 2,
        text: "BREAK UP :",
        "static": 1,
        color: "#fff",
        weight: "bold",
        alpha: 0,
        ctx: Attack.ctx2,
        n: 0,
        size: 16,
        textAlign: "right"
    });
    c.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 20);
    var d = new easyGame.TextField({
        x: 170,
        y: Attack.pos_y / 2,
        text: 0,
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 20,
        textAlign: "left"
    });
    d.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 20,
    function() {
        d.update = function() {
            this.n <= Attack.player.kill && (this.n += Attack.player.kill / 20, this.text = this.n.toFixed(0))
        }
    });
    var e = new easyGame.TextField({
        x: 150,
        y: Attack.pos_y / 2 - 40,
        text: "MAX-HIT :",
        "static": 1,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        alpha: 0,
        size: 16,
        textAlign: "right"
    });
    e.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 0);
    var f = new easyGame.TextField({
        x: 170,
        y: Attack.pos_y / 2 - 40,
        text: 0,
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 20,
        textAlign: "left"
    });
    f.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 0,
    function() {
        f.update = function() {
            this.n <= Attack.player.maxHit && (this.n += Attack.player.maxHit / 20, this.text = this.n.toFixed(0))
        }
    });
    var g = new easyGame.TextField({
        x: 150,
        y: Attack.pos_y / 2 + 40,
        text: "SCORE :",
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 16,
        textAlign: "right"
    });
    g.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 40);
    var h = new easyGame.TextField({
        x: 170,
        y: Attack.pos_y / 2 + 40,
        text: 0,
        "static": 1,
        alpha: 0,
        color: "#fff",
        weight: "bold",
        ctx: Attack.ctx2,
        n: 0,
        size: 20,
        textAlign: "left"
    });
    h.to({
        alpha: 1
    },
    20, "Linear", "easeOut", 40,
    function() {
        h.update = function() {
            this.n <= parseInt(Attack.all_mub) && (this.n += parseInt(Attack.all_mub) / 20, this.text = this.n.toFixed(0))
        }
    }),
    this.easyGameList.push(this.fxBox, a, b, e, f, c, d, g, h)
};
var __x, __y;
game.prototype.ts = function(a) {
    a.targetTouches && 1 == a.targetTouches.length && (a.preventDefault(), a = a.targetTouches[0]),
    __x = a.pageX * Attack.p_x,
    __y = a.pageY * Attack.p_x
},
game.prototype.tmove = function(a) {
    a.targetTouches && 1 == a.targetTouches.length && (a.preventDefault(), a = a.targetTouches[0]),
    Attack._x += a.pageX * Attack.p_x - __x,
    Attack._y += a.pageY * Attack.p_x - __y,
    __x = a.pageX * Attack.p_x,
    __y = a.pageY * Attack.p_x,
    Attack._x < 0 && (Attack._x = 0),
    Attack._x > 320 && (Attack._x = 320),
    Attack._y < 0 && (Attack._y = 0),
    Attack._y > Attack.pos_y - 20 && (Attack._y = Attack.pos_y - 20)
},
game.prototype.tmove2 = function(a) {
    Attack._x = a.pageX,
    Attack._y = a.pageY,
    Attack._x < 0 && (Attack._x = 0),
    Attack._x > 320 && (Attack._x = 320),
    Attack._y < 0 && (Attack._y = 0),
    Attack._y > Attack.pos_y - 20 && (Attack._y = Attack.pos_y - 20)
},
game.prototype.next = function() {
    this.player.wd = 2,
    this.stageI++,
    this.stage = this.stageList[this.stageI],
    this.stage.t = 0;
    var a = gameEnter;
    this.player.x = 160,
    this.player.y = 600,
    IsPC() ? (a.removeEventListener("mousemove", this.tmove2, !1), a.addEventListener("mousemove", this.tmove2, !1)) : (a.removeEventListener("touchstart", this.ts, !1), a.removeEventListener("touchmove", this.tmove, !1), a.addEventListener("touchstart", this.ts, !1), a.addEventListener("touchmove", this.tmove, !1))
},


game.prototype.restart = function() {
    this.mub_list = [null, null, null, null, null, null, null, null, null],
    this.all_mub = "000000000",
	
	Attack.gd = 1;
    this.player=Attack.gd?new free(160,600,92,80,Attack.imgDx[65],2):new plane(160,600,66,51,Attack.imgDx[63],2);
    
	var a = new stage(0, "STAGE 2", 2, 570, Attack.imgDx[32]);
    a.sT = function() {
        stage2(this.t)
    };
    var b = new stage(0, "STAGE 1", 2, 570, Attack.imgDx[77]);
    b.sT = function() {
        stage1(this.t)
    },
    this.stageList = [b, a],
    this.stage = this.stageList[this.stageI],
    this.stage.t = 0,
    this.player.wd = 2,
    Attack.score_init(parseInt(Attack.all_mub));
    var c = gameEnter;
    IsPC() ? (c.removeEventListener("mousemove", this.tmove2, !1), c.addEventListener("mousemove", this.tmove2, !1)) : (c.removeEventListener("touchstart", this.ts, !1), c.removeEventListener("touchmove", this.tmove, !1), c.addEventListener("touchstart", this.ts, !1), c.addEventListener("touchmove", this.tmove, !1))
},
game.prototype.start = function() {
    this.mub_list = [null, null, null, null, null, null, null, null, null],
    this.all_mub = "000000000",
    this.player=Attack.gd?new free(160,600,92,80,Attack.imgDx[65],2):new plane(160,600,66,51,Attack.imgDx[63],2);
    var a = new stage(0, "STAGE 2", 2, 570, Attack.imgDx[32]);
    a.sT = function() {
        stage2(this.t)
    };
	
    var b = new stage(0, "STAGE 1", 2, 570, Attack.imgDx[77]);
    b.sT = function() {
        stage1(this.t)
    },
    this.stageList = [b, a],
    this.stageI = 0,
    this.stage = this.stageList[this.stageI],
    this.player.wd = 2,
    Attack.score_init(parseInt(Attack.all_mub)),
    Attack.drObj();
    var c = gameEnter;
    IsPC() ? (c.removeEventListener("mousemove", this.tmove2, !1), c.addEventListener("mousemove", this.tmove2, !1)) : (c.removeEventListener("touchstart", this.ts, !1), c.removeEventListener("touchmove", this.tmove, !1), c.addEventListener("touchstart", this.ts, !1), c.addEventListener("touchmove", this.tmove, !1));

},
game.prototype.init = function() {
    this.sp1 = 10,
    this.bzlist = [],
    this.enemylist = [],
    this.s = [],
    this.s2 = [],
    this.drPd = [],
    this.drDpd = [],
    this.drJg = [],
    this.chenaList = [],
    this.tanklist = [],
    this.splist = [],
    this.zd = "a",
    this._x = 190,
    this._y = Attack.pos_y - 160,
    this.sL = 0,
    this.over_t = 0,
    this.dn = 0,
    this.easyGameList = [],
    easyGame.eventList = {},
    this.hit_list = [null, null, null],
    this.hit_mub = "000",
    this.onStart = 0,
    this.bzlist = [],
    this.splist = [],
    this.enemylist = [],
    this.tanklist = []
};
var plane = function(a, b, c, d, e, f) {
    this.x = a,
    this.y = b,
    this.w = c,
    this.h = d,
    this.img = e,
    this.type = f,
    this.blood = 3,
    this.wd = 0,
    this.wdk = 0,
    this.score = 0,
    this.nl = 200,
    this.t = 0,
    this.htime = 0,
    this.hit_t = 0,
    this.hit = 0,
    this.speed = 5,
    this.maxHit = 0,
    this.kill = 0,
    this.power = 1,
    this.die = 0,
    this.star = 0,
    this.d = 4,
    this.wd_h = 100,
    this.tl = 0,
    this.tr = 0,
    this.tween_t = 0,
    this.n_rad = 0,
    this.dd = 1
};
plane.prototype.dr = function() {
    var a = Attack.ctx2;
    a.drawImage(this.img, this.w * Math.floor(this.d), this.h, this.w, this.h, this.x + 50, this.y + 80, .5 * this.w, .5 * this.h),
    0 == this.t % 10 && a.drawImage(Attack.imgDx[5], this.x + this.w / 2 - 32, this.y - 20),
    a.save(),
    a.drawImage(Attack.imgDx[61], 46 * (Math.floor(this.t / 2) % 3), 0, 46, 8, this.x + this.w / 2 - 17, this.y - 2, 34, 6),
    a.drawImage(this.img, this.w * Math.floor(this.d), 0, this.w, this.h, this.x, this.y, this.w, this.h),
    a.save(),
    a.globalAlpha = Math.sin(this.t % 100 * Math.PI / 100),
    a.drawImage(Attack.imgDx[27], 0, 12 * Math.floor(this.t / 4 % 2), 12, 12, this.x + this.w / 2 - 5, this.y + 18 - 5, 10, 10),
    a.restore(),
    1 == this.wd && this.wdk < 120 ? (1 == this.wdk && (Attack.c.className = "gameOn", setTimeout(function() {
        Attack.c.className = ""
    },
    800), this.wd_h = 30), this.wdk < 40 ? this.wd_h += this.wdk: this.wd_h = 100, a.save(), a.translate(this.x + this.w / 2, this.y + this.h / 2), a.rotate(Math.PI / 12 * (Math.floor(this.wdk / 5) % 24)), a.drawImage(Attack.imgDx[62], 0, 0, 130, 130, -this.wd_h / 2, -this.wd_h / 2, this.wd_h, this.wd_h), a.restore(), this.wdk++) : 2 == this.wd && this.wdk < 300 ? (a.save(), a.translate(this.x + this.w / 2, this.y + this.h / 2), a.rotate(Math.PI / 12 * (Math.floor(this.wdk / 5) % 24)), a.drawImage(Attack.imgDx[62], 0, 0, 130, 130, -this.wd_h / 2, -this.wd_h / 2, this.wd_h, this.wd_h), a.restore(), this.wdk++) : (this.wd = 0, this.wdk = 0),
    a.restore()
},
plane.prototype.ispower = function() {
    switch (this.power) {
    case 1:
        0 == this.t % 10 && (this.fire(this.x + 33 - 10, this.y + 8, 12, 30, 14, 2 * Math.PI), this.fire(this.x + 33 + 10, this.y + 8, 12, 30, 14, 2 * Math.PI));
        break;
    case 2:
        0 == this.t % 12 && (this.fire(this.x + 33 - 15, this.y + 8, 12, 30, 14, 2 * Math.PI), this.fire(this.x + 33 + 15, this.y + 8, 12, 30, 14, 2 * Math.PI), this.fire(this.x + 33, this.y + 18, 12, 30, 16, 2 * Math.PI));
        break;
    case 3:
        0 == this.t % 8 && (this.fire(this.x + 33 - 15, this.y + 8, 16, 30, 14, 2 * Math.PI), this.fire(this.x + 33 + 15, this.y + 8, 16, 30, 14, 2 * Math.PI), this.fire(this.x + 33, this.y + 8, 16, 30, 16, 2 * Math.PI));
        break;
    case 4:
        0 == this.t % 11 && (this.fire(this.x + 33 - 6, this.y + 8, 12, 30, 16, 2 * Math.PI), this.fire(this.x + 33 + 6, this.y + 8, 12, 30, 16, 2 * Math.PI), this.fire(this.x + 33 - 12, this.y + 8, 12, 30, 14, Math.PI / 50), this.fire(this.x + 33 + 12, this.y + 8, 12, 30, 14, -Math.PI / 50));
        break;
    case 5:
        0 == this.t % 9 && (this.fire(this.x + 33 - 6, this.y + 8, 14, 30, 16, 2 * Math.PI), this.fire(this.x + 33 + 6, this.y + 8, 14, 30, 16, 2 * Math.PI), this.fire(this.x + 33 - 12, this.y + 8, 14, 30, 14, Math.PI / 50), this.fire(this.x + 33 + 12, this.y + 8, 14, 30, 14, -Math.PI / 50));
        break;
    case 6:
        0 == this.t % 11 && (this.fire(this.x + 33 - 6, this.y + 8, 12, 30, 16, 2 * Math.PI), this.fire(this.x + 33 + 6, this.y + 8, 12, 30, 16, 2 * Math.PI), this.fire(this.x + 33 - 12, this.y + 8, 12, 30, 14, Math.PI / 50), this.fire(this.x + 33 + 12, this.y + 8, 12, 30, 14, -Math.PI / 50), this.fire(this.x + 33 - 22, this.y + 8, 12, 30, 14, Math.PI / 30), this.fire(this.x + 33 + 22, this.y + 8, 12, 30, 14, -Math.PI / 30));
        break;
    case 7:
        0 == this.t % 9 && (this.fire(this.x + 33 - 6, this.y + 8, 14, 30, 16, 2 * Math.PI), this.fire(this.x + 33 + 6, this.y + 8, 14, 30, 16, 2 * Math.PI), this.fire(this.x + 33 - 12, this.y + 8, 14, 30, 14, Math.PI / 50), this.fire(this.x + 33 + 12, this.y + 8, 14, 30, 14, -Math.PI / 50), this.fire(this.x + 33 - 22, this.y + 8, 14, 30, 14, Math.PI / 30), this.fire(this.x + 33 + 22, this.y + 8, 14, 30, 14, -Math.PI / 30));
        break;
    case 8:
        0 == this.t % 10 && (this.fire(this.x + 33 - 6, this.y + 8, 12, 30, 16, 2 * Math.PI), this.fire(this.x + 33 + 6, this.y + 8, 12, 30, 16, 2 * Math.PI), this.fire(this.x + 33 - 12, this.y + 8, 12, 30, 16, Math.PI / 50), this.fire(this.x + 33 + 12, this.y + 8, 12, 30, 16, -Math.PI / 50), this.fire(this.x + 33 - 22, this.y + 8, 12, 30, 14, Math.PI / 30), this.fire(this.x + 33 + 22, this.y + 8, 12, 30, 14, -Math.PI / 30), this.fire(this.x + 33 - 22, this.y + 8, 12, 30, 14, Math.PI / 10), this.fire(this.x + 33 + 22, this.y + 8, 12, 30, 14, -Math.PI / 10));
        break;
    case 9:
        0 == this.t % 9 && (this.fire(this.x + 33 - 6, this.y + 8, 14, 30, 16, 2 * Math.PI), this.fire(this.x + 33 + 6, this.y + 8, 14, 30, 16, 2 * Math.PI), this.fire(this.x + 33 - 12, this.y + 8, 14, 30, 16, Math.PI / 50), this.fire(this.x + 33 + 12, this.y + 8, 14, 30, 16, -Math.PI / 50), this.fire(this.x + 33 - 22, this.y + 8, 14, 30, 14, Math.PI / 30), this.fire(this.x + 33 + 22, this.y + 8, 14, 30, 14, -Math.PI / 30), this.fire(this.x + 33 - 22, this.y + 8, 14, 30, 14, Math.PI / 10), this.fire(this.x + 33 + 22, this.y + 8, 14, 30, 14, -Math.PI / 10));
        break;
    case 10:
        0 == this.t % 6 && (this.n_rad += Math.PI / 60 * Math.sin(this.t * Math.PI / 50), this.fire(this.x + 33 - 8, this.y + 8, 14, 30, 16, Math.PI / 80), this.fire(this.x + 33, this.y + 8, 12, 30, 16, 0), this.fire(this.x + 33 + 8, this.y + 8, 14, 30, 16, -Math.PI / 80), this.fire(this.x + 33 - 16, this.y + 8, 14, 30, 14, this.n_rad), this.fire(this.x + 33 + 16, this.y + 8, 14, 30, 14, -this.n_rad))
    }
},
plane.prototype.isdd = function() {
    switch (this.dd) {
    case 1:
        50 == this.t % 60 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5));
        break;
    case 2:
        60 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * -Math.PI / 2), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * Math.PI / 2)),
        65 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5));
        break;
    case 3:
        60 == this.t % 80 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * -Math.PI / 2), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * Math.PI / 2)),
        65 == this.t % 80 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5)),
        70 == this.t % 80 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * Math.PI / 5));
        break;
    case 4:
        50 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * -Math.PI / 2), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * Math.PI / 2)),
        55 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5)),
        60 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * Math.PI / 5));
        break;
    case 5:
        60 == this.t % 80 && (this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * -Math.PI / 10), this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * Math.PI / 10)),
        65 == this.t % 80 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * -Math.PI / 2), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * Math.PI / 2)),
        70 == this.t % 80 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5)),
        75 == this.t % 80 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * Math.PI / 5));
        break;
    case 6:
        50 == this.t % 70 && (this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * -Math.PI / 10), this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * Math.PI / 10)),
        55 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * -Math.PI / 2), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * Math.PI / 2)),
        60 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5)),
        65 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * Math.PI / 5));
        break;
    case 7:
        30 == this.t % 40 && (this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * -Math.PI / 10), this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * Math.PI / 10)),
        55 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * -Math.PI / 2), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * Math.PI / 2)),
        40 == this.t % 50 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5)),
        65 == this.t % 70 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * Math.PI / 5));
        break;
    case 8:
        30 == this.t % 40 && (this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * -Math.PI / 10), this.fire(this.x + 33, this.y + 36, 8, 18, 2, 3 * Math.PI / 10)),
        45 == this.t % 50 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * -Math.PI / 2), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 1 * Math.PI / 2)),
        40 == this.t % 60 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 3 * Math.PI / 5)),
        35 == this.t % 60 && (this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * -Math.PI / 5), this.fire(this.x + 33, this.y + 26, 8, 18, 2, 4 * Math.PI / 5))
    }
},
plane.prototype.fpao = function() {
    this.ispower(),
    this.isdd(),
    this.t++
},
plane.prototype.fire = function(a, b, c, d, e, f, g) {
    var h = new Pd(a, b, c, d, e, f);
    h.speed = g,
    Attack.drPd.push(h)
},
plane.prototype.zd = function() {
    Attack.zd = new bomb(this.y + 25, this.x + this.w / 2),
    200 == this.nl && (this.wd = 2, this.wdk = 0, this.nl = 0, this.xd(), setTimeout(function() {
        Attack.zd = "a",
        gameDiv.className = ""
    },
    4500))
},
plane.prototype.jNl = function(a) {
    this.nl < 200 && (this.nl += a)
},
plane.prototype.xd = function() {
    for (var a = Attack.drDpd,
    b = 0; b < a.length; b++) Attack.s2.push(new star(a[b].x, a[b].y)),
    a[b].die = 1
},
plane.prototype.isHit = function(a) {
    var b = new OBB(new Vector2(this.x + this.w / 2, this.y + 18), 10, 10, 0);
    return CollisionDetector.detectorOBBvsOBB(a, b) ? (this.hit > this.maxHit && (this.maxHit = this.hit), this.hit = 0, Attack.hit_list = [null, null, null, null], Attack.hit_mub = "0000", this.blood--, this.jNl(1), this.wd = 1, this.wdk = 0, 0 == this.blood && (this.die = 1, Attack.bzlist.push(new explode(this.x + 43, this.y + 36, 4))), 1) : 0
},
plane.prototype.eat = function(a, b, c) {
    return (this.x + this.w / 2 - a) * (this.x + this.w / 2 - a) + (this.y + this.h / 2 - b) * (this.y + this.h / 2 - b) < c * c ? !0 : !1
},
plane.prototype.linear = function(a, b, c, d) {
    return c * a / d + b
},
plane.prototype.moveZd = function() {
    var a = Attack._x - this.x - this.w / 2,
    b = Attack._y - this.y - this.h / 2; ! this.tl && a > 3 ? (this.tl = 1, this.tr = 0) : !this.tr && -3 > a ? (this.tr = 1, this.tl = 0) : 10 >= a && a >= -3 && (this.tr = 0, this.tl = 0),
    this.x = Math.round(this.linear(this.tween_t, this.x, a, 100)),
    this.y = Math.round(this.linear(this.tween_t, this.y, b, 100)),
    this.tween_t++,
    100 == this.tween_t && (this.tween_t = 0),
    this.tl ? this.d < 8 ? this.d += .5 : this.d = 8 : this.d > 4 && (this.d -= 1 / 8),
    this.tr ? this.d > .5 ? this.d -= .5 : this.d = 0 : this.d < 4 && (this.d += 1 / 8)
};
var free = function(a, b, c, d, e, f) {
    this.x = a,
    this.y = b,
    this.w = c,
    this.h = d,
    this.img = e,
    this.type = f,
    this.blood = 3,
    this.wd = 0,
    this.wdk = 0,
    this.score = 0,
    this.nl = 200,
    this.t = 0,
    this.htime = 0,
    this.hit_t = 0,
    this.hit = 0,
    this.speed = 5,
    this.maxHit = 0,
    this.kill = 0,
    this.power = 1,
    this.die = 0,
    this.star = 0,
    this.d = 4,
    this.wd_h = 100,
    this.tl = 0,
    this.tr = 0,
    this.tween_t = 0,
    this.n_rad = 0,
    this.dd = 1,
    this.swList = [],
    this.swList2 = [],
    this.smanList = []
};
free.prototype.dr = function() {
    var a = Attack.ctx2;
    this.power >= 7 && this.t > 1 && (this.t < 5 ? (this.s1.y += 2, this.s2.y += 2) : this.t < 10 && (this.s1.y -= 2, this.s2.y -= 2), this.t > 10 && this.t < 30 && (this.s1.rotation += Math.PI / 300, this.s2.rotation -= Math.PI / 300), this.t > 30 && this.t < 50 && (this.s3.rotation += Math.PI / 45, this.s4.rotation -= Math.PI / 45), this.t > 30 && this.t < 50 && (this.s5.rotation += Math.PI / 80, this.s6.rotation -= Math.PI / 80), this.power >= 9 && this.t % 50 < 30 && 0 == this.t % 3 && (a.save(), a.globalAlpha = Math.sin(this.t % 50 * Math.PI / 20), a.globalCompositeOperation = "lighter", a.drawImage(Attack.imgDx[107], this.x + this.w / 2 - 80 + random( - 30, 30), this.y - 20 + random( - 30, 30)), a.restore(), a.save(), a.globalAlpha = Math.sin(this.t % 50 * Math.PI / 20), a.globalCompositeOperation = "lighter", a.drawImage(Attack.imgDx[107], this.x + this.w / 2 + 25 + random( - 30, 30), this.y - 20 + random( - 30, 30)), a.restore())),
    1 == this.t && (this.swList = [], this.swList2 = [], this.s1 = new swing(Attack.imgDx[95], this.x, this.y, 42, 11, 45, 51, 0, 1), this.s2 = new swing(Attack.imgDx[96], this.x, this.y, 50, 11, 45, 51, 0, 2), this.s3 = new swing(Attack.imgDx[97], this.x, this.y, 43, 11, 48, 36, 0, 1), this.s4 = new swing(Attack.imgDx[98], this.x, this.y, 49, 11, 48, 36, 0, 2), this.s5 = new swing(Attack.imgDx[97], this.x, this.y, 43, 11, 48, 36, 0, 1), this.s6 = new swing(Attack.imgDx[98], this.x, this.y, 49, 11, 48, 36, 0, 2), this.swList2.push(this.s3, this.s4, this.s5, this.s6), this.swList.push(this.s1, this.s2)),
    1 != this.t || this.sn1 || (this.smanList = [], this.sn3 = new wingman(Attack.imgDx[99], this.x + this.w / 2, this.y + this.h / 2, 80, 10, 24, 36, 0, 2), this.sn4 = new wingman(Attack.imgDx[100], this.x + this.w / 2, this.y + this.h / 2, -80, 10, 24, 36, 0, 2), this.sn3.rotation = -Math.PI / 20, this.sn4.rotation = Math.PI / 20, this.smanList.push(this.sn3, this.sn4));
    for (var b = this.swList2,
    c = 0; c < b.length; c++) b[c].die && b.splice(c, 1);
    for (var c = 0; c < b.length; c++) b[c].run(),
    b[c].dr(a);
    a.drawImage(this.img, this.w * Math.floor(this.d), 0, this.w, this.h, this.x, this.y, this.w, this.h),
    a.save(),
    a.drawImage(Attack.imgDx[27], 0, 12 * Math.floor(this.t / 4 % 2), 12, 12, this.x + this.w / 2 - 5, this.y + 18 - 5, 10, 10),
    a.restore();
    for (var d = this.swList,
    c = 0; c < d.length; c++) d[c].die && d.splice(c, 1);
    for (var c = 0; c < d.length; c++) d[c].run(),
    d[c].dr(a);
    for (var e = this.smanList,
    c = 0; c < e.length; c++) e[c].die && e.splice(c, 1);
    for (var c = 0; c < e.length; c++) e[c].run(),
    e[c].dr(a);
    1 == this.wd && this.wdk < 120 ? (1 == this.wdk && (Attack.c.className = "gameOn", setTimeout(function() {
        Attack.c.className = ""
    },
    800), this.wd_h = 30), this.wdk < 40 ? this.wd_h += this.wdk: this.wd_h = 100, a.save(), a.translate(this.x + this.w / 2, this.y + this.h / 2), a.rotate(Math.PI / 12 * (Math.floor(this.wdk / 5) % 24)), a.drawImage(Attack.imgDx[62], 0, 0, 130, 130, -this.wd_h / 2, -this.wd_h / 2, this.wd_h, this.wd_h), a.restore(), this.wdk++) : 2 == this.wd && this.wdk < 300 ? (a.save(), a.translate(this.x + this.w / 2, this.y + this.h / 2), a.rotate(Math.PI / 12 * (Math.floor(this.wdk / 5) % 24)), a.drawImage(Attack.imgDx[62], 0, 0, 130, 130, -this.wd_h / 2, -this.wd_h / 2, this.wd_h, this.wd_h), a.restore(), this.wdk++) : (this.wd = 0, this.wdk = 0),
    a.restore()
},
free.prototype.ispower = function() {
    switch (this.power) {
    case 1:
        0 == this.t % 8 && (this.fire( - 18, this.y + 10, 30, 104, 36, 0), this.fire(18, this.y + 10, 30, 104, 37, 0));
        break;
    case 2:
        0 == this.t % 9 && (this.fire( - 18, this.y + 10, 30, 104, 36, 0), this.fire(18, this.y + 10, 30, 104, 37, 0), this.fire(this.x + 46, this.y + 10, 30, 104, 40, 0));
        break;
    case 3:
        0 == this.t % 10 && (this.fire( - 12, this.y + 10, 30, 104, 36, 0), this.fire(12, this.y + 10, 30, 104, 37, 0), this.fire( - 24, this.y + 10, 30, 104, 38, 0), this.fire(24, this.y + 10, 30, 104, 39, 0));
        break;
    case 4:
        0 == this.t % 8 && (this.fire( - 12, this.y + 10, 30, 104, 36, 0), this.fire(12, this.y + 10, 30, 104, 37, 0), this.fire( - 24, this.y + 10, 30, 104, 38, 0), this.fire(24, this.y + 10, 30, 104, 39, 0));
        break;
    case 5:
        0 == this.t % 9 && (this.fire( - 12, this.y + 10, 30, 104, 36, 0), this.fire(12, this.y + 10, 30, 104, 37, 0), this.fire( - 24, this.y + 10, 30, 104, 38, 0), this.fire(24, this.y + 10, 30, 104, 39, 0), this.fire(this.x + 46, this.y + 10, 30, 104, 40, 0));
        break;
    case 6:
        0 == this.t % 7 && (this.fire( - 14, this.y + 10, 30, 104, 36, 0), this.fire(14, this.y + 10, 30, 104, 37, 0), this.fire( - 28, this.y + 10, 30, 104, 38, 0), this.fire(28, this.y + 10, 30, 104, 39, 0), this.fire(this.x + 46, this.y + 10, 30, 104, 40, 0));
        break;
    case 7:
        0 == this.t % 13 && this.fire(0, this.y + 20, 34, 80, 41, 0, 10);
        break;
    case 8:
        0 == this.t % 12 && this.fire(0, this.y + 20, 38, 80, 41, 0, 10),
        0 == this.t % 10 && (this.fire( - 18, this.y + 10, 30, 104, 36, 0), this.fire(18, this.y + 10, 30, 104, 37, 0));
        break;
    case 9:
        0 == this.t % 15 && (this.fire( - 14, this.y + 15, 34, 80, 41, 0, 10), this.fire(14, this.y + 15, 34, 80, 41, 0, 10));
        break;
    case 10:
        0 == this.t % 11 && (this.fire( - 16, this.y + 15, 38, 80, 41, 0, 10), this.fire(16, this.y + 15, 38, 80, 41, 0, 10))
    }
},
free.prototype.isdd = function() {
    switch (this.dd) {
    case 1:
        1 == this.t % 60 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3));
        break;
    case 2:
        1 == this.t % 45 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3));
        break;
    case 3:
        1 == this.t % 30 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3));
        break;
    case 4:
        1 == this.t % 65 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3)),
        1 == this.t % 45 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3));
        break;
    case 5:
        1 == this.t % 55 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3)),
        1 == this.t % 35 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3));
        break;
    case 6:
        1 == this.t % 45 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3)),
        1 == this.t % 25 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3));
        break;
    case 7:
        1 == this.t % 16 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3));
        break;
    case 8:
        1 == this.t % 12 && (this.sn3.fire( - 3, -30, 4, 40, 35, 2, 3), this.sn4.fire(3, -30, 4, 40, 35, 2, 3))
    }
},
free.prototype.fpao = function() {
    this.ispower(),
    this.isdd(),
    this.t++
},
free.prototype.fire = function(a, b, c, d, e, f, g) {
    var h = new Pd(a, b, c, d, e, f);
    h.speed = g,
    Attack.drPd.push(h)
},
free.prototype.zd = function() {
    Attack.zd = new bomb(this.y + 25, this.x + this.w / 2),
    200 == this.nl && (this.wd = 2, this.wdk = 0, this.nl = 0, this.xd(), setTimeout(function() {
        Attack.zd = "a",
        gameDiv.className = ""
    },
    4500))
},
free.prototype.jNl = function(a) {
    this.nl < 200 && (this.nl += a)
},
free.prototype.xd = function() {
    for (var a = Attack.drDpd,
    b = 0; b < a.length; b++) Attack.s2.push(new star(a[b].x, a[b].y)),
    a[b].die = 1
},
free.prototype.isHit = function(a) {
    var b = new OBB(new Vector2(this.x + this.w / 2, this.y + 18), 10, 10, 0);
    return CollisionDetector.detectorOBBvsOBB(a, b) ? (this.hit > this.maxHit && (this.maxHit = this.hit), this.hit = 0, Attack.hit_list = [null, null, null, null], Attack.hit_mub = "0000", this.blood--, this.jNl(1), this.wd = 1, this.wdk = 0, 0 == this.blood && (this.die = 1, Attack.bzlist.push(new explode(this.x + 43, this.y + 36, 4))), 1) : 0
};
var wingman = function(a, b, c, d, e, f, g, h, i) {
    this._x = d,
    this.img = a,
    this._y = e,
    this.w = f,
    this.h = g,
    this.alpha = 1,
    this.die = 0,
    this.player = Attack.player,
    this.x = b + this._x,
    this.y = c + this._y,
    this.rotation = h,
    this.d_rad = h,
    this.type = i,
    this.rot = 0,
    this.t = 0,
    1 === this.type && (this.x = this.player.x + this.player.w / 2 + 50 * Math.sin(this.t * Math.PI / 50), this.y = this.player.h + this.player.h / 2 + 20 * Math.cos(this.t * Math.PI / 50))
};
wingman.prototype.dr = function(a) {
    a.save(),
    a.translate(this.x, this.y),
    this.alpha < 1 && (a.globalAlpha = this.alpha),
    this.rotation && a.rotate(this.rotation),
    a.drawImage(this.img, -this.w / 2, -this.h / 2),
    a.restore()
},
wingman.prototype.run = function() {
    if (this.t++, 2 == this.type) {
        if (this.x = this.player.x + this.player.w / 2 + this._x, this.y = this.player.y + this.player.h / 2 + this._y + 2 * Math.sin(Math.PI / 20 * this.t), 1 == this.t % 30) {
            var a = random(0, Attack.enemylist.length);
            this._enemy = Attack.enemylist[a]
        }
        if (this._enemy && this.t % 30 > 10 && this.t % 30 < 28) {
            var b = this.x - this._enemy.x - this._enemy.width / 2,
            c = this.y - this._enemy.y - this._enemy.hight / 2,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            c > 0 && (this.arc3 = -Math.asin(this.sin1), this.rotation < this.arc3 ? this.rotation += Math.PI / 20 : this.rotation -= Math.PI / 20)
        }
    }
},
wingman.prototype.fire = function(a, b, c, d, e, f, g, h) {
    var i = b,
    j = a,
    k = Math.round(j * Math.cos(this.rotation) - i * Math.sin(this.rotation)),
    l = Math.round(j * Math.sin(this.rotation) + i * Math.cos(this.rotation)),
    m = Math.round(k + this.x),
    n = Math.round(l + this.y),
    o = new Pd(m, n, c, d, e, -this.rotation);
    o.speed = g,
    o.m = k,
    o.n = l,
    o.obj = this,
    o.img = h,
    Attack.drPd.push(o)
},
free.prototype.eat = function(a, b, c) {
    return (this.x + this.w / 2 - a) * (this.x + this.w / 2 - a) + (this.y + this.h / 2 - b) * (this.y + this.h / 2 - b) < c * c ? !0 : !1
},
free.prototype.linear = function(a, b, c, d) {
    return c * a / d + b
},
free.prototype.moveZd = function() {
    var a = Attack._x - this.x - this.w / 2,
    b = Attack._y - this.y - this.h / 2; ! this.tl && a > 3 ? (this.tl = 1, this.tr = 0) : !this.tr && -3 > a ? (this.tr = 1, this.tl = 0) : 10 >= a && a >= -3 && (this.tr = 0, this.tl = 0),
    this.x = Math.round(this.linear(this.tween_t, this.x, a, 100)),
    this.y = Math.round(this.linear(this.tween_t, this.y, b, 100)),
    this.tween_t++,
    100 == this.tween_t && (this.tween_t = 0),
    this.tl ? this.d < 4 ? this.d += .5 : this.d = 4 : this.d > 2 && (this.d -= 1 / 8),
    this.tr ? this.d > .5 ? this.d -= .5 : this.d = 0 : this.d < 2 && (this.d += 1 / 8)
};
var swing = function(a, b, c, d, e, f, g, h, i) {
    this._x = d,
    this.img = a,
    this._y = e,
    this.width = f,
    this.height = g,
    this.alpha = 1,
    this.die = 0,
    this.player = Attack.player,
    this.x = b + this._x,
    this.y = c + this._y,
    this.rotation = h,
    this.type = i
};
swing.prototype.dr = function(a) {
    a.save(),
    a.translate(this.x, this.y),
    this.alpha < 1 && (a.globalAlpha = this.alpha),
    this.lig && (a.globalCompositeOperation = "lighter"),
    this.rotation && a.rotate(this.rotation),
    1 == this.type ? a.drawImage(this.img, -this.width, 0) : a.drawImage(this.img, 0, 0),
    a.restore()
},
swing.prototype.run = function() {
    this.x = this.player.x + this._x,
    this.y = this.player.y + this._y
};
var enemy = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    this.x = a,
    this.y = b,
    this.hight = f,
    this.width = e,
    this.img = c,
    this.blood = d,
    this.bj = 0,
    this.t = 0,
    this.t2 = 0,
    this.mtype = g,
    this.zdc = h,
    this.swX = j,
    this.swY = k,
    this.timer = i,
    this.bz = l,
    this.die = 0,
    this.n = 0,
    this.leg = m,
    this.dh = 0,
    this.arc = 0,
    this.arc2 = 0,
    this.arc3 = 0,
    this.arc4 = 0,
    this.lxj = n,
    this.chena = o,
    this.m2 = 0,
    this.n2 = 0
};
enemy.prototype.fpao = function() {
    this.t2 == this.timer && (this.fire(), this.t2 = 0)
},
enemy.prototype.dr = function() {
    var a = Attack.ctx2;
    if (0 != this.swX ? (a.save(), a.translate(this.x + this.width / 2 + this.swX, this.y + this.hight / 2 + this.swY), a.rotate(this.arc), a.drawImage(this.img, this.width * (2 * this.leg + Math.floor(this.dh)), 0, this.width, this.hight, -this.width / 2, -this.hight / 2, this.width, this.hight), a.restore()) : (a.save(), a.translate(this.x + this.width / 2 + 3, this.y + this.hight / 2 + 3), a.rotate(this.arc), a.drawImage(this.img, this.width * (2 * this.leg + Math.floor(this.dh)), 0, this.width, this.hight, -this.width / 2, -this.hight / 2, this.width, this.hight), a.restore()), a.save(), a.translate(this.x + this.width / 2, this.y + this.hight / 2), a.rotate(this.arc), this.bj ? a.drawImage(this.img, this.width * (1 * this.leg + Math.floor(this.dh)), 0, this.width, this.hight, -this.width / 2, -this.hight / 2, this.width, this.hight) : a.drawImage(this.img, this.width * +Math.floor(this.dh), 0, this.width, this.hight, -this.width / 2, -this.hight / 2, this.width, this.hight), a.restore(), 1 == this.tank) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[3], -9, -9),
        a.restore()
    }
    if (2 == this.tank) {
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.save(),
        a.translate(f + 3, g + 3),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[48], 48, 0, 24, 48, -12, -24, 24, 48),
        a.restore(),
        a.save(),
        a.translate(f, g),
        a.rotate(this.arc2),
        this.bj ? a.drawImage(Attack.imgDx[48], 24, 0, 24, 48, -12, -24, 24, 48) : a.drawImage(Attack.imgDx[48], 0, 0, 24, 48, -12, -24, 24, 48),
        a.restore()
    }
    if (3 == this.tank) {
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.save(),
        a.translate(f + 3, g + 3),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[59], 64, 0, 32, 47, -16, -23.5, 32, 47),
        a.restore(),
        a.save(),
        a.translate(f, g),
        a.rotate(this.arc2),
        this.bj ? a.drawImage(Attack.imgDx[59], 32, 0, 32, 47, -16, -23.5, 32, 47) : a.drawImage(Attack.imgDx[59], 0, 0, 32, 47, -16, -23.5, 32, 47),
        a.restore()
    }
    if (4 == this.tank) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[73], -11, -11),
        a.restore()
    }
    if (5 == this.tank) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[74], -10, -10),
        a.restore()
    }
    if (6 == this.tank) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g + 72),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[79], -14, -14),
        a.restore()
    }
    if (7 == this.tank) {
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.save(),
        a.translate(f + 100, g - 75),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[79], -14, -14),
        a.restore(),
        a.save(),
        a.translate(f + 140, g - 85),
        a.rotate(this.arc2),
        a.drawImage(Attack.imgDx[79], -14, -14),
        a.restore(),
        a.save(),
        a.translate(f - 100, g - 75),
        a.rotate(this.arc4),
        a.drawImage(Attack.imgDx[79], -14, -14),
        a.restore(),
        a.save(),
        a.translate(f - 140, g - 83),
        a.rotate(this.arc4),
        a.drawImage(Attack.imgDx[79], -14, -14),
        a.restore()
    }
    if (1 == this.lxj) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = 0,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(Math.PI / 24 * this.t % 24),
        a.drawImage(Attack.imgDx[8], -34, -34),
        a.restore()
    }
    if (2 == this.lxj) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = -30,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(Math.PI / 24 * this.t % 24),
        a.drawImage(Attack.imgDx[44], -90, -90),
        a.restore()
    }
    if (3 == this.lxj) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = -11,
        e = 37,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(Math.PI / 12 * this.t % 12),
        a.drawImage(Attack.imgDx[52], -34, -34),
        a.restore(),
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = -11,
        e = -38,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(Math.PI / 12 * this.t % 12),
        a.drawImage(Attack.imgDx[52], -34, -34),
        a.restore(),
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = this.hight / 2 - 5,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(this.arc),
        a.drawImage(Attack.imgDx[61], 46 * (this.t % 3), 0, 46, 8, -17, -3, 34, 6),
        a.restore()
    }
    if (4 == this.lxj) {
        a.save();
        var b = this.x + this.width / 2,
        c = this.y + this.hight / 2,
        d = this.hight / 2,
        e = 0,
        f = Math.round(e * Math.cos(this.arc) - d * Math.sin(this.arc) + b),
        g = Math.round(e * Math.sin(this.arc) + d * Math.cos(this.arc) + c);
        a.translate(f, g),
        a.rotate(this.arc),
        a.drawImage(Attack.imgDx[61], 46 * (this.t % 3), 0, 46, 8, -17, -3, 34, 6),
        a.restore()
    }
    this.t2++,
    this.bj = 0
},
enemy.prototype.moveto = function(a) {
    this.a_arc = (this.arc2 - a) / 20
},
enemy.prototype.isHit = function(a) {
    var b = this.y + this.hight / 2,
    c = this.x + this.width / 2,
    d = new OBB(new Vector2(c, b), this.width, this.hight, this.arc);
    return CollisionDetector.detectorOBBvsOBB(a, d) ? (this.blood--, this.blood || (Attack.bzlist.push(new explode(c, b, this.bz)), this.chena && Attack.chenaList.push(new chena(this.x, this.y, this.chena.img, this.chena.mfx, this.chena.type, this.width, this.hight, this.arc)), this.die = 1, Attack.player.kill++, this.blood = 1e3, 100 * Math.random() < 3 && Attack.s2.push(new star(c, b, 1)), 100 * Math.random() < 4 && Attack.s2.push(new star(c, b, 3)), 100 * Math.random() < 3 && Attack.s2.push(new star(c, b, 2))), this.bj = 1, 1) : 0
},
enemy.prototype.bzd = function(a, b, c) {
    if (this.x > a - c - this.width && this.x < a + c + this.width && this.y > b - c - this.hight && this.y < b + c + this.hight) {
        var d = this.y + this.hight / 2,
        e = this.x + this.width / 2;
        return this.blood -= 1,
        this.blood <= 0 && (Attack.s2.push(new star(e, d)), Attack.bzlist.push(new explode(e, d, this.bz)), this.chena && Attack.chenaList.push(new chena(this.x, this.y, this.chena.img, this.chena.mfx, this.chena.type, this.width, this.hight, this.arc)), this.die = 1),
        this.bj = 1,
        1
    }
    return 0
},
enemy.prototype.fire = function(a, b, c, d, e, f, g, h) {
    var i = this.x + this.width / 2,
    j = this.y + this.hight / 2,
    k = a || i,
    l = b || j + 10,
    m = l - j,
    n = k - i;
    if (1 == h) var o = this.arc;
    else var o = this.arc2 || this.arc;
    var p = Math.round(n * Math.cos(o) - m * Math.sin(o) + i),
    q = Math.round(n * Math.sin(o) + m * Math.cos(o) + j);
    2 == h && (q += 72),
    3 == h && (p += 100, q -= 75),
    4 == h && (p += 140, q -= 85);
    var f = f || 0,
    r = d || 1,
    s = e || 1,
    c = c || this.zdc,
    t = new Pd(p, q, r, s, c, f);
    t.speed = g,
    Attack.drDpd.push(t)
},
enemy.prototype.check = function() {
    return this.x <= -this.hight || this.x >= 360 || this.y > 600 || this.y < -this.hight ? 0 : 1
},
enemy.prototype.move = function() {
    switch (this.t++, this.mtype) {
    case 1:
        this.y += Math.round(4 * Math.cos(this.arc)),
        this.x -= Math.round(4 * Math.sin(this.arc)),
        this.arc -= Math.PI / 190,
        300 == this.t && (this.die = 1);
        break;
    case 2:
        this.y += 2.5;
        break;
    case 5:
        this.x += Math.sin(this.t * Math.PI / 100),
        this.t < 300 && (this.y -= 2 + Math.cos(this.t * Math.PI / 100));
        break;
    case 6:
        this.x += Math.sin(this.t * Math.PI / 100),
        1 == this.t % 302 && (this.swY = 1e3),
        164 == this.t % 302 && (this.swY = 86),
        290 == this.t % 302 && (this.swY = 1e3, this.arc2 = 0),
        this.t < 300 && (this.y -= 2 + Math.cos(this.t * Math.PI / 100)),
        this.t % 302 > 150 && this.t % 302 < 176 ? this.x += 1.4 : this.t % 302 < 275 || this.t % 302 < 300 && (this.x -= 1.4);
        break;
    case 7:
        this.x += Math.sin(this.t * Math.PI / 100),
        this.t < 300 && (this.y -= 2 + Math.cos(this.t * Math.PI / 100)),
        1 == this.t % 302 && (this.swY = 1e3),
        290 == this.t % 302 && (this.swY = 1e3, this.arc2 = 0),
        164 == this.t % 302 && (this.swY = 86),
        this.t % 302 > 150 && this.t % 302 < 176 ? this.x -= 1.4 : this.t % 302 < 275 || this.t % 302 < 300 && (this.x += 1.4);
        break;
    case 3:
        this.t < 90 ? this.y += 2 : this.t < 190 ? (this.arc += Math.PI / 200, this.y -= Math.cos(this.arc) - 2, this.x += .5 * Math.sin(this.arc)) : (this.y += 1.5 * Math.cos(this.arc) + 2, this.x -= 1 * Math.sin(this.arc), this.arc += Math.PI / 200);
        break;
    case 4:
        this.y += 2;
        break;
    case 8:
        this.t < 100 ? (this.arc -= Math.PI / 100, this.y += 4 * Math.cos(this.arc), this.x -= 4 * Math.sin(this.arc)) : this.t < 300 ? (this.arc += Math.PI / 100, this.y += 4 * Math.cos(this.arc), this.x -= 4 * Math.sin(this.arc)) : this.t < 312 ? (this.y += 4 * Math.cos(this.arc), this.x -= 4 * Math.sin(this.arc)) : (this.y += 4 * Math.cos(this.arc), this.x -= 4 * Math.sin(this.arc));
        break;
    case 9:
        this.t < 36 && (this.y += 3),
        this.x += Math.sin(this.t * Math.PI / 120),
        this.y += .6 * Math.sin(this.t * Math.PI / 200);
        break;
    case 10:
        this.t < 90 ? this.y += 2.5 : this.t < 140 ? (this.arc += Math.PI / 100, this.y += 2) : this.t < 160 ? (this.y += 2, this.x += 1) : this.t < 600 ? (this.y += 2 * Math.cos(this.arc) + 2, this.x -= 1 * Math.sin(this.arc), this.arc += Math.PI / 200) : this.die = 1;
        break;
    case 11:
        this.y += this.t / 10 * Math.cos(this.arc),
        this.x -= this.t / 10 * Math.sin(this.arc),
        200 == this.t && (this.die = 1);
        break;
    case 12:
        var a = this.x + this.width / 2 - Attack.player.x - 43,
        b = this.y + this.hight / 2 - Attack.player.y - 36,
        c = Math.sqrt(a * a + b * b),
        d = a / c;
        b > 0 ? (this.arc3 = Math.PI - Math.asin(d), Math.abs(Math.asin(d)) < Math.PI ? this.arc < -2 * Math.PI + this.arc3 ? this.arc += Math.PI / 200 : this.arc -= Math.PI / 200 : this.arc < this.arc3 ? this.arc += Math.PI / 200 : this.arc -= Math.PI / 200) : (this.arc3 = Math.asin(d), this.arc < this.arc3 ? this.arc += Math.PI / 300 : this.arc -= Math.PI / 300),
        this.y = 70 + 20 * Math.sin(this.t * Math.PI / 100),
        this.x += 1.2 + Math.sin(this.t * Math.PI / 70),
        this.x > 370 && (this.die = 1);
        break;
    case 13:
        var a = this.x + this.width / 2 - Attack.player.x - 43,
        b = this.y + this.hight / 2 - Attack.player.y - 36,
        c = Math.sqrt(a * a + b * b),
        d = a / c;
        b > 0 ? (this.arc3 = Math.PI - Math.asin(d), Math.abs(Math.asin(d)) < Math.PI ? this.arc < -2 * Math.PI + this.arc3 ? this.arc += Math.PI / 200 : this.arc -= Math.PI / 200 : this.arc < this.arc3 ? this.arc += Math.PI / 200 : this.arc -= Math.PI / 200) : (this.arc3 = Math.asin(d), this.arc < this.arc3 ? this.arc += Math.PI / 300 : this.arc -= Math.PI / 300),
        this.y = 70 + 20 * Math.sin(this.t * Math.PI / 100),
        this.x -= 1.2 + Math.sin(this.t * Math.PI / 70),
        this.x < -100 && (this.die = 1);
        break;
    case 14:
        this.x -= 1 * Math.sin(this.t * Math.PI / 100),
        this.y -= 2 * Math.sin(this.t * Math.PI / 100),
        this.t < 180 && (this.y -= 5 * Math.sin(this.t * Math.PI / 180)),
        this.t > 600 && (this.y -= 6),
        650 == this.t && (this.die = 1);
        break;
    case 15:
        this.x += Math.sin(this.t * Math.PI / 100),
        this.t < 80 && (this.y -= 8 + Math.cos(this.t * Math.PI / 100)),
        1 == sj_1 && (this.x -= 3 * Math.sin(this.t * Math.PI / 100), this.y -= Math.cos(this.t * Math.PI / 100)),
        3 == sj_1 && (this.x += 2 * Math.sin(this.t * Math.PI / 100))
    }
};
var Pd = function(a, b, c, d, e, f) {
    this.x = a,
    this.y = b,
    this.t = 0,
    this.w = c,
    this.h = d,
    this.type = e,
    this.arc = f,
    this.kt = random(0, 2),
    this.die = 0,
    this.cos1 = Math.cos(f),
    this.sin1 = Math.sin(f),
    this.d_x = this.x,
    this.d_y = this.y,
    (36 == this.type || 37 == this.type || 38 == this.type || 39 == this.type || 41 == this.type) && (this.x = Attack.player.x + Attack.player.w / 2 + this.d_x)
};
Pd.prototype.dr = function() {
    var a = Attack.ctx2;
    switch (this.type) {
    case 1:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI / 18 * (this.t % 36)),
        a.drawImage(Attack.imgDx[12], 12 * (Math.floor(this.kt) % 2), 0, 12, 12, -6, -6, 12, 12),
        a.restore(),
        this.kt += .1;
        break;
    case 2:
        if (this.t > 15) {
            var b = this.x,
            c = this.y,
            d = Math.round(b),
            e = Math.round(c);
            a.save(),
            a.translate(d, e),
            a.rotate(Math.PI - this.arc),
            a.drawImage(Attack.imgDx[41], 10 * (Math.round(this.kt) % 2), 0, 10, 20, -5, -31, 10, 20),
            a.restore(),
            this.kt += .1
        }
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[6], -5, -13),
        a.restore();
        break;
    case 8:
    case 5:
    case 29:
    case 7:
        if (a.save(), this.t > 10) {
            var b = this.x,
            c = this.y,
            d = Math.round(b),
            e = Math.round(c);
            a.save(),
            a.translate(d, e),
            a.rotate(Math.PI - this.arc),
            a.drawImage(Attack.imgDx[41], 10 * (Math.round(this.kt) % 2), 0, 10, 20, -5, -26, 10, 20),
            a.restore(),
            this.kt += .1
        }
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[20], -6, -8, 10, 28),
        a.restore();
        break;
    case 18:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[70], 6 * (Math.round(this.kt) % 2), 0, 6, 18, -2.5, -9, 5, 18),
        a.restore(),
        this.kt += .1;
        break;
    case 4:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[13], 5 * (Math.round(this.kt) % 2), 0, 5, 18, -2.5, -9, 5, 18),
        a.restore(),
        this.kt += .1;
        break;
    case 12:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[57], 21 * (Math.round(this.kt) % 2), 0, 21, 76, -3.5, -12.5, 7, 25),
        a.restore(),
        this.kt += .1;
        break;
    case 23:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[53], 6 * (Math.round(this.kt) % 2), 0, 6, 24, -3, -12, 6, 24),
        a.restore(),
        this.kt += .1;
        break;
    case 25:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[82], 16 * (Math.floor(this.kt) % 2), 0, 16, 16, -8, -8, 16, 16),
        a.restore(),
        this.kt += .1;
        break;
    case 26:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[83], 20 * (Math.floor(this.kt) % 2), 0, 20, 20, -10, -10, 20, 20),
        a.restore(),
        this.kt += .1;
        break;
    case 6:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI / 18 * (this.t % 36)),
        a.drawImage(Attack.imgDx[45], 10 * (Math.floor(this.kt) % 2), 0, 10, 14, -5, -7, 10, 14),
        a.restore(),
        this.kt += .1;
        break;
    case 9:
        a.save(),
        a.translate(this.x, this.y),
        a.drawImage(Attack.imgDx[40], 12 * (Math.round(this.kt) % 2), 0, 12, 12, -6, -6, 12, 12),
        a.restore(),
        this.kt += .1;
        break;
    case 3:
        a.save(),
        a.translate(this.x + this.w / 2, this.y + this.h / 2),
        a.rotate(Math.PI - (this.arc2 || this.arc)),
        a.drawImage(Attack.imgDx[10], 12 * (Math.round(this.kt) % 2), 0, 12, 12, -6, -6, 12, 12),
        a.restore(),
        this.kt += .1;
        break;
    case 10:
        a.save(),
        a.translate(this.x, this.y),
        a.drawImage(Attack.imgDx[36], this.w * (Math.round(this.kt) % 2), 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore(),
        this.kt += .1;
        break;
    case 11:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - (this.arc2 || this.arc)),
        a.drawImage(Attack.imgDx[56], this.w * (Math.round(this.kt) % 2), 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore(),
        this.kt += .25;
        break;
    case 17:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI / 18 * (this.t % 36)),
        a.drawImage(Attack.imgDx[67], 12 * (Math.floor(this.kt) % 2), 0, 12, 12, -6, -6, 12, 12),
        a.restore(),
        this.kt += .1;
        break;
    case 13:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - (this.arc2 || this.arc)),
        a.drawImage(Attack.imgDx[66], this.w * (Math.round(this.kt) % 2), 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore(),
        this.kt += 1 / 8;
        break;
    case 19:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - (this.arc2 || this.arc)),
        a.drawImage(Attack.imgDx[11], this.w * (Math.round(this.kt) % 2), 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore(),
        this.kt += .1;
        break;
    case 24:
        a.save(),
        a.translate(this.x + 4, this.y + 11),
        a.rotate(Math.PI - (this.arc2 || this.arc)),
        a.drawImage(Attack.imgDx[47], -3, -10),
        a.restore();
        break;
    case 15:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[7], -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore(),
        this.h < 184 && (this.h += 7);
        break;
    case 14:
        a.save(),
        a.globalCompositeOperation = "lighter",
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[7], -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore(),
        this.h < 104 && (this.h += 6);
        break;
    case 16:
        a.save(),
        a.translate(this.x, this.y),
        a.globalCompositeOperation = "lighter",
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[69], -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore(),
        this.h < 124 && (this.h += 6);
        break;
    case 21:
        a.save();
        for (var f = 0; 2 > f; f++) {
            var g = random( - 8, 8),
            h = random( - 2, 2),
            b = this.x + h,
            c = this.y + 16 - 9.5,
            i = c - this.y,
            j = 0,
            d = Math.round(j * Math.cos( - this.arc) - i * Math.sin( - this.arc) + b),
            e = Math.round(j * Math.sin( - this.arc) + i * Math.cos( - this.arc) + c);
            Attack.splist.push(new sp(d, e - 5, 36 + g, this.arc, Attack.imgDx[71], 8))
        }
        break;
    case 28:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.drawImage(Attack.imgDx[41], -8.5, -27),
        a.restore();
        break;
    case 35:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.globalCompositeOperation = "lighter",
        a.drawImage(Attack.imgDx[71], -this.w / 2, -this.h / 2, this.w, this.h),
        this.h < 200 && (this.h += 14),
        this.w < 18 && (this.w += 1),
        a.restore();
        break;
    case 36:
        a.save(),
        a.translate(this.x, this.y),
        a.globalCompositeOperation = "lighter",
        a.drawImage(Attack.imgDx[101], -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore();
        break;
    case 37:
        a.save(),
        a.translate(this.x, this.y),
        a.globalCompositeOperation = "lighter",
        a.drawImage(Attack.imgDx[102], -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore();
        break;
    case 38:
        a.save(),
        a.translate(this.x, this.y),
        a.globalCompositeOperation = "lighter",
        a.drawImage(Attack.imgDx[103], -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore();
        break;
    case 39:
        a.save(),
        a.translate(this.x, this.y),
        a.globalCompositeOperation = "lighter",
        a.drawImage(Attack.imgDx[104], -this.w / 2, -this.h / 2, this.w, this.h),
        a.restore();
        break;
    case 40:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.globalCompositeOperation = "lighter",
        a.drawImage(Attack.imgDx[105], -this.w / 2, -this.h / 2, this.w, this.h),
        this.h < 200 && (this.h += 14),
        this.w < 18 && (this.w += 1),
        a.restore();
        break;
    case 41:
        a.save(),
        a.translate(this.x, this.y),
        a.rotate(Math.PI - this.arc),
        a.globalCompositeOperation = "lighter",
        a.drawImage(Attack.imgDx[106], -this.w / 2, -this.h / 2, this.w, this.h),
        this.h < 300 && (this.h += 16),
        this.w += 4 * Math.sin(Math.PI / 2 + this.t * Math.PI / 8),
        a.restore()
    }
},
Pd.prototype.move = function() {
    if (this.y < Attack.pos_y && this.y > -20 && this.x > -20 && this.x < 350) {
        var a = Attack.player; ! a.wd && a.isHit(new OBB(new Vector2(this.x, this.y), this.w, this.h, this.arc)) && (this.die = 1),
        this.run()
    } else this.die = 1
},
Pd.prototype.move2 = function() {
    var a = Attack.player;
    if (this.y > 0 && this.y < Attack.pos_y && this.x > -30 && this.x < 350 && a) {
        for (var b = Attack.enemylist,
        c = Attack.tanklist,
        d = 0,
        e = b.length,
        f = c.length,
        g = 0,
        h = new OBB(new Vector2(this.x, this.y), this.w, this.h, this.arc); e > d; d++) if (b[d].isHit(h)) {
            var i = parseInt(Attack.all_mub) + 100 * (1 + a.hit / 100);
            Attack.score_init(i),
            a.htime = 60,
            a.htime > 0 && (a.hit_t++, a.hit_t > 10 && (a.hit++, Attack.hit_init(a.hit), a.hit_t = 0)),
            2 == this.type && (b[d].blood -= 2),
            35 != this.type && 41 != this.type && (this.die = 1)
        }
        for (; f > g; g++) if (c[g].isHit(h)) {
            var i = parseInt(Attack.all_mub) + 100 * (1 + a.hit / 100);
            Attack.score_init(i),
            a.htime = 60,
            a.htime > 0 && (a.hit_t++, a.hit_t > 10 && (a.hit++, Attack.hit_init(a.hit), a.hit_t = 0)),
            2 == this.type && (c[g].blood -= 2),
            35 != this.type && 41 != this.type && (this.die = 1)
        }
        this.run()
    } else this.die = 1
},
Pd.prototype.run = function() {
    switch (this.type) {
    case 1:
        var a = Attack.player;
        if (this.t < 3) {
            var b = this.x + this.w / 2 - a.x - 20,
            c = this.y + this.h / 2 - a.y - 25,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            this.cos1 = c / d,
            this.arc2 = c > 0 ? Math.asin(this.sin1) : Math.PI - Math.asin(this.sin1)
        }
        this.t++,
        this.y -= 3 * this.cos1,
        this.x -= 3 * this.sin1;
        break;
    case 2:
        if (0 == this.t) {
            var e = random(0, Attack.enemylist.length);
            this._player = Attack.enemylist[e]
        }
        if (this._player) {
            if (this._player.die) this.y -= (1 + this.t / 10) * Math.cos(this.arc),
            this.x -= (1 + this.t / 10) * Math.sin(this.arc);
            else if (this.t < 10) this.arc = this.arc,
            this.y -= this.t * Math.cos(this.arc),
            this.x -= this.t * Math.sin(this.arc);
            else if (this.t < 15) this.y -= 1 * Math.cos(this.arc),
            this.x -= 1 * Math.sin(this.arc);
            else if (this.t < 180) {
                var b = this.x - this._player.x - this._player.width / 2,
                c = this.y - this._player.y - this._player.hight / 2,
                d = Math.sqrt(b * b + c * c);
                this.sin1 = b / d,
                c > 0 ? (this.arc3 = Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40) : (this.arc3 = this.x > Attack.player.x + 43 ? -Math.PI - Math.asin(this.sin1) : Math.PI - Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40),
                this.y -= (1 + this.t / 10) * Math.cos(this.arc),
                this.x -= (1 + this.t / 10) * Math.sin(this.arc)
            }
        } else this.t < 10 ? (this.arc = this.arc, this.y -= this.t * Math.cos(this.arc), this.x -= this.t * Math.sin(this.arc)) : this.t < 15 ? (this.y -= 1 * Math.cos(this.arc), this.x -= 1 * Math.sin(this.arc)) : (this.x > Attack.player.x + 43 ? this.t < 40 && (this.arc += Math.PI / 100) : this.t < 40 && (this.arc -= Math.PI / 100), this.y -= (1 + this.t / 10) * Math.cos(this.arc), this.x -= (1 + this.t / 10) * Math.sin(this.arc));
        this.t++;
        break;
    case 7:
        var a = Attack.player;
        if (this.t < 10) {
            var b = this.x - a.x - 20,
            c = this.y - a.y - 25,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            this.cos1 = c / d,
            this.arc = Math.PI,
            this.x -= -4
        } else if (this.t < 15);
        else if (this.t < 70) {
            var b = this.x - a.x - 20,
            c = this.y - a.y - 25,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            c > 0 ? (this.arc3 = Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40) : (this.arc3 = Math.PI - Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40),
            this.y -= this.t / 15 * Math.cos(this.arc),
            this.x -= this.t / 15 * Math.sin(this.arc)
        } else this.y -= this.t / 15 * Math.cos(this.arc),
        this.x -= this.t / 15 * Math.sin(this.arc);
        this.t++;
        break;
    case 8:
        var a = Attack.player;
        if (this.t < 10) {
            var b = this.x - a.x - 43,
            c = this.y - a.y - 36,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            this.cos1 = c / d,
            this.arc = Math.PI,
            this.x -= 4
        } else if (this.t < 15);
        else if (this.t < 70) {
            var b = this.x - a.x - 20,
            c = this.y - a.y - 25,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            c > 0 ? (this.arc3 = 2 * Math.PI + Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40) : (this.arc3 = Math.PI - Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40),
            this.y -= this.t / 15 * Math.cos(this.arc),
            this.x -= this.t / 15 * Math.sin(this.arc)
        } else this.y -= this.t / 15 * Math.cos(this.arc),
        this.x -= this.t / 15 * Math.sin(this.arc);
        this.t++;
        break;
    case 3:
        var a = Attack.player;
        if (this.t < 3) {
            var b = this.x + this.w / 2 - a.x - 20,
            c = this.y + this.h / 2 - a.y - 25,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            this.cos1 = c / d,
            this.arc2 = c > 0 ? Math.asin(this.sin1) : Math.PI - Math.asin(this.sin1)
        }
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1,
        this.t++;
        break;
    case 19:
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1,
        this.t++;
        break;
    case 21:
        if (0 == this.t) {
            var e = random(0, Attack.enemylist.length);
            this._player = Attack.enemylist[e]
        }
        if (this._player) {
            if (this._player.die) this.y -= (8 + this.t / 15) * Math.cos(this.arc),
            this.x -= (8 + this.t / 15) * Math.sin(this.arc);
            else if (this.t < 15);
            else if (this.t < 180) {
                var b = this.x - this._player.x - this._player.width / 2,
                c = this.y - this._player.y - this._player.hight / 2,
                d = Math.sqrt(b * b + c * c);
                this.sin1 = b / d,
                c > 0 ? (this.arc3 = Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 30 : this.arc -= Math.PI / 30) : (this.arc3 = this.x > Attack.player.x + 43 ? -Math.PI - Math.asin(this.sin1) : Math.PI - Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 30 : this.arc -= Math.PI / 30),
                this.y -= (8 + this.t / 15) * Math.cos(this.arc),
                this.x -= (8 + this.t / 15) * Math.sin(this.arc)
            }
        } else this.t < 15 || (this.x > Attack.player.x + 43 ? this.t < 50 && (this.arc += Math.PI / 40) : this.t < 50 && (this.arc -= Math.PI / 40), this.y -= (8 + this.t / 15) * Math.cos(this.arc), this.x -= (8 + this.t / 15) * Math.sin(this.arc));
        this.t++;
        break;
    case 18:
    case 4:
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1,
        this.t++;
        break;
    case 11:
        if (this.t < 20) this.y -= 3 * this.cos1,
        this.x -= 3 * this.sin1;
        else if (35 == this.t) {
            for (var f = 0; 10 > f; f++) {
                var g = new Pd(this.x, this.y, 0, 0, 12, Math.PI / 5 * f);
                g.sin1 = Math.sin(Math.PI / 5 * f),
                g.cos1 = Math.cos(Math.PI / 5 * f),
                Attack.drDpd.push(g)
            }
            this.die = 1
        }
        this.t++;
        break;
    case 6:
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1,
        this.t++;
        break;
    case 9:
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1,
        this.t++;
        break;
    case 10:
        this.y -= (10 - 7 * Math.sin(Math.PI * this.t / 120)) * this.cos1,
        this.x -= (10 - 7 * Math.sin(Math.PI * this.t / 120)) * this.sin1,
        this.t++;
        break;
    case 13:
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1;
        break;
    case 26:
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1;
        break;
    case 12:
        this.y -= (9 - 7 * Math.sin(Math.PI * this.t / 120)) * this.cos1,
        this.x -= (9 - 7 * Math.sin(Math.PI * this.t / 120)) * this.sin1,
        this.t++;
        break;
    case 23:
        this.y -= this.speed * this.cos1,
        this.x -= this.speed * this.sin1,
        this.t++;
        break;
    case 25:
        this.y -= (this.speed + this.t / 15) * this.cos1,
        this.x -= (this.speed + this.t / 15) * this.sin1,
        this.t++;
        break;
    case 17:
        this.y -= 3 * this.cos1,
        this.x -= 3 * this.sin1,
        this.t++;
        break;
    case 5:
        var a = Attack.player;
        if (this.t < 10) this.y += 2;
        else if (this.t < 40) {
            var b = this.x - a.x - 20,
            c = this.y - a.y - 25,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            c > 0 ? (this.arc3 = Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40) : (this.arc3 = Math.PI - Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40),
            this.y -= (2 + this.t / 15) * Math.cos(this.arc),
            this.x -= (2 + this.t / 15) * Math.sin(this.arc)
        } else this.y -= (2 + this.t / 15) * Math.cos(this.arc),
        this.x -= (2 + this.t / 15) * Math.sin(this.arc);
        this.t++;
        break;
    case 29:
        var a = Attack.player;
        if (this.t < 10) this.y -= 2 * Math.cos(this.arc),
        this.x -= 2 * Math.sin(this.arc);
        else if (this.t < 40) {
            var b = this.x - a.x - 20,
            c = this.y - a.y - 25,
            d = Math.sqrt(b * b + c * c);
            this.sin1 = b / d,
            c > 0 ? (this.arc3 = Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40) : (this.arc3 = Math.PI - Math.asin(this.sin1), this.arc < this.arc3 ? this.arc += Math.PI / 40 : this.arc -= Math.PI / 40),
            this.y -= (2 + this.t / 15) * Math.cos(this.arc),
            this.x -= (2 + this.t / 15) * Math.sin(this.arc)
        } else this.y -= (2 + this.t / 15) * Math.cos(this.arc),
        this.x -= (2 + this.t / 15) * Math.sin(this.arc);
        this.t++;
        break;
    case 24:
        this.t++,
        this.t < 15 ? (this.y -= Math.round(3 * this.cos1), this.x -= Math.round(3 * this.sin1)) : (this.y -= Math.round(7 * this.cos1), this.x -= Math.round(7 * this.sin1));
        break;
    case 14:
        this.y -= (7 + this.t) * Math.cos(this.arc),
        this.x -= (7 + this.t) * Math.sin(this.arc),
        this.t++;
        break;
    case 15:
        this.y -= this.t / 3 * Math.cos(this.arc),
        this.x -= this.t / 3 * Math.sin(this.arc),
        this.t++;
        break;
    case 28:
        this.y -= (7 + this.t) * this.cos1,
        this.x -= (7 + this.t) * this.sin1,
        this.t++;
        break;
    case 16:
        this.y -= (3 + this.t) * this.cos1,
        this.x -= (3 + this.t) * this.sin1,
        this.t++;
        break;
    case 35:
        this.t > 3 && (this.y -= 1.8 * this.t * this.cos1, this.x -= 1.8 * this.t * this.sin1),
        this.t++;
        break;
    case 36:
    case 37:
        this.y -= (7 + this.t) * Math.cos(this.arc),
        this.x -= (7 + this.t) * Math.sin(this.arc),
        this.x = Attack.player.x + Attack.player.w / 2 + this.d_x,
        this.t++;
        break;
    case 38:
    case 39:
        this.y -= (7 + this.t) * Math.cos(this.arc),
        this.x -= (7 + this.t) * Math.sin(this.arc),
        this.x = Attack.player.x + Attack.player.w / 2 + this.d_x,
        this.t++;
        break;
    case 40:
        this.y -= (12 + this.t) * this.cos1,
        this.x -= (12 + this.t) * this.sin1,
        this.t++;
        break;
    case 41:
        0 == this.t && (this.d_y = -this.h / 2),
        this.d_y -= this.t * Math.cos(this.arc),
        this.d_x -= this.t * Math.sin(this.arc),
        this.y = Attack.player.y + 10 + this.d_y,
        this.x = Attack.player.x + Attack.player.w / 2 + this.d_x,
        this.t++
    }
},
bomb.prototype.dr = function() {
    if (Attack.ctx2, this.j <= 60) {
        var d = random(0, 10);
        0 == this.j % 4 && (Attack.player.fire(Attack.player.x + 43 - 10, Attack.player.y + 40, 0, 0, 16, d * Math.PI / 30), Attack.player.fire(Attack.player.x + 44 + 10, Attack.player.y + 40, 0, 0, 16, -d * Math.PI / 30))
    } else if (this.j > 60 && this.j <= 420 && (61 == this.j && (gameDiv.className = "gameOn"), 0 == this.j % 2)) {
        var e = random( - 32, 32),
        f = random( - 32, 32);
        Attack.bzlist.push(new explode(this.x + 5 * e, this.y + 5 * f, 1));
        for (var g = 0; 10 > g; g++) {
            var h = random( - 40, 40);
            Attack.splist.push(new sp(this.x + 5 * e, this.y + 5 * f, 55 + h, Math.PI / 6 * g + h * Math.PI / 100, Attack.imgDx[16], 1))
        }
    }
},
bomb.prototype.run = function() {
    this.j <= 60 ? this.y -= 5 : this.j > 60 && this.j <= 420 && this.bz(),
    this.j++
},
bomb.prototype.bz = function() {
    for (var a = 0; a < Attack.enemylist.length; a++) 0 == this.j % 4 && Attack.enemylist[a].bzd(this.x, this.y, 140) && (Attack.player.score += 100, Attack.enemylist[a].blood <= 0 && (Attack.enemylist.die = 1))
},
stage.prototype.drBg = function() {
    for (var a = 0; a < Attack.s.length; a++) Attack.s[a].die && Attack.s.splice(a, 1);
    for (var a = 0; a < Attack.chenaList.length; a++) Attack.chenaList[a].die && Attack.chenaList.splice(a, 1);
    if (10 == this.t) {
        var b = Attack.createrBtn(this.title[Attack.stageI], 480, Attack.pos_y / 2 - 60, 1);
        b.to({
            x: 160
        },
        30, "Back", "easeOut", 0,
        function() {
            b.to({
                x: -160,
                alpha: 0
            },
            30, "Back", "easeIn", 20,
            function() {
                b.remove()
            })
        }),
        Attack.easyGameList.push(b)
    }
    this.dn3 += this.speed,
    this.dn4 += this.speed,
    this.dn3 >= 570 && (this.dn3 -= 1140),
    this.dn4 >= 570 && (this.dn4 -= 1140);
    var c = Attack.ctx2;
    c.drawImage(this.img, 0, this.dn3),
    c.drawImage(this.img, 0, this.dn4);
    for (var a = 0; a < Attack.s.length; a++) Attack.s[a].run(),
    Attack.s[a].dr();
    for (var a = 0; a < Attack.chenaList.length; a++) Attack.chenaList[a].move(),
    Attack.chenaList[a].dr();
    Attack.over_t || (this.t += .5)
};
var a_mub = function(a, b, c, d, e, f) {
    this.n = c,
    this.x = b,
    this.h = e,
    this.speed = e / d,
    this.a = a,
    this.y = 4 * -this.h,
    this.nub = [],
    this.c = f,
    this.init()
};
a_mub.prototype.init = function() {
    this.nub[5] = this.a;
    for (var a = 6; 10 > a; a++) this.nub[a] = 0 == this.nub[a - 1] ? 9 : this.nub[a - 1] - 1;
    for (var a = 4; a >= 0; a--) this.nub[a] = 9 == this.nub[a + 1] ? 0 : this.nub[a + 1] + 1
},
a_mub.prototype.dr = function() {
    var a = this.c;
    if (a.save(), this.c == Attack.ctx3) for (var b = 0; b < this.nub.length; b++) {
        var c = this.y + (b - 1) * this.h;
        c > -60 && 60 > c && a.drawImage(Attack.imgDx[85 + this.nub[b]], this.x, c, 12, 24)
    } else for (var b = 0; b < this.nub.length; b++) {
        var c = this.y + (b - 1) * this.h;
        c > -100 && 210 > c && a.drawImage(Attack.imgDx[85 + this.nub[b]], this.x, c)
    }
    a.restore()
},
a_mub.prototype.move = function() {
    if (this.n != this.nub[5] && (this.y += this.speed, 4 * this.h + this.y >= this.h)) {
        var a = this.nub.pop();
        this.nub.splice(0, 0, a),
        this.y = 4 * -this.h
    }
},
explode.prototype.dr = function() {
    var a = Attack.ctx2;
    switch (this.type) {
    case 1:
        a.drawImage(Attack.imgDx[17], 82 * Math.floor(this.r / 2), 0, 82, 68, this.x - 41, this.y - 34 - this.r, 82, 68);
        break;
    case 2:
        if (0 == this.t % 2) {
            var b = random( - 22, 22),
            c = random( - 22, 22);
            Attack.bzlist.push(new explode(this.x + 5 * b, this.y + 5 * c, 5))
        }
        break;
    case 3:
        if (0 == this.t % 2) {
            var b = random( - 22, 22),
            c = random( - 22, 22);
            Attack.bzlist.push(new explode(this.x + 5 * b, this.y + 5 * c, 5))
        }
        break;
    case 4:
        a.drawImage(Attack.imgDx[17], 82 * Math.floor(this.r / 2), 0, 82, 68, this.x - 41, this.y - 34 - this.r, 82, 68);
        var d = 10 * this.t;
        a.drawImage(Attack.imgDx[42], this.x - d / 2, this.y - d / 2, d, d);
        break;
    case 5:
        a.drawImage(Attack.imgDx[17], 82 * Math.floor(this.r / 2), 0, 82, 68, this.x - 41, this.y - 34 - this.r, 82, 68);
        var d = 10 * this.t;
        a.drawImage(Attack.imgDx[42], this.x - d / 2, this.y - d / 2, d, d)
    }
    this.t++
},
explode.prototype.bao = function(a) {
    switch (this.type) {
    case 1:
        this.r < 28 ? this.r++:this.die = 1;
        break;
    case 2:
        if (1 == this.t) for (var a = 0; a < Attack.enemylist.length; a++) Attack.enemylist[a].die = 1;
        Attack.player.wd = 2,
        60 == this.t && (this.die = 1, Attack.result());
        break;
    case 3:
        40 == this.t && (this.die = 1, Attack.over_t = 0);
        break;
    case 4:
        this.r < 28 ? this.r++:(Attack.over_t = 1, Attack.player.wd = 2, Attack.gameover(), Attack.stage.t = 0, this.die = 1);
        break;
    case 5:
        this.r < 28 ? this.r++:this.die = 1
    }
},
sp.prototype.dr = function() {
    var a = Attack.ctx2;
    1 == this.type && a.drawImage(this.img, this.x - this.h / 2, this.y - this.h / 2, this.h, this.h),
    2 == this.type && (a.save(), a.globalAlpha = .7, a.drawImage(this.img, Attack.player.x + Attack.player.w / 2 - this.h / 2 + this.m, this.y + 20 - 4 * this.h - this.n, this.h, 6 * this.h), a.restore()),
    3 == this.type && a.drawImage(this.img, this.x - this.h / 2 + this.m, this.y - this.h / 2 - this.n, this.h, this.h),
    4 == this.type && a.drawImage(this.img, this.x - this.h / 2, this.y - this.h / 2, this.h, this.h),
    5 == this.type && a.drawImage(this.img, 0, 0, 64, 64, Attack.player.x + 31 - this.h / 2, this.y + 30 - 4 * this.h, this.h, 4 * this.h),
    6 == this.type && a.drawImage(this.img, this.x - this.h / 2, this.y - this.h / 2, this.h, this.h),
    7 == this.type && (a.save(), a.globalAlpha = .7, a.drawImage(this.img, Attack.player.x + Attack.player.w / 2 - this.h / 2, this.y + 70 - 10 * this.h, this.h, 10 * this.h), a.restore()),
    8 == this.type && a.drawImage(this.img, this.x - this.h / 2, this.y - this.h / 2, this.h, this.h)
},
sp.prototype.bao = function() {
    this.h > 0 && this.y > -10 && this.y < 640 ? (1 == this.type && (this.y -= 3 * this.cos1, this.x -= 3 * this.sin1, this.h -= 2), 2 == this.type && (this.y -= 20 * this.cos1, this.x -= 20 * this.sin1), 3 == this.type && (this.y -= 2 * this.cos1, this.x -= 2 * this.sin1, this.h -= 1), 4 == this.type && (this.y += 3 * this.cos1, this.x += 3 * this.sin1, this.h -= 3), 8 == this.type && (this.y += 3 * this.cos1, this.x += 3 * this.sin1, this.h -= 3), 6 == this.type && (this.y += 8 * this.cos1, this.x += 8 * this.sin1, this.h -= 1), 7 == this.type && (this.y -= 26 * this.cos1, this.x -= 26 * this.sin1)) : this.die = 1
},
chena.prototype.dr = function() {
    var a = Attack.ctx2;
    a.save(),
    a.translate(this.x + this.width / 2 + 3, this.y + this.hight / 2 + 3),
    a.rotate(this.arc),
    a.globalAlpha = .7,
    a.drawImage(this.img, this.width, 0, this.width, this.hight, -this.width / 2, -this.hight / 2, this.width, this.hight),
    a.restore(),
    a.save(),
    a.translate(this.x + this.width / 2, this.y + this.hight / 2),
    a.rotate(this.arc),
    a.drawImage(this.img, 0, 0, this.width, this.hight, -this.width / 2, -this.hight / 2, this.width, this.hight),
    a.restore()
},
chena.prototype.move = function() {
    1 == this.mfx && (this.y += Attack.stage.speed, this.y > 800 && (this.die = 1))
},
yun.prototype.dr = function() {
    Attack.ctx2.drawImage(this.img, this.x, this.y)
},
yun.prototype.run = function() {
    this.type ? (this.y += 1, this.y > 640 && (this.die = 1)) : (0 == this.fx && (this.y += this.speed_y, this.x -= this.speed_x), 1 == this.fx && (this.y += this.speed_y, this.x += this.speed_x), 2 == this.fx && (this.y += this.speed_y, this.x += this.speed_x), 3 == this.fx && (this.y += this.speed_y, this.x += this.speed_x), this.y > 800 && (this.die = 1))
},
star.prototype.dr = function() {
    Attack.ctx2.drawImage(this.img, 30 * (Math.floor(this.st / 4) % 6), 0, 30, 30, this.x - 15, this.y - 15, 30, 30),
    this.st++
},
star.prototype.move = function() {
    if (Attack.player.eat(this.x + 15, this.y + 15, 100)) {
        var a = this.x - Attack.player.x - 33,
        b = this.y - Attack.player.y - 25,
        c = Math.sqrt(a * a + b * b),
        d = a / c,
        e = b / c;
        this.y -= 7 * e,
        this.x -= 7 * d
    } else this.y -= this.st / 150 * Math.cos(this.st * Math.PI / 180),
    this.x -= this.st / 150 * Math.sin(this.st * Math.PI / 180);
    if ((this.x > 400 || this.x < -80 || this.y < -80 || this.y > Attack.pos_y + 80) && (this.die = 1), Attack.player.eat(this.x + 15, this.y + 15, 30)) {
        var f;
        if (1 == this.type) {
            Attack.player.blood++,
            f = Attack.imgDx[78];
            var g = Attack.createrBtn(f, Attack.player.y, Attack.player.x + Attack.player.w / 2, 1);
            g.update = function() {
                this.ct++,
                this.x = Attack.player.x + Attack.player.w / 2,
                this.y = Attack.player.y - this.ct
            },
            g.to({
                alpha: 0
            },
            30, "Back", "easeIn", 5,
            function() {
                g.die = 1
            }),
            Attack.easyGameList.push(g)
        } else if (2 == this.type) {
            if (Attack.player.power < 10) {
                Attack.player.power++,
                Attack.player.t = 1,
                f = Attack.imgDx[76];
                var g = Attack.createrBtn(f, Attack.player.y, Attack.player.x + Attack.player.w / 2, 1);
                g.update = function() {
                    this.ct++,
                    this.x = Attack.player.x + Attack.player.w / 2,
                    this.y = Attack.player.y - this.ct
                },
                g.to({
                    alpha: 0
                },
                30, "Back", "easeIn", 5,
                function() {
                    g.die = 1
                }),
                Attack.easyGameList.push(g)
            }
        } else if (3 == this.type && Attack.player.dd < 8) {
            Attack.player.dd++,
            f = Attack.imgDx[80];
            var g = Attack.createrBtn(f, Attack.player.y, Attack.player.x + Attack.player.w / 2, 1);
            g.update = function() {
                this.ct++,
                this.x = Attack.player.x + Attack.player.w / 2,
                this.y = Attack.player.y - this.ct
            },
            g.to({
                alpha: 0
            },
            30, "Back", "easeIn", 5,
            function() {
                g.die = 1
            }),
            Attack.easyGameList.push(g)
        }
        this.die = 1
    }
};
var OBB = function(a, b, c, d) {
    this.centerPoint = a,
    this.extents = [b / 2, c / 2],
    this.axes = [new Vector2(Math.cos(d), Math.sin(d)), new Vector2( - 1 * Math.sin(d), Math.cos(d))],
    this._width = b,
    this._height = c,
    this._rotation = d
};
OBB.prototype = {
    getProjectionRadius: function(a) {
        return this.extents[0] * Math.abs(a.dot(this.axes[0])) + this.extents[1] * Math.abs(a.dot(this.axes[1]))
    }
},
Vector2 = function(a, b) {
    this.x = a || 0,
    this.y = b || 0
},
Vector2.prototype = {
    sub: function(a) {
        return new Vector2(this.x - a.x, this.y - a.y)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y
    }
};
var CollisionDetector = {
    detectorOBBvsOBB: function(a, b) {
        var c = a.centerPoint.sub(b.centerPoint),
        d = a.axes[0];
        if (a.getProjectionRadius(d) + b.getProjectionRadius(d) <= Math.abs(c.dot(d))) return ! 1;
        var e = a.axes[1];
        if (a.getProjectionRadius(e) + b.getProjectionRadius(e) <= Math.abs(c.dot(e))) return ! 1;
        var f = b.axes[0];
        if (a.getProjectionRadius(f) + b.getProjectionRadius(f) <= Math.abs(c.dot(f))) return ! 1;
        var g = b.axes[1];
        return a.getProjectionRadius(g) + b.getProjectionRadius(g) <= Math.abs(c.dot(g)) ? !1 : !0
    }
},
$ = function(a) {
    return document.getElementById(a)
};
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(a) {
        window.setTimeout(a, 1e3 / 60)
    }
} (),
window.cancelAFrame = function() {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame ||
    function(a) {
        window.clearTimeout(a)
    }
} ();
var stage2 = function(a) {
    switch (a) {
    case 30:
        enemyZc3(6);
        break;
    case 60:
        enemyZc(6);
        break;
    case 110:
        enemyZc3(6);
        break;
    case 150:
        enemyZc(6);
        break;
    case 189:
        crPt4(200, -100),
        crPt3(270, -190);
        break;
    case 190:
        enemyZc(7);
        break;
    case 248:
    case 268:
    case 288:
        sBossZc2();
        break;
    case 330:
        enemyZc3(7);
        break;
    case 350:
        enemyZc(8);
        break;
    case 417:
        crPt5();
        break;
    case 490:
        crPt5();
        break;
    case 406:
    case 416:
    case 426:
    case 436:
        sBossZc6();
        break;
    case 476:
    case 486:
    case 496:
    case 506:
        sBossZc6_2();
        break;
    case 536:
    case 546:
    case 556:
    case 566:
    case 576:
        sBossZc6();
        break;
    case 530:
        crPt3(140, -100),
        crPt3(170, -50);
        break;
    case 560:
        crPt4(190, -100);
        break;
    case 680:
        crPt4(150, -60),
        crPt3(200, -170);
        break;
    case 726:
    case 736:
    case 746:
    case 756:
        sBossZc6();
        break;
    case 790:
        crPt4(270, -140),
        crPt3(200, -60);
        break;
    case 511:
    case 541:
    case 571:
    case 601:
        sBossZc12();
        break;
    case 806:
    case 816:
    case 836:
    case 846:
    case 856:
    case 866:
    case 876:
        sBossZc6_2();
        break;
    case 880:
        crPt6(210, -100);
        break;
    case 921:
    case 951:
    case 981:
    case 1011:
        sBossZc2();
        break;
    case 941:
    case 971:
    case 1001:
    case 1031:
    case 1061:
        sBossZc12();
        break;
    case 1101:
        enemyZc(6);
        break;
    case 1145:
        enemyZc3(6);
        break;
    case 1142:
    case 1212:
    case 1224:
    case 1236:
    case 1248:
    case 1260:
        sBossZc5();
        break;
    case 1301:
        enemyZc(7);
        break;
    case 1345:
        enemyZc3(7);
        break;
    case 1380:
        crPt7(190, -50);
        break;
    case 1400:
        crPt7(230, -50);
        break;
    case 1420:
        crPt7(160, -50);
        break;
    case 1440:
        crPt7(34, -50);
        break;
    case 1460:
        crPt7(274, -50);
        break;
    case 1480:
        crPt7(174, -50);
        break;
    case 1500:
        crPt7(34, -50);
        break;
    case 1531:
        enemyZc(7);
        break;
    case 1576:
    case 1586:
    case 1596:
    case 1606:
        sBossZc6_2();
        break;
    case 1616:
    case 1626:
    case 1636:
    case 1646:
    case 1656:
        sBossZc6(),
        sBossZc6_3(100);
        break;
    case 1731:
        enemyZc();
        break;
    case 1705:
        enemyZc3();
        break;
    case 1675:
        enemyZc();
        break;
    case 1800:
        enemyZc3();
        break;
    case 1782:
        enemyZc();
        break;
    case 1840:
    case 1890:
    case 1870:
    case 1910:
        crPt3(140, -60),
        crPt3(180, -50),
        crPt3(230, -60),
        crPt3(280, -40),
        crPt3(40, -70);
        break;
    case 1970:
        crPt6(210, -100);
        break;
    case 2e3:
        crPt6(280, -100);
        break;
    case 2020:
        crPt6(140, -100);
        break;
    case 2150:
        break;
    case 2180:
        break;
    case 2220:
        crzdj()
    }
},
stage1 = function(a) {
    switch (a) {
    case 30:
        enemyZc3(3);
        break;
    case 60:
        enemyZc(3);
        break;
    case 110:
        enemyZc3(4);
        break;
    case 150:
        enemyZc(4);
        break;
    case 189:
        crPt3(270, -190);
        break;
    case 190:
        enemyZc();
        break;
    case 200:
        crPt7(110, -50);
        break;
    case 248:
    case 268:
    case 288:
        sBossZc2();
        break;
    case 300:
        crPt7(110, -50);
        break;
    case 330:
        enemyZc3();
        break;
    case 350:
        enemyZc(3);
        break;
    case 406:
    case 416:
    case 426:
    case 436:
        sBossZc6();
        break;
    case 476:
    case 486:
    case 496:
    case 506:
        sBossZc6_2();
        break;
    case 536:
    case 546:
    case 556:
    case 566:
    case 576:
        sBossZc6();
        break;
    case 560:
        crPt4(190, -100);
        break;
    case 680:
        crPt4(150, -60),
        crPt3(200, -170);
        break;
    case 726:
    case 736:
    case 746:
    case 756:
        sBossZc6();
        break;
    case 790:
        crPt4(270, -140),
        crPt3(200, -60);
        break;
    case 511:
    case 541:
    case 571:
    case 601:
        sBossZc12();
        break;
    case 806:
    case 816:
    case 836:
    case 846:
    case 856:
    case 866:
    case 876:
        sBossZc6_2();
        break;
    case 921:
    case 951:
    case 981:
    case 1011:
        sBossZc2();
        break;
    case 941:
    case 971:
    case 1001:
    case 1031:
    case 1061:
        sBossZc12();
        break;
    case 1101:
        enemyZc(5);
        break;
    case 1145:
        enemyZc3(5);
        break;
    case 1142:
    case 1212:
    case 1224:
    case 1236:
    case 1248:
    case 1260:
        sBossZc5();
        break;
    case 1301:
        enemyZc(6);
        break;
    case 1345:
        enemyZc3(6);
        break;
    case 1380:
        crPt7(110, -50);
        break;
    case 1400:
        crPt7(130, -50);
        break;
    case 1430:
        crPt7(150, -50);
        break;
    case 1416:
    case 1426:
    case 1436:
    case 1446:
        sBossZc6_3(120);
        break;
    case 1531:
        enemyZc(5);
        break;
    case 1576:
    case 1586:
    case 1596:
    case 1606:
        sBossZc6_2();
        break;
    case 1616:
    case 1626:
    case 1636:
    case 1646:
        sBossZc6(),
        sBossZc6_3(160);
        break;
    case 1731:
        enemyZc(6);
        break;
    case 1705:
        enemyZc3(6);
        break;
    case 1675:
        enemyZc(6);
        break;
    case 1800:
        enemyZc3(5);
        break;
    case 1782:
        enemyZc(6);
        break;
    case 1900:
        sBossZc4()
    }
};
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
var sj_8 = 0,
sj_11 = 0,
sj_15 = 0,
sj_1 = 0,
rad4 = 0,
arc5 = 0,
arc6 = 0;
