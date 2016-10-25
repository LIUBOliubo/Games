var bs = "GoldNuggets";
var hA = "2.0";
var fM = "408557819189547"; //dseffects.com
var gs = 0;
var eR = 1;
var gX = 2;
var gA = 3;
var gE = 4;
var gC = 5;
var gB = 6;
var gu = 7;
var fZ = 8;
var gh = 9;
var gw = 10;
var gT = 11;
var fW = 12;
var fT = 13;
var gi = 14;
var gb = 15;
var fU = 16;
var gU = 17;
var ff = 18;
var gv = 19;
var gF = 20;
var gG = 21;
var gz = 22;
var gp = 23;
var gH = 24;
var gI = 25;
var fV = 26;
var fS = 27;
var ga = 28;
var eI = 29;
var gg = 30;
var fX = 31;
var eQ = dsp[gs];
var gW = dsp[eR];
var dX = dsp[gX];
var aW = dsp[gA];
var cB = dsp[gE];
var dT = dsp[gC];
var fc = dsp[gB];
var G = dsp[gu];
var hC = dsp[fZ];
var cS = dsp[gh];
var eN = dsp[gw];
var eU = dsp[gT];
var eY = dsp[fW];
var eK = dsp[fT];
var ev = dsp[gi];
var ew = dsp[gb];
var eB = dsp[fU];
var eT = dsp[gU];
var ac = dsp[ff];
var bg = dsp[gv];
var ay = dsp[gF];
var bj = dsp[gG];
var eP = dsp[gz];
var eL = dsp[gp];
var fd = dsp[gH];
var eO = dsp[gI];
var ey = dsp[fV];
var ez = dsp[fS];
var dO = dsp[ga];
var dY = dsp[eI];
var cw = dsp[gg];
var dP = dsp[fX];
var aP ='http://g.lanrenmb.com/games/test_hjkg/?'; //'http://' + dX + '/games/' + bs + '/' + bs + '.php?pid' + eQ;
var g = 0;
var f = 2;
var cA = 0;
var cD = 1;
var dF = 2;
var dE = 3;
var dm = 4;
var hp = 5;
var dn = 8;
var dI = 30;
var dK = new Array();
var bU = 0.0;
for (var i = 0; i < 50; i++) {
    dK[i] = bU;
    bU += 0.02;
}
bU = 1.0;
for (var i = 50; i < 100; i++) {
    dK[i] = bU;
    bU -= 0.02;
}
var cX = 0;
var i = 0;
var ax = 50;
var ab = cA;
var hH = "iphone";
var P = "onmousedown";
var Q = "onclick";
var aq = "onmousemove";
var aD = "onmouseup";
var cf = "touchmove";
var M = 0;
var dq = eT;
function ak(name) {
    if (navigator.userAgent.indexOf(name) != -1) {
        return true;
    }
    return false;
};
var hc = 0;
var bf = 1;
var af = 2;
var at = 3;
var al = 4;
var aI = 5;
var ae = 6;
var be = 7;
var bL = 0;
if (ak("iPhone") || ak("iPad") || ak("iPod"))
    g = bf;
else if (ak("Android"))
    g = af;
else if (ak("MSIE")) {
    if (typeof document.documentElement.style.opacity != 'undefined') {
        g = at;
        if (ak("IEMobile"))
            bL = 1;
    } else
        g = ae;
} else if (ak("Firefox"))
    g = al;
else if (ak("Opera"))
    g = aI;
else if (ak("RIM"))
    g = be;
else
    g = hc;
if (g == bf) {
    P = "ontouchstart";
    Q = "onclick";
    aD = "ontouchend";
    aq = "ontouchmove";
    ax = 50;
}
if (g == be) {
    P = "ontouchstart";
    Q = "ontouchstart";
    aD = "ontouchend";
    aq = "ontouchmove";
    ax = 50;
}
if (g == af) {
    if (ak("Android 2.0") || ak("Android 2.1")) {
        cf = "touchstart";
        P = "ontouchstart";
        aD = "ontouchend";
        Q = "ontouchstart";
        aq = "ontouchmove";
        ax = 50;
        M = 2;
    } else if (ak("Android 1.6")) {
        cf = "touchstart";
        P = "ontouchstart";
        aD = "ontouchend";
        Q = "ontouchstart";
        aq = "ontouchmove";
        ax = 20;
        M = 1
    } else {
        cf = "touchmove";
        P = "ontouchstart";
        Q = "onclick";
        aD = "ontouchend";
        aq = "ontouchmove";
        ax = 50;
        M = 3;
    }
}
if ((g == at) || (g == ae)) {
    P = "onmousedown";
    Q = "onclick";
    aD = "onmouseup";
    aq = "onmousemove";
    ax = 50;
    if (g == ae) {
        ax = 50;
        f = 1;
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement) {
            "use strict";
            if (this == null) {
                throw new TypeError();
            }
            var dg = Object(this);
            var cd = dg.length >>> 0;
            if (cd === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n != n) {
                    n = 0;
                } else if (n != 0 && n != Infinity && n != - Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= cd) {
                return -1;
            }
            var bB = n >= 0 ? n : Math.max(cd - Math.abs(n), 0);
            for (; bB < cd; bB++) {
                if (bB in dg && dg[bB] === searchElement) {
                    return bB;
                }
            }
            return -1;
        }
    }
}
if (g == al) {
    P = "onmousedown";
    Q = "onclick";
    aD = "onmouseup";
    aq = "onmousemove";
    ax = 50;
}
if (g == aI) {
    P = "onmousedown";
    Q = "onclick";
    aD = "onmouseup";
    aq = "onmousemove";
    ax = 50;
}
var aZ = 0;
if ((g != 3) && (g != 6))
    aZ = 1;
function fz(e) {
    if (aZ)
        e.preventDefault();
};
if ((g == bf) || (g == af) || bL) {
    if (window.innerWidth < 600)
        f = 1;
}
if (dT == 1)
    f = 1;
else if (dT == 2)
    f = 2;
if (fc)
    if (top.location.href != self.location.href)
        top.location.href = self.location.href;
par_game = bs;
var bV = 0;
var eq = 0;
var et = 0;
if (f == 1) {
    var es = 384;
    var er = 512;
    G += "zz_";
} else {
    var es = 768;
    var er = 1024;
}
var r = es - eq;
var D = er - et;
var K = eq + (r >> 1);
var gV = et + (D >> 1);
var fj;
var gY;
var gZ;
var fF;
var hD;
var dW;
var dV;
var gM;
var gL;
var dp = 1;
var dZ = 0;
var gQ = 'k66b';
var gO = gQ.split('');
var ge = 'c5-a';
var gf = ge.split('');
var cx = location.hostname;
var av = cx.split(".");
var bD = "";
if (av.length > 2) {
    if ((av.length == 3) && (av[av.length - 1].length < 3) && (av[av.length - 2].length < 3))
        bD = cx;
    else {
        for (i = 1; i < av.length - 1; i++)
            bD += av[i] + ".";
        bD += av[av.length - 1];
    }
} else
    bD = cx;
