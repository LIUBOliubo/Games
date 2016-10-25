var page = 2;
var isTouch = "ontouchend" in document ? true : false;
var cwith = 480;
var rest = false;
var ismenuopen = false;
var isgameloaded = false;
var isplaying = false;
var reline = 0;

$.loadImages = function (imageArray, callback) {
    var loadElements = new Array();
    "string" == typeof imageArray && (imageArray = [imageArray]); //if it's a string, make it a single item array of that string
    var imageArrayLength = imageArray.length;
    var imageCounter = 0;
    for (var i = 0; i < imageArrayLength; i++) {
        var tempElement = document.createElement("img");
        tempElement.onload = function () {
            imageCounter++;
            imageCounter == imageArrayLength && $.isFunction(callback) && callback(loadElements); //if last one and callback set, do callback
        };
        tempElement.onerror = function () {
            imageCounter++;
            imageCounter == imageArrayLength && $.isFunction(callback) && callback(loadElements); //if last one and callback set, do callback
        };

        tempElement.src = imageArray[i];
        loadElements.push(tempElement);
    }
}
function gamereset(needoverflow, callback) {
    if (gameTimer) window.clearInterval(gameTimer);
    count = 360;
    nowLevelNo = 1;
    TScore = 0;
    playgame(function () {
        $("#levelName").html(1);
        $("#score").html(0);
        if (needoverflow)
            document.getElementById("main").style.overflow = "visible";
        $("#p1_1").hide();
        blockpagemove();
        $("#p1_2").hide();
        $("#p1_4").hide();
        $("#p1_3").show();
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 1);
        page = 4;
        $.isFunction(callback) && callback();
    });
}
function blockhanlder(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
}
function blockpagemove() {
    document.body.addEventListener('touchmove', blockhanlder);
}
function removeblockpagemove() {
    document.body.removeEventListener('touchmove', blockhanlder);
}
var windowWidth = 0, windowHeight = 0, windowWidthScale = 1, windowHeightScale = 1;
$(window).resize(windowInit);
function windowInit() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    if (windowWidth > windowHeight) {
        $(".sceentip").show().css({ lineHeight: windowHeight + "px" });
        //return;
    } else {
        $(".sceentip").hide();
    if (windowHeight < 800) {
        windowHeight = 800;
        $('html').height(windowHeight);
    } else {
        $('html').height('100%');
    }
    windowWidthScale = windowWidth / 640;
    windowHeightScale = windowHeight / 1136;

    if (windowHeightScale > 1) windowHeightScale = 1;
    $('.zoomh, .zoomh_t, .zoomh_m, .zoomh_b').css({
        'transform': 'scale(' + windowHeightScale + ')', '-o-transform': 'scale(' + windowHeightScale + ')',
        '-moz-transform': 'scale(' + windowHeightScale + ')', '-webkit-transform': 'scale(' + windowHeightScale + ')', '-ms-transform': 'scale(' + windowHeightScale + ')'
    });
    var _tt = windowHeight - 720;
    $('#gamebtn').css({ 'bottom': (_tt - 81) / 2 });
    if (_tt > 120) {
        var _tz = (_tt - 40) / (81 + _tt / 2);
        _tz = _tz > 1.4 ? 1.4 : _tz;
        _tz = _tz < 1 ? 1 : _tz;
        $('#gamebtn').css({
            'transform': 'scale(' + _tz + ')', '-o-transform': 'scale(' + _tz + ')',
            '-moz-transform': 'scale(' + _tz + ')', '-webkit-transform': 'scale(' + _tz + ')', '-ms-transform': 'scale(' + _tz + ')'
        });
    } else if (_tt <= 80) {
        var _tz = _tt / 81 * 0.8;
        _tz = _tz < 0.8 ? 0.8 : _tz;
        $('#gamebtn').css({
            'transform': 'scale(' + _tz + ')', '-o-transform': 'scale(' + _tz + ')',
            '-moz-transform': 'scale(' + _tz + ')', '-webkit-transform': 'scale(' + _tz + ')', '-ms-transform': 'scale(' + _tz + ')'
        });
    } else {
        var _tz = 1;
        $('#gamebtn').css({
            'transform': 'scale(' + _tz + ')', '-o-transform': 'scale(' + _tz + ')',
            '-moz-transform': 'scale(' + _tz + ')', '-webkit-transform': 'scale(' + _tz + ')', '-ms-transform': 'scale(' + _tz + ')'
        });
    }

    $('#pimg3,#pimg4,#content').height(windowHeight);
    }
}
$(document).ready(function () {
    windowInit();
    blockpagemove();
    //$('<audio id="intro"><source src="sound/Intro.ogg" type="audio/ogg"> <source src="sound/Intro.mp3" type="audio/mpeg"><source src="sound/Intro.wav" type="audio/wav"> </audio>').appendTo('body'); //载入声音文件 
    $("#more_game").click(function () {
    	clickMore();
    });
    $("#wechat_sns").click(function () {
        $("#wechat_sns").hide();
    });
    //    $("#wechat_friend").on(isTouch ? 'touchstart' : 'click', function () {
    //        $("#wechat_sns").show();
    //    });
    $("#wechat_friend").click(function () {
        $("#wechat_sns").show();
    });
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 1);
    if (cj && cj.length > 0) {
        $.loadImages(cj, function () {
            setTimeout(function () {
                $("#logo2").animate({ "left": 90 }, 100, '', function () {
                    shake1 = setInterval(function () {
                        $("#logo2").css({ "left": arrayLeft[parseInt(11 * Math.random())], "top": arrayTop[parseInt(11 * Math.random())] });
                    }, 50);

                    $("#logo3").animate({ "left": 95 }, 100, '', function () {
                        shake2 = setInterval(function () {
                            $("#logo3").css({ "left": arrayLeft[parseInt(11 * Math.random())], "top": arrayTop[parseInt(11 * Math.random())] });
                        }, 50);
                        $('#logo1').show();
                        $('#logo1').addClass('scale').animate({ 'top': '236px', 'left': '90px' }, 1000, '');
                    });
                });
                $("#maskloading").hide();
            }, 500);
            setTimeout(function () {
                $("#play").animate({ "top": 850 }, 100, '');
            }, 1900);
        });
    }

    bgCanvas = document.getElementById("bgCanvas"); //道路背景+圆
    liCanvas = document.getElementById("liCanvas"); //道路颜色+线条
    bgContext = bgCanvas.getContext("2d"); //构造画图
    liContext = liCanvas.getContext("2d"); //构造画图
    Sleak = document.getElementById("Sleak"); //断开
    Sforward = document.getElementById("Sforward"); //连接
    bgCanvas.addEventListener("mouseup", moveEnd, false); //添加事件监听
    bgCanvas.addEventListener("touchend", moveEnd, false); //添加事件监听
    bgCanvas.addEventListener("touchcancel", moveEnd, false); //添加事件监听
    intro = document.getElementById("intro");
    menu_click = document.getElementById("menu_click");
    $("#playAgain").click(function () {
        $("#maskloading").show();
        $("#loading_div").show();
        gamereset(true);
    });
    $("#logo1").click(function () {
        //menu_click = document.getElementById("menu_click");
        if (shake1) clearInterval(shake1);
        if (shake2) clearInterval(shake2);
        setTimeout(function () {
            $("#logo3").animate({ "left": 435 }, 200, '', function () {
                $("#logo2").animate({ "left": -295 }, 200, '', function () {
                    intro.play();
                    //menu_click.play();
                    $("#maskloading").show();
                    $("#loading_div").show();
                    gamereset(true);

                });
            });
        }, 100);
        intro.play();

    });
    $("#help").click(function () {
        if (gameTimer) window.clearInterval(gameTimer);
        $("#p1_1").hide();
        $("#p1_3").hide();
        $("#p1_4").hide();
        document.getElementById("main").style.overflow = "visible";
        removeblockpagemove();
        $("#p1_2").show();
        page = 3;
        ismenuopen = false;
        $("#pimg0").css("height", $("#pimg2").height() + "px");
    });
    $("#reset").click(function () {
        reline = 1;
        mkGame(gamesize, level2Arrayf(level2Array[nowLevelNo - 1]), reline);
    });
    $("#continue").click(function () {
        if (page == 3) {
            //menu_click = document.getElementById("menu_click");
            menu_click.play();
            //$("#maskloading").show();
            //$("#loading_div").show();
            document.getElementById("main").style.overflow = "visible";
            $("#p1_1").hide();
            $("#p1_3").show();
            $("#p1_4").hide();
            blockpagemove();
            $("#p1_2").hide();
            if (isandroid) {
                rest = true;
                mkGame_reset();
            }
            gameTimer = setInterval(function () {
                gametick();
            }, 1000);
            //gamereset(true);
        } else if (page == 2) {
            //menu_click = document.getElementById("menu_click");
            menu_click.play();
            document.getElementById("main").style.overflow = "visible";
            $("#maskloading").show();
            $("#loading_div").show();
            gamereset(true);
        }
        window.scrollTo(0, 0);
    });
    $("#play").click(function () {
        if (shake1) clearInterval(shake1);
        if (shake2) clearInterval(shake2);
        setTimeout(function () {
            $("#logo3").animate({ "left": 435 }, 200, '', function () {
                $("#logo2").animate({ "left": -295 }, 200, '', function () {
                    setTimeout(function () {
                        //$("#p1_1").hide();
                        //$("#p1_3").hide();
                        //$("#p1_4").hide();
                        //document.getElementById("main").style.overflow = "visible";
                        //removeblockpagemove();
                        //$("#p1_2").show();
                        //page = 2;

                        document.getElementById("main").style.overflow = "visible";
                        $("#maskloading").show();
                        $("#loading_div").show();
                        gamereset(true);
                    }, 200);
                });
            });
        }, 100);
        //intro = document.getElementById("intro");
        intro.play();
    });
});
function mkGame_reset() {
    mkGame(gamesize, level2Arrayf(level2Array[nowLevelNo - 1]), reline);
    setTimeout(function () {
        for (var i = 0; i < level.length; i++) {
            var NLevel = level[i];
            if (NLevel.line.length > 0) {
                liContext.beginPath()
                var firstBox = NLevel.line[0];
                var secondBox = NLevel.line[NLevel.line.length - 1];
                var FPoint = boxs[NLevel.line[0]].points;
                liContext.moveTo(FPoint[0] + HboxSize, FPoint[1] + HboxSize);
                for (var p = 0; p < NLevel.line.length; p++) {
                    var NBox = boxs[NLevel.line[p]].points;
                    if (NLevel.comp) {
                        liContext.fillStyle = colors_o[i];
                        //liContext.fillRect(NBox[0], NBox[1], boxSize, boxSize);
                        liContext.fillRect(NBox[0] + boxSize * .0625, NBox[1] + boxSize * .0625, boxSize * .875, boxSize * .875);
                    }
                    liContext.lineTo(NBox[0] + HboxSize, NBox[1] + HboxSize);
                }
                liContext.lineWidth = lineSize;
                liContext.lineCap = 'round';
                liContext.lineJoin = "round";
                liContext.strokeStyle = NLevel.color;//填充线路颜色
                liContext.stroke();
                liContext.closePath();
            }
        }
    }, 300);
    anyThing = false;
}
function moveEnd() {
    mouseDown = false;
}

