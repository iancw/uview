
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
    offsety: section2.rows.length * perseat + 2*spacing,
    rows: [14, 10, 9],
    rowoffsets: [0, 4, 5]
}

var section4 = {
    startseat:0,
    sectionno:7,
    angle:90,
    offsetx: section3.offsetx,
    offsety: section3.offsety + 14*perseat + 2*spacing,
    rows: [8, 8, 8],
    rowoffsets: [0, 0, 0]
}

var section5 = {
    startseat:0,
    sectionno:8,
    angle:180,
    offsetx:section4.offsetx - section4.rows.length*perseat - 2*spacing,
    offsety: section4.offsety + 4*perseat + 8*perseat,
    rows: [7, 7, 9, 10],
    rowoffsets: [2, 2, 1, 0]
}




var sections = new Array(section_a, section_b, section_c, section_d, section1, section2, section3, section4, section5);

function buildSections(){
    return sections;
}