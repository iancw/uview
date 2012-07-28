var canvas;
var ghostcanvas;
var image;

var seats = [];

var section1 = {
    angle: 45,
    offsetx: 50,
    offsety: 0,
    numRows: 3,
    rows: [10, 10, 10]
};

var section2 = {
    angle: 0,
    offsetx: 20,
    offsety: 300,
    numRows: 5,
    rows: [15, 15, 15, 15, 15]
}

var dims = {width:20, height:20};
var spacing = 5;

var sections = new Array(section1, section2);

var winW = 630, winH = 460;
if (document.body && document.body.offsetWidth) {
 winW = document.body.offsetWidth;
 winH = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 winW = document.documentElement.offsetWidth;
 winH = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 winW = window.innerWidth;
 winH = window.innerHeight;
}

canvWidth=winW;
canvHeight=winH-50;

var request = false;
try {
 request = new XMLHttpRequest();
} catch (trymicrosoft) {
 try {
   request = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (othermicrosoft) {
   try {
     request = new ActiveXObject("Microsoft.XMLHTTP");
   } catch (failed) {
     request = false;
   }  
 }
}

if (!request)
 alert("Error initializing XMLHttpRequest!");


window.onload=init

function initSeats(){
    var url = "/seats.json"
    request.onreadystatechange = loadSeatsJSON;
    request.open("GET", url, true);
    request.send(null);
    loadSeatsJSON();
}

function loadSeatsJSON(seatsJSON)
{
    if (request.readyState == 4) {
        if(request.status == 200){
            var seatsJSON = jQuery.parseJSON(request.responseText);
            //var seatsJSON = [{"created_at":"2012-07-27T12:29:33Z","id":1,"state":1,"updated_at":"2012-07-27T12:29:33Z"},{"created_at":"2012-07-27T12:32:46Z","id":2,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":3,"state":1,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":4,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":5,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":6,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":7,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":8,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":9,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":10,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":11,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":12,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":13,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":14,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":15,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":16,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":17,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":18,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":19,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":20,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":21,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":22,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":23,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":24,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":25,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":26,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":27,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":28,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":29,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":30,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":31,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":32,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":33,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":34,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":35,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":36,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":37,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":38,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":39,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":40,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":41,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":42,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":43,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":44,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":45,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":46,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":47,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":48,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":49,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":50,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":51,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":52,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":53,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":54,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":55,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":56,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":57,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":58,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":59,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":60,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":61,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":62,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":63,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":64,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":65,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":66,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":67,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":68,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":69,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":70,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":71,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":72,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":73,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":74,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":75,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":76,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":77,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":78,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":79,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":80,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":81,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":82,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":83,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":84,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":85,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":86,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":87,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":88,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":89,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":90,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":91,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":92,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":93,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":94,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":95,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":96,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":97,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":98,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":99,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":100,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":101,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":102,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":103,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":104,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":105,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":106,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":107,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":108,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":109,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":110,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":111,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":112,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":113,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":114,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":115,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":116,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":117,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":118,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":119,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":120,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":121,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":122,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":123,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":124,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":125,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":126,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":127,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":128,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":129,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":130,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":131,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":132,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":133,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":134,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":135,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":136,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":137,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":138,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":139,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":140,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":141,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":142,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":143,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":144,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":145,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":146,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":147,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":148,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":149,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":150,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":151,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":152,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":153,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":154,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":155,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":156,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":157,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":158,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":159,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":160,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":161,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":162,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":163,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":164,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":165,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":166,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":167,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":168,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":169,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":170,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":171,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":172,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":173,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":174,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":175,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":176,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":177,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":178,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":179,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":180,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":181,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":182,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":183,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":184,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":185,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":186,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":187,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":188,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":189,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":190,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":191,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":192,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":193,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":194,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":195,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":196,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":197,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":198,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":199,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":200,"state":0,"updated_at":"2012-07-27T12:32:46Z"},{"created_at":"2012-07-27T12:32:46Z","id":201,"state":0,"updated_at":"2012-07-27T12:32:46Z"}]
            for(six=0; six<seatsJSON.length; six++){
                seats[seats.length]=seatsJSON[six].state;
            }
            redraw()
        }else{
            alert("HTTP status: "+request.status);
        }
    }
}

function makeSeatJSON(seatno){
    return JSON.stringify({id: seatno+1, state: seats[seatno]});
}

function sendSeatsJSON(seatno){
    var url = "/seats/"+(seatno+1)+".json";
    request.open("PUT", url, true);
    request.onreadystatechange=handlePostResponse;
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accepts", "application/json");
    request.send(makeSeatJSON(seatno));
}

function handlePostResponse(){
    if (request.readyState == 4) {
        if(request.status >= 300){
            alert("Status: "+request.status+", "+request.responseText);
        }
    }
}

function hardcodeSeats(){
    //Initialize all seats to 0
    for(sec=0; sec<sections.length; sec++){
        for(r=0; r<sections[sec].numRows; r++){
            for(iseat=0; iseat<sections[sec].rows[r]; iseat++){
                seats[seats.length]=0;
            }
        }
    }
}

function compToHex(c){
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function pickColor(seatno){
//    alert(str.fontcolor(rgb(seatno, seatno, seatno)));
//    return str.fontcolor(rgb(seatno, seatno, seatno));
    return "#" + compToHex(seatno) + compToHex(seatno) + compToHex(seatno);
}

function realColor(seatno){
    if(seatno < seats.length && seats[seatno]>0){
        return "#00FF00";
    }
    return "#000000";
}

function drawSection(section, context, seatno, colorfunc){
    context.translate(section.offsetx, section.offsety);
    context.rotate(section.angle * Math.PI / 180.0);
    for(ro=0; ro<section.numRows; ro++){
        for(i=0; i<section.rows[ro]; i++){
            var radius=i*(dims.width+spacing);
            context.fillStyle = colorfunc(seatno);
            context.fillRect(radius, 0, dims.width,dims.height);
            seatno++;
        }
        context.translate(0, (dims.height+spacing));
    }
    return seatno;
}

// canvas image manipulation 
function draw(drawCanv, colorfunc) {
    var localContext = drawCanv.getContext('2d');
    localContext.fillStyle = "#FFFFFF";
    localContext.fillRect(0, 0, drawCanv.width, drawCanv.height);

    var seatno=0;
    for(ix=0; ix<sections.length; ix++){
        seatno=drawSection(sections[ix], localContext, seatno, colorfunc);
        localContext.setTransform(1, 0, 0, 1, 0, 0);
    }
}

function process(evt) {
	canvas = document.getElementById('seatCanvas');
    var mous = getMousePos(evt);

    var pickedseat = getSeat(mous);
    if(seats[pickedseat]==0){ 
        seats[pickedseat]=1;
    }
    else{
        seats[pickedseat]=0;
    }
    sendSeatsJSON(pickedseat);
    draw(canvas, realColor);

}

function getSeat(mousePos){
    if(mousePos.x >= ghostcanvas.width || mousePos.y >= ghostcanvas.height){
        return -1;
    }
    var gctx = ghostcanvas.getContext('2d');
    var data = gctx.getImageData(mousePos.x, mousePos.y, 1, 1);

    return data.data[2];
}

function redraw(){
    canvas = document.getElementById('seatCanvas');
    draw(canvas, realColor);
}

function init() {
    initSeats()
    canvas = document.getElementById('seatCanvas');
    canvas.width  = canvWidth;
    canvas.height = canvHeight;
    canvas.addEventListener('click', process, false);
    draw(canvas, realColor);

    ghostcanvas = document.createElement('canvas');//getElementById('ghostcanvas');
    ghostcanvas.height = canvas.height;
    ghostcanvas.width = canvas.width;
    draw(ghostcanvas, pickColor);
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
	// return relative mouse position
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    return {
    	x: mouseX,
        y: mouseY
    };
}