var gN = ':/' + '/';
var gc = 'r-crrc';
var gd = gc.split('');
var bC = dZ;
var gj = 'eeesf23hh3r62sray';
var gk = gj.split('');
var ho = 'r5-b6';
var hn = ho.split('');
var hf = 'v7';
var he = '9fg7hjklz6xc.v8bn1m0';
var hk = hf.split('');
var hd = 'q2se4rtyu3i5opa-wd' + he;
var ao = hd.split('');
var H = '';
var fE = 'ible';
var gR = 'abcdefghijklmnopqrstuvwxyz';
var gK = 'ank';
var aS = dq.length;
var gS = '0123456789-.';
var bx = dq.split('');
var hb = 'den';
var aF = gS + gR;
var hB = aF.split('');
var dU = 'hid';
var gJ = 'bl';
var fD = 'vis';
var cK = '';
var dM = bD;
var hj = dM.toLowerCase();
var hJ = hj.split('');
var ft = 'ow';
var ha = 'e';
var fw = 'sh';

/*
for (i = 0; i < 5; i++)
    H += ao[aF.indexOf(hn[i])];
df = 'S' + H;
H = '';
for (i = 0; i < 17; i++)
    H += ao[aF.indexOf(gk[i])];
dW = H;
gL = '_' + gJ + gK;
H = '-';
for (i = 0; i < 2; i++)
    H += ao[aF.indexOf(hk[i])];
df += H;
H = '-D';
for (i = 0; i < 4; i++)
    H += ao[aF.indexOf(gf[i])];
df += H;
H = '-S';
for (i = 0; i < 6; i++)
    H += ao[aF.indexOf(gd[i])];
df += H;
H = '';
for (i = 0; i < 4; i++)
    H += ao[aF.indexOf(gO[i])];
dV = H;
H = '';
for (i = 2; i < aS - 2; i++) {
    H += ao[aF.indexOf(bx[i])];
}
*/

H='59600.com';

cK = dM;
gM = dV + gN + dW;
fj = fw + ft;
gY = dU + hb;
//if (cK == H)
bC = dp;
//if (ao[aS >> 1] != bx[0] || ao[aS] != bx[1] || ao[aS] != bx[aS - 2] || ao[aS >> 2] != bx[aS - 1])
//bC = dZ;
if (cK.length == 0)
    bC = dp;
gZ = dU + ha;
fF = fD + fE;
var bO = 0;
var hI = 0;
var aV = "00000";
var L = 0;
var ce = 0;
var aL;
var F;
var ai;
var I;
if (aZ) {
    F = window.innerWidth;
    ai = window.innerHeight;
} else {
    F = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    ai = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
}
if (F / ai > r / (D)) {
    I = ai / (D);
} else {
    I = F / (r);
}
var aN = "position:absolute;top:0px;left:0px;z-Index:1;visibility:hidden;";
var bq = aN + "white-space:nowrap;";
function eg(C, col) {
    document.getElementById(C).style.color = "#" + col;
    document.getElementById(C).style.fontWeight = "bold";
    document.getElementById(C).style.filter = "alpha(opacity=50)";
};
document.write('<div id=\'all\' style=\'position:absolute;left:0px;top:0px;clip:rect(0px,' + r + 'px,' + (D) + 'px,0px);\'>');
if ((F < ai) && ((g == bf) || (g == af) || (g == be) || bL))
    ef("all", 0, 0, F / (r), ai / (D));
else
    da("all", ((F - r * I) / 2), 0, I);
if (cS) {
    par_adx2 = ((F - r) / 2);
    par_adx3 = ((F - r * I) / 2);
    par_adx4 = ((F - r * I) / 2) + (r * I);
}
var cq = new Array();
var bc = 0;
var dJ = gW;
cq[bc] = new Image();
cq[bc].src = dJ;
bc++;
var dH = G + "info.png";
cq[bc] = new Image();
cq[bc].src = dH;
bc++;
var gl = 40 * f;
var gD = 40 * f;
document.write('<img id=\'lo\' style=\'position:absolute;top:0px;left:0px;visibility:visible;z-Index:1;opacity:1;-webkit-transition-property: opacity;-webkit-transition-duration: 1s;\' src=\'' + dJ + '\' width=' + r + ' height=' + D + '>');
if (cw) {
    bg *= f;
    ay *= f;
    document.write('<div id=\'lob1\' style=\'position:absolute;top:' + (D - (D >> 3)) + 'px;left:' + ((r >> 1) - (bg >> 1)) + 'px;visibility:visible;z-Index:2;opacity:' + bj + ';-moz-opacity:' + bj + ';filter:alpha(opacity=' + (bj * 100) + ');background-color:#' + fd + ';border:1px solid #000;width:' + (bg) + 'px;height:' + ay + 'px;font-size:' + (ay - (ay >> 2)) + 'px;color:#' + eL + ';text-align:center;-moz-border-radius:' + (ay >> 1) + ';-webkit-border-radius:' + (ay >> 1) + 'px;\'>' + eP + '</div>');
    document.write('<div id=\'lob2\' style=\'position:absolute;top:' + (D - (D >> 3)) + 'px;left:' + ((r >> 1) - (bg >> 1)) + 'px;visibility:visible;z-Index:3;opacity:' + bj + ';-moz-opacity:' + bj + ';filter:alpha(opacity=' + (bj * 100) + ');background-color:#' + eO + ';width:0px;height:' + ay + 'px;-moz-border-radius:' + (ay >> 1) + ';-webkit-border-radius:' + (ay >> 1) + 'px;\'></div>');
}
var A = new Array();
var m = 0;
var dL = bg / 29;
if (ac == ar)
    dL = bg / (29 + 4);
var dG = new Array();
var by = 0;
function J() {
    if (cw) {
        if (A[by].width > 0) {
            clearTimeout(dG[by]);
            by++;
            document.getElementById("lob2").style.border = "1px solid #000";
            document.getElementById("lob2").style.width = (by * dL) + "px";
        } else
            dG[by] = setTimeout('J()', 20);
    }
};
var ar = 5;
var hw = "";
var R = 0;
if (ac == ar) {
    var dk = G + "fli.png";
    A[m] = new Image();
    A[m].src = dk;
    J();
    m++;
    var dj = G + "flo.png";
    A[m] = new Image();
    A[m].src = dj;
    J();
    m++;
    var bP = G + "fng.png";
    A[m] = new Image();
    A[m].src = bP;
    J();
    m++;
    var bN = G + "fhi.png";
    A[m] = new Image();
    A[m].src = bN;
    J();
    m++;
}
var ds = G + "t.jpg";
A[m] = new Image();
A[m].src = ds;
J();
m++;
var bK = G + "ng.png";
A[m] = new Image();
A[m].src = bK;
J();
m++;
var bY = G + "hi.png";
A[m] = new Image();
A[m].src = bY;
J();
m++;
var bv = G + "submit.png";
A[m] = new Image();
A[m].src = bv;
J();
m++;
var dQ = G + "continue.png";
A[m] = new Image();
A[m].src = dQ;
J();
m++;
var ci = G + "l1a.jpg";
A[m] = new Image();
A[m].src = ci;
J();
m++;
var cc = G + "l1b.jpg";
A[m] = new Image();
A[m].src = cc;
J();
m++;
var cs = G + "l2a.jpg";
A[m] = new Image();
A[m].src = cs;
J();
m++;
var ct = G + "l2b.jpg";
A[m] = new Image();
A[m].src = ct;
J();
m++;
var cu = G + "l3a.jpg";
A[m] = new Image();
A[m].src = cu;
J();
m++;
var cy = G + "l3b.jpg";
A[m] = new Image();
A[m].src = cy;
J();
m++;
var cQ = ".png";
if (g == ae)
    cQ = ".gif";
