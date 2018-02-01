/**
 * Created by Thinh-Laptop on 01.02.2018.
 */

var socket = io();

var canElement;

socket.on('cursor', function(msg){
    if (canElement != undefined) canElement.clearRect(0, 0, a.width, a.height);
    //ctx_cursor.clearRect(0, 0, w, h);
    console.log('message: ' + msg);
    //canElement = ctx_cursor.fillRect(msg.x,msg.y,2,2); // fill in the pixel at (10,10)

});

socket.on('draw', function(msg){

    //console.log("draw: " + JSON.stringify(msg));
    //translate to right dimensions
    msg.moveTo.prevX = interpolate(msg.moveTo.prevX,0,msg.dimension.width,0,canvas.width);
    msg.lineTo.currX = interpolate(msg.lineTo.currX,0,msg.dimension.width,0,canvas.width);

    msg.moveTo.prevY = interpolate(msg.moveTo.prevY,0,msg.dimension.height,0,canvas.height);
    msg.lineTo.currY = interpolate(msg.lineTo.currY,0,msg.dimension.height,0,canvas.height);

    //console.log("updated draw: " + JSON.stringify(msg));

    ctx.beginPath();
    ctx.moveTo(msg.moveTo.prevX, msg.moveTo.prevY);
    ctx.lineTo(msg.lineTo.currX, msg.lineTo.currY);
    ctx.strokeStyle = msg.strokeStyle;
    ctx.lineWidth = msg.lineWidth;
    ctx.stroke();
    ctx.closePath();

});

function interpolate(value, oldMin, oldMax, newMin, newMax){
    var scale = (newMax - newMin) / (oldMax - oldMin);
    var new_value = (value - oldMin) * scale + newMin;
    return Math.round(new_value);
};

socket.on('clear', function(){
    ctx.clearRect(0, 0, w, h);
});

