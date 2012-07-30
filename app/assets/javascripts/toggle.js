var canvas;
var ghostcanvas;
var image;

var seats = [];

var winW = 650, winH = 650;
/*
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
}*/

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

function postMultipleSeats(seatArr){
    var url = "/seats.json";
    request.open("POST", url, true);
    request.onreadystatechange=handlePostResponse;
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accepts", "application/json");
    request.send(JSON.stringify(seatArr));
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
    var retval= "#" + compToHex(seatno % 256) + compToHex(Math.floor(seatno / 256)) + compToHex(0);
    return retval;
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
    //For each row in the section...
    for(ro=0; ro<section.rows.length; ro++){
        //for each seat in the row...
        for(i=0; i<section.rows[ro]; i++){
            var radius=section.rowoffsets[ro]*(dims.width+spacing) + i*(dims.width+spacing);
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
    var sectoffset = section.rowoffsets[section.rows.length-1];
    context.beginPath();
    context.arc(dims.width + sectoffset*perseat,
        dims.height,
        dims.width, 
        0, Math.PI*2,true);
    context.fill();
    context.closePath();


    return seatno;
}

// canvas image manipulation 
function draw(drawCanv, colorfunc, sectionfunc) {
    var localContext = drawCanv.getContext('2d');
    localContext.lineWidth=0;
    localContext.strokeStyle="#FFFFFF";
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
        var allModified=[];
        for(sso=0; sso<seatoff; sso++){
            var seatno = sec.startseat + sso;
            if(seats[seatno] != fillval){
                seats[seatno] = fillval;
                allModified[allModified.length] = {id: (seatno+1), state: seats[seatno]};
            }
        }
        if(allModified.length > 0){
            redraw();
            postMultipleSeats(allModified);
        }
    }
    if(pickedseat < seats.length && pickedseat >= 0){
        if(seats[pickedseat]==0){ 
            seats[pickedseat]=1;
        }
        else{
            seats[pickedseat]=0;
        }
        redraw();
        sendSeatsJSON(pickedseat);
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
        return data.data[0] + data.data[1]*256;
    }
    return -258; 
}

function redraw(){
    canvas = document.getElementById('seatCanvas');
    var lctx=canvas.getContext('2d');
//    lctx.fillStyle = "#FFFFFF";
//    lctx.fillRect(0, 0, drawCanv.width, drawCanv.height);
    fillSections(canvas);
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
    var lctx=ghostcanvas.getContext('2d');
    lctx.fillStyle = "#FFFFFF";
    lctx.fillRect(0, 0, ghostcanvas.width, ghostcanvas.height);
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