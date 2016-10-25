function openCount(id){
	$.getJSON(_config["isCount"]+"count/count.php?callback=?", {id: id, type: 1}, function(data){});
}
function clickCount(id){
	$.getJSON(_config["isCount"]+"count/count.php?callback=?", {id: id, type: 2}, function(data){});		
}
function shareCount(id){
	$.getJSON(_config["isCount"]+"count/count.php?callback=?", {id: id, type: 3}, function(data){});		
}