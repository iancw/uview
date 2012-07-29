
var dims = {width:10, height:10};
var spacing = 5;

//main hall balcony...
var section1 = {
    startseat: 0,
    sectionno: 0,
    angle: 0,
    offsetx: 5,
    offsety: 0,
    rows: [7, 5, 5, 5, 8, 8, 8, 8],
    rowoffsets: [1, 3, 3, 3, 0, 0, 0, 0]
};

var section2 = {
    startseat: 0,
    sectionno: 1,
    angle: 0,
    offsetx: 8*(dims.width+spacing)+2*spacing,
    offsety: 0,
    rows: [8, 6, 6, 12, 12, 11, 10, 9],
    rowoffsets: [1, 2, 2, 0, 0, 0, 0, 0]
}

var section3 = {
    startseat:0,
    sectionno:2,
    angle: 90,
    offsetx: section2.offsetx + 12*(dims.width+spacing) + 2*spacing,
    offsety: section2.rows.length * (dims.height+spacing) + 2*spacing,
    rows: [14, 10, 9],
    rowoffsets: [0, 4, 5]
}

var section4 = {
    startseat:0,
    sectionno:3,
    angle:90,
    offsetx: section3.offsetx,
    offsety: section3.offsety + 14*(dims.height+spacing) + 2*spacing,
    rows: [8, 8, 8],
    rowoffsets: [0, 0, 0]
}

var section5 = {
    startseat:0,
    sectionno:4,
    angle:180,
    offsetx:section4.offsetx - section4.rows.length*(dims.width+spacing) - 2*spacing,
    offsety: section4.offsety + 4*(dims.width+spacing) + 8*(dims.width+spacing),
    rows: [7, 7, 9, 10],
    rowoffsets: [2, 2, 1, 0]
}


var sections = new Array(section1, section2, section3, section4, section5);

function buildSections(){
    return sections;
}