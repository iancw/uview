var canvas;
var ghostcanvas;
var image;

var seats = [];

//Updated count every draw, for potential user display
var numFilled=0;

//Is null for overview, if not null, draw function
//will only draw this section, for easier data entry
var currentSection;

//Code passed when section close button is clicked
var exitSection = 500;

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
}
*/

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
    if(sectionno == -300){
        return null;
    }
    if(sectionno == 254)
    {
        return "#FF0000";
    }
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

/*
* Parameters:
* section - actual section object / struct
* context - canvas 2d context for drawing
* seatno - start seatno, used to set section.startseat on the first time
* colorfunc - function to color seats, used for picking / display 
* sectioncolor - function to color sections, used to pick an entire section for focus.
*/
function drawSection(section, context, seatno, colorfunc, sectioncolor){
    section.startseat=seatno;
    var filled=0;
    var empty=0;

    //Points are used to keep track of the outer bounding hull of a section,
    //which allows you to click anywhere on a section in the overview
    var points=[];
    var points2=[];
    
    points2[points2.length] = {
        x: section.rowoffsets[0]*perseat + section.rows[0]*perseat,
        y: 0
     };
    for(ro=0; ro<section.rows.length; ro++){
        //for each seat in the row...
        for(i=0; i<section.rows[ro]; i++){
            var radius=section.rowoffsets[ro]*(dims.width+spacing) + i*(dims.width+spacing);
            context.fillStyle = colorfunc(seatno);
            if(seats[seatno] == 0){empty++;}
            else{ filled++; }
            context.fillRect(radius, ro*perseat, dims.width,dims.height);
            seatno++;
        }
        points[points.length] = {x: section.rowoffsets[ro]*perseat, y:(ro)*perseat};
        points2[points2.length] = {
            x: section.rowoffsets[ro]*perseat + section.rows[ro]*perseat,
            y:(ro+1)*perseat
        };
    }
    //Add the filled seats for this section
    numFilled = numFilled + filled;
    points[points.length] = {
        x: section.rowoffsets[section.rowoffsets.length-1]*perseat,
        y: (section.rows.length)*perseat
     };
 
    points = points.concat(points2.reverse());

    var sectionCol=1;
    if(filled > empty){
        sectionCol=0;
    }

    //currentSection == undefined means we're in overview mode
    if(currentSection == undefined){
        drawSectionHull(context, section, points, sectioncolor, sectionCol);
        
    }else{
        drawSectionToggle(context, section, sectioncolor, sectionCol);
        drawSectionExit(context, section, sectioncolor, sectionCol);
    }

    return seatno;
}

/*
* sectionCol - 1 means draw the section toggle green
*            - 0 means draw the section toggle black            
*/
function drawSectionHull(context, section, points, sectioncolor, sectionCol){
    var sectionPick=sectioncolor(sectionCol, -300);
    if(sectionPick != null){
        context.fillStyle=sectioncolor(sectionCol, section.sectionno);
        context.beginPath();
        for(i=0; i<points.length; i++){
        context.lineTo(points[i].x, points[i].y);
        }
        context.fill();
        context.closePath();
    }
}

function drawSectionExit(context, section, sectioncolor, sectionCol)
{
    //This assumes its called right after SectionToggle
    context.translate(dims.width*2, 0);
    context.fillStyle=sectioncolor(sectionCol, 254);
    context.fillRect(10, 0, 2*dims.width, 2*dims.height);
}

function drawSectionToggle(context, section, sectioncolor, sectionCol)
{
    //Make the color opposite of the majority
    //to ma ke it most convenient to toggle
       
    context.translate(0, section.rows.length * perseat);
    context.fillStyle=sectioncolor(sectionCol, section.sectionno);
    var sectoffset = section.rowoffsets[section.rows.length-1];
    context.beginPath();
    context.arc(dims.width + sectoffset*perseat,
        dims.height,
        dims.width, 
        0, Math.PI*2,true);
    context.fill();
    context.closePath();

}

// canvas image manipulation 
function drawAllSections(drawCanv, colorfunc, sectionfunc) {
    var localContext = drawCanv.getContext('2d');
    localContext.lineWidth=0;
    localContext.strokeStyle="#FFFFFF";
    var seatno=0;
    numFilled=0;
    for(ix=0; ix<sections.length; ix++){

        localContext.translate(sections[ix].offsetx, sections[ix].offsety);
        localContext.rotate(sections[ix].angle * Math.PI / 180.0);

        seatno=drawSection(sections[ix], localContext, seatno, colorfunc, sectionfunc);
        localContext.setTransform(1, 0, 0, 1, 0, 0);
    }
}

