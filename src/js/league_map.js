/**
 * Created by Thinh-Laptop on 01.02.2018.
 */

const socket = io();
let spawnDrag = 0;
let canElement;

socket.on('cursor', function(msg){
    if (canElement != undefined) canElement.clearRect(0, 0, a.width, a.height);
    //ctx_cursor.clearRect(0, 0, w, h);
    //console.log('message: ' + msg);
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

socket.on('spawnChamp', function(msg){
    console.log(">> Received spawn object: " + msg.id + " id: " + msg.spawnID);
    spawnChamp(msg);
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


const champs = [ {name: "Shaco", picture: "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/"+[name] +".png"}
    ,{name:"DrMundo", picture: ""},{name:"Rammus", picture: ""},{name:"Anivia", picture: ""},{name:"Irelia", picture: ""},{name:"Yasuo", picture: ""},{name:"Sona", picture: ""},{name:"Kassadin", picture: ""},{name:"Zac", picture: ""},{name:"Gnar", picture: ""},{name:"Karma", picture: ""}
    ,{name:"Corki", picture: ""},{name:"Gangplank", picture: ""}, {name:"Janna", picture: ""},{name:"Jhin", picture: ""}, {name:"Kindred", picture: ""},{name:"Braum", picture: ""}, {name:"Ashe", picture: ""},{name:"Tryndamere", picture: ""}, {name:"Jax", picture: ""},{name:"Morgana", picture: ""},
    {name:"Zilean", picture: ""},{name:"Singed", picture: ""}, {name:"Evelynn", picture: ""},{name:"Twitch", picture: ""}, {name:"Galio", picture: ""},{name:"Velkoz", picture: ""},
    {name:"Olaf", picture: ""},{name:"Taliyah", picture: ""}, {name:"Annie", picture: ""},{name:"Leblanc", picture: ""}, {name:"Karthus", picture: ""}, {name:"Urgot", picture: ""},{name:"Xinzhao", picture: ""},
    {name:"Amumu", picture: ""},{name:"TwistedFate", picture: ""}, {name:"Chogath", picture: ""},{name:"FiddleSticks", picture: ""}, {name:"Vladimir", picture: ""},{name:"Warwick", picture: ""},{name:"Teemo", picture: ""},{name:"Tristana", picture: ""},{name:"Sivir", picture: ""},
    {name:"Soraka", picture: ""},{name:"Ryze", picture: ""},{name:"Sion", picture: ""}, {name:"MasterYi", picture: ""},{name:"Alistar", picture: ""},{name:"MissFortune", picture: ""},{name:"Nunu", picture: ""},{name:"Rengar", picture: ""},{name:"Volibear", picture: ""},{name:"Fizz", picture: ""},{name:"Graves", picture: ""},{name:"Ahri", picture: ""},{name:"Shyvana", picture: ""},{name:"Lux", picture: ""},{name:"Xerath", picture: ""},{name:"Tresh", picture: ""},{name:"Shen", picture: ""},{name:"Jinx", picture: ""},{name:"Kogmaw", picture: ""},{name:"TahmKench", picture: ""},{name:"Riven", picture: ""},
    {name:"Talon", picture: ""},{name:"Malzahar", picture: ""}, {name:"Kayle", picture: ""},{name:"Kalista", picture: ""}, {name:"Reksai", picture: ""},{name:"Illaoi", picture: ""}, {name:"Leona", picture: ""},{name:"Gragas", picture: ""}, {name:"Lulu", picture: ""},{name:"Poppy", picture: ""},
    {name:"Fiora", picture: ""},{name:"Udyr", picture: ""}, {name:"Ziggs", picture: ""},{name:"Viktor", picture: ""}, {name:"Sejuani", picture: ""},{name:"Varus", picture: ""},{name:"Nautilus", picture: ""},{name:"Draven", picture: ""},{name:"Bard", picture: ""}, {name:"Mordekaiser", picture: ""},{name:"Ekko", picture: ""}, {name:"Yorick", picture: ""},{name:"Pantheon", picture: ""},
    {name:"Ezreal", picture: ""},{name:"Garen", picture: ""}, {name:"Akali", picture: ""},{name:"Kennen", picture: ""}, {name:"Vayne", picture: ""},{name:"Jayce", picture: ""},
    {name:"Cassiopeia", picture: ""},{name:"Lissandra", picture: ""},{name:"Rumble", picture: ""},{name:"Khazix", picture: ""},{name:"Darius", picture: ""},{name:"Hecarim", picture: ""},{name:"Skarner", picture: ""},{name:"Lucian", picture: ""},
    {name:"Heimerdinger", picture: ""},{name:"Nasus", picture: ""}, {name:"Zed", picture: ""},{name:"Nidalee", picture: ""}, {name:"Syndra", picture: ""},{name:"Quinn", picture: ""}, {name:"JarvanIV", picture: ""},{name:"Renekton", picture: ""},
    {name:"Maokai", picture: ""},{name:"AurelionSol", picture: ""},{name:"Nocturne", picture: ""},{name:"Katarina", picture: ""},{name:"LeeSin", picture: ""},{name:"MonkeyKing", picture: ""},{name:"Brand", picture: ""},{name:"Azir", picture: ""},{name:"Elise", picture: ""},{name:"Diana", picture: ""}, {name:"Nami", picture: ""},{name:"Orianna", picture: ""},
    {name:"Aatrox", picture: ""},{name:"Zyra", picture: ""}, {name:"Trundle", picture: ""},{name:"Veigar", picture: ""}, {name:"Taric", picture: ""},{name:"Caitlyn", picture: ""}, {name:"Blitzcrank", picture: ""},{name:"Malphite", picture: ""},{name:"Vi", picture: ""},{name:"Swain", picture: ""}
];

const champions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: champs
});



$(window).load(function() {
    $("#control_ward").on("click",function(){
        socket.emit('spawn',{
            id:"control_ward",
            type:'ward',
            pos:{x: 0, y:0}
        })
    });


    $("#trinket_ward").on("click",function(){
        socket.emit('spawn',{
            id:"trinket_ward",
            type:'ward',
            pos: {x: 0, y:0}
        })
    });

    for(let champ of champs){
        champ.picture = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/"+ champ.name +".png";
    }

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
            name: 'champions',
            displayKey: 'name',
            source: champions.ttAdapter(),
            templates: {
                empty: ' no result for search',
                suggestion: function(el){
                    return '<p class="leagueChamps"> <img class="leagueIcons leagueChamps" src="'+el.picture+'" />' + el.name + '</p>'; }
            }
        },


        ).on('typeahead:selected', function(evt, item) {
        //console.log("item: " + JSON.stringify(item));
        socket.emit('spawn',{
            id:item.name,
            type:'champion',
            image:item.picture,
            red:$("#redSideOpt").is(":checked"),
            pos:{x: 0, y:0}
        })

        }).on('keyup', function(e) {
        if(e.which === 13) {
            $(".tt-suggestion:first-child").trigger('click');
        }
    })
    ;


});

function spawnChamp(champ){
    //console.log("spawned: "+ champ.id);
    const id = "draggable" + champ.spawnID;
    let border = "imgBorderRed";
    if(!champ.red) border ="imgBorderBlue";

    $("#spawn_icons").prepend('<div id="draggable_'+champ.spawnID+'" style="position:absolute;left:85%;top:50%;" class="ui-widget-content leagueIcons">'+
        '<img class="leagueIcons IconSpawn '+border+'" src="'+champ.image+'" alt="MISSING">'+
        '</div>');

    $( "#draggable_" + champ.spawnID ).draggable({
        stop: function(event, ui)
        {
            socket.emit('drag',{
                x:ui.offset.left,
                y:ui.offset.top,
                dimension:{width: canvas.width,height: canvas.height},
                obj:champ.spawnID
            });
        }
    });

}

function spawn(obj){
    //console.log("spawned: "+ obj.id);
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