function mkGame(size, levelBoxsA, reline) {
    isplaying = true;
    bgContext.clearRect(0, 0, cwith, cwith);
    liContext.clearRect(0, 0, cwith, cwith);
    bgCanvas.style.visibility = "hidden";
    bgCanvas.offsetHeight;
    bgCanvas.style.visibility = "inherit";
    liCanvas.style.visibility = "hidden";
    liCanvas.offsetHeight;
    liCanvas.style.visibility = "inherit";

    colors_d = ["rgba(166,49,223,0.8)", "rgba(252,133,50,0.8)", "rgba(28,151,211,0.8)", "rgba(00,191,01,0.8)", "rgba(237,57,132,0.8)"];
    colors_o = ["rgba(166,49,223,0.3)", "rgba(252,133,50,0.3)", "rgba(28,151,211,0.3)", "rgba(00,191,01,0.3)", "rgba(237,57,132,0.3)"];
    imgs_d = ["image/game/1/", "image/game/2/", "image/game/3/", "image/game/4/", "image/game/5/"];
    boxSize = cwith / size;//单个BOX大小
    HboxSize = boxSize / 2;//线条居中
    lineSize = boxSize * 33 / 100;//连线的粗细程度
    CircSize = boxSize * 35 / 100;//圆的大小
    if (rest) {

    }
    else {
        level = [];
        boxs = []
        mouseDown = false;
        levelColor = -1;
        oldBox = -1;
        anyThing = false;
        idoArray = 0;
        movesC = 0; //初始化赋值为0步
        if (compArray[idoArray]) {
            if (!compArray[idoArray].split(":")[1]) {
                movesB = "-";
            } else {
                movesB = compArray[idoArray].split(":")[1];
            }
        } else {
            movesB = "-";
        }
        FWSpeed = 1;
        offsetLeft = $(".mainS")[0].offsetLeft + $("#game_screen")[0].offsetLeft;
        offsetTop = $(".mainS")[0].offsetTop + $("#game_screen")[0].offsetTop;

        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {
                boxs.push({
                    state: 0,
                    colorIndex: -1,
                    points: [x * boxSize, y * boxSize, (x + 1) * boxSize, (y + 1) * boxSize]
                });
            }
        }
        if (gameTimer) window.clearInterval(gameTimer);
        if (reline == 0) {
            count = 360;
            $("#timebar").css({ "width": count });
        } else {
            $("#timebar").css({ "width": count });
            reline = 0;
        }
        //count = 360;
        //$("#timebar").css({ "width": count });
        gameTimer = window.setInterval(gametick, 1000);
        levelScore = totalsec * 10;
    }

    //// STR Draw Level \\\\

    levelBoxsA.forEach(function (value, key) {
        bgContext.beginPath();
        if (!rest) {
            level[key] = { line: [], comp: false, color: colors_d[key], img: gameElements[key], box: value, soundState: 0 };
        }
        var box_1 = boxs[value[0]];
        var box_2 = boxs[value[1]];
        box_1.state = 2;
        box_2.state = 2;
        box_1.colorIndex = key;
        box_2.colorIndex = key;
        var arcX_1 = (box_1.points[0])
        var arcY_1 = (box_1.points[1])
        var arcX_2 = (box_2.points[0])
        var arcY_2 = (box_2.points[1])
        bgContext.drawImage(level[key].img[0], arcX_1 + boxSize * .0625, arcY_1 + boxSize * .0625, boxSize * .875, boxSize * .875);
        bgContext.drawImage(level[key].img[2], arcX_2 + boxSize * .0625, arcY_2 + boxSize * .0625, boxSize * .875, boxSize * .875);
    });

    rest = false;
    // END Draw Level \\\\

    if (!isgameloaded) {
        isgameloaded = true;
        if (isTouch) {
            bgCanvas.addEventListener("touchstart", pointerStart, false);
            bgCanvas.addEventListener("touchmove", pointerMove, false);
        } else {
            bgCanvas.addEventListener("mousedown", pointerStart, false);
            bgCanvas.addEventListener("mousemove", pointerMove, false);
        }
        function pointerStart(ev) {
            ev.preventDefault();
            mouseDown = true;
            var evX, evY;
            //console.log(ev);
            if (isTouch) {
                evX = ev.touches.item(0).clientX - offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft || 0);
                evY = ev.touches.item(0).clientY - offsetTop + (document.body.scrollTop || document.documentElement.scrollTop || 0);
            }
            else {
                evX = ev.offsetX || ev.layerX;
                evY = ev.offsetY || ev.layerY;
            }
            //console.log(evX + ',' + evY);

            boxId = (parseInt(evY / boxSize) * size) + parseInt(evX / boxSize);
            if (levelColor != boxs[boxId].colorIndex) {
                movesC++;
            }
            levelColor = boxs[boxId].colorIndex;

            if (boxs[boxId].state == 2) {

                for (i = 1; i < level[levelColor].line.length; i++) {
                    var box = boxs[level[levelColor].line[i]]
                    if (box.state != 2) {
                        box.state = 0;
                        box.colorIndex = -1;
                    }
                }
                level[levelColor].line = [boxId];
            }
            anyThing = true;
            pointerMove(ev);
        }
        function pointerMove(ev) {
            if (!mouseDown) return;
            ev.preventDefault();
            var evX, evY;
            // evX = ev.offsetX || (ev.touches && ev.touches.item(0).clientX - offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft || 0)) || ev.layerX;
            // evY = ev.offsetY || (ev.touches && ev.touches.item(0).clientY - offsetTop + (document.body.scrollTop || document.documentElement.scrollTop || 0)) || ev.layerY;
            if (isTouch) {
                evX = ev.touches.item(0).clientX - offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft || 0);
                evY = ev.touches.item(0).clientY - offsetTop + (document.body.scrollTop || document.documentElement.scrollTop || 0);
            }
            else {
                evX = ev.offsetX || ev.layerX;
                evY = ev.offsetY || ev.layerY;
            }
            var boxId = (parseInt(evY / boxSize) * size) + parseInt(evX / boxSize);
            if (oldBox != boxId && mouseDown && levelColor != -1 && boxId < size * size) {
                var lastLLineId = level[levelColor].line[level[levelColor].line.length - 1];
                oldBox = boxId;
                var box = boxs[boxId];
                if (!anyThing && !(lastLLineId - size == boxId || lastLLineId + size == boxId || ((lastLLineId - 1 == boxId || lastLLineId + 1 == boxId) && parseInt(lastLLineId / size) == parseInt(boxId / size)))) {
                    return;
                }
                if (box.state == 2) {
                    if (level[levelColor].line[0] != boxId && box.colorIndex == levelColor && (lastLLineId - 1 == boxId || lastLLineId + 1 == boxId || lastLLineId - size == boxId || lastLLineId + size == boxId)) {
                        level[levelColor].line.push(boxId);
                        mouseDown = false;
                    }
                }
                if (box.state == 1 || (box.state == 2 && box.colorIndex == levelColor)) {
                    newArray = [];
                    var goHell = false;
                    var oldArray = level[box.colorIndex].line;
                    var NCI = box.colorIndex;
                    for (i = 0; i < oldArray.length; i++) {
                        if (oldArray[i] == boxId && box.colorIndex != levelColor) {
                            goHell = true;
                            oldBox = -1;
                        }
                        if (!goHell) {
                            newArray.push(oldArray[i]);
                        } else {
                            if (boxs[oldArray[i]].state != 2) {
                                boxs[oldArray[i]].state = 0;
                                boxs[oldArray[i]].colorIndex = -1;
                            }
                        }
                        if (oldArray[i] == boxId) {
                            goHell = true;
                        }
                    }
                    level[NCI].line = newArray;

                } else if (box.state == 0) {
                    box.state = 1;
                    box.colorIndex = levelColor;
                    level[levelColor].line.push(boxId);
                }
                liContext.clearRect(0, 0, cwith, cwith);
                var boxsSum = 0;
                var compSum = 0;
                var PlayTS = false;
                var PlayFS = false;
                FWSpeed = 1;
                for (var i = 0; i < level.length; i++) {
                    var NLevel = level[i]
                    if (NLevel.line.length != 0) {
                        liContext.beginPath()
                        var firstBox = NLevel.line[0];
                        var secondBox = NLevel.line[NLevel.line.length - 1];
                        var FPoint = boxs[NLevel.line[0]].points;
                        liContext.moveTo(FPoint[0] + HboxSize, FPoint[1] + HboxSize);
                        boxsSum++;
                        for (var p = 1; p < NLevel.line.length; p++) {
                            boxsSum++;
                            var NBox = boxs[NLevel.line[p]].points;
                            liContext.lineTo(NBox[0] + HboxSize, NBox[1] + HboxSize);
                        }
                        liContext.lineWidth = lineSize;
                        liContext.lineCap = 'round';
                        liContext.lineJoin = "round";
                        liContext.strokeStyle = NLevel.color;//填充线路颜色

                        //liContext.arc(60, 60, 30, 0, Math.PI * 2, true);
                        liContext.stroke();
                        liContext.closePath();

                        var isNewComp = NLevel.comp;
                        if ((NLevel.box[0] == firstBox && NLevel.box[1] == secondBox) || (NLevel.box[0] == secondBox && NLevel.box[1] == firstBox)) {
                            NLevel.comp = true;
                            FWSpeed += .1;
                            compSum++;
                        } else {
                            NLevel.comp = false;
                        }
                        if (isNewComp == false && NLevel.comp == true) {
                            PlayTS = true;
                        }
                        if (isNewComp == true && NLevel.comp == false) {
                            PlayTS = false;
                            PlayFS = true;
                        }

                        if (i != box.colorIndex && NLevel.comp == true) {
                            for (var p = 0; p < NLevel.line.length; p++) {
                                var NBox = boxs[NLevel.line[p]].points;
                                liContext.fillStyle = colors_o[i];
                                //liContext.fillRect(NBox[0], NBox[1], boxSize, boxSize);
                                liContext.fillRect(NBox[0] + boxSize * .0625, NBox[1] + boxSize * .0625, boxSize * .875, boxSize * .875);
                            }
                        }
                    }
                }
                //PlayTS判断连接是否成功
                if (PlayTS == true) {
                    //Sforward.playbackRate = FWSpeed - .1;
                    Sforward.play();
                    if (level.length == compSum) {
                    } else {
                        //这里添加圆图片替换和道路平铺
                        var value = level[box.colorIndex].box;
                        var box_1 = boxs[value[0]];
                        var box_2 = boxs[value[1]];
                        var arcX_1 = (box_1.points[0]);
                        var arcY_1 = (box_1.points[1]);
                        var arcX_2 = (box_2.points[0]);
                        var arcY_2 = (box_2.points[1]);

                        bgContext.drawImage(level[box.colorIndex].img[1], arcX_1 + boxSize * .0625, arcY_1 + boxSize * .0625, boxSize * .875, boxSize * .875);
                        bgContext.drawImage(level[box.colorIndex].img[3], arcX_2 + boxSize * .0625, arcY_2 + boxSize * .0625, boxSize * .875, boxSize * .875);
                        setTimeout(function () {
                            bgContext.clearRect(arcX_1, arcY_1, boxSize, boxSize);
                            bgContext.drawImage(level[box.colorIndex].img[0], arcX_1 + boxSize * .0625, arcY_1 + boxSize * .0625, boxSize * .875, boxSize * .875);
                            bgContext.clearRect(arcX_2, arcY_2, boxSize, boxSize);
                            bgContext.drawImage(level[box.colorIndex].img[2], arcX_2 + boxSize * .0625, arcY_2 + boxSize * .0625, boxSize * .875, boxSize * .875);

                            var NLevel = level[box.colorIndex];
                            for (var p = 0; p < NLevel.line.length; p++) {
                                var NBox = boxs[NLevel.line[p]].points;
                                liContext.fillStyle = colors_o[box.colorIndex];
                                //liContext.fillRect(NBox[0] + 7, NBox[1] + 6, boxSize - 10, boxSize - 10);
                                liContext.fillRect(NBox[0] + boxSize * .0625, NBox[1] + boxSize * .0625, boxSize * .875, boxSize * .875);
                            }
                        }, 300);
                    }
                }
                //PlayFS判断是否中断连接
                if (PlayFS == true) {
                    //Sleak.play();
                    levelScore -= 10;
                }
                var Perc = Math.round(boxsSum * 100 / boxs.length);
                if (Perc == 100 && compSum == level.length) {
                    if (!compArray[idoArray]) {
                        compArray.push(nowLevelNo + ":" + movesC + ":" + level.length);
                    } else {
                        var CANlevel = compArray[idoArray].split(":");
                        if (!CANlevel[1] || CANlevel[1] > movesC) {
                            compArray[idoArray] = nowLevelNo + ":" + movesC + ":" + level.length;
                        }
                    }
                    if (level.length == movesC) {
                        //$("#levelCompS .title").html("Perfect!");
                    } else {
                        //$("#levelCompS .title").html("Level complete!");
                    }
                    levelScore -= (totalsec - count / step) * 10;
                    mkGameByNo();
                    //$("#levelCompS .desc").html("You completed the level in " + movesC + " moves.");
                    //$("#forwCS").val("next level");
                    //$("#retrCS").css("display", "block");
                    //$("#keepCS").css("display", "none");
                    //$("#levelCompS").fadeIn("fast");
                } else if (compSum == level.length) {
                    levelScore -= (totalsec - count / step) * 10;
                    levelScore -= totalsec;
                    mkGameByNo();
                    //$("#levelCompS .title").html("Almost there...");
                    //$("#levelCompS .desc").html("Fill the board with pipe to complete the level.");
                    //$("#forwCS").val("skip level");
                    //$("#retrCS").css("display", "none");
                    //$("#keepCS").css("display", "block");
                    //$("#levelCompS").fadeIn("fast");
                }
                anyThing = false;
            }
        }
    }
}