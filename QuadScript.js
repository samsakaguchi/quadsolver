//Javascript for drawing and calculating quadratics 2017
var a, b, c, context, w, h, k=12;

function init() {
  canvas= document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  w = canvas.width = 600;
  h = canvas.height = 400;
  console.log('canvas is loaded into context',w);
  graphpaper();
  graphQuad();
}  // close init

function QF() {
  // getting values to do quadratic formula
  a = $("#quadA").val();
  b = $("#linB").val();
  c = $("#constant").val();
  x1 = (-b+Math.sqrt(b^2-4*a*c))/(2*a);
  x1 = Math.round(x1*1000)/1000;
  x2 = (-b-Math.sqrt(b^2-4*a*c))/(2*a);
  x2 = Math.round(x2*1000)/1000;
  vX = -(b*1)/(2*a);
  vY = a*Math.pow(vX,2)+b*vX+c*1;
  if (x1<0) {
    x1 = x1*(-1)+"i";
  }
  if (x2<0) {
    x2 = x2*(-1)+"i";
  }
  xcp = 2*vX;

  $("#solution1").text("X intercept is at "+x1);
  $("#solution2").text("X intercept is at "+x2);
  $("#y-int1").text("Y intercept is at (0,"+ c+ ")");
  $("#y-int2").text("Y intercept is at ("+(vX*2)+","+ c+ ")");
  console.log(a,b,c); 
  results();
  graphQuad();
}  // close QF

function results() {

  // finding vertex and displaying symline and yint results

  $("#vertex").text("Vertex is at (" + vX+","+vY+")");
  $("#core").text("Corresponding Point  is at (" +xcp+","+c+")");
  context.beginPath();
  context.arc(200, c, 5, 0, 2 * Math.PI);
  context.stroke();
  $("#aos").text("Symmetry Line is at " +vX);
}  // close results()

function graphpaper() {
  context.lineWidth = 5 ;
  context.beginPath();
  context.moveTo(w/2, 0);
  context.lineTo(w/2, h);
  context.stroke();
  context.beginPath();
  context.moveTo(0, h/2);
  context.lineTo(w, h/2);
  context.stroke();


// thin line with a 50% opacity using rgba() 
context.lineWidth=1;
context.strokeStyle="rgba(0,0,255,.5)";

  //using the direct variation constant, k
  //  here are the vertical and horizontal lines

  for (i=0; i<h/(2*k); i++) {
    context.beginPath();
    context.moveTo( 0, h/2-i*k );
    context.lineTo( w, h/2-i*k );
    context.stroke();
    
    context.beginPath();
    context.moveTo( 0, h/2-i*-k );
    context.lineTo( w, h/2-i*-k );
    context.stroke();

  }
  for (i=0; i<w/(2*k); i++) {
    context.beginPath();
    context.moveTo( w/2-i*k, 0 );
    context.lineTo( w/2-i*k, h);
    context.stroke();

    context.beginPath();
    context.moveTo( w/2-i*-k, 0);
    context.lineTo( w/2-i*-k, h);
    context.stroke();

  }
}

function graphQuad () {
  context.lineWidth = 1;
  context.strokeStyle = "Red";
  for (var i = 0; i < w; i++) {
    x = (w/2-i)/k;
    y = c*1+b*x+a*Math.pow(x,2);
    nx = (w/2-(i+1))/k;
    ny = c*1+b*nx+a*Math.pow(nx,2);
    context.beginPath();
    context.moveTo(w/2+x*k,h/2-y*k);
    context.lineTo(w/2+nx*k,h/2-ny*k);
    context.stroke();
  }
}

function maximize(){ 
  k = k+3;
  init();
}
function minimize(){
  k = k-3; 
  init();
}
