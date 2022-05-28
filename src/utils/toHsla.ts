import { colorStringToArray } from './colorStringToArray';
import { rgbArrayToHsl } from './toHsl';

const rgbaArrayToHsla = (rgba: Array<number>): Array<number> => {
  const rgbNumberArray = [rgba[0], rgba[1], rgba[2]]

  const hsla: Array<number> = rgbArrayToHsl(rgbNumberArray);

  // taking on the alpha value
  hsla.push(rgba[3]);

  return hsla;
}

const rgbaToHsla = (rgba: string): Array<number> => {
  const rgbaArray = colorStringToArray(rgba, false, 5) as Array<string>

  const rgbNumberArray = [parseInt(rgbaArray[0]), parseInt(rgbaArray[1]), parseInt(rgbaArray[2]), parseFloat(rgbaArray[3])]

  const hsla: Array<number> = rgbaArrayToHsla(rgbNumberArray);

  return hsla;
}

const hex8ToHsla = (hex8: string): Array<number> => {
  let r: string = '0';
  let g: string = '0';
  let b: string = '0';
  let a: string = '1';

  if (hex8.length === 4) {
    r = "0x" + hex8[0] + hex8[0];
    g = "0x" + hex8[1] + hex8[1];
    b = "0x" + hex8[2] + hex8[2];
    a = "0x" + hex8[3] + hex8[3];
  } else if (hex8.length === 5) {
    r = "0x" + hex8[1] + hex8[1];
    g = "0x" + hex8[2] + hex8[2];
    b = "0x" + hex8[3] + hex8[3];
    a = "0x" + hex8[4] + hex8[4];
  } else if (hex8.length === 8) {
    r = "0x" + hex8[0] + hex8[1];
    g = "0x" + hex8[2] + hex8[3];
    b = "0x" + hex8[4] + hex8[5];
    a = "0x" + hex8[6] + hex8[7];
  } else if (hex8.length === 9) {
    r = "0x" + hex8[1] + hex8[2];
    g = "0x" + hex8[3] + hex8[4];
    b = "0x" + hex8[5] + hex8[6];
    a = "0x" + hex8[7] + hex8[8];
  }

  const alpha = +(parseInt(a) / 255).toFixed(2);

  const rgbNumberArray = [parseInt(r), parseInt(g), parseInt(b)]

  const hsla: Array<number> = rgbArrayToHsl(rgbNumberArray);

  // taking on the alpha value
  hsla.push(alpha);

  return hsla;
}

export { rgbaArrayToHsla, rgbaToHsla, hex8ToHsla };
