
var dims = {width:10, height:10};
var spacing = 5;

var perseat=(dims.width + spacing);
var between_sections = 2*spacing;

//West hall balcony
var section_a = {
    startseat:0,
    sectionno:0,
    angle:-90,
    offsetx:0,
    offsety:11*perseat + between_sections + 11*perseat + between_sections + 6*perseat,
    rows: [11, 11, 11, 11],
    rowoffsets:[0, 0, 0, 0]
}

var section_b = {
    startseat:0,
    sectionno:1,
    angle:-90,
    offsetx: 0,
    offsety: section_a.offsety - (11*perseat + between_sections),
    rows: [11, 11, 10, 10],
    rowoffsets: [0, 0, 0, 0]
}

var section_c = {
    startseat:0,
    sectionno:2,
    angle:-45,
    offsetx: 2*perseat,
    offsety: 7*perseat*Math.sin(45.0 * Math.PI / 180.0 ) + between_sections,
    rows:[5, 6, 7],
    rowoffsets:[3, 2, 1]
}

var section_d = {
    startseat:0,
    sectionno:3,
    angle:0,
    offsetx: section_c.offsetx + 7*perseat*Math.sin(45.0*Math.PI/180.0) + 3*between_sections,
    offsety: 0,
    rows: [10, 9, 8],
    rowoffsets: [0, 1, 2]
}

//main hall balcony...
var section1 = {
    startseat: 0,
    sectionno: 4,
    angle: 0,
    offsetx: section_d.offsetx + 10*perseat + 4*between_sections,
    offsety: 0,
    rows: [7, 5, 5, 5, 8, 8, 8, 8],
    rowoffsets: [1, 3, 3, 3, 0, 0, 0, 0]
};

var section2 = {
    startseat: 0,
    sectionno: 5,
    angle: 0,
    offsetx: section1.offsetx+ 8*perseat+2*spacing,
    offsety: 0,
    rows: [8, 6, 6, 12, 12, 11, 10, 9],
    rowoffsets: [1, 2, 2, 0, 0, 0, 0, 0]
}

var section3 = {
    startseat:0,
    sectionno:6,
    angle: 90,
    offsetx: section2.offsetx + 12*perseat + 2*spacing,
    offsety: section2.rows.length * perseat - 3*perseat,
    rows: [11, 10, 9],
    rowoffsets: [2, 3, 4]
}

var section4 = {
    startseat:0,
    sectionno:7,
    angle:90,
    offsetx: section3.offsetx,
    offsety: section3.offsety + 15*perseat + 2*spacing,
    rows: [8, 8, 8],
    rowoffsets: [0, 0, 0]
}

var section5 = {
    startseat:0,
    sectionno:8,
    angle:180,
    offsetx:section4.offsetx - section4.rows.length*perseat,
    offsety: section4.offsety + 18*perseat,
    rows: [7, 7, 9, 10],
    rowoffsets: [2, 2, 1, 0]
}
//Main hall
var section_m1 ={
    startseat:0,
    sectionno:0,
    angle:0,
    offsetx: section1.offsetx,
    offsety: section1.rows.length*perseat + 5*spacing,
    rows:      [9, 9, 11, 11, 10, 9, 8, 7, 6, 5, 4, 2],
    rowoffsets:[0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0]
}

var section_m2 = {
    startseat: 0,
    sectionno: 0,
    angle: 45,
    offsetx: section_m1.offsetx + 9*perseat + 10*spacing,  
    offsety: section_m1.offsety + 9*spacing,
    rows:      [5,6,8,8,8,7,7,6,6,5,5,5,5],
    rowoffsets:[0,0,0,0,0,0,0,0,0,0,0,0,0]
}

var section_m3 = {
    startseat: 0,
    sectionno: 0,
    angle: 80,
    offsetx: section5.offsetx - 2*perseat,
    offsety: section4.offsety + 2*perseat,
    rows:      [7, 11, 10, 9, 8, 7, 7, 6, 5, 4],
    rowoffsets:[0,  0,  0, 0, 1, 1, 1, 2, 2, 2]
}

var section_m4={
    startseat:0,
    sectionno: 0,
    angle:130,
    offsetx: section2.offsetx + 2*perseat,
    offsety: section5.offsety - 7*perseat,
    rows: [6, 7, 5, 4],
    rowoffsets: [2, 2, 3, 3]
}

