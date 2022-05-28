import { colorStringToArray } from './colorStringToArray';
import { ColorTypes } from './colorTypes';
import { toRgb } from './toRgb';
import { LCH_to_RGB_array } from './w3conversions';

// handles #0000 or #00000000
// based on this function: https://css-tricks.com/converting-color-spaces-in-javascript/#article-header-id-3
const hex8ToRgba = (hex: string) => {
  let r: string | number = 0;
  let g: string | number = 0;
  let b: string | number = 0;
  let a: string | number = 1;

  if (hex.length === 4) {
    r = "0x" + hex[0] + hex[0];
    g = "0x" + hex[1] + hex[1];
    b = "0x" + hex[2] + hex[2];
    a = "0x" + hex[3] + hex[3];
  } else if (hex.length === 5) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
    a = "0x" + hex[4] + hex[4];
  } else if (hex.length === 8) {
    r = "0x" + hex[0] + hex[1];
    g = "0x" + hex[2] + hex[3];
    b = "0x" + hex[4] + hex[5];
    a = "0x" + hex[6] + hex[7];
  } else if (hex.length === 9) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
    a = "0x" + hex[7] + hex[8];
  }
  a = +((a as number) / 255).toFixed(2);

  return [+r, +g, +b, +a];
};

type Deg = number;
type Rad = number;
type Turn = number;
type Hue = Deg | Rad | Turn;

const stringToHue = (input: string): Hue => {
  const inputAsNum = Number(input.substr(0, input.length - 3));

  if (input.indexOf("deg") > -1) {
    return inputAsNum;
  } else if (input.indexOf("rad") > -1) {
    return Math.round(inputAsNum * (180 / Math.PI));
  } else if (input.indexOf("turn") > -1) {
    return Math.round(Number(input.substr(0, input.length - 4)) * 360);
  } else {
    return Number(input);
  }
};

const hslaToRgba = (hslaArg: string): number[] => {
  const sep: string = hslaArg.indexOf(",") > -1 ? "," : " ";

  const hsla: any = hslaArg
    .substr(5)
    .split(")")[0]
    .split(sep);

  if (hsla.indexOf("/") > -1) hsla.splice(3, 1);

  let h: Hue = stringToHue(hsla[0]);
  let s = parseInt(hsla[1].substr(0, hsla[1].length - 1)) / 100;
  let l = parseInt(hsla[2].substr(0, hsla[2].length - 1)) / 100;
  let a = hsla[3];

  // Keep hue fraction of 360 if ending up over
  if (h >= 360) {
    h %= 360;
  }

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [+r, +g, +b, +a];
};

const lchToRgba = (lch: string): Array<number> => {
  const lchArray = colorStringToArray(lch) as Array<string>

  const l = lchArray[0].replace("%","");
  const c = lchArray[1];
  const h = lchArray[2];

  const rgbaArray = LCH_to_RGB_array(+l, +c, +h);

  // if we have an alpha value, else supply 1
  const alpha: string = lchArray[3] === '/' ? (parseInt(lchArray[4].replace("%", "")) / 100).toFixed(2) : '1';
  rgbaArray.push(parseFloat(alpha));
  return rgbaArray;
}

const rgbaToRgba = (color: string): Array<number> => {
  return colorStringToArray(color, true, 5) as Array<number>;
};

const toRgba = (color: string, colorType: ColorTypes) => {
  switch (true) {
    case colorType === ColorTypes.hex6:
      return toRgb(color, colorType).concat([1]);
    case colorType === ColorTypes.hex8:
      return hex8ToRgba(color);
    case colorType === ColorTypes.rgba:
      return rgbaToRgba(color);
    case colorType === ColorTypes.rgb:
      return toRgb(color, colorType).concat([1]);
    case colorType === ColorTypes.hsla:
      return hslaToRgba(color);
    case colorType === ColorTypes.hsl:
      return toRgb(color, colorType).concat([1]);
    case colorType === ColorTypes.lch:
      return lchToRgba(color);
    case colorType === ColorTypes.named:
      return toRgb(color, colorType).concat([1]);
    default:
      return toRgb(color, colorType).concat([1]);
  }
};

export { hex8ToRgba, hslaToRgba, lchToRgba, rgbaToRgba, toRgba };
