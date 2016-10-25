function rtalt() {
	0 == window.orientation && ( - 1 == navigator.userAgent.indexOf("Android") || 425 > window.innerHeight && 2 > window.devicePixelRatio) && setTimeout(scrollTo, 100, 0, 1)
}
function didShare(e, t) {}
function lcir(e, t) {
	for (var n = 0,
	r = 0,
	i = 0,
	n = 0; 12 > n; n++) r = ldri + n,
	12 < r && (r -= 12),
	ctx.beginPath(),
	ctx.lineWidth = 2,
	ctx.strokeStyle = "#FFFFFF",
	ctx.globalAlpha = r / 10,
	ctx.moveTo(e + 8 * Math.cos(i), t + 8 * Math.sin(i)),
	ctx.lineTo(e + 15 * Math.cos(i), t + 15 * Math.sin(i)),
	ctx.stroke(),
	i += .5225;
	ctx.globalAlpha = 1;
	ldri--;
	1 > ldri && (ldri = 12)
}
function lding() {
	ctx.clearRect(0, 0, 320, 416);
	lcir(160, 292)
}
function ralp2() {
	lps += ranlp;
	1 < lps && 0 < s && (lps--, lp())
}
function ralp() {
	ralp2();
	window.requestAnimationFrame(ralp)
}
function gst() {
	clearInterval(ldlp);
	ctx.clearRect(0, 0, 320, 416);
	s = 0;
	rlok = 1;
	spt(64, 59, 266);
	setTimeout(scrollTo, 200, 0, 1)
}
function lp2() {
	setTimeout("lp2()", 0);
	var e = Date.now();
	35 < e - utm && 1 == rlok && (rlok = 0, lp(), utm = e)
}
function gsts() {
	gldt++;
	3 < gldt && setTimeout("gst();", 200)
}
function asd() {
	var e = Math.floor(window.innerWidth / 3.2) / 100;
	document.body.style.webkitTransformOrigin = "0 0";
	document.body.style.webkitTransform = "scale(" + e + "," + e + ")";
	wdpr = e;
	setTimeout(scrollTo, 100, 0, 1)
}
function init() {
	s = -1;
	var e = navigator.userAgent;
	dvid = 0; - 1 < e.indexOf("Android") && (dvid = 1, 4 <= Math.floor(navigator.userAgent.substr(e.indexOf("Android") + 8, 1)) && (dvid = 2)); - 1 < e.indexOf("iPad") && (dvid = 3); - 1 < e.indexOf("iPhone") && (dvid = 4, 2 <= window.devicePixelRatio && (dvid = 5, 568 == window.screen.height && (dvid = 5)));
	wdpr = 1;
	chf2.innerHTML = '<canvas id="gcvs" width="320" height="416"></canvas>';
	canvas = document.getElementById("gcvs");
	ctx = canvas.getContext("2d");
	canvas.addEventListener("touchstart", tev1, !1);
	canvas.addEventListener("touchend", tev2, !1);
	canvas.addEventListener("touchmove", tev3, !1);
	canvas.addEventListener("touchcancel", tev4, !1);
	canvas.addEventListener("gesturestart", tev4, !1);
	canvas.addEventListener("gesturechange", tev4, !1);
	canvas.addEventListener("gestureend", tev4, !1);
	canvas.addEventListener("mousedown", tev11, !1);
	canvas.addEventListener("mouseup", tev22, !1);
	canvas.addEventListener("mousemove", tev33, !1);
	tm = lps = gldt = 0;
	mt = -1;
	flt = 0;
	ix = [0, 0, 32, 64, 96, 128, 168, 208, 248, 0, 33, 66, 99, 132, 150, 168, 132, 150, 168, 186, 204, 222, 186, 204, 222, 0, 0, 0, 240, 240, 260, 260, 0, 31, 95, 159, 223, 700, 670, 670, 287, 0, 260, 0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 0, 670, 670, 0, 0, 626, 648, 0, 298, 0, 288, 320, 0, 0, 670, 702, 734, 670, 702, 734, 670, 702, 734, 670, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 702, 0, 0, 0, 0, 0, 320, 0];
	iy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 42, 42, 42, 40, 40, 40, 58, 58, 58, 40, 40, 40, 58, 58, 58, 76, 127, 144, 40, 57, 231, 248, 280, 280, 280, 280, 280, 295, 234, 295, 280, 321, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 355, 0, 139, 504, 225, 0, 0, 170, 40, 425, 0, 263, 0, 0, 333, 333, 333, 380, 380, 380, 427, 427, 427, 474, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 474, 0, 0, 0, 0, 0, 0, 459];
	iw = [0, 32, 32, 32, 32, 40, 40, 40, 40, 33, 33, 33, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 290, 320, 294, 58, 48, 58, 58, 31, 64, 64, 64, 64, 44, 80, 30, 31, 320, 50, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 310, 113, 110, 308, 260, 22, 22, 260, 17, 320, 28, 202, 0, 0, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 76, 0, 0, 0, 0, 0, 306, 320];
	ih = [0, 42, 42, 42, 42, 35, 35, 35, 35, 34, 34, 34, 34, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 51, 17, 9, 17, 9, 17, 17, 41, 41, 41, 41, 41, 24, 61, 32, 41, 34, 78, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 70, 139, 95, 40, 55, 520, 520, 55, 20, 34, 36, 57, 0, 0, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 48, 0, 0, 0, 0, 0, 263, 45];
	askb = 0;
	for (var e = document.URL.substr(0, 19), t = n = 0, n = 7; 19 > n; n++) t += e.charCodeAt(n);
	askb = 1;
	e = navigator.language; - 1 < document.URL.indexOf("page") ? (e = ["title_jmp_nolink.jpg", "cs_jmp.gif", "cs_jmp_bg.jpg", "cs_jmp_nolink.png"], canvas.style.backgroundImage = "url(skj/title_jmp_nolink.jpg)", shms1 = "Browser game[SKY JUMP] SCORE=", shms2 = "Browser game[SKY JUMP]", shms3 = "Why don't you get useful tips by sharing this game to your friends?", shms4 = "Why don't you get useful items by sharing this game to your friends?") : -1 < e.indexOf("ja") ? (e = ["title_jmp_jp.jpg", "cs_jmp.gif", "cs_jmp_bg.jpg", "cs_jmp_jp.png"], canvas.style.backgroundImage = "url(skj/title_jmp_jp.jpg)", shms1 = "VuEUQ[uSKY JUMPv SCORE=", shms2 = "VuEUQ[uSKY JUMPv", shms3 = "FBQ[VFAāATIPSQbg悤I", shms4 = "FBQ[VFAāAACeQbg悤I") : (e = ["title_jmp.jpg", "cs_jmp.gif", "cs_jmp_bg.jpg", "cs_jmp.png?d"], canvas.style.backgroundImage = "url(skj/title_jmp.jpg)", shms1 = "Browser game[SKY JUMP] SCORE=", shms2 = "Browser game[SKY JUMP]", shms3 = "Why don't you get useful tips by sharing this game to your friends?", shms4 = "Why don't you get useful items by sharing this game to your friends?");
	img0 = new Image;
	img0.src = "skj/" + e[0];
	img0.onload = function() {
		gsts()
	};
	img1 = new Image;
	img1.src = "skj/" + e[1];
	img1.onload = function() {
		gsts()
	};
	img2 = new Image;
	img2.src = "skj/" + e[2];
	img2.onload = function() {
		gsts()
	};
	img7 = new Image;
	img7.src = "skj/" + e[3];
	img7.onload = function() {
		gsts()
	};
	bx = [];
	by = [];
	bc = [];
	cbx = [0, 0, 49, 98];
	e = document.createElement("canvas");
	e.width = 320;
	e.height = 416;
	bcv2 = e.getContext("2d");
	fani1 = [89, 205, 1, 191, 200, 1, 89, 192, 1, 191, 200, 1, 89, 181, 1, 191, 200, 1, 89, 174, 1, 191, 200, 1, 120, 166, 1, 89, 170, 1, 191, 200, 1, 120, 161, 1, 89, 168, 1, 191, 200, 1, 120, 158, 1, 89, 177, 1, 191, 200, 1, 120, 155, 1, 89, 182, 1, 191, 197, 1, 120, 154, 1, 89, 184, 1, 191, 194, 1, 120, 153, 1, 89, 177, 1, 191, 192, 1, 120, 159, 1, 89, 175, 1, 191, 190, 1, 120, 162, 1, 89, 177, 1, 191, 190, 1, 120, 164, 1, 89, 178, 1, 191, 196, 1, 120, 161, 1, 89, 178, 1, 191, 199, 1, 120, 160, 1, 89, 178, 1, 191, 200, 1, 120, 162, 1, 89, 178, 1, 191, 198, 1, 120, 163, 1, 89, 178, 1, 191, 197, 1, 120, 163, 1, 89, 178, 1, 191, 199, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 89, 178, 1, 191, 200, 1, 120, 163, 1, 86, 180, .99, 186, 201, .99, 116, 164, .99, 77, 186, .96, 173, 203, .96, 105, 169, .96, 64, 199, .9, 152, 207, .9, 87, 177, .9, 50, 220, .82, 122, 216, .82, 63, 193, .82, 37, 250, .73, 86, 235, .73, 37, 219, .73, 26, 288, .61, 49, 268, .61, 14, 258, .61, 18, 334, .46, 20, 320, .46, -3, 309, .46, 14, 387, .3, 8, 388, .3, -10, 370, .3];
	fanf1 = [39, 37, 38];
	fani2 = [5, 150, 0, 106, 151, 0, 321, 72, 1, 5, 150, .11, 106, 151, .2, 321, 72, 1, 5, 150, .22, 106, 151, .4, 321, 72, 1, 5, 150, .33, 106, 151, .6, 321, 72, 1, 5, 150, .45, 106, 151, .8, 321, 72, 1, 5, 150, .55, 106, 151, 1, 149, 72, 0, 5, 150, .67, 101, 151, 1, 158, 72, .36, 5, 150, .78, 96, 151, 1, 166, 72, .64, 5, 150, .89, 91, 151, 1, 171, 72, .84, 5, 150, 1, 86, 151, 1, 174, 72, .96, 5, 150, 1, 81, 151, 1, 175, 72, 1, 5, 150, 1, 77, 151, 1, 171, 72, 1, 5, 150, 1, 72, 151, 1, 159, 72, 1, 5, 150, 1, 67, 151, 1, 165, 72, 1, 5, 150, 1, 62, 151, 1, 167, 72, 1, 5, 150, 1, 57, 151, 1, 167, 72, 1, 5, 150, 1, 52, 151, 1, 167, 72, 1, 5, 150, 1, 57, 151, 1, 167, 72, 1, 5, 150, 1, 62, 151, 1, 167, 72, 1, 5, 150, 1, 67, 151, 1, 167, 72, 1, 5, 150, 1, 72, 151, 1, 167, 72, 1, 5, 150, 1, 77, 151, 1, 167, 72, 1, 5, 150, 1, 81, 151, 1, 167, 72, 1, 5, 150, 1, 86, 151, 1, 167, 72, 1, 5, 150, 1, 91, 151, 1, 167, 72, 1, 5, 150, 1, 96, 151, 1, 167, 72, 1, 5, 150, 1, 101, 151, 1, 167, 72, 1, 5, 150, 1, 106, 151, 1, 167, 72, 1, 5, 150, 1, 110, 151, 1, 167, 72, 1, 5, 150, 1, 115, 151, 1, 167, 72, 1, 5, 150, 1, 119, 151, 1, 167, 72, 1, 5, 150, 1, 123, 151, 1, 167, 72, 1, 5, 150, 1, 128, 151, 1, 167, 72, 1, 5, 150, 1, 132, 151, 1, 167, 72, 1, 5, 150, 1, 137, 151, 1, 167, 72, 1, 5, 150, 1, 141, 151, 1, 167, 72, 1, 5, 150, 1, 145, 151, 1, 167, 72, 1, 5, 150, 1, 150, 151, 1, 167, 72, 1, 5, 150, 1, 154, 151, 1, 167, 72, 1, 5, 150, 1, 150, 151, 1, 167, 72, 1, 5, 150, 1, 145, 151, 1, 167, 72, 1, 5, 150, 1, 141, 151, 1, 167, 72, 1, 5, 150, 1, 137, 151, 1, 167, 72, 1, 5, 150, 1, 132, 151, 1, 167, 72, 1, 5, 150, 1, 128, 151, 1, 167, 72, 1, 5, 150, 1, 123, 151, 1, 167, 72, 1, 5, 150, 1, 119, 151, 1, 167, 72, 1, 5, 150, 1, 115, 151, 1, 167, 72, 1, 5, 150, .94, 110, 151, 1, 167, 72, 1, 5, 150, .88, 106, 151, 1, 167, 72, 1, 5, 150, .81, 106, 151, .93, 167, 72, 1, 5, 150, .75, 106, 151, .86, 167, 72, 1, 5, 150, .69, 106, 151, .79, 167, 72, 1, 5, 150, .63, 106, 151, .71, 167, 72, 1, 5, 150, .56, 106, 151, .64, 167, 72, .9, 5, 150, .5, 106, 151, .57, 167, 72, .8, 5, 150, .44, 106, 151, .5, 167, 72, .7, 5, 150, .38, 106, 151, .43, 167, 72, .6, 5, 150, .31, 106, 151, .36, 167, 72, .5, 5, 150, .25, 106, 151, .29, 167, 72, .4, 5, 150, .19, 106, 151, .21, 167, 72, .3, 5, 150, .13, 106, 151, .14, 167, 72, .2, 5, 150, .06, 106, 151, .07, 167, 72, .1, 5, 150, 0, 106, 151, 0, 167, 72, 0];
	fanf1 = [39, 37, 38];
	fanf2 = [53, 54, 55];
	fani3 = [6, -41, 6, -37, 6, -26, 6, -6, 6, 20, 6, 55, 6, 51, 6, 49, 6, 51, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 55, 6, 52, 6, 44, 6, 31, 6, 12, 6, -12, 6, -41];
	fani4 = [30, -56, 1, 30, -50, 1, 30, -31, 1, 30, 0, 1, 30, 43, 1, 30, 98, 1, 30, 166, 1, 30, 165, 1, 30, 160, 1, 30, 162, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, 1, 30, 166, .89, 30, 166, .78, 30, 166, .67, 30, 166, .55, 30, 166, .45, 30, 166, .33, 30, 166, .22, 30, 166, .11, 30, 166, 0];
	fanf4 = 57;
	ux = [];
	uy = [];
	stti2 = stti1 = 1;
	stti3 = 0;
	ranlp = .5;
	bstscr = 0;
	m = 13;
	e = document.cookie;
	n = e.indexOf("st_sky_jmp=") + 11;
	gmsts = 0;
	10 != n && (gmsts = Math.floor(e.substr(n, 1)));
	n = e.indexOf("st_sky_tip=") + 11;
	gtips = 0;
	10 != n && 1 == Math.floor(e.substr(n, 1)) && (gtips = 1);
	stini()
}
function stini() {
	gmovcl = 0;
	mc = 1;
	tipon = 0;
	var e;
	for (e = 0; e < m; e++) bx[e] = 36 * (Math.floor(7 * Math.random()) + 1),
	by[e] = 40 * e,
	10 < e && (by[e] = 40 * (Math.floor(9 * Math.random()) + 1)),
	blchk(e),
	10 < 100 * Math.random() ? bc[e] = 1 : bc[e] = 2;
	mx = tx = 146;
	my = 416;
	mj = -18;
	twy = 56;
	wj = wy = 0;
	wlby = -16;
	cmbc = cmb = 0;
	cef = {};
	cefi = 0;
	pcf = {};
	pcfi = 0;
	bp_f = {};
	bp_fi = 0;
	acmby = -99;
	acmb = acmbj = 0;
	spjpj = spjpy = -99;
	spjpc = -1;
	tch = scr_m = scr_p = spjpa = 0;
	wbgy = 832;
	jbt = jby = jbx = -1;
	jbj = -99;
	jbs = -1;
	aas = 0;
	cimg = img7;
	fvac = fvan = fvcl = fvbs = fvct = 0;
	gmtm = 60;
	aftspj = 0;
	ublx = bx[0];
	brd = sttm = ublc = 0;
	brdc = 800;
	bdy = bdx = -1;
	bdi = 32;
	bdw = bds = bdc = 0;
	bdj = 6;
	fac = fak = -1;
	fak = 2;
	fac = 1;
	fbg = .5;
	spafwt = tan = 0;
	sfcy = 450;
	sfct = 365;
	tcd = 1;
	scc = 0;
	scf = 41
}
function gmovs() {
	bcv2.drawImage(ctx.canvas, 0, 0, 320, 416, 0, 0, 320, 416);
	s = 2;
	tcd = fac = 0;
	scr_m |= 0;
	updateShareScore(scr_m);
	var e = document.cookie,
	t = e.indexOf("rvs_sk_jmp=") + 11;
	10 != t && (e = e.substr(t, e.indexOf("endsjmp") - t), bstscr = Math.floor(e));
	bstscr < scr_m && (bstscr = scr_m, e = new Date, e.setDate(e.getDate() + 730), document.cookie = "rvs_sk_jmp=" + scr_m + "endsjmp; expires=" + e.toGMTString())
}
function tev11(e) {
	mousePos = {
		x: e.layerX,
		y: e.layerY
	};
	Press(mousePos);
	e.preventDefault()
}
function tev1(e) {
	mousePos = {
		x: e.touches[0].pageX,
		y: e.touches[0].pageY
	};
	Press(mousePos);
	e.preventDefault()
}
function Press(e) {
	tch = 1;
	var t = e.x / wdpr | 0;
	switch (s) {
	case 1:
		mv(t);
		break;
	case 0:
		e = e.y / wdpr | 0;
		175 < t && 365 < e ? window.location.href = HOME_PATH: 60 > t && 350 < e ? setTimeout(function() {
			show_share()
		},
		500) : (gmstini(), 6 != dvid ? stm = setTimeout("lp()", 1e3 / stti2) : (window.requestAnimationFrame = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(e, t) {
				window.setTimeout(e, 1e3 / 60)
			}
		} (), ralp()), canvas.style.backgroundImage = "none");
		break;
	case 2:
		f = e.y / wdpr | 0;
		175 < t && 365 < f ? window.location.href = HOME_PATH: 35 < t && 280 < f && t < 155 && f < 325 ? (t = scr_m | 0, scr_m = t = 0, stini(), gmstini()) : 168 < t && 280 < f && t < 286 && f < 325 && setTimeout(function() {
			show_share()
		},
		500)
	}
}
function tev22(e) {
	mousePos = {
		x: e.layerX,
		y: e.layerY
	};
	Release(mousePos)
}
function tev2(e) {
	mousePos = {
		x: e.changedTouches[0].pageX,
		y: e.changedTouches[0].pageY
	};
	Release(mousePos);
	e.preventDefault()
}
function Release(e) {
	tch = 0
}
function tev33(e) {
	mousePos = {
		x: e.layerX,
		y: e.layerY
	};
	Move(mousePos)
}
function tev3(e) {
	mousePos = {
		x: e.touches[0].pageX,
		y: e.touches[0].pageY
	};
	Move(mousePos);
	event.preventDefault()
}
function Move(e) {
	1 == s && mv(e.x / wdpr | 0)
}
function tev4(e) {
	e.preventDefault()
}
function gmstini() {
	stti1 = 1;
	switch (gmsts) {
	case 0:
		stti3 = 0;
		break;
	case 1:
		stti3 = 1;
		fak = -1;
		break;
	case 2:
		stti3 = 2;
		fak = -1;
		break;
	case 3:
		stti3 = 3,
		fak = -1,
		gmtm = 70
	}
	stti2 = 30;
	ranlp = .5;
	s = 1;
	sttm = +(new Date)
}
function mv(e) {
	tx = e - 8;
	4 > tx && (tx = 4);
	310 < tx && (tx = 310)
}
function scs(e, t, n) {
	n = ("0000000000" + n).substr( - 9, 9);
	for (scx = 1; scx <= t; scx++) {
		var r = Math.floor(n.substr(10 - scx - 1, 1)) + 1;
		switch (e) {
		case 1:
			ctx.drawImage(img1, -15 + 16 * r, 0, 15, 26, 72 - 17 * scx, 3, 15, 26);
			break;
		case 2:
			ctx.drawImage(img1, 3 + 10 * r, 82, 10, 16, 258 - 10 * scx, 3, 10, 16);
			break;
		case 3:
			ctx.drawImage(img7, -12 + 12 * r, 153, 12, 16, 40 - 11 * scx, 358, 12, 16);
			break;
		case 98:
			spt(76 + r, 218 - 11 * (scx - 1), 212);
			break;
		case 99:
			spt(66 + r, 228 - 33 * (scx - 1), 146)
		}
	}
}
function spt(e, t, n) {
	var r = iw[e],
	i = ih[e];
	ctx.drawImage(img7, ix[e], iy[e], r, i, t | 0, n | 0, r, i)
}
function spt2(e, t, n) {
	var r = iw[e],
	i = ih[e];
	ctx.drawImage(cimg, ix[e], iy[e], r, i, t | 0, n | 0, r, i)
}
function blchk(e) {
	for (var t, n, r = 0; 16 > r;) {
		for (t = n = 0; t < m; t++) bx[t] == bx[e] && 20 > Math.abs(by[t] - by[e]) && t != e && (bx[e] = 36 * (Math.floor(7 * Math.random()) + 1), n = 1);
		0 == n && (r = 99);
		0 == n && (r = 99);
		r++
	}
}
function rblk(e, t) {
	0 < fvbs && 6 > ublc && -30 < spjpy && 180 > spjpy ? bx[e] = ublx: (bx[e] = 36 * (Math.floor(7 * Math.random()) + 1), bx[e] == ublx && (bx[e] = 36 * (Math.floor(7 * Math.random()) + 1), bx[e] == ublx && (bx[e] = 36 * (Math.floor(7 * Math.random()) + 1))), ublc = 0);
	ublx = bx[e];
	ublc++;
	by[e] -= 440;
	0 < fvbs ? bc[e] = fvcl: 1 == t && (1 < mc ? bc[e] = Math.floor(Math.random() * mc) + 1 : 10 < 100 * Math.random() ? bc[e] = 1 : bc[e] = 2);
	blchk(e)
}
function lp() {
	6 != dvid && 0 < s && (clearTimeout(stm), stm = setTimeout("lp()", 1e3 / stti2));
	var e, t;
	switch (s) {
	case 1:
		wj = (100 - my) * askb;
		1 > wj ? wj = 0 : scr_m += wj / 5;
		37 < wj && (wj = 37);
		1 < stti1 ? ctx.clearRect(19, 0, 301, 416) : ctx.drawImage(img2, 0, wbgy | 0, 286, 399, 17, 0, 286, 399);
		wbgy -= wj / 23;
		0 > wbgy && (wbgy = 0);
		ctx.drawImage(img7, 626, twy | 0, 22, 399, 0, 0, 22, 399);
		ctx.drawImage(img7, 648, twy | 0, 22, 399, 298, 0, 22, 399);
		twy -= wj / 3;
		0 > twy && (twy += 104);
		for (e = m - 1; 0 <= e; e--) by[e] += wj,
		spt2(bc[e] + 4, bx[e], by[e]),
		390 < by[e] && rblk(e, 1); - 1 != sfcy && (sfcy += wj * (0 == scc), spt(scf, 0, sfcy), 323 < my && 0 < mj ? (sfcy = my + 42, 374 < my && (mj = -18, 0 < scc && (scc = 0, sfct = 416))) : (sfcy += (sfct - sfcy) / 5, 416 == sfct && 415 < sfcy && (sfcy = -1)), 0 < scc && scc--);
		if (1 < brd && 4 > brd) switch ( - 99 == spjpj && bdy < my && (bdy += wj), spt(bdi, bdx, bdy), brd) {
		case 2:
			my + 2 * mj < bdy + 50 && (bdx -= 32 == bdi ? 20 : 15, bdy -= 3, brd = 3, bdi = 33, bds = bdx > mx ? 1 : -1);
			break;
		case 3:
			if (bdx += bds, 20 > bdx && (bdx = 20, bds = 1), 236 < bdx && (bdx = 236, bds = -1), bdy -= bdj, bdj *= .993, 3.6 > bdj && (bdj = 3.6), -60 > bdy ? (bdy = -60, bdw++, 160 < bdw && (brd = 4)) : bdw = 0, bdc++, 2 < bdc && (bdc = 0, bdi++, 36 < bdi && (bdi = 33)), 50 > Math.abs(mx + 16 - bdx) && 30 > Math.abs(my - bdy) && 6 > bdj) {
				brd = 0;
				for (var n, r = bdx + 32,
				i = bdy + 20,
				o = 1; 30 > o; o++) n = Math.floor(3 * Math.random()),
				pcf["c" + pcfi] = {
					x: r,
					y: i,
					sx: 20 * -Math.random() + 10,
					sy: 12 * -Math.random(),
					zx: .9 + .06 * n,
					zy: .4 * n + .8,
					t: n,
					c: 0,
					a: 1.5 + 1.5 * Math.random(),
					l: 1,
					kx: bx[e] + 10
				},
				pcfi++;
				pcf["c" + (pcfi - 2)].sx = -10;
				pcf["c" + (pcfi - 1)].sx = 10;
				fac = fak = 1
			}
		} - 99 != acmby && (ctx.drawImage(img1, cbx[acmb], 26, 49, 56, 136, acmby | 0, 49, 56), -99 != acmbj && (acmby += acmbj, acmbj += 3, 1 < acmby && (acmby = 1, acmbj = -acmbj / 3, 3 > Math.abs(acmbj) && (acmbj = -99)), -60 > acmby && (acmbj = acmby = -99, acmb = 0)));
		t = tx - mx;
		mx += t / 10;
		my += (mj + wj) * tcd;
		mj += .6;
		8 < mj && (mj = 8);
		var u = mx - 2,
		a = my + 30,
		f = o = 0;
		if (2 < mj) {
			var l = mj,
			c = 0;
			for (e = 0; e < m; e++) if (22 > Math.abs(bx[e] - u) && by[e] - 10 < a && a < by[e] + 25) {
				a < by[e] && (my = by[e] - 40);
				var h = 0;
				for (n = 0; n < m; n++) bx[e] == bx[n] && by[e] < by[n] && by[e] + 50 > by[n] && e != n && bc[e] == bc[n] && (h = 1); - 99 == spjpj && (mj = 0 == h ? -12 : l);
				cmbc == bc[e] ? (cmb++, acmb = cmb, 1 == cmb && (acmby = -56, acmbj = 3), 3 < cmb ? (aftspj = 1, acmb = 3, mj = -41, cmb = 0, cmbc = -1, acmbj = -20, spjpy = 376, spjpj = -5, spjpc = bc[e] - 1, spjpa = 0) : (bp_f["c" + bp_fi] = {
					x: bx[e],
					y: by[e],
					sx: 0,
					sy: 8,
					zx: .98,
					zy: .8,
					c: bc[e] - 1,
					l: 1
				},
				bp_fi++)) : (cmb = 0, acmbj = -20);
				cmbc = bc[e];
				if (o != bx[e]) {
					r = bx[e] + 12;
					i = by[e] + 9;
					for (o = 1; 14 > o; o++) n = Math.floor(3 * Math.random()),
					pcf["c" + pcfi] = {
						x: r,
						y: i,
						sx: 20 * -Math.random() + 10,
						sy: 7 * -Math.random(),
						zx: .9 + .06 * n,
						zy: .4 * n + .8,
						t: n,
						c: bc[e] - 1,
						a: 1.5 + 1.5 * Math.random(),
						l: 1,
						kx: bx[e] + 10
					},
					pcfi++;
					pcf["c" + (pcfi - 2)].sx = -10;
					pcf["c" + (pcfi - 1)].sx = 10;
					f++
				}
				o = bx[e];
				rblk(e, 0); - 99 == spjpj && (aftspj = 0)
			} else by[e] > c && (c = by[e] | 0); - 99 == spjpj && (1 < f && 0 == h || 0 != o && c < a - 120) && (mj = -20)
		}
		spt(0 < t ? 0 > mj ? 2 : 4 : 0 > mj ? 1 : 3, mx, my);
		if ( - 99 != spjpj && (spafwt = 30, spjpa += .025, 1 < spjpa && (spjpa = 1), ctx.globalAlpha = spjpa, spt(25, 15, spjpy), ctx.globalAlpha = 1, spjpy += spjpj, 200 > spjpy)) for (spjpj -= 5, -55 > spjpy && (spjpj = -99), spjpw = 0, i = spjpy - spjpj, o = 1; 24 > o; o++) pcf["c" + pcfi] = {
			x: 13 * o,
			y: i,
			sx: 8 * Math.random() - 4,
			sy: 3 * -Math.random(),
			zx: .98,
			zy: 1,
			t: Math.floor(3 * Math.random()),
			c: spjpc,
			a: 1.5 + 1.5 * Math.random(),
			l: 1
		},
		pcfi++;
		spt(61, 72, 2);
		ctx.drawImage(img1, 0, 82, 13, 13, 212, 4, 13, 13);
		scs(1, 4, scr_m | 0);
		scs(2, 3, scr_p);
		0 < spafwt && spafwt--;
		scr_m > brdc && 0 == brd && 0 == spafwt && (brdc += 1700, 2500 < brdc && (brdc = 9999), brd = 2, bdx = 160 < mx ? 20 : 236, bdy = 416, bds = 1, bdj = 12);
		switch (fvan) {
		case 0:
			ctx.drawImage(img7, 240, 40, 58, 17, 260, 3, 58, 17);
			0 < fvct && (o = 48 * fvct / 10 | 0, ctx.drawImage(img7, 240, 57, o, 9, 265, 7, o, 9));
			break;
		case - 1 : spt(30, 260, 3);
			fvac++;
			3 < fvac && (fvac = 0, fvan *= -1);
			break;
		case 1:
			spt(31, 260, 3),
			fvac++,
			3 < fvac && (fvac = 0, fvan *= -1)
		}
		spt2(26, 0, 399);
		spt2(42, 6, 338);
		60 < gmtm && spt2(63, 38, 363);
		0 < gmtm && (o = 294 * gmtm / 60 | 0, ctx.drawImage(img7, 0, 144, o, 9, 13, 403, o, 9));
		scs(3, 2, gmtm);
		if (0 < bp_fi) {
			u = 0;
			for (e in bp_f) if (t = bp_f[e], 1 == t.l) if ( - 4 > t.sy && (t.x += (300 - t.x) / 9), t.y += t.sy, t.sy -= 1, spt(t.c + 9, t.x, t.y), 30 > t.y) {
				scr_p++;
				0 == fvbs && fvct++;
				if (9 < fvct) for (fvct = 0, fvbs = 8, fvcl = cmbc, fvan = 1, a = fvac = 0; a < m; a++) for (bc[a] = fvcl, o = 1; 6 > o; o++) pcf["c" + pcfi] = {
					x: bx[a] + 12,
					y: by[a] + 9,
					sx: 12 * Math.random() - 6,
					sy: 3 * -Math.random(),
					zx: .98,
					zy: 1,
					t: Math.floor(3 * Math.random()),
					c: fvcl - 1,
					a: 1.5 + 1.5 * Math.random(),
					l: 1
				},
				pcfi++;
				t.l = 0;
				delete bp_f[e]
			} else u++;
			0 == u && (bp_f = {},
			bp_fi = 0)
		}
		if (0 < pcfi) {
			o = 0;
			for (e in pcf) t = pcf[e],
			1 == t.l && (t.x += t.sx, t.y += t.sy, t.sx *= t.zx, t.sy += t.zy, t.a -= .1, u = t.a, 1 < u && (u = 1), .1 > t.a || 320 < t.x || -18 > t.x || 399 < t.y ? (t.l = 0, delete pcf[e]) : (ctx.globalAlpha = u, spt(13 + 3 * t.c + t.t, t.x, t.y)), o++);
			0 == o && (pcf = {},
			pcfi = 0);
			ctx.globalAlpha = 1
		}
		if ( - 1 != fak) switch (fak) {
		case 1:
			for (e = 0; 3 > e; e++) o = 9 * fac + 3 * e,
			ctx.globalAlpha = fani1[o + 2],
			spt(fanf1[e], fani1[o], fani1[o + 1]);
			fac++;
			33 < fac && (fac = fak = -1, gmtm += 15, mt = -1);
			ctx.globalAlpha = 1;
			break;
		case 2:
			ctx.globalAlpha = fbg;
			ctx.fillStyle = "#FFF";
			ctx.fillRect(0, 0, 320, 416);
			for (e = 0; 3 > e; e++) o = 9 * fac + 3 * e,
			ctx.globalAlpha = fani2[o + 2],
			spt(fanf2[e], fani2[o], fani2[o + 1]);
			fac++;
			53 < fac && (fbg -= .05, 63 < fac && (fac = fak = -1));
			ctx.globalAlpha = 1;
			break;
		case 3:
			o = 2 * (fac | 0),
			spt(56, fani3[o], fani3[o + 1]),
			fac = 15 < fac && 50 > fac ? fac + .5 : fac + 1,
			53 < fac && 61 < fac && (fac = fak = -1)
		}
		374 < my && (1 < stti3 && -1 == sfcy && 62 != scf ? (mj = -18, scf = 62, sfcy = 415, sfct = 365, scc = 30) : 416 < my && (200 > scr_m ? mj = -18 : 4 != fak && (gmovs(), my = 417, fanf4 = 60)));
		tm = Math.floor(( + (new Date) - sttm) / 1e3);
		if (tm != mt && 0 < tm) {
			gmtm -= tcd;
			55 == gmtm && 0 == stti3 && (fak = 3, fac = 0);
			40 == gmtm && 0 == gmsts && (e = new Date, e.setDate(e.getDate() + 730), document.cookie = "st_sky_jmp=1; expires=" + e.toGMTString(), gmsts = 1);
			if (0 < fvbs && (spafwt = 30, fvbs--, 0 == fvbs)) {
				for (a = 0; a < m; a++) 70 < Math.abs(mx - bx[a]) && (bc[a] = Math.floor(Math.random() * mc) + 1);
				fvac = fvan = 0
			}
			flt = 0;
			200 < scr_m && 0 == scc && (mc = 2, sfct = 416, 400 < scr_m && (mc = 3, 1e3 < scr_m && (mc = 4)));
			0 > gmtm && (gmtm = 0, -99 == spjpj && 0 == fvbs && -1 == fak && (gmovs(), fanf4 = 57))
		}
		flt++;
		mt = tm;
		rlok = 1;
		break;
	case 2:
		ctx.drawImage(bcv2.canvas, 0, 0, 320, 416, 0, 0, 320, 416),
		o = 3 * fac,
		102 < o && (o = 102),
		ctx.globalAlpha = fani4[o + 2],
		spt(fanf4, fani4[o], fani4[o + 1]),
		ctx.globalAlpha = 1,
		fac++,
		35 < fac && (45 > fac ? e = .1 * (fac - 35) : (0 == gmovcl && (gmovcl = 1), ctx.drawImage(img2, 0, wbgy | 0, 286, 399, 17, 0, 286, 399), ctx.drawImage(img7, 626, twy | 0, 22, 399, 0, 0, 22, 399), ctx.drawImage(img7, 648, twy | 0, 22, 399, 298, 0, 22, 399), ctx.globalAlpha = .5, ctx.fillStyle = "#000;", ctx.fillRect(0, 0, 320, 416), ctx.globalAlpha = 1, null, null, null, spt(93, 7, 67), spt(94, 0, 371), scs(99, String(scr_m).length, scr_m), scs(98, String(bstscr).length, bstscr), bstscr == scr_m && spt(87, 20, 145), 1 == gtips && spt(90, 75, 296), 1 < gmsts && (spt(90, 185, 296), 2 < gmsts && spt(90, 271, 296)), 1 == tipon && spt(92, 14, 6), e = .1 * (55 - fac), 0 > e && (e = 0)), ctx.globalAlpha = e, ctx.fillStyle = "#000;", ctx.fillRect(0, 0, 320, 416), ctx.globalAlpha = 1)
	}
}
onload = function() {
	ldri = 0;
	ldlp = setInterval("lding();", 50);
	init();
	setTimeout(scrollTo, 400, 0, 1)
};