
var nowLevelNo = 1;
var gamesize = 0;
var levelCount = 0;
var lastLevelNo = "";
var compArray = [];
var packComp = [];
var flowjson;
var allLevels;
var packid = 0;
var level2Array = [];
var nowPackNo = -1;
var TScore = 0;
var cj = ["image/menu/line.png", "image/menu/menubg.png", "image/btn_menu.png", "image/Logo1.png", "image/Logo2.png", "image/Logo3.png", "image/btn_play.png", "image/home.jpg", "image/game/gamebg.jpg", "image/game/level.png", "image/game/score.png", "image/game/grid_below.png", "image/game/grid_top.png", "image/game/timebg.png", "image/game/timebar.png", "image/scorecard/btn_playAgain.png",  "image/scorecard/scorebg0.png",  "image/scorecard/btn_MoreGames.png"];
var cj1 = ["image/game/1/1.png", "image/game/1/2.png", "image/game/1/3.png", "image/game/1/4.png", "image/game/2/1.png", "image/game/2/2.png", "image/game/2/3.png", "image/game/2/4.png", "image/game/3/1.png", "image/game/3/2.png", "image/game/3/3.png", "image/game/3/4.png", "image/game/4/1.png", "image/game/4/2.png", "image/game/4/3.png", "image/game/4/4.png", "image/game/5/1.png", "image/game/5/2.png", "image/game/5/3.png", "image/game/5/4.png"];
var gameElements = new Array();
var isimgloaded = false;
var gameTimer;
var count = 360;//360长度
var totalsec = 30;
var levelScore = totalsec * 10;
var step = count / totalsec;
var arrayLeft = [92, 91.6, 91.2, 90.8, 90.4, 90, 89.6, 89.2, 88.8, 88.2, 87.8];
var arrayTop = [234.0, 234.4, 234.8, 235.2, 235.6, 236, 236.4, 236.6, 237.0, 237.4, 238.8];
//var arrayLeft = [112, 111.6, 111.2, 110.8, 110.4, 110, 109.6, 109.2, 108.8, 108.2, 107.8];
var scorearr = [0, (totalsec - 12) * 190, (totalsec - 7) * 190, (totalsec - 5) * 190];
var shake1;
var shake2;
var shake3;
var shake4;
var iswechat = (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger');
var level = "";
function playgame(callback) {
    $("#maskloading").show();
    $("#game_screen").show();
    $.getJSON("data/new_levels.json", function (data) {
        if (data && data[0].length > 0 && data[0][1].levels.length > 0) {
            flowjson = data;
            gamesize = flowjson[0][1].size;
            level2Array = [];
            levelCount = 0;
            for (var i = 0; i < flowjson[0][1].levels.length; i++) {
                level2Array.push(flowjson[0][1].levels[i]);
                levelCount = levelCount + 1;
            }
            $.isFunction(callback) && callback();
            if (!isimgloaded) {
                $.loadImages(cj1, function (loadElements) {
                    isimgloaded = true;
                    var loadElementslength = loadElements.length;
                    if (loadElementslength == cj1.length) {
                        for (var i = 0; i < loadElementslength; i += 4) {
                            gameElements.push([loadElements[i], loadElements[i + 1], loadElements[i + 2], loadElements[i + 3]]);
                        }
                    }
                    mkGame(gamesize, level2Arrayf(level2Array[nowLevelNo - 1]), reline);
                    Sforward.play();
                    $("#maskloading").hide();
                });
            } else {
                mkGame(gamesize, level2Arrayf(level2Array[nowLevelNo - 1]), reline);
                Sforward.play();
                $("#maskloading").hide();
            }
        }
        else {
            $("#maskloading").hide();
            alert('加载失败，请重试！');
        }
    });
}

function gametick() {
    count = count - step;
    $("#timebar").css({ "width": count });
    if (count <= 0) {
        gameover();
       
    }
}
//终止计时器
function gameover() {
    window.scrollTo(0, 0);
    if (gameTimer) window.clearInterval(gameTimer);
    $("#loading_div").hide();
    $("#content").show();
    $("#maskloading").fadeTo(800, 0.8, function () {
        $("#Logo2").show();
        $("#Logo2").animate({ "left": 90 }, 100, '', function () {
            shake3 = setInterval(function () {
                $("#Logo2").css({ "left": arrayLeft[parseInt(11 * Math.random())], "top": arrayTop[parseInt(11 * Math.random())] });
            }, 50);
            $("#Logo3").show();
            $("#Logo3").animate({ "left": 95 }, 100, '', function () {
                shake4 = setInterval(function () {
                    $("#Logo3").css({ "left": arrayLeft[parseInt(11 * Math.random())], "top": arrayTop[parseInt(11 * Math.random())] });
                }, 50);
                $('#Logo1').show();
                $('#Logo1').addClass('scale').animate({ 'top': '236px', 'left': '90px' }, 1000, '', function () {
                    setTimeout(function () {
                        if (shake3) window.clearInterval(shake3);
                        if (shake4) window.clearInterval(shake4);
                        $("#maskloading").hide();
                        $("#Logo2").hide();
                        $("#Logo3").hide();
                        $('#Logo1').hide();
                        $('#content').hide();
                        $("#p1_1").hide();
                        $("#p1_2").hide();
                        $('#p1_3').hide();
                        $('#p1_4').show();
                        $("#Logo2").css({ "left": "-295px" });
                        $("#Logo3").css({ "left": "435px" });
                        calculate();
                    }, 500);
                });
            });
        });
    });
    page = 5;
    TScore = 0;
    nowLevelNo = 1;
}
function calculate() {
    var point = document.getElementById("score").innerHTML;
    level = document.getElementById("levelName").innerHTML;
    $("#result_score").html(point);
    do_submitScore(parseInt(point));
}
//根据NO来开始游戏
function mkGameByNo() {
    showScore();
    //setCookie("lastLevelNo", nowLevelNo);
    if (nowLevelNo > levelCount - 1) {
        //setCookie("lastLevelNo", 1);
        alert("恭喜您，完成了全部关卡！");
        if (gameTimer) window.clearInterval(gameTimer);
        //playgame();
        $("#p1_1").hide();
        document.getElementById("main").style.overflow = "hidden";
        $("#p1_2").hide();
        $('#p1_3').hide();
        $('#p1_4').show();
        page = 5;
        calculate();
    }
    else {
        reline = 0;
        nowLevelNo = parseInt(nowLevelNo) + 1;
        $("#levelName").html(nowLevelNo);
        mkGame(gamesize, level2Arrayf(level2Array[nowLevelNo - 1]), reline);
    }
}
function level2Arrayf(levelstring) {
    var levelSplit = levelstring.split(";");
    var levelArray = [];
    for (var i = 0; i < levelSplit.length; i++) {
        levelArray[i] = levelSplit[i].split(",");
    }
    return levelArray;
}

function showScore() {
    if (levelScore >= 0)
        TScore += levelScore;
    $("#score").html(TScore);
}



function make_game1() {
    //pack_1_open = localStorage["pack_1_open"] || getCookie("pack_1_open") || 0;
    allLevels = $("#levels");
    var mainSLeft = $(".mainS")[0].offsetLeft;

    $.getJSON("data/new_levels.json", function (data) {
        flowjson = data;
        data.forEach(function (pack, packid) {
            //packComp.push(0);
            $("#pack_main").append("<a data-packid='" + packid + "' style='color:" + pack[0].color + "'>" +
				pack[0].name +
				"<h5></h5>" +
				"<span>" + pack[0].desc + "</span>" +
				"</a>"
			);
        });
    });
}