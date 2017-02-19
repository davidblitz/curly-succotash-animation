var dc;

function EnvelopeSystem() {
  this.dottedShapes = new Array();
  this.maps = new Array();
  
  this.addShape = function(s) {
    this.dottedShapes.push(s);
  }
  
  this.addMapping = function(from, to, indexMaps) {
    this.maps.push({"from" : from, "to" : to, "map" : indexMaps});
  }
    
  this.show = function() {
    for(var mapInd=0; mapInd < this.maps.length; ++mapInd) {
      var map = this.maps[mapInd]['map'];
      var from = this.maps[mapInd]['from'];
      var to = this.maps[mapInd]['to'];
      
//      console.log(map);
      
      for(var inner=0; inner < map.length; ++inner) {
        var fromPoint = map[inner][0];
        
        var xFrom = this.dottedShapes[from].dots[fromPoint][0];
        var yFrom = this.dottedShapes[from].dots[fromPoint][1];
        
        var toPoint = map[inner][1];
        
        var xTo = this.dottedShapes[to].dots[toPoint][0];
        var yTo = this.dottedShapes[to].dots[toPoint][1];
        
//        console.log(xTo);
        line(xFrom, yFrom, xTo, yTo);
      }
    }
  }
}

function DottedLine(x1, y1, x2, y2, n) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.n = n;
  
  this.createDots = function(n) {
    var dots = new Array();
    
    for(var i=0; i<n; ++i) {
      var xDot = this.x1 + i*(this.x2 - this.x1)/(n-1);
      var yDot = this.y1 + i*(this.y2 - this.y1)/(n-1);
      
      dots.push([xDot, yDot])
    }
    
    return dots;
  }
  
  this.dots = this.createDots(n);
  
  this.viz = function() {
    for(var i=0; i<this.dots.length; ++i) {
      var x = this.dots[i][0];
      var y = this.dots[i][1];
      
      ellipse(x, y, 1, 1);
    }
  }
}

function DottedCircle(x, y, r, n) {
  this.x = x;
  this.y = y;
  this.radius = r;
  
  this.createDots = function(n) {
    var dots = new Array();
    for(var i=0; i<n; ++i) {
      var xDot = this.x + this.radius*sin(i*TWO_PI/n);
      var yDot = this.y + this.radius*cos(i*TWO_PI/n);
      
      dots.push([xDot, yDot]);
    }
    
    return dots;
  }
  
  this.dots = this.createDots(n);
  
  this.viz = function() {
    noStroke();
    for(var i=0; i<this.dots.length; ++i) {
      var x = this.dots[i][0];
      var y = this.dots[i][1];
      
      ellipse(x, y, 4, 4);
    }
  }
  
  this.show = function() {
    fill(255, 121, 12);
    noFill();
    ellipse(x, y, 2*this.radius, 2*this.radius);
  }
}

function setup() {
  resizeCanvas(800, 600);
  var lineN = 6;
  var dl = new DottedLine(50, 50, 150, 150, lineN); 
  //dl.viz();
  //dc.viz();
  
  
}

function draw() {
  background(18, 3, 79);
  stroke(242, 242, 242);
  strokeWeight(1);
  fill(255, 121, 12);
  var factor = frameCount/100.0;
  var circleN = 500;
  var dc = new DottedCircle(400, 300, 250 + sin(factor)*20, circleN);
  
  var dcSelfMap = new Array();
  
  for(var i=0; i<circleN; ++i) {
    dcSelfMap.push([i, round(factor*10*sqrt(i))%circleN]);
  }
  
  var system = new EnvelopeSystem();
 
  system.addShape(dc);
  system.addMapping(0, 0, dcSelfMap);
  system.show();
  dc.viz();
  
}