var ej = G + "ba" + cQ;
A[m] = new Image();
A[m].src = ej;
J();
m++;
var aE = new Array();
for (var i = 0; i < 17; i++) {
    if ((i >= 9) && (i <= 12))
        aE[i] = G + "s" + (i) + ".gif";
    else
        aE[i] = G + "s" + (i) + cQ;
    A[m + i] = new Image();
    A[m + i].src = aE[i];
    J();
}
m += 17;
if (cS) {
}
if ((g != ae) && (g != be)) {
    document.write('<div style=\'position:absolute;top:0px;left:' + (r) + 'px;width:' + (r * 2) + 'px;height:' + (D) + 'px;background-Color:#000000;visibility:visible;z-Index:10000;\'></div>');
    document.write('<div style=\'position:absolute;top:0px;left:' + ( - r * 2) + 'px;width:' + (r * 2) + 'px;height:' + (D) + 'px;background-Color:#000000;visibility:visible;z-Index:10000;\'></div>');
}
function fl() {
    location.href = '/';
};
if (aW) {
    var ah = aP + "&hi=1";
    if (dO)
        ah = ds_urlhiscore + dY;
    document.write('<img id=\'hi\' style=\'' + aN + 'opacity:0.6;-moz-opacity:0.6;filter:alpha(opacity=60);\' ' + Q + '=\'fl()\' src=\'' + bY + '\' >');
}
document.write('<div id=\'hs\' style=\'' + bq + 'color:#ffffff;font-family:Arial;font-size:' + (14 * f) + 'px;\'></div>');
document.write('<img id=\'ng\' style=\'' + aN + 'opacity:0.6;-moz-opacity:0.6;filter:alpha(opacity=60);\' ' + Q + '=\'fN()\'  src=\'' + bK + '\' >');
document.write('<div id=\'su\' style=\'' + aN + '\'><a href=\'#\' ' + P + '=\'go()\'><img  src=\'' + bv + '\' border=0></a></div>');
document.write('<img id=\'co\' style=\'' + aN + '\' ' + Q + '=\'bm()\' src=\'' + dQ + '\' >');
if (eN) {
}

if (ac == ar) {
    document.write('<div id="fb-root" ></div>');
    (function() {
        var e = document.createElement('script');
        e.async = true;
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
    }());
    window.fbAsyncInit = function() {
        FB.init({
            appId: fM,
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true
        });
        FB.Event.subscribe('auth.statusChange', fK);
        FB.Event.subscribe('auth.logout', function(ck) {
            R = 0;
            document.getElementById("ng").src = bK;
            document.getElementById("hi").src = bY;
        });
        FB.Event.subscribe('auth.login', function(ck) {
            R = 1;
            eb();
            document.getElementById("ng").src = bP;
            document.getElementById("hi").src = bN;
        });
    };
    function fK(ck) {
        if (ck.authResponse) {
            R = 1;
            eb();
            document.getElementById("ng").src = bP;
            document.getElementById("hi").src = bN;
        } else {
            R = 0;
            document.getElementById("ng").src = bK;
            document.getElementById("hi").src = bY;
        }
    };
    function eb() {
        if (R) {
            FB.api('/me', function(bA) {
                if (!bA.error) {
                    cF = bA.id;
                    T = bA.name;
                    bk = T.charAt(1) + am(9) + (ap * 89) + am(9) + T.charAt(3) + 'fc1' + am(9) + T.charAt(0) + am(9) + T.charAt(1) + '4z3' + (ap * 7) + '3247z11';
                    document.getElementById("f_n0").innerHTML = bA.name;
                    document.getElementById("f_p0").src = "http://graph.facebook.com/" + bA.id + "/picture?type=small";
                }
            });
        }
    };
    function fu() {
        if ((aZ) && (g != al))
            window.event.preventDefault();
        FB.login(function(ck) {});
    };
    function fi() {
        if ((aZ) && (g != al))
            window.event.preventDefault();
        o("f_lo", -1000, -1000);
        o("su", -1000, -1000);
        o("hs", -1000, -1000);
        o("f_p0", -1000, -1000);
        o("f_n0", -1000, -1000);
        R = 0;
        document.getElementById("ng").src = bK;
        document.getElementById("hi").src = bY;
        FB.logout();
    };
    if (R == 1) {
        document.getElementById("ng").src = bP;
        document.getElementById("hi").src = bN;
    }
    document.write('<img id=\'f_p0\' style="' + aN + '"  width=' + (50 * f) + ' height=' + (50 * f) + ' border=1>');
    document.write('<div id=\'f_n0\' style=\'' + bq + 'font-family:Arial;font-size:' + (16 * f) + 'px;color:#4fefff;\'></div>');
    document.write('<div id=\'f_ba\' style=\'position:absolute;top:0px;left:0px;width:' + (r) + 'px;height:' + (42 * f) + 'px;background-Color:#000000;visibility:hidden;z-Index:1;\'></div>');
    document.write('<img id=\'f_li\' style=\'' + aN + '\' ' + Q + '=\'fu()\'  src=\'' + dk + '\' >');
    document.write('<img id=\'f_lo\' style=\'' + aN + '\' ' + Q + '=\'fi()\'  src=\'' + dj + '\' >');
    bQ("f_ba", 0.7);
}
document.write('<div id=\'s1\' style=\'' + bq + 'color:#ffffff;font-family:Arial;font-size:' + (14 * f) + 'px;text-shadow: 2px 2px 2px #5f0000;\'></div>');
if ((g == ae) || (g == at))
    eg('s1', "7f007f");
document.write('<div id=\'en\' style=\'' + bq + 'color:#ffffff;font-family:Arial;font-size:' + (14 * f) + 'px;text-shadow: 2px 2px 2px #00005f;\'></div>');
if ((g == ae) || (g == at))
    eg('en', "7f4f00");