/*
* Either picks a current section, or picks and toggles a seat in that section...
*/
function process(evt) {
    canvas = document.getElementById('seatCanvas');
    var mous = getMousePos(evt);

    var pickedseat = getSeat(mous);

    //When currentSection is not undefined, we're in a section
    //focus view, so we either toggle a seat, toggle a row, 
    //or toggle the whole section
    if(currentSection != undefined)
    {
        //If the value is positive and a valid index into the
        //seats array, we toggle that one seat
        if(pickedseat < seats.length && pickedseat >= 0)
        {
            //pick a seat...
            toggleSeat(pickedseat);
        }else{
            //if the value is less than zero, it's code for a row or for the whole section...
            var pickedSection = (-1*pickedseat)-1;
            //254 is code for exit section view...
            if(pickedSection == 254)
            {
                currentSection = undefined;
                redraw();
                return;
            }
            if(pickedSection < sections.length){
               sec=sections[pickedSection];
                toggleSection(currentSection);
            }
        }
    }else{
        //Current section is undefined, so we're in the overview...
       if(pickedseat < 0){
            sec=sections[(-1*pickedseat)-1];
            currentSection = sec;
            redraw();
        }else if(pickedseat == exitSection){
            currentSection=undefined;
            redraw();
        }
    }
}

/*
* Toggles state of the section
*/
function toggleSection(sec){
    //Select or deselect all seats in the section...
    //Clicked on a section...
    currentSection=sec;
    showInfo("Picked section "+sec.sectionno);
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

/*
 * Assumes pickedseat is < seats.length and >= 0; a valid seat index
*/
function toggleSeat(pickedseat)
{
    if(seats[pickedseat]==0){ 
        seats[pickedseat]=1;
    }
    else{
        seats[pickedseat]=0;
    }
    redrawSeat(pickedseat);
    sendSeatsJSON(pickedseat);
}

/*
* If value returned is greater than 1, it's a seat number
* If it's less than 1, it's a section number
* 
* Special codes:  
*  -257 means the click is outside of the canvas
*  -258 means the click didn't hit anything
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
    canvas = $('#seatCanvas')[0];
    redrawCanvas(canvas, realColor, filledColor);
    redrawCanvas(ghostcanvas, pickColorSeat, pickColorSection);
}

function redrawSeat(seatno){
    canvas = $('#seatCanvas')[0];
    redrawCanvas(canvas, realColor, filledColor);
}
 

function redrawCanvas(canvas, seatColor, sectionColor)
{
    var lctx=canvas.getContext('2d');
    if(currentSection == undefined){
        dims.width = 10;
        dims.height = 10;
        spacing = 5;
        perseat = dims.width + spacing;
        canvas.width=canvWidth;
        canvas.height=canvHeight;
        lctx.fillStyle="#FFFFFF";
        lctx.fillRect(0, 0, canvas.width, canvas.height);
        fillSections(canvas);
        drawAllSections(canvas, seatColor, sectionColor);
        showInfo("Currently "+numFilled+" occupied seats");
    }else{
        //Draw current section
        canvas.width=screen.width;
        canvas.height=screen.height;
        lctx.fillStyle="#FFFFFF";
        lctx.fillRect(0, 0, canvas.width, canvas.height);
        scaleSection(currentSection);

        numFilled=0
        drawSection(currentSection, lctx, currentSection.startseat, seatColor, sectionColor);
        lctx.setTransform(1,0,0,1,0,0);
        showInfo("Currently "+numFilled+" occupied seats in section; screen size: "+screen.width+"x"+screen.height+", <br/> window size: "+window.innerWidth+"x"+window.innerHeight);
    }
}

function scaleSection(sect)
{
    //Add two rows to account for control buttons at the bottom
    var numRows = sect.rows.length +2;
    var numCols = sect.rows[0];
    for(i=0; i<numRows; i++)
    {
        if(sect.rows[i] > numCols)
        {
            numCols = sect.rows[i];
        }
    }
    var pxPerRow = canvas.height / numRows;
    var pxPerCol = canvas.width / numCols;
    perseat = Math.min(pxPerRow, pxPerCol);
    spacing = 1.0/3.0 * perseat;
    dims.width =  perseat - spacing;
//    alert("px per seat = "+perseat+", pxPerRow="+pxPerRow+", pxPerCol="+pxPerCol+" / dims.width="+dims.width)
    dims.height = dims.width;
}

function showInfo(val){
    $("#infoDiv").html(val);
}

function init() {
    initSeats()
    canvas = document.getElementById('seatCanvas');
    canvas.width  = canvWidth;
    canvas.height = canvHeight;

    canvas.addEventListener('click', process, false);
    drawAllSections(canvas, realColor, filledColor);

    ghostcanvas = document.createElement('canvas');//getElementById('ghostcanvas');
    ghostcanvas.height = canvas.height;
    ghostcanvas.width = canvas.width;
    var lctx=ghostcanvas.getContext('2d');
    lctx.fillStyle = "#FFFFFF";
    lctx.fillRect(0, 0, ghostcanvas.width, ghostcanvas.height);
    drawAllSections(ghostcanvas, pickColorSeat, pickColorSection);

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