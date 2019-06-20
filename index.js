(function() {
	var is_phone = null;
	var pause = false;
	var pause_key = false;
	var currentX = null;
	var currentY = null;
	var currentCity = null;
	var cities = ['shanghai','beijing','nanjing','weihai','hangzhou','xian','haerbin','nanchang','xiamen','shouer','dongjing','xinjiapo','lizi','manchesite','gelasige','duke','kangnaier','laisi','jiazhouligong','qiaozhicheng']
	var pos = [[121,31],[116,40],[118.5,31.5],[122,37.4],[120,30],[108,34.1],[126.6,45.5],[115.7,28.5],[118,24.4],[127,37.5],[139.75,35.68],[104,1.3],[-1.5,53.8],[-2.2,53.5],[-4.25,56],[-78.9,36],[-76.48,42.45],[-95.4,29.71],[-118.12,34.136],[-77.59,38.935]]
	
	if (/Android|webOS|iPhone|iPod|MicroMessenger|BlackBerry/i.test(navigator.userAgent)) {
            is_phone = true;
        } else {
            is_phone = false;
        }

	var lastTouchEnd = 0;
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 阻止双指放大
    document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    });
	
	window.addEventListener("orientationchange", reload, false);
	function reload(){
	  window.location.href=window.location.href+"?id="+10000*Math.random();
	  return false;
	}
	
	document.onkeydown = function(event){
	  if(event.keyCode < 91 && event.keyCode > 64){
		  pause_key = !pause_key
	  }
	}
	
	document.ontouchmove = function(e){
        e.preventDefault();
    }
	
	document.onmousemove = function(event){
		currentX = event.clientX
		currentY = event.clientY
		if(currentCity != null){document.getElementById('info').src = 'info_'+cities[currentCity]+'-min.jpg';}
		else{document.getElementById('info').src = '';}
	}
	
  var canvas = document.getElementById('quakeCanvas');

  // Create our Planetary.js planet and set some initial values;
  // we use several custom plugins, defined at the bottom of the file
  var planet = planetaryjs.planet();
  planet.loadPlugin(autocenter({extraWidth: -window.innerWidth/2, extraHeight: 0}));
  planet.loadPlugin(autoscale({extraHeight: -window.innerHeight/8}));
  planet.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file:   'world-110m.json' },
    oceans:   { fill:   '#001320' },
    land:     { fill:   '#06304e' },
    borders:  { stroke: '#001320' }
  }));
  planet.loadPlugin(planetaryjs.plugins.pings());
  planet.loadPlugin(planetaryjs.plugins.zoom({
    scaleExtent: [50, 5000]
  }));
  planet.loadPlugin(planetaryjs.plugins.drag({
    onDragStart: function() {
      this.plugins.autorotate.pause();
    },
    onDragEnd: function() {
      this.plugins.autorotate.resume();
    }
  }));
  planet.loadPlugin(autorotate(2));
  planet.projection.rotate([100, -10, 0]);
  planet.draw(canvas);

  // Plugin to resize the canvas to fill the window and to
  // automatically center the planet when the window size changes
  function autocenter(options) {
    options = options || {};
    var needsCentering = false;
    var globe = null;

    var resize = function() {
      var width  = window.innerWidth + (options.extraWidth || 0);
      var height = window.innerHeight + (options.extraHeight || 0);
      globe.canvas.width = width;
      globe.canvas.height = height;
      globe.projection.translate([width / 2, height / 2]);
    };

    return function(planet) {
      globe = planet;
      planet.onInit(function() {
        needsCentering = true;
        d3.select(window).on('resize', function() {
          needsCentering = true;
        });
      });

      planet.onDraw(function() {
        if (needsCentering) { resize(); needsCentering = false; }
      });
    };
  };

  // Plugin to automatically scale the planet's projection based
  // on the window size when the planet is initialized
  function autoscale(options) {
    options = options || {};
    return function(planet) {
      planet.onInit(function() {
        var width  = window.innerWidth + (options.extraWidth || 0);
        var height = window.innerHeight + (options.extraHeight || 0);
        planet.projection.scale(Math.min(width, height) / 2);
      });
    };
  };

  // Plugin to automatically rotate the globe around its vertical
  // axis a configured number of degrees every second.
  function autorotate(degPerSec) {
    return function(planet) {
      var lastTick = null;
      var paused = false;
      var pulse = 0;
      planet.plugins.autorotate = {
        pause:  function() { paused = true;  },
        resume: function() { paused = false; }
      };
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          pulse++;
          if(pulse % 30 == 0){
            planet.plugins.pings.add(121,31,{color: "gold", ttl: 2333, angle: 1})//上海
			planet.plugins.pings.add(116,40,{color: "white", ttl: 2333, angle: 1})//北京
			planet.plugins.pings.add(118.5,31.5,{color: "salmon", ttl: 1800, angle: 1})//南京
			planet.plugins.pings.add(122,37.4,{color: "greenyellow", ttl: 800, angle: 1})//威海
			planet.plugins.pings.add(120,30,{color: "pink", ttl: 800, angle: 1})//杭州
			planet.plugins.pings.add(108,34.1,{color: "orange", ttl: 800, angle: 1})//西安
			planet.plugins.pings.add(126.6,45.5,{color: "orange", ttl: 800, angle: 1})//哈尔滨
			planet.plugins.pings.add(115.7,28.5,{color: "fuchsia", ttl: 800, angle: 1})//南昌
			planet.plugins.pings.add(118,24.4,{color: "wheat", ttl: 800, angle: 1})//厦门
			planet.plugins.pings.add(127,37.5,{color: "aqua", ttl: 800, angle: 1})//首尔
			planet.plugins.pings.add(139.75,35.68,{color: "fuchsia", ttl: 800, angle: 1})//东京
			planet.plugins.pings.add(104,1.3,{color: "lightyellow", ttl: 800, angle: 1})//新加坡
			planet.plugins.pings.add(-1.5,53.8,{color: "silver", ttl: 1600, angle: 1})//利兹
			planet.plugins.pings.add(-2.2,53.5,{color: "aqua", ttl: 800, angle: 1})//曼彻斯特
			planet.plugins.pings.add(-4.25,56,{color: "orange", ttl: 800, angle: 1})//格拉斯哥
			planet.plugins.pings.add(-78.9,36,{color: "salmon", ttl: 800, angle: 1})//杜克大学
			planet.plugins.pings.add(-76.48,42.45,{color: "powderblue", ttl: 800, angle: 1})//康奈尔大学
			planet.plugins.pings.add(-95.4,29.71,{color: "peachpuff", ttl: 800, angle: 1})//莱斯大学
			planet.plugins.pings.add(-118.12,34.136,{color: "orange", ttl: 800, angle: 1})//加州理工
			planet.plugins.pings.add(-77.59,38.935,{color: "lemonchiffon", ttl: 800, angle: 1})//乔治城大学
            if(pulse>100000) pulse = 0;
          }
		  
		  var temp = planet.projection.invert([currentX-5,currentY]);
		  var min = 999999;
		  var temp_dst = 0;
		  for(i=0;i<20;i++){
			  temp_dst = Math.sqrt(Math.pow(temp[0]-pos[i][0],2)+Math.pow(temp[1]-pos[i][1],2));
			  if(temp_dst < min){min = temp_dst; currentCity = i;}
		  }
		  if(min < 1.5){pause = true;}
		  else{pause = false; currentCity = null;}
          var rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 800;
          if (rotation[0] >= 180) rotation[0] -= 360;
          if(!pause && !pause_key && !is_phone){planet.projection.rotate(rotation);}
          lastTick = now;
        }
      });
    };
  };
})();