document.write('<div id=\'t1\' style=\'' + bq + 'color:#ffffff;font-family:Arial;font-size:' + (42 * f) + 'px;text-shadow: 2px 2px 2px #000000;\'></div>');
document.write('<div id=\'g1\' style=\'' + bq + 'color:#ffffff;font-family:Arial;font-size:' + (42 * f) + 'px;text-shadow: 2px 2px 2px #000000;\'>游戏结束</div>');
document.write('<img id=\'ti\' style=\'position:absolute;top:0px;left:0px;visibility:hidden;z-Index:0;\' src=\'' + ds + '\' >');
document.write('<img id=\'ba\' ' + P + '=\'bt()\'  ' + aq + '=\'bt()\' style=\'position:absolute;top:0px;left:0px;visibility:hidden;opacity:0.5;-moz-opacity:0.6;filter:alpha(opacity=60);z-Index:7;\' src=\'' + ej + '\' >');
document.write('<img id=\'bka\' ' + P + '=\'bt()\'  ' + aq + '=\'bt()\' style=\'position:absolute;top:0px;left:0px;visibility:hidden;z-Index:6;\' src=\'' + ci + '\' >');
document.write('<img id=\'bkb\' ' + P + '=\'cR()\'   style=\'position:absolute;top:0px;left:0px;visibility:hidden;z-Index:4;\' src=\'' + cc + '\' >');
for (var i = 0; i < 8; i++)
    document.write('<img id=\'spr' + i + '\'  ' + P + '=\'bt()\' ' + aq + '=\'bt()\'    style=\'position:absolute;top:0px;left:0px;visibility:hidden;z-Index:5;\' src=\'' + aE[i] + '\' >');
document.write('<img id=\'ten\'   style=\'position:absolute;top:0px;left:0px;visibility:hidden;z-Index:5;\' src=\'' + aE[8] + '\' >');
var aH = 20;
for (var i = 0; i < aH; i++)
    document.write('<img id=\'bou' + i + '\'  ' + P + '=\'cR()\' ' + P + '=\'cR()\'   style=\'position:absolute;top:0px;left:0px;visibility:hidden;z-Index:5;\' src=\'' + aE[i % 17] + '\' >');
document.write('<div id=\'li\' style=\'position:absolute;top:0px;left:0px;width:' + (1 * f) + 'px;height:' + (1 * f) + 'px;color:#7f7f7f;border-Width:' + (2 * f) + 'px 0px 0px 0px;border-Style:solid;visibility:hidden;z-Index:90;\'></div>');
document.write('</div>');
function B(C) {
    document.getElementById(C).style.visibility = 'hidden';
};
function hL(C, xx, l, v, bI) {
    bQ(C, bI);
    document.getElementById(C).style.left = xx + "px";
    document.getElementById(C).style.top = l + "px";
    document.getElementById(C).style.visibility = 'visible';
    document.getElementById(C).style.zIndex = v;
};
function t(C, xx, l, v) {
    document.getElementById(C).style.left = xx + "px";
    document.getElementById(C).style.top = l + "px";
    document.getElementById(C).style.visibility = 'visible';
    document.getElementById(C).style.zIndex = v;
};
function ht(C, xx, l, cJ, cE, v) {
    document.getElementById(C).style.left = xx + "px";
    document.getElementById(C).style.top = l + "px";
    document.getElementById(C).style.width = (cJ - xx) + "px";
    document.getElementById(C).style.height = (cE - l) + "px";
    document.getElementById(C).style.visibility = 'visible';
    document.getElementById(C).style.zIndex = v;
};
function bQ(C, bn) {
    if (g != ae)
        document.getElementById(C).style.opacity = bn;
    else
        document.getElementById(C).style.filter = "alpha(opacity=" + (bn * 100 + ")");
};
function cg(C) {
    return document.getElementById(C).offsetWidth;
};
function fq(C) {
    return document.getElementById(C).offsetHeight;
};
function am(bn) {
    return (Math.floor(Math.random() * bn));
};
function hs(d, xx, l, v) {
    if (g == aI)
        document.getElementById(d).style.OTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ",1)";
    else if (g == al)
        document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ",1)";
    else if (g == at)
        document.getElementById(d).style.msTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ",1)";
    else if (g == af) {
        if (M == 1)
            document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ",1)";
        else if (M == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = l + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + v + ",1)";
        } else
            document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + v + ",1)";
    } else
        document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + v + ",1)";
};
function hq(d, xx, l, v, O) {
    if (g == aI)
        document.getElementById(d).style.OTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ") rotate(" + O + "deg)";
    else if (g == al)
        document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ") rotate(" + O + "deg)";
    else if (g == at)
        document.getElementById(d).style.msTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ") rotate(" + O + "deg)";
    else if (g == af) {
        if (M == 1)
            document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ") rotate(" + O + "deg)";
        else if (M == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = l + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + v + ") rotate(" + O + "deg)";
        } else
            document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + v + ") rotate(" + O + "deg)";
    } else
        document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + v + ") rotate(" + O + "deg)";
};
function ef(d, xx, l, aR, aT) {
    if (g == ae) {} else if (g == aI)
        document.getElementById(d).style.OTransform = "translate(" + xx + "px," + l + "px) scale(" + aR + "," + aT + ")";
    else if (g == al)
        document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + l + "px) scale(" + aR + "," + aT + ")";
    else if (g == at)
        document.getElementById(d).style.msTransform = "translate(" + xx + "px," + l + "px) scale(" + aR + "," + aT + ")";
    else if (g == af) {
        if (M == 1)
            document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + l + "px) scale(" + aR + "," + aT + ")";
        else if (M == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = l + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + aR + "," + aT + ")";
        } else
            document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + aR + "," + aT + ")";
    } else
        document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + aR + "," + aT + ")";
};
function hx(d, xx, l, cJ, cE, v) {
    document.getElementById(d).style.left = ((xx)) + "px";
    document.getElementById(d).style.top = ((l)) + "px";
    document.getElementById(d).style.width = (cJ * v) + "px";
    document.getElementById(d).style.height = (cE * v) + "px";
};
function hy(d, xx, l, fk, v) {
    document.getElementById(d).style.left = ((xx)) + "px";
    document.getElementById(d).style.top = ((l)) + "px";
    document.getElementById(d).style.fontSize = (fk * v) + "px";
};
function da(d, xx, l, v) {
    if (g == ae) {
        document.getElementById(d).style.zoom = v;
        document.getElementById(d).style.left = xx + "px";
        document.getElementById(d).style.top = l + "px";
    } else if (g == aI)
        document.getElementById(d).style.OTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ")";
    else if (g == al)
        document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ")";
    else if (g == at)
        document.getElementById(d).style.msTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ")";
    else if (g == af) {
        if (M == 1)
            document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + l + "px) scale(" + v + ")";
        else if (M == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = l + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + v + ")";
        } else
            document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + v + ")";
    } else
        document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) scale(" + v + ")";
};
function ee(d, xx, l, O) {
    if (g == ae) {
        hG = "filter";
        var ea = Math.cos(O * Math.PI * 2 / 360);
        var cl = Math.sin(O * Math.PI * 2 / 360);
        hl = ea;
        hm = - cl;
        hi = cl;
        hg = ea;
        document.getElementById(d).style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + hl + ",M12=" + hm + ",M21=" + hi + ",M22=" + hg + ", sizingMethod='auto expand');";
        document.getElementById(d).style.left = xx - (cg(d) >> 1) + "px";
        document.getElementById(d).style.top = l - (fq(d) >> 1) + "px";
    } else if (g == aI)
        document.getElementById(d).style.OTransform = "translate(" + xx + "px," + l + "px) rotate(" + O + "deg)";
    else if (g == al)
        document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + l + "px) rotate(" + O + "deg)";
    else if (g == at)
        document.getElementById(d).style.msTransform = "translate(" + xx + "px," + l + "px) rotate(" + O + "deg)";
    else if (g == af) {
        if (M == 1)
            document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + l + "px) rotate(" + O + "deg)";
        else if (M == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = l + "px";
            document.getElementById(d).style.webkitTransform = "rotate(" + O + "deg)";
        } else
            document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) rotate(" + O + "deg)";
    } else
        document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) rotate(" + O + "deg)";
};
function o(d, xx, l) {
    if (g == ae) {
        document.getElementById(d).style.left = xx + "px";
        document.getElementById(d).style.top = l + "px";
    } else if (g == aI)
        document.getElementById(d).style.OTransform = "translate(" + xx + "px," + l + "px)";
    else if (g == al) {
        document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + l + "px)";
    } else if (g == at) {
        document.getElementById(d).style.msTransform = "translate(" + xx + "px," + l + "px)";
    } else if (g == af) {
        if (M == 1)
            document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + l + "px)";
        else if (M == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = l + "px";
        } else
            document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px)";
    } else
        document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px)";
};
function cP(fC) {
    L += fC;
    if (L < 10)
        aV = "0000" + L;
    else if (L >= 10 && L < 100)
        aV = "000" + L;
    else if (L >= 100 && L < 1000)
        aV = "00" + L;
    else if (L >= 1000 && L < 10000)
        aV = "0" + L;
    else
        aV = "" + L;
    var gP = 'Score: ' + aV;
    document.getElementById("s1").innerText = gP;
};
var bh;
function fN() {
    if (ac == ar) {
        if ((dP > 0) && (R == 0) && (typeof (window.localStorage) != 'undefined')) {
            bh = window.localStorage.getItem("ds_" + bs + "_fbnp");
            if (bh == null)
                bh = 0;
            if (bh > dP - 1) {
                alert("PLEASE LOGIN WITH FAC" + "EBOOK TO PLAY AGAIN");
                return;
            } else {
                bh++;
                window.localStorage.setItem("ds_" + bs + "_fbnp", bh);
            }
        }
        B("f_li");
        B("f_lo");
        B("f_ba");
    }
    B("ti");
    if (aW)
        B("hi");
    B("ng");
    aL = 1;
    L = 0;
    aV = "00000";
    cP(0);
    ca();
    if (bC)
        ec();
};
function ca() {
    B("bka");
    B("bkb");
    for (i = 0; i < 8; i++)
        B("spr" + i);
    for (i = 0; i < aH; i++)
        B("bou" + i);
    B("ten");
    B("li");
    B("t1");
    B("g1");
    B("en");
    B("s1");
};
var hu = 0;
var bz = 0;
var cZ = new Array();
for (var i = 0; i < A.length; i++)
    cZ[i] = false;
