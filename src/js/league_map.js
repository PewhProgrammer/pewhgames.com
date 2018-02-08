/**
 * Created by Thinh-Laptop on 01.02.2018.
 */

const socket = io();
let spawnDrag = 0;
let canElement;

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
    console.log(">> Received spawn object: " + msg.id + " id: " + msg.spawnID);
    spawn(msg);
});

socket.on('drag', function(msg){

    //console.log("dragging: " + JSON.stringify(msg.obj));
    $("#draggable_" + msg.obj ).animate(
        { left:interpolate(msg.x,0,msg.dimension.width,0,canvas.width), top:interpolate(msg.y,0,msg.dimension.height,0,canvas.height)
        },
        {
            progress: function(draggable, x, y ){
                //scale(draggable.elem.offsetLeft, draggable.elem.offsetTop);
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
    spawnDrag = 0;
});

let substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        let matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

const states = [ 'Shaco','DrMundo','Rammus','Anivia','Irelia','Yasuo','Sona','Kassadin','Zac','Gnar','Karma','Corki','Gangplank','Janna','Jhin','Kindred','Braum',
    'Ashe','Tryndamere','Jax','Morgana','Zilean','Singed','Evelynn','Twitch','Galio','Velkoz','Olaf','Taliyah','Annie','Leblanc','Karthus',
    'Urgot','Xinzhao','Amumu','TwistedFate','Chogath','FiddleSticks','Vladimir','Warwick','Teemo','Tristana','Sivir','Soraka','Ryze','Sion',
    'MasterYi','Alistar','MissFortune','Nunu','Rengar','Volibear','Fizz','Graves','Ahri','Shyvana','Lux','Xerath','Tresh','Shen','Jinx','Kogmaw','TahmKench','Riven',
    'Talon','Malzahar','Kayle','Kalista','Reksai','Illaoi','Leona','Gragas','Lulu','Poppy','Fiora','Udyr','Ziggs','Viktor','Sejuani','Varus','Nautilus','Draven','Bard',
    'Mordekaiser','Ekko','Yorick','Pantheon','Ezreal','Garen','Akali','Kennen','Vayne','Jayce','Cassiopeia','Lissandra','Rumble','Khazix','Darius','Hecarim','Skarner','Lucian',
    'Heimerdinger','Nasus','Zed','Nidalee','Syndra','Quinn','JarvanIV','Renekton','Maokai','AurelionSol','Nocturne','Katarina','LeeSin','MonkeyKing','Brand','Azir','Elise','Diana',
    'Nami','Orianna','Aatrox','Zyra','Trundle','Veigar','Taric','Caitlyn','Blitzcrank','Malphite','Vi','Swain'
];



$(window).load(function() {
    $("#control_ward").on("click",function(){
        socket.emit('spawn',{
            id:"control_ward",
            pos:{x: 0, y:0}
        })
    });


    $("#trinket_ward").on("click",function(){
        socket.emit('spawn',{
            id:"trinket_ward",
            pos: {x: 0, y:0}
        })
    });

    $('.js-typeahead').typeahead({
            highlight: true,
            minLength: 1,
            limit: 5,
            order: "asc",
            offset: true,
            searchOnFocus: true,
            blurOnTab: false,
            hint: true,
            emptyTemplate: 'no result for {{query}}',
        },
        {
            name: 'states',
            source: substringMatcher(states)
        });
});

function spawn(obj){
    console.log("spawned: "+ obj.spawnID);
    const id = "draggable" + obj.spawnID;
    $("#spawn_icons").prepend('<div id="draggable_'+obj.spawnID+'" style="position:absolute;left:85%;top:50%;" class="ui-widget-content leagueIcons">'+
        '<img class="leagueIcons IconSpawn" src="assets/img/league/'+ obj.id +'.png" alt="MISSING">'+
        '</div>');

    $( "#draggable_" + obj.spawnID ).draggable({
        stop: function(event, ui)
        {
            socket.emit('drag',{
                x:ui.offset.left,
                y:ui.offset.top,
                dimension:{width: canvas.width,height: canvas.height},
                obj:obj.spawnID
            });
        }
    });

}


