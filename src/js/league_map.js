/**
 * Created by Thinh-Laptop on 01.02.2018.
 */

var socket = io();
var spawnDrag = 0;
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

socket.on('spawn', function(msg){
    spawn(msg.id);
});

socket.on('drag', function(msg){

    //console.log("dragging");
    msg.obj.animate(
        { left:100, top:100 },
        {
            duration: 1000,
            progress: function(draggable, x, y ){
                scale(draggable.elem.offsetLeft, draggable.elem.offsetTop);
            }
        });
});

function interpolate(value, oldMin, oldMax, newMin, newMax){
    var scale = (newMax - newMin) / (oldMax - oldMin);
    var new_value = (value - oldMin) * scale + newMin;
    return Math.round(new_value);
}

socket.on('clear', function(){
    ctx.clearRect(0, 0, w, h);
    $(".IconSpawn").remove();
});


$(window).load(function() {
    $("#control_ward").on("click",function(){
        spawn("control_ward");
    });


    $("#trinket_ward").on("click",function(){
        spawn("trinket_ward");
    });
});

function spawn(obj){
    var id = "draggable" + spawnDrag;
    $("#spawn_icons").prepend('<div id="draggable_'+spawnDrag+'" style="position:absolute;left:85%;top:50%;" class="ui-widget-content leagueIcons">'+
        '<img class="leagueIcons IconSpawn" src="assets/img/league/'+ obj +'.png" alt="missing">'+
        '</div>');

    $( "#draggable_" + spawnDrag ).draggable({
        drag: function( event, ui ) {
            scale(ui.offset.left, ui.offset.top);

            socket.emit('drag',{
                x:ui.offset.left,
                y:ui.offset.top,
                obj:this
            });
        }
    });
    spawnDrag++;
    //console.log(obj + " spawned");

    socket.emit('spawn',{
        id:obj
    })
}

function scale(left, top){
    //your scaling logic here here
    //console.log("scaling", left, top);
}
