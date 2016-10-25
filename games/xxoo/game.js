(function() {

  function pointToPoint(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  function pointToAngle(origin, point) {
    return Math.atan2((point[1] - origin[1]), point[0] - origin[0]);
  }

  function ptInRect(p, rect) {
    return (p[0] >= rect[0] && p[0] <= rect[0] + rect[2]) &&
      (p[1] >= rect[1] && p[1] <= rect[1] + rect[3]);
  }

  var canvas = document.getElementById('canvas');
  var content = canvas.parentNode;
  var center = [canvas.width / 2, canvas.height / 2]; // 中心坐标
  var zoom = 1; // 缩放比
  var score = -1;
  var updateShape;
  var maxScore = localStorage['xxoo.maxScore'] || 0;
  var colors = ['#FF0000', '#FFFFFF', '#0000FF', '#FFFF00', '#FF00FF'];
  var maxTime = 30;
  var start; // 开始时间
  var lifetime = maxTime;
  var subscorecount=1;
  function resize() {
    canvas.style.height = window.innerHeight + 'px';
    canvas.style.width = window.innerHeight *
      (canvas.width / canvas.height) + 'px';
    content.style.width = canvas.style.width;
    zoom = canvas.height / window.innerHeight;
  }
  window.addEventListener('resize', resize);
  window.addEventListener('load', resize);


  var path = [];
  var pathTemp;
  var lastCode;

  canvas.addEventListener('touchmove', function(e) {
    if (status === 'gameover') {
      return;
    }
    if (path.length > 200) {
      return;
    }
    path.push([
      (e.targetTouches[0].pageX - canvas.offsetLeft) * zoom,
      (e.targetTouches[0].pageY - canvas.offsetTop) * zoom
    ]);
  });

  canvas.addEventListener('touchstart', function(e) {
    var pos = [
      (e.targetTouches[0].pageX - canvas.offsetLeft) * zoom,
      (e.targetTouches[0].pageY - canvas.offsetTop) * zoom
    ];
    if (status === 'gameover') {
      if (ptInRect(pos, [
        center[0] - textWidth / 2, canvas.height / 2 + 2 - 45,
        textWidth, 90
      ])) {
        status = 'waiting';
        score = 0;
        subscorecount=1;
      } else if (ptInRect(pos, [
        center[0] - textWidth / 2, canvas.height / 2 + 2 + 200 - 45,
        textWidth, 90
      ])) {
       dp_share();
      } else if (ptInRect(pos, [
        center[0] - textWidth / 2, canvas.height / 2 + 2 + 400 - 45,
        textWidth, 90
      ])) {
        clickMore();
      }
      return;
    } else if (status === 'waiting') {
      status = 'playing';
      start = new Date;
      return;
    }
    path = [pos];
  });

  function gesture(path) {
    // return 1:o 2:\ 3:/
    if (path.length <= 2) {
      return;
    }
    var distance = pointToPoint(path[0], path[path.length - 1]);
    var angle = pointToAngle(path[0], path[path.length - 1]);
    var bottomPos = path[0]; // 最底部的点
    var bottomIndex = 0;
    var circleCenter = [0, 0];
    path.forEach(function(item, index) {
      circleCenter[0] += item[0];
      circleCenter[1] += item[1];
      if (bottomPos[1] <= item[1]) {
        bottomPos = item;
        bottomIndex = index;
      }
    });
    circleCenter[0] /= path.length;
    circleCenter[1] /= path.length;

    if (bottomIndex === 0 || bottomIndex === path.length - 1) { // 可能是斜线
      if (Math.abs(angle - 1 / 4 * Math.PI) < 1 / 8 * Math.PI ||
        Math.abs(angle + 3 / 4 * Math.PI) < 1 / 8 * Math.PI) { // \
        if (Math.abs(angle - pointToAngle(path[0], circleCenter)) < 1 / 8 * Math.PI) {
          return 2;
        }
      }

      if (Math.abs(angle - 3 / 4 * Math.PI) < 1 / 8 * Math.PI ||
        Math.abs(angle + 1 / 4 * Math.PI) < 1 / 8 * Math.PI) { // /
        if (Math.abs(angle - pointToAngle(path[0], circleCenter)) < 1 / 8 * Math.PI) {
          return 3;
        }
      }
    }

    var avgDistance = 0;
    path.forEach(function(item) {
      avgDistance += pointToPoint(circleCenter, item);
    });
    avgDistance /= path.length;
    var flag = false;
    path.forEach(function(item) {
      if (Math.abs(avgDistance - pointToPoint(circleCenter, item)) > avgDistance * 2) {
        flag = true;
        return false;
      }
    });
    if (!flag) {
      return 1;
    }
  }

  canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });

  canvas.addEventListener('touchend', function(e) {
    if (status === 'gameover') {
      return;
    }

    var code = gesture(path);
    var flag = false;
    if ((code === 3 || code === 2) && !pathTemp) {
      pathTemp = path;
    } else {
      pathTemp = null;
    }
    switch (currentShape) {
      case 1: // x
        if (code === 1) { // o
          flag = true;
        }
        break;
      case 0: // o
        if (code === 3 && lastCode === 2) { // x
          flag = true;
        } else if (code === 2 && lastCode === 3) {
          flag = true;
        }
        break;
    }
    path = [];
    lastCode = code;
    if (flag) {
      pathTemp = null;
      lastCode = null;
      updateShape();
    }
  });

  var context = canvas.getContext('2d');
  context.textBaseline = 'middle';
  context.font = '40px Arial,sans-serif';
  var textWidth = context.measureText('四个汉字').width;

  var status = 'waiting';
  var currentShape;
  var nextShape = parseInt(Math.random() * 2);

  function updateShape() {
    currentShape = nextShape;
    nextShape = parseInt(Math.random() * 2);
    score++;
    if (score > maxScore || 0) {
      maxScore = score;
      localStorage['xxoo.maxScore'] = maxScore;
    }
    render();
  }
  updateShape();

  function onPolyline(item, index) {
    if (index === 0) {
      context.moveTo(item[0], item[1]);
    } else {
      context.lineTo(item[0], item[1]);
    }
  }

  function render() {
    var angle;
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#FFFFFF';

    if (status === 'share') {
      dp_share();
      return;
    }

    if (score >= 0) {
      context.textAlign = 'left';
      if (status === 'gameover') {
        context.fillText('积分：' + score + '(记录：' + maxScore + ')', 0, 70);
      } else {
        context.fillText('积分：' + score, 0, 70);
      }
    }
    context.textAlign = 'right';

    context.beginPath();

    switch (status) {
      case 'waiting':
        context.save();
        context.textAlign = 'right';
        context.fillText('见x画o、见o画x', canvas.width, canvas.height - 40);
        context.restore();
		
        context.fillText('时间：' + maxTime.toFixed(2) + ' 秒', canvas.width, 70);
        break;
      case 'playing':
        context.save();
        context.textAlign = 'right';
        context.fillText('见x画o、见o画x', canvas.width, canvas.height - 40);
        context.restore();

        context.fillText('时间：' + (lifetime / 1000).toFixed(2) + ' 秒', canvas.width, 70);
        break;
      case 'gameover':
        context.save();
        context.fillText('Game Over', canvas.width, 70);
		
        context.textAlign = 'center';
        context.textBaseline = 'bottom';
        context.strokeStyle = '#FFFFFF';
        context.fillText('再来一局', center[0], canvas.height / 2);
        context.fillText('炫耀一下', center[0], canvas.height / 2 + 200);
        context.fillText('更多游戏', center[0], canvas.height / 2 + 400);
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(center[0] - textWidth / 2, canvas.height / 2 + 2);
        context.lineTo(center[0] + textWidth / 2, canvas.height / 2 + 2);
        context.moveTo(center[0] - textWidth / 2, canvas.height / 2 + 2 + 200);
        context.lineTo(center[0] + textWidth / 2, canvas.height / 2 + 2 + 200);
        context.moveTo(center[0] - textWidth / 2, canvas.height / 2 + 2 + 400);
        context.lineTo(center[0] + textWidth / 2, canvas.height / 2 + 2 + 400);
        context.stroke();
        context.restore();
        if(subscorecount==1){
        	subscorecount=0;
        	dp_submitScore(score);
        }
        return;
    }

    context.strokeStyle = colors[score % colors.length];
    context.lineWidth = canvas.width * 0.06;
    context.beginPath();
    switch (currentShape) {
      case 0: // o
        context.arc(center[0], center[1], canvas.width * 0.3, 0, 2 * Math.PI);
        break;
      case 1: // x
        angle = 1 / 8 * 2 * Math.PI;
        context.moveTo(
          center[0] + Math.cos(angle) * canvas.width * 0.35,
          center[1] + Math.sin(angle) * canvas.width * 0.35
        );
        context.lineTo(
          center[0] - Math.cos(angle) * canvas.width * 0.35,
          center[1] - Math.sin(angle) * canvas.width * 0.35
        );
        angle = 3 / 8 * 2 * Math.PI;
        context.moveTo(
          center[0] + Math.cos(angle) * canvas.width * 0.35,
          center[1] + Math.sin(angle) * canvas.width * 0.35
        );
        context.lineTo(
          center[0] - Math.cos(angle) * canvas.width * 0.35,
          center[1] - Math.sin(angle) * canvas.width * 0.35
        );
        break;
    }
    context.closePath();
    context.stroke();

    context.strokeStyle = colors[(score + 1) % colors.length];
    context.lineWidth = canvas.width * 0.03;
    context.beginPath();
    switch (nextShape) {
      case 0: // o
        context.arc(canvas.width * 0.25, canvas.height * 0.85, canvas.width * 0.3 * 0.25, 0, 2 * Math.PI);
        break;
      case 1: // x
        angle = 1 / 8 * 2 * Math.PI;
        context.moveTo(
          canvas.width * 0.25 + Math.cos(angle) * canvas.width * 0.35 * 0.25,
          canvas.height * 0.85 + Math.sin(angle) * canvas.width * 0.35 * 0.25
        );
        context.lineTo(
          canvas.width * 0.25 - Math.cos(angle) * canvas.width * 0.35 * 0.25,
          canvas.height * 0.85 - Math.sin(angle) * canvas.width * 0.35 * 0.25
        );
        angle = 3 / 8 * 2 * Math.PI;
        context.moveTo(
          canvas.width * 0.25 + Math.cos(angle) * canvas.width * 0.35 * 0.25,
          canvas.height * 0.85 + Math.sin(angle) * canvas.width * 0.35 * 0.25
        );
        context.lineTo(
          canvas.width * 0.25 - Math.cos(angle) * canvas.width * 0.35 * 0.25,
          canvas.height * 0.85 - Math.sin(angle) * canvas.width * 0.35 * 0.25
        );
        break;
    }
    context.closePath();
    context.stroke();

    context.save();
    context.lineWidth = canvas.width * 0.06;
    context.strokeStyle = 'green';
    context.globalAlpha = 0.5;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    path.forEach(onPolyline);
    if (pathTemp) {
      pathTemp.forEach(onPolyline);
    }
    context.stroke();
    context.restore();
  }

  setInterval(function() {
    if (status === 'playing') {
      lifetime = maxTime * 1000 - (new Date - start);
      if (lifetime < 0) {
        status = 'gameover';
        lifetime = 0;
        path = [];
        pathTemp = null;
      }
    }
    render();
  }, 100);
})()