function fx() {
    if (ab == cA) {
        window.scroll(0, 1);
        if (bz == A.length) {
            if (cw) {
                B("lob1");
                B("lob2");
            }
            if (bC)
                ab = dI;
            return;
        } else if (cZ[bz] == false && A[bz].complete) {
            cZ[bz] = true;
            bz++;
        }
    } else if (ab == dI) {
        cX += 5;
        if (cX == 55) {
            t("ti", 0, 0, 0);
            o("ti", 0, 0);
            bQ("lo", 0);
        }
        if (cX == 100) {
            ab = cD;
            B("lo");
            t("ng", 0, 0, 11);
            o("ng", -1000, -1000);
            if (aW) {
                t("hi", 0, 0, 11);
                o("hi", -1000, -1000);
            }
            if (ac == ar) {
                if (R == 1) {
                    document.getElementById("ng").src = bP;
                    document.getElementById("hi").src = bN;
                }
                t("f_li", 0, 0, 11);
                o("f_li", -1000, -1000);
                t("f_lo", 0, 0, 11);
                o("f_lo", -1000, -1000);
                t("f_ba", 0, 0, 10);
                o("f_ba", 0, D - 42 * f);
            }
        }
    } else if (ab == cD) {
        if (ac == ar) {
            if (R == 0) {
                o("f_li", K - (cg("f_li") >> 1), D - 37 * f);
                o("f_lo", -1000, -1000);
            } else {
                o("f_lo", K - (cg("f_lo") >> 1), D - 37 * f);
                o("f_li", -1000, -1000);
            }
            o("ng", (r >> 1) - (64 * f), D - (38 * f) - (64 * f) - (64 * f));
            if (aW)
                o("hi", (r >> 1) - (64 * f), D - (38 * f) - (64 * f));
        } else {
            o("ng", (r >> 1) - (64 * f), D - (38 * f) - (64 * f) - (16 * f));
            if (aW)
                o("hi", (r >> 1) - (64 * f), D - (38 * f) - (16 * f));
        }
    } else if (ab == dF) {
        fg();
    } else if (ab == dE) {
        if (bO++ > 60) {
            bO = 0;
            ec();
        }
    } else if (ab == dm) {
        if (cb(fG, U, aA))
            bO = 70;
            if (bO > 60) {
                bO = 0;
                ca();
                if (aW)
                    ab = dn;
                else
                    bm();
            }
    } else if (ab == dn) {
        fL();
    }
};
var gm = 0;
var gq = 1;
var gn = 2;
var gr = 3;
function fn() {
    var bp = false;
    try {
        bp = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (e) {
        try {
            bp = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (hv) {
            bp = false
        }
    }
    if (!bp && typeof XMLHttpRequest != 'undefined') {
        bp = new XMLHttpRequest();
    }
    return bp;
};
function fr() {
    var hM = new Date();
    if (aw) {
        aw.open("POST", aP + '&hi=2&fb=' + R, true);
        aw.onreadystatechange = fm;
        aw.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var cU = "n=" + T + "&s=" + ap + "&bR=" + bk;
        if (ac == ar) {
            cU = "n=" + eh(T) + "&s=" + ap + "&bR=" + bk + '&i=' + cF;
        }
        aw.setRequestHeader("Content-length", cU.length);
        aw.setRequestHeader("Connection", "close");
        aw.send(cU);
    }
};
function fm() {
    if (aw.readyState == 4) {
        if (aw.status == 200) {
            bm();
            if (ez) {
                var ah = aP + '&hi=1&fb="+R;';
                location.href = ah;
            }
        } else {
            alert("Error ...");
            bm();
        }
    }
};
var aw;
var fy = "你的分数";
var fY = "Insert your name: ";
var fJ = "The name must be at least 4 characters!<br>Please insert only charachers and numbers!";
function fI(bn) {
    if (bn.match(/^[a-zA-Z0-9]+$/))
        return true;
    else
        return false;
};
var T = "";
var ap;
var cC = 0;
var bi = "";
var cF;
function fh() {
    if (typeof (window.localStorage) != 'undefined') {
        bi = window.localStorage.getItem("ds_username");
        if (bi == null)
            bi = "";
    }
};
function fP() {
    if (typeof (window.localStorage) != 'undefined') {
        bi = T;
        window.localStorage.setItem("ds_username", bi);
    }
};
function fL() {
    if (cC == 0) {
        cC = 1;
        B("ng");
        B("hi");
        B("ti");
        fh();
        par_score = L;
        par_level = aL;
        par_game = bs;
        ds_HS();
        var aO = '<center><font color=\'#ff0000\'><b>' + fy + '</b></font><br><br><font color=\'#ffff00\'>' + L + '</font>';
        if (ac == gm) {
            //aO += '<br><br>' + fY + '<input style\'font-size:' + (14 * f) + 'px;\' type=text id=\'user\' name=\'user\' size=\'12\' value=\'' + bi + '\' style=\'font-size:' + (16 * f) + 'px;\' /><input type=\'button\'  value=\'OK\'  ' + P + '=\'go()\' style=\'background-color:#dddddd;font-size:' + (16 * f) + 'px;\' /><br><br><small><font color=\'#bfffff\'>' + fJ + '</font></small></center>';
            document.getElementById("hs").innerHTML = aO;
            t("hs", 0, 0, 200);
            t('co', 0, 0, 200);
            o("hs", K - (document.getElementById('hs').offsetWidth >> 1), 48 * f);
            o('co', K - (document.getElementById('co').offsetWidth >> 1), 150 * f);
        } else if (ac == gq) {
            document.getElementById('su').innerHTML = '<img ' + Q + '=\'cp();\' src=\'' + bv + '\' >';
            t('su', 0, 0, 200);
            o('su', K - (document.getElementById('su').offsetWidth >> 1), 220 * f);
            document.getElementById("hs").innerHTML = aO;
            t("hs", 0, 0, 200);
            t('co', 0, 0, 200);
            o("hs", K - (document.getElementById('hs').offsetWidth >> 1), 48 * f);
            o('co', K - (document.getElementById('co').offsetWidth >> 1), 150 * f);
        } else if (ac == gn) {
            bm();
        } else if (ac == gr) {
            aO += ds_SHS();
            document.getElementById("hs").innerHTML = aO;
            t("hs", 0, 0, 200);
            t('co', 0, 0, 200);
            o("hs", K - (document.getElementById('hs').offsetWidth >> 1), 48 * f);
            o('co', K - (document.getElementById('co').offsetWidth >> 1), 150 * f);
        } else if (ac == ar) {
            if (R == 1) {
                ap = L;
                document.getElementById('su').innerHTML = '<img ' + Q + '=\'cp();\' src=\'' + bv + '\' >';
                t('su', 0, 0, 200);
                o('su', K - (document.getElementById('su').offsetWidth >> 1), 220 * f);
                t('f_p0', 0, 0, 200);
                o('f_p0', K - (document.getElementById('f_p0').offsetWidth >> 1), 130 * f);
                t('f_n0', 0, 0, 200);
                o('f_n0', K - (document.getElementById('f_n0').offsetWidth >> 1), 190 * f);
                t("f_lo", 0, 0, 11);
                o("f_lo", K - (cg("f_lo") >> 1), 2 * f);
            } else
                aO = "<br><br><br><br><br><br><br><br><br>Please <b>LOGIN WITH FACEB" + "OOK</b> to submit your Score";
                document.getElementById("hs").innerHTML = aO;
                t("hs", 0, 0, 200);
                t('co', 0, 0, 200);
                o("hs", K - (document.getElementById('hs').offsetWidth >> 1), 48 * f);
                o('co', K - (document.getElementById('co').offsetWidth >> 1), 150 * f);
        }
    }
};
function cp() {
    if (ey) {
        aw = new fn();
        fr();
    } else {
        bm();
        var ah = aP + '&hi=2&fb=' + R + '&n=' + T + '&s=' + ap + '&bR=' + bk + '&r=1';
        if (ac == ar) {
            ah = aP + '&hi=2&fb=' + R + '&n=' + eh(T) + '&s=' + ap + '&bR=' + bk + '&r=1&i=' + cF;
            location.href = ah;
        } else if (cB == 0)
        ;
        else
            location.href = ah;
    }
};
function go() {
    var cv = document.getElementById('user').value;
    T = cv;
    if ((cv.length > 3) && fI(cv)) {
        fP();
        ap = L;
        bk = T.charAt(1) + am(9) + (ap * 89) + am(9) + T.charAt(3) + 'fc1' + am(9) + T.charAt(0) + am(9) + T.charAt(1) + '4z3' + (ap * 7) + '3247z11';
        if (cB == 0) {
            var ah = aP + '&hi=2&n=' + T + '&s=' + ap + '&bR=' + bk + '&r=1';
            document.getElementById('su').innerHTML = '<a href="' + ah + '"><img ' + Q + '=\'cp();\' src=\'' + bv + '\' border=0></a>';
        } else
            document.getElementById('su').innerHTML = '<img ' + Q + '=\'cp();\' src=\'' + bv + '\' >';
        t('su', 0, 0, 200);
        o('su', K - (document.getElementById('su').offsetWidth >> 1), 220 * f);
    }
};
function eh(dc) {
    dc = (dc + '').toString();
    return encodeURIComponent(dc).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};
function bm() {
    bV = (60 * f);
    for (i = 0; i < 100; i++)
        window.scroll(0, 1);
    cC = 0;
    B("su");
    B("co");
    B("hs");
    t("ti", 0, 0, 1);
    o("ti", 0, 0);
    t("ng", 0, 0, 11);
    o("ng", -1000, -1000);
    if (aW) {
        t("hi", 0, 0, 11);
        o("hi", -1000, -1000);
    }
    if (ac == ar) {
        B("f_n0");
        B("f_p0");
        t("f_li", 0, 0, 11);
        o("f_li", -1000, -1000);
        t("f_lo", 0, 0, 11);
        o("f_lo", -1000, -1000);
        t("f_ba", 0, 0, 10);
        o("f_ba", 0, D - 42 * f);
    }
    ab = cD;
    Gamehub.Score.submitHide(L);
};
var eA;
var U;
var aA;
var aM;
var bl;
var eu;
var dh;
var eH = 0.1 * f;
var bG;
var hK;
var hN = 0.25;
function bt() {
    if ((g == al) || bL)
        return;
    if ((aZ) && (g != al))
        window.event.preventDefault();
    if ((g == be) || (g == bf) || ((g == af) && (M == 3)))
        e = window.event.touches[0];
    else
        e = window.event;
    if (e.clientX) {
        var eD = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        aM = ((eD - ((F - r * I) / 2)) / I) - (bl >> 1);
    } else {
        aM = ((e.pageX - ((F - r * I) / 2)) / I) - (bl >> 1);
    }

    if (aM > r)
        aM = r;
    else if (aM < 0)
        aM = 0;
};
var bZ;
var ei;
function fg() {
    if (bZ <= 0) {
        aL++;
        ca();
        cP(bM * 10);
        ab = dE;
        return;
    }
    if (ei++ == 120)
        B("ba");
    fA();
    if (ag == bb) {
        bG = (aM - U) * eH;
        U += bG;
        if (U < 0) {
            U = 0;
            bG = 0;
        } else if (U > r - bl) {
            U = r - bl;
            bG = 0;
        }
        aj = aX - ad;
        an = bu - V;
        if (Math.abs(bG) > 0.2)
            cb(fH, U, aA);
        else {
            aY = 0;
            cb(eo, U, aA);
        }
    } else {
        aY = 0;
        cb(eo, U, aA);
    }
    if (g == ae)
        ee('ten', an + V, aj + ad, aC);
    else
        ee('ten', an, aj, aC);
    for (i = 0; i < aH; i++)
        fs(i);
    t("s1", 2 + eU, 2, 1001);
};
function hz(d, xx, l, bI, v) {
    if (M == 1)
        document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + l + "px) rotate(" + bI + "rad) scale(" + v + ",1)";
    else if (M == 3) {
        document.getElementById(d).style.left = xx;
        document.getElementById(d).style.top = l;
        document.getElementById(d).style.webkitTransform = "rotate(" + bI + "rad) scale(" + v + ",1)";
    } else
        document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + l + "px,0px) rotate(" + bI + "rad) scale(" + v + ",1)";
};
var ce;
var aJ = new Array();
var aK = new Array();
var aU = new Array();
var bo = new Array();
var ba = new Array();
var an;
var aj;
var cN = 0;
var cL = 1;
var bb = 2;
var ZOOM = 3;
var hE;
var ag;
var aC;
var bd;
var bW;
var cY;
var dir;
var bE;
var bF;
var bS;
var bX;
var aX;
var bu;
var V;
var ad;
var dA;
var dw;
var cH;
var fv = new Array(36 * f, 52 * f, 70 * f, 87 * f, 36 * f, 52 * f, 70 * f, 87 * f);
var fo = new Array(2, 4, 6, 8, -2, -4, -6, -8);
var eC = new Array(10, 20, 40, 80, 0, 0, 0, 0);
var bT = new Array();
var ek = new Array();
function ec() {
    bw = 1;
    bE = 18 * f;
    bF = 44 * f;
    bl = 73 * f;
    eu = 77 * f;
    dh = bl >> 1;
    dA = 36 * f;
    dw = 25 * f;
    cH = 100 * f;
    aA = cH - (76 * f);
    V = dA >> 1;
    ad = dw >> 1;
    U = aM = (r >> 1) - dh;
    hF = 0;
    eA = (1 + Math.floor((aL + 1) / 6)) * f;
    document.getElementById('bka').src = ci;
    document.getElementById('bkb').src = cc;
    t("bka", -1000, -1000, 1);
    t("bkb", -1000, -1000, 1);
    document.getElementById('bka').src = cs;
    document.getElementById('bkb').src = ct;
    t("bka", -1000, -1000, 1);
    t("bkb", -1000, -1000, 1);
    document.getElementById('bka').src = cu;
    document.getElementById('bkb').src = cy;
    t("bka", -1000, -1000, 1);
    t("bkb", -1000, -1000, 1);
    ca();
    ce = (aL % 3);
    if (ce == 1) {
        document.getElementById('bka').src = ci;
        document.getElementById('bkb').src = cc;
    } else if (ce == 2) {
        document.getElementById('bka').src = cs;
        document.getElementById('bkb').src = ct;
    } else {
        document.getElementById('bka').src = cu;
        document.getElementById('bkb').src = cy;
    }
    cT = 0;
    dR = 0;
    aY = 0;
    t("bka", 0, 0, 1);
    t("bkb", 0, 0, 1);
    o("bkb", 0, cH);
    if (aL == 1)
        t("ba", K - (document.getElementById('ba').offsetWidth >> 1), (68 * f), 2);
    ei = 0;
    for (i = 0; i < 8; i++) {
        t("spr" + i, 0, 0, 10);
        o('spr' + i, -1000, -1000);
    }
    bZ = 0;
    aH = 4 + aL;
    if (aH > 20)
        aH = 20;
    for (var i = 0; i < aH; i++) {
        for (var cI = 0; cI < 8; cI++) {
            document.getElementById('bou' + i).src = aE[9 + cI];
            t("bou" + i, -1000, -1000, 10);
        }
    }
    for (i = 0; i < aH; i++) {
        t("bou" + i, 0, 0, 10);
        if (i == 0)
            aU[i] = am(4);
        else
            aU[i] = am(8);
        bo[i] = fv[aU[i]];
        bT[i] = fo[aU[i]];
        ek[i] = eC[aU[i]];
        aJ[i] = am(r - bo[i]);
        aK[i] = (r >> 1) + am(D - (r >> 1) - bo[i]);
        ba[i] = 1;
        document.getElementById('bou' + i).src = aE[9 + aU[i]];
        o('bou' + i, aJ[i], aK[i]);
        bQ('bou' + i, 1);
        if (aU[i] < 4)
            bZ++;
    }
    cY = 2;
    ag = bb;
    cj = 0;
    aC = 0;
    an = U + bE;
    aj = aA + bF;
    t("ten", 0, 0, 11);
    document.getElementById("li").style.visibility = "visible";
    document.getElementById("li").style.zIndex = 10;
    ab = dF;
    clearInterval(bH);
    bH = null;
    cr = 0;
    as = 64 - (aL * 4);
    if (as < 20)
        as = 20;
    dz = (new Date()).getTime();
    bH = setInterval('cl(' + as + ')', 1000);
    if (as < 10)
        document.getElementById("en").innerHTML = "TIME: 0" + as;
    else
        document.getElementById("en").innerHTML = "TIME: " + as;
    t("en", r - document.getElementById("en").offsetWidth - 2, 2, 1001);
};
function fp(d) {
    if (Math.abs(aJ[d] - (bd - V)) < ((bo[d] >> 1) + V) && Math.abs(aK[d] - (bW - ad) + 12) < ((bo[d] >> 1) + ad)) {
        return (1)
    } else
        return (0);
};
function fs(d) {
    if (ba[d] == 1) {
        if ((ag == cN) && (fp(d))) {
            ag = cL;
            ba[d] = 2;
            cj = Math.floor(bo[d] / 10);
        }
    } else if (ba[d] == 2) {
        aJ[d] = bd;
        aK[d] = bW;
        if (ag == ZOOM) {
            ba[d] = 3;
            cP(ek[d]);
            cr += bT[d];
            if (bT[d] < 0)
                document.getElementById("t1").innerText = "" + bT[d];
            else {
                document.getElementById("t1").innerText = "+" + bT[d];
                bZ--;
            }
            t("t1", aJ[d], aK[d], 100);
        }
        o('bou' + d, aJ[d], aK[d]);
    } else if (ba[d] == 3) {
        if (ag == bb) {
            ba[d] = 0;
            aJ[d] = -1000;
            aK[d] = -1000;
            ag = bb;
        }
        bQ('bou' + d, 2 - bw);
        da('bou' + d, aJ[d], aK[d], bw);
    }
};
function fA() {
    switch (ag) {
    case bb:
        aC += cY;
        if (aC == 80 || aC == -80) {
            cY *= -1;
        }
        bX = U + bE + V;
        bS = aA + bF + ad;
        bu = bX - (25 * f) * Math.sin((aC) * 0.0174532925);
        aX = bS + (25 * f) * Math.cos((aC) * 0.0174532925);
        var dS = (bu - bX);
        var dN = (aX - bS);
        var dD = Math.sqrt((dS * dS) + (dN * dN));
        var eE = (bu - bX) / dD;
        var eF = (aX - bS) / dD;
        de(bX, bS, bu + eE, aX + eF);
        break;
    case cN:
        cj = 0;
        an += 10 * f * Math.cos(dir);
        aj += 10 * f * Math.sin(dir);
        bd = an + V * Math.cos(dir);
        bW = aj + ad * Math.sin(dir);
        if ((bW > D) || (bd < - V) || (bd > r - V)) {
            ag = cL;
        }
        de(U + bE + V, aA + bF + ad, an + V, aj + ad - 4 * f);
        break;
    case cL:
        bd = an + V * Math.cos(dir);
        bW = aj + ad * Math.sin(dir);
        an -= (10 * f - cj) * Math.cos(dir);
        aj -= (10 * f - cj) * Math.sin(dir);
        if (aj < aX - ad) {
            aj = aX - ad;
            an = bu - V;
            ag = ZOOM;
        }
        de(U + bE + V, aA + bF + ad, an + V, aj + ad - 4 * f);
        break;
    case ZOOM:
        bw += 0.1;
        if (bw >= 2) {
            bw = 1;
            ag = bb;
            B("t1");
        }
        break;
    }
};
var bw;
function cR() {
    if (ag == bb) {
        dir = (aC + 90) * 0.0174532925;
        ag = cN;
    }
};
function de(az, aB, aQ, aG) {
    if (aQ < az) {
        var cV = az;
        az = aQ;
        aQ = cV;
        cV = aB;
        aB = aG;
        aG = cV;
    }
    var au = document.getElementById("li");
    var length = Math.sqrt((az - aQ) * (az - aQ) + (aB - aG) * (aB - aG));
    au.style.width = length + "px";
    if (g == ae) {
        au.style.top = (aG > aB) ? aB + "px" : aG + "px";
        au.style.left = az + "px";
        var dv = (aQ - az) / length;
        var du = (aG - aB) / length;
        au.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + dv + ", M12=" + -1 * du + ", M21=" + du + ", M22=" + dv + ")";
    } else {
        var cz = Math.atan((aG - aB) / (aQ - az));
        au.style.top = aB + 0.5 * length * Math.sin(cz) + "px";
        au.style.left = az - 0.5 * length * (1 - Math.cos(cz)) + "px";
        au.style.msTransform = au.style.MozTransform = au.style.WebkitTransform = au.style.OTransform = "rotate(" + cz + "rad)";
    }
};
var bH = null;
var dz = 0;
var cr = 0;
var as;
var bM;
function cl(as) {
    var no = (new Date()).getTime();
    var dC = Math.floor((no - dz) / 1000);
    var bJ = "";
    bM = Math.floor(cr + as - dC);
    if (dC >= as + cr) {
        fO();
        return;
    } else {
        if (bM < 10)
            bJ = "TIME: 0" + bM;
        else
            bJ = "TIME: " + bM;
    }
    document.getElementById("en").innerHTML = bJ;
};
function fO() {
    clearInterval(bH);
    bH = null;
    bJ = "TIME: 00";
    document.getElementById("en").innerHTML = bJ;
    ab = dm;
    var di = 0;
    var dr = 0;
    di = K - (document.getElementById("g1").offsetWidth >> 1);
    dr = gV - (document.getElementById("g1").offsetHeight >> 1);
    t("g1", di, dr, 1001);
    B("t1");
    aY = 0;
};
var eo = 0;
var fH = 10;
var fG = 20;
var ep = new Array(0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 2, 2, 3, 3, 0, 0, -1, -1, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, -1, -1);
var cT = 0;
var dR = 0;
var aY = 0;
function cb(pos, fR, eS) {
    var en = pos + aY;
    var dB = ep[en];
    o("spr" + cT, -1000, -1000);
    o("spr" + dB, fR, eS);
    dR = cT = dB;
    aY++;
    if (ep[en + 1] == -1) {
        aY = 0;
        return 1;
    }
    return 0;
};
function cW() {
    for (i = 0; i < 100; i++)
        window.scroll(0, 1);
    if (aZ) {
        F = window.innerWidth;
        ai = window.innerHeight;
    } else {
        F = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        ai = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    }
    if (F / ai > r / (D)) {
        I = ai / (D);
    } else {
        I = F / (r);
    }
    document.getElementById("all").style.clip = "rect(0px," + r + "px," + (D) + "px,0px)";
    if ((F < ai) && ((g == bf) || (g == af) || (g == be) || bL))
        ef("all", 0, 0, F / (r), ai / (D));
    else
        da("all", ((F - r * I) / 2), 0, I);
    if (cS) {
        if (par_ad2)
            bV = (60 * f) / I;
        else
            bV = (60 * f);
        par_adx2 = ((F - r) / 2);
        par_adx3 = ((F - r * I) / 2);
        par_adx4 = ((F - r * I) / 2) + (r * I);
    }
};
function ed() {
    var eG = new Date();
    var eZ = eG.getTime();
    fx();
    var eV = new Date();
    var eW = eV.getTime();
    db = ax - (eW - eZ);
    if (db < 10)
        db = 10;
    cG = setTimeout('ed()', db);
};
var cG;
function test() {
    if (cG)
        clearTimeout(cG);
    if ((g == af) && (eK))
    ;
    else
        document.body.style.overflow = 'hidden';
    if ((g != 3) && (g != 6))
        document.addEventListener(cf, fz, false);
    for (i = 0; i < 200; i++)
        window.scroll(0, 1);
    cW();
    ab = cA;
    document.body.style.backgroundColor = "#000000";
    ed();
};
function fQ() {
    if ((g == af) && (eY))
        window.location.reload();
    cW();
};
window.onorientationchange = fQ;
window.onresize = cW;
window.onload = test;

/**/
//function ckMobile(a,b){if(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))window.location=b}
//ckMobile(navigator.userAgent||navigator.vendor||window.opera,'http://www.59600.com/games/mobile');