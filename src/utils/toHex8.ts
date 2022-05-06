import { hslaToRgba } from './toRgba';

const rgbaArrayToHex8 = (rgbaArray: Array<number>): string => {
  let r = (+rgbaArray[0]).toString(16);
  let g = (+rgbaArray[1]).toString(16);
  let b = (+rgbaArray[2]).toString(16);
  let a = Math.round((+rgbaArray[3]) * 255).toString(16);

  if (r.length === 1)
    r = "0" + r;
  if (g.length === 1)
    g = "0" + g;
  if (b.length === 1)
    b = "0" + b;
  if (a.length === 1)
    a = "0" + a;

  return "#" + r + g + b + a;
};

const rgbaToHex8 = (rgba: string) => {

  let sep = rgba.indexOf(",") > -1 ? "," : " ";

  // Turn "rgba(r,g,b,a)" into [r,g,b,a]
  const rgbaArray: Array<string> = rgba
    .substr(5)
    .split(")")[0]
    .split(sep);

  const rgbaNumArray: Array<number> = [
    parseInt(rgbaArray[0]),
    parseInt(rgbaArray[1]),
    parseInt(rgbaArray[2]),
    parseFloat(rgbaArray[3])
  ];

  return rgbaArrayToHex8(rgbaNumArray);
};

const hslaToHex8 = (hsla: string) => {
  return rgbaArrayToHex8(hslaToRgba(hsla));
};

export { rgbaToHex8, hslaToHex8 };
