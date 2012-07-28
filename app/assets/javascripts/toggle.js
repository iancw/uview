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
}

function poll(){
    var url = "/seats.json"
    request.onreadystatechange = refreshSeats;
    request.open("GET", url, true);
    request.send(null);
}

function refreshSeats(){
     if (request.readyState == 4) {
        if(request.status == 200){
            var seatsJSON = jQuery.parseJSON(request.responseText);
            for(sji=0; sji<seatsJSON.length; sji++){
                var curJson=seatsJSON[sji];
                seats[curJson.id-1]=curJson.state;
            }
            redraw();
            setTimeout(poll, 5000);
        }
    }
}

function loadSeatsJSON()
{
    if (request.readyState == 4) {
        if(request.status == 200){
            var seatsJSON = jQuery.parseJSON(request.responseText);
            seats=[seatsJSON.length];
            for(six=0; six<seatsJSON.length; six++){
                seats[seatsJSON[six].id-1]=seatsJSON[six].state;
            }
            redraw()
        }else{
            alert("HTTP status: "+request.status);
        }
    }
}

function makeSeatJSON(seatno){
    return JSON.stringify({state: seats[seatno]});
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
    if(pickedseat < seats.length){
        if(seats[pickedseat]==0){ 
            seats[pickedseat]=1;
        }
        else{
            seats[pickedseat]=0;
        }
        sendSeatsJSON(pickedseat);
        draw(canvas, realColor);
    }

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

    poll();
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