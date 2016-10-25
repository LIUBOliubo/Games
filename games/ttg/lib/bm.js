 var homesite='http://game.id87.com/';
BOOSTERMEDIA_START_GAME=function(){globalInit();console.log("BOOSTERMEDIA_START_GAME called.")};BOOSTERMEDIA_MORE_GAMES=function(){console.log("BOOSTERMEDIA_MORE_GAMES called.");clickMore();};BOOSTERMEDIA_MAINMENU=function(){console.log("BOOSTERMEDIA_MAINMENU called.");clickMore();};BOOSTERMEDIA_GAMEPLAY=function(){console.log("BOOSTERMEDIA_GAMEPLAY called.")};BOOSTERMEDIA_LEVELCOMPLETE=function(){alert("complete");};BOOSTERMEDIA_LEVELFAILED=function(){};
BOOSTERMEDIA_GAMECOMPLETE=function(){console.log("BOOSTERMEDIA_GAMECOMPLETE called.")};
BOOSTERMEDIA_SUBMITSCORE=function(a){console.log("BOOSTERMEDIA_SUBMITSCORE called. "+a)};
window.onload=function(){BOOSTERMEDIA_START_GAME()};
