//Javascript for drawing and calculating quadratics 2017
var a, b, c, context, w, h, k=20;

function init() {
  canvas= document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  w = canvas.width = 600;
  h = canvas.height = 400;
  console.log('canvas is loaded into context',w);
  canvasOffset = canvas.getBoundingClientRect();
  offsetX = Math.round(canvasOffset.left);
  offsetY = Math.round(canvasOffset.top); 
  canvas.addEventListener("mousemove", doMouseMove, false);
  graphpaper();
}  // close init

function QF() {
  // getting values to do quadratic formula
  a = $("#quadA").val();
  b = $("#linB").val();
  c = $("#constant").val();
  d= b**2-4*a*c;  
  if(d<0){
    $("#solution1").text("No x-intercepts");
    $("#solution2").text("");
  }
  else{
 x1 = (-b+Math.sqrt(b**2-4*a*c))/(2*a);
  x1 = Math.round(x1*1000)/1000;
  x2 = (-b-Math.sqrt(b**2-4*a*c))/(2*a);
  x2 = Math.round(x2*1000)/1000;
  $("#solution1").text("X intercept is at "+x1);
  $("#solution2").text("X intercept is at "+x2);
  }

  x1 = (-b+Math.sqrt(b**2-4*a*c))/(2*a);
  x1 = Math.round(x1*1000)/1000;
  x2 = (-b-Math.sqrt(b**2-4*a*c))/(2*a);
  x2 = Math.round(x2*1000)/1000;
  vX = -(b*1)/(2*a);
  vY = a*Math.pow(vX,2)+b*vX+c*1;
  xcp = 2*vX;
  console.log(a,b,c); 
  vX = vX.toFixed(2);
  vY = vY.toFixed(2);
  graphQuad();
  results();
}  // close QF

function results() {
if (a==0){
 $("#vertex").text("No Vertex");
 $("#solution1").text("X-intercept is at (" + -c/b +","+0+")");
 $("#solution2").text("");
 $("#core").text("No Corresponding Point");
 $("#y-int1").text("Y intercept is at "+c+"");
 $("#aos").text("No Symmetry Line");

 context.fillStyle = "darkblue";
  context.beginPath();
  context.arc(w/2+(-c/b)*k, h/2, 4, 0,6.28);
  context.fill();
    
  context.beginPath();
  context.arc(w/2, h/2-c*k, 4, 0, 6.28);
  context.fill();
}
else{
  context.fillStyle = "darkblue"
  context.beginPath();
  context.arc(w/2+x1*k, h/2, 4, 0,6.28);
  context.fill();
  context.fillStyle = "darkblue"
  context.beginPath();
  context.arc(w/2+x2*k, h/2, 4, 0,6.28);
  context.fill();
  $("#vertex").text("Vertex is at (" + vX+","+vY+")");
  context.fillStyle = "darkblue"
  context.beginPath();
  context.arc(w/2+vX*k, h/2-vY*k, 4, 0, 6.28);
  context.fill();
  $("#core").text("Corresponding Point  is at (" +xcp+","+c+")");
  context.beginPath();
  context.arc(w/2+xcp*k, h/2-c*k, 4, 0, 6.28);
  context.fill();
  $("#y-int1").text("Y intercept is at (0,"+ c+ ")");
  context.beginPath();
  context.arc(w/2, h/2-c*k, 4, 0, 6.28);
  context.fill();
  $("#aos").text("Symmetry Line is at " +vX);

  context.lineWidth= 2;
  context.strokeStyle= "rgba(50,0,200,.5)";
  context.setLineDash([10,8]);
  context.beginPath();
  context.moveTo(w/2+vX*k,5);
  context.lineTo(w/2+vX*k, h+5)
  context.stroke();
  context.setLineDash([0]);
}
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
  k = k+2;
  resetCanvas();
}
function minimize(){
  k = k-2; 
  if (k<10){
    k=k+2    
  };
  resetCanvas();
}
function Clear() {
  init();
}
function resetCanvas() {
  init();
  graphQuad();
  results();
  QF();
}

function doMouseMove(event) {
    // always know where ther mouse is located
  resetCanvas();
  context.fillStyle = "red";
  mouseX = event.clientX-offsetX;
  mouseY = event.clientY-offsetY;
  pointX = (mouseX-w/2)/k;
  pointY = a*Math.pow(pointX,2)+b*pointX+c*1;
  pointX =  pointX.toFixed(2);
  pointY =  pointY.toFixed(2);
  //console.log(mouseX,mouseY, pointX, pointY, offsetY, offsetX);
  context.beginPath();
  context.arc(mouseX, h/2-pointY*k,5,0,2*Math.PI);
  context.fill(); 
  $("#point").text("Point on the curve: ("+pointX+","+pointY+")");
}  // end doMouseMovedd