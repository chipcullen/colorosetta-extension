// taken from this github gist comment
// https://gist.github.com/bobspace/2712980#gistcomment-2688195
const namedColors = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen"
];

const lowerCaseNamedColors = namedColors.map(c => c.toLowerCase());

const rgbWithNames = [
  {"rgb":[240,248,255], "name":"AliceBlue"},
  {"rgb":[250,235,215], "name":"AntiqueWhite"},
  {"rgb":[0,255,255], "name":"Aqua"},
  {"rgb":[127,255,212], "name":"Aquamarine"},
  {"rgb":[240,255,255], "name":"Azure"},
  {"rgb":[245,245,220], "name":"Beige"},
  {"rgb":[255,228,196], "name":"Bisque"},
  {"rgb":[0,0,0], "name":"Black"},
  {"rgb":[255,235,205], "name":"BlanchedAlmond"},
  {"rgb":[0,0,255], "name":"Blue"},
  {"rgb":[138,43,226], "name":"BlueViolet"},
  {"rgb":[165,42,42], "name":"Brown"},
  {"rgb":[222,184,135], "name":"BurlyWood"},
  {"rgb":[95,158,160], "name":"CadetBlue"},
  {"rgb":[127,255,0], "name":"Chartreuse"},
  {"rgb":[210,105,30], "name":"Chocolate"},
  {"rgb":[255,127,80], "name":"Coral"},
  {"rgb":[100,149,237], "name":"CornflowerBlue"},
  {"rgb":[255,248,220], "name":"Cornsilk"},
  {"rgb":[220,20,60], "name":"Crimson"},
  {"rgb":[0,255,255], "name":"Cyan"},
  {"rgb":[0,0,139], "name":"DarkBlue"},
  {"rgb":[0,139,139], "name":"DarkCyan"},
  {"rgb":[184,134,11], "name":"DarkGoldenRod"},
  {"rgb":[169,169,169], "name":"DarkGray"},
  {"rgb":[169,169,169], "name":"DarkGrey"},
  {"rgb":[0,100,0], "name":"DarkGreen"},
  {"rgb":[189,183,107], "name":"DarkKhaki"},
  {"rgb":[139,0,139], "name":"DarkMagenta"},
  {"rgb":[85,107,47], "name":"DarkOliveGreen"},
  {"rgb":[255,140,0], "name":"DarkOrange"},
  {"rgb":[153,50,204], "name":"DarkOrchid"},
  {"rgb":[139,0,0], "name":"DarkRed"},
  {"rgb":[233,150,122], "name":"DarkSalmon"},
  {"rgb":[143,188,143], "name":"DarkSeaGreen"},
  {"rgb":[72,61,139], "name":"DarkSlateBlue"},
  {"rgb":[47,79,79], "name":"DarkSlateGray"},
  {"rgb":[47,79,79], "name":"DarkSlateGrey"},
  {"rgb":[0,206,209], "name":"DarkTurquoise"},
  {"rgb":[148,0,211], "name":"DarkViolet"},
  {"rgb":[255,20,147], "name":"DeepPink"},
  {"rgb":[0,191,255], "name":"DeepSkyBlue"},
  {"rgb":[105,105,105], "name":"DimGray"},
  {"rgb":[105,105,105], "name":"DimGrey"},
  {"rgb":[30,144,255], "name":"DodgerBlue"},
  {"rgb":[178,34,34], "name":"FireBrick"},
  {"rgb":[255,250,240], "name":"FloralWhite"},
  {"rgb":[34,139,34], "name":"ForestGreen"},
  {"rgb":[255,0,255], "name":"Fuchsia"},
  {"rgb":[220,220,220], "name":"Gainsboro"},
  {"rgb":[248,248,255], "name":"GhostWhite"},
  {"rgb":[255,215,0], "name":"Gold"},
  {"rgb":[218,165,32], "name":"GoldenRod"},
  {"rgb":[128,128,128], "name":"Gray"},
  {"rgb":[128,128,128], "name":"Grey"},
  {"rgb":[0,128,0], "name":"Green"},
  {"rgb":[173,255,47], "name":"GreenYellow"},
  {"rgb":[240,255,240], "name":"HoneyDew"},
  {"rgb":[255,105,180], "name":"HotPink"},
  {"rgb":[205,92,92], "name":"IndianRed"},
  {"rgb":[75,0,130], "name":"Indigo"},
  {"rgb":[255,255,240], "name":"Ivory"},
  {"rgb":[240,230,140], "name":"Khaki"},
  {"rgb":[230,230,250], "name":"Lavender"},
  {"rgb":[255,240,245], "name":"LavenderBlush"},
  {"rgb":[124,252,0], "name":"LawnGreen"},
  {"rgb":[255,250,205], "name":"LemonChiffon"},
  {"rgb":[173,216,230], "name":"LightBlue"},
  {"rgb":[240,128,128], "name":"LightCoral"},
  {"rgb":[224,255,255], "name":"LightCyan"},
  {"rgb":[250,250,210], "name":"LightGoldenRodYellow"},
  {"rgb":[211,211,211], "name":"LightGray"},
  {"rgb":[211,211,211], "name":"LightGrey"},
  {"rgb":[144,238,144], "name":"LightGreen"},
  {"rgb":[255,182,193], "name":"LightPink"},
  {"rgb":[255,160,122], "name":"LightSalmon"},
  {"rgb":[32,178,170], "name":"LightSeaGreen"},
  {"rgb":[135,206,250], "name":"LightSkyBlue"},
  {"rgb":[119,136,153], "name":"LightSlateGray"},
  {"rgb":[119,136,153], "name":"LightSlateGrey"},
  {"rgb":[176,196,222], "name":"LightSteelBlue"},
  {"rgb":[255,255,224], "name":"LightYellow"},
  {"rgb":[0,255,0], "name":"Lime"},
  {"rgb":[50,205,50], "name":"LimeGreen"},
  {"rgb":[250,240,230], "name":"Linen"},
  {"rgb":[255,0,255], "name":"Magenta"},
  {"rgb":[128,0,0], "name":"Maroon"},
  {"rgb":[102,205,170], "name":"MediumAquaMarine"},
  {"rgb":[0,0,205], "name":"MediumBlue"},
  {"rgb":[186,85,211], "name":"MediumOrchid"},
  {"rgb":[147,112,219], "name":"MediumPurple"},
  {"rgb":[60,179,113], "name":"MediumSeaGreen"},
  {"rgb":[123,104,238], "name":"MediumSlateBlue"},
  {"rgb":[0,250,154], "name":"MediumSpringGreen"},
  {"rgb":[72,209,204], "name":"MediumTurquoise"},
  {"rgb":[199,21,133], "name":"MediumVioletRed"},
  {"rgb":[25,25,112], "name":"MidnightBlue"},
  {"rgb":[245,255,250], "name":"MintCream"},
  {"rgb":[255,228,225], "name":"MistyRose"},
  {"rgb":[255,228,181], "name":"Moccasin"},
  {"rgb":[255,222,173], "name":"NavajoWhite"},
  {"rgb":[0,0,128], "name":"Navy"},
  {"rgb":[253,245,230], "name":"OldLace"},
  {"rgb":[128,128,0], "name":"Olive"},
  {"rgb":[107,142,35], "name":"OliveDrab"},
  {"rgb":[255,165,0], "name":"Orange"},
  {"rgb":[255,69,0], "name":"OrangeRed"},
  {"rgb":[218,112,214], "name":"Orchid"},
  {"rgb":[238,232,170], "name":"PaleGoldenRod"},
  {"rgb":[152,251,152], "name":"PaleGreen"},
  {"rgb":[175,238,238], "name":"PaleTurquoise"},
  {"rgb":[219,112,147], "name":"PaleVioletRed"},
  {"rgb":[255,239,213], "name":"PapayaWhip"},
  {"rgb":[255,218,185], "name":"PeachPuff"},
  {"rgb":[205,133,63], "name":"Peru"},
  {"rgb":[255,192,203], "name":"Pink"},
  {"rgb":[221,160,221], "name":"Plum"},
  {"rgb":[176,224,230], "name":"PowderBlue"},
  {"rgb":[128,0,128], "name":"Purple"},
  {"rgb":[102,51,153], "name":"RebeccaPurple"},
  {"rgb":[255,0,0], "name":"Red"},
  {"rgb":[188,143,143], "name":"RosyBrown"},
  {"rgb":[65,105,225], "name":"RoyalBlue"},
  {"rgb":[139,69,19], "name":"SaddleBrown"},
  {"rgb":[250,128,114], "name":"Salmon"},
  {"rgb":[244,164,96], "name":"SandyBrown"},
  {"rgb":[46,139,87], "name":"SeaGreen"},
  {"rgb":[255,245,238], "name":"SeaShell"},
  {"rgb":[160,82,45], "name":"Sienna"},
  {"rgb":[192,192,192], "name":"Silver"},
  {"rgb":[135,206,235], "name":"SkyBlue"},
  {"rgb":[106,90,205], "name":"SlateBlue"},
  {"rgb":[112,128,144], "name":"SlateGray"},
  {"rgb":[112,128,144], "name":"SlateGrey"},
  {"rgb":[255,250,250], "name":"Snow"},
  {"rgb":[0,255,127], "name":"SpringGreen"},
  {"rgb":[70,130,180], "name":"SteelBlue"},
  {"rgb":[210,180,140], "name":"Tan"},
  {"rgb":[0,128,128], "name":"Teal"},
  {"rgb":[216,191,216], "name":"Thistle"},
  {"rgb":[255,99,71], "name":"Tomato"},
  {"rgb":[64,224,208], "name":"Turquoise"},
  {"rgb":[238,130,238], "name":"Violet"},
  {"rgb":[245,222,179], "name":"Wheat"},
  {"rgb":[255,255,255], "name":"White"},
  {"rgb":[245,245,245], "name":"WhiteSmoke"},
  {"rgb":[255,255,0], "name":"Yellow"},
  {"rgb":[154,205,50], "name":"YellowGreen"}
];

export { namedColors, lowerCaseNamedColors, rgbWithNames };
