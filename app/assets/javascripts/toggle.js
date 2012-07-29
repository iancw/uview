var canvas;
var ghostcanvas;
var image;

var seats = [];

var dims = {width:10, height:10};
var spacing = 5;


//main hall balcony...
var section1 = {
    startseat: 0,
    sectionno: 0,
    angle: 0,
    offsetx: 5,
    offsety: 0,
    rows: [7, 5, 5, 5, 8, 8, 8, 8]
};

var section2 = {
    startseat: 0,
    sectionno: 1,
    angle: 0,
    offsetx: 8*(dims.width+spacing)+2*spacing,
    offsety: 0,
    rows: [8, 6, 6, 12, 12, 11, 10, 9]
}

var section3 = {
    startseat:0,
    sectionno:2,
    angle: 90,
    offsetx: section2.offsetx + 12*(dims.width+spacing) + 2*spacing,
    offsety: section2.rows.length * (dims.height+spacing) + 2*spacing,
    rows: [14, 10, 9]
}

var section4 = {
    startseat:0,
    sectionno:3,
    angle:90,
    offsetx: section3.offsetx,
    offsety: section3.offsety + 14*(dims.height+spacing) + 2*spacing,
    rows: [8, 8, 8]
}

var section5 = {
    startseat:0,
    sectionno:4,
    angle:180,
    offsetx:section4.offsetx - section4.rows.length*(dims.width+spacing) - 2*spacing,
    offsety: section4.offsety + 4*(dims.width+spacing) + 8*(dims.width+spacing),
    rows: [7, 7, 9, 10]
}


var sections = new Array(section1, section2, section3, section4, section5);

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
        alert("Received put response (HTTP: "+request.status+"/"+request.responseText+".");
    }
}

function hardcodeSeats(){
    //Initialize all seats to 0
    for(sec=0; sec<sections.length; sec++){
        for(r=0; r<sections[sec].rows.length; r++){
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

function pickColorSeat(seatno){
//    alert(str.fontcolor(rgb(seatno, seatno, seatno)));
//    return str.fontcolor(rgb(seatno, seatno, seatno));
    return "#" + compToHex(seatno) + compToHex(seatno) + compToHex(0);
}

function pickColorSection(filled, sectionno){
    return "#" + compToHex(0) + compToHex(0) + compToHex(sectionno);
}

function filledColor(filled, sectionno){
    if(filled == 0){
        return "#00FF00";
    }
    return "#000000"; 
}

function realColor(seatno){
    if(seatno < seats.length){
       return filledColor(seats[seatno]);
   }
   return "#FFFFFF";
}

function drawSection(section, context, seatno, colorfunc, sectioncolor){
    context.translate(section.offsetx, section.offsety);
    context.rotate(section.angle * Math.PI / 180.0);

    section.startseat=seatno;
    var filled=0;
    var empty=0;

    for(ro=0; ro<section.rows.length; ro++){
        for(i=0; i<section.rows[ro]; i++){
            var radius=i*(dims.width+spacing);
            context.fillStyle = colorfunc(seatno);
            if(seats[seatno] == 0){empty++;}
            else{ filled++; }
            context.fillRect(radius, 0, dims.width,dims.height);
            seatno++;
        }
        context.translate(0, (dims.height+spacing));
    }
    //Make the color opposite of the majority
    //to make it most convenient to toggle
    
    var sectionCol=1;
    if(filled > empty){
        sectionCol=0;
    }
    context.fillStyle=sectioncolor(sectionCol, section.sectionno);
    context.beginPath();
    context.arc(dims.width, dims.height,dims.width, 0,Math.PI*2,true);
    context.closePath();
    context.fill();

    return seatno;
}

// canvas image manipulation 
function draw(drawCanv, colorfunc, sectionfunc) {
    var localContext = drawCanv.getContext('2d');
    localContext.fillStyle = "#FFFFFF";
    localContext.fillRect(0, 0, drawCanv.width, drawCanv.height);

    var seatno=0;
    for(ix=0; ix<sections.length; ix++){
        seatno=drawSection(sections[ix], localContext, seatno, colorfunc, sectionfunc);
        localContext.setTransform(1, 0, 0, 1, 0, 0);
    }
}

function process(evt) {

	canvas = document.getElementById('seatCanvas');
    var mous = getMousePos(evt);

    var pickedseat = getSeat(mous);

    if(pickedseat < 0){
        //Select or deselect all seats in the section...
        sec=sections[(-1*pickedseat)-1]
        var filled=0, empty=0, seatoff=0;
        for(ssi=0; ssi<sec.rows.length; ssi++){
            for(rri=0; rri<sec.rows[ssi]; rri++){
                if(seats[sec.startseat+seatoff]==1){
                    filled++;
                }else{
                    empty++;
                }
                seatoff++;
            }
        }
        var fillval=1;
        if(filled > empty){
            fillval=0;
        }
        for(sso=0; sso<seatoff; sso++){
            if(seats[sec.startseat + sso] != fillval){
                sendSeatsJSON(sec.startseat + sso);
                seats[sec.startseat + sso] = fillval
            }


        }
        draw(canvas, realColor, filledColor);
    }
    if(pickedseat < seats.length && pickedseat >= 0){
        if(seats[pickedseat]==0){ 
            seats[pickedseat]=1;
        }
        else{
            seats[pickedseat]=0;
        }
        sendSeatsJSON(pickedseat);
        draw(canvas, realColor, filledColor);
    }
}

/*
* If value returned is greater than 1, it's a seat number
* If it's less than 1, it's a section number
*/
function getSeat(mousePos){
    if(mousePos.x >= ghostcanvas.width || mousePos.y >= ghostcanvas.height){
        return -257;
    }
    var gctx = ghostcanvas.getContext('2d');
    var data = gctx.getImageData(mousePos.x, mousePos.y, 1, 1);
    //Sections have zeroed red and blue components
    if(data.data[0]==0 && data.data[1]==0){
        var retval= (-1 * data.data[2])-1;
        return retval;
    }else if(data.data[2]==0){
        return data.data[0];
    }
    return -258;
    
}

function redraw(){
    canvas = document.getElementById('seatCanvas');
    draw(canvas, realColor, filledColor);
}

function init() {
    initSeats()
    canvas = document.getElementById('seatCanvas');
    canvas.width  = canvWidth;
    canvas.height = canvHeight;
    canvas.addEventListener('click', process, false);
    draw(canvas, realColor, filledColor);

    ghostcanvas = document.createElement('canvas');//getElementById('ghostcanvas');
    ghostcanvas.height = canvas.height;
    ghostcanvas.width = canvas.width;
    draw(ghostcanvas, pickColorSeat, pickColorSection);

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