var section_w1 = {
    startseat:0,
    sectionno:0,
    angle: -40,
    offsetx: section_d.offsetx + 3*perseat,
    offsety: section_m1.offsety + 2*perseat,
    rows:      [9, 9, 10, 9, 7, 5, 4, 2],
    rowoffsets:[0, 0,  0, 0, 1, 2, 2, 3]
}

var section_w2 = {
    startseat: 0,
    sectionno:0,
    angle:-90,
    offsetx: 6*perseat,
    offsety: section_a.offsety - 5*perseat,
    rows:      [12, 12, 11, 12, 12, 11, 11, 9, 8, 7, 5, 4],
    rowoffsets:[0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0]
}

var section_w3 = {
    startseat: 0,
    sectionno: 0,
    angle: -90,
    offsetx: section_w2.offsetx + 6*perseat,
    offsety: section_w2.offsety + 2*spacing + 11*perseat,
    rows: [11, 11, 10, 8, 6],
    rowoffsets: [0, 0, 1, 3, 5]
}

var section_w4 = {
    startseat: 0,
    sectionno: 0,
    angle: -90,
    offsetx: section_w2.offsetx,
    offsety: section_w2.offsety + 7*perseat + 2*spacing,
    rows: [5, 7, 7],
    rowoffsets: [0, 0, 0]
}

var section_w5 = {
    startseat: 0,
    sectionno: 0,
    angle: -115,
    offsetx: 2*perseat,
    offsety: section_w4.offsety  + 7*perseat,
    rows:       [4, 6, 6, 7, 5, 5],
    rowoffsets: [0, 0, 0, 0, 0, 0]
}

var sections = new Array(section_a, section_b, section_c, section_d, 
    section1, section2, section3, section4, section5, 
    section_m1, section_m2, section_m3, section_m4,
    section_w1, section_w2, section_w3, section_w4, section_w5);

for(i=0; i<sections.length; i++){
    sections[i].sectionno=i;
}

function fillSections(drawCanv){
    var localContext = drawCanv.getContext('2d');
    //West hall balcony...
    var lower= section_a.offsety+2*spacing;
    var outer = section_a.offsetx + 5*perseat + spacing;
    var corner1 = section_b.offsety - 9*perseat + 2;
    var corner2 = section_d.offsety + 4*perseat + 2*spacing;
    var corner3 = section_d.offsetx + section_d.rows[0]*perseat + 2*spacing;
    localContext.fillStyle = "#BBBBBB";
    localContext.strokeStyle = "#000000";
    localContext.beginPath();
    localContext.lineTo(0, lower);
    localContext.lineTo(outer, lower);
    localContext.lineTo(outer, corner1);
    localContext.lineTo(section_d.offsetx + 2*perseat, corner2);
    localContext.lineTo(corner3, corner2);
    localContext.lineTo(corner3, 0);
    localContext.lineTo(0, 0);
    localContext.lineWidth=5;
    localContext.fill();
    localContext.closePath();

    var startx = section1.offsetx - 2*spacing;
    lower = section1.rows.length * perseat + perseat + spacing;
    corner1 = section2.offsetx + section2.rows[section2.rows.length-1]*perseat - perseat;
    corner2 = section5.offsety - section5.rows.length*perseat - 2*perseat;
    corner3 = section5.offsetx - section5.rows[section5.rows.length-1]*perseat;
    var corner4 = section5.offsety+2*spacing;
    var corner5 = section4.offsetx + 2*spacing;
    localContext.beginPath();
    localContext.moveTo(startx, 0);
    localContext.lineTo(startx, lower);
    localContext.lineTo(corner1, lower);
    localContext.lineTo(corner1, corner2);
    localContext.lineTo(corner3, corner2);
    localContext.lineTo(corner3, corner4);
    localContext.lineTo(section5.offsetx+2*spacing, corner4);
    localContext.lineTo(section5.offsetx+2*spacing, corner2);
    localContext.lineTo(corner5, corner2);
    localContext.lineTo(corner5, 0);
    localContext.fill();
    localContext.closePath();
    localContext.strokeStyle="#FFFFFF";
}