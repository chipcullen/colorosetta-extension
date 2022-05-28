import { rgb_array_to_LCH } from './w3conversions';

import { hexToRgb, hslToRgb } from './toRgb';
import { hex8ToRgba, hslaToRgba } from './toRgba';
import { colorStringToArray } from './colorStringToArray';

const hex6ToLch = (hex6: string): Array<number> => {
  const hex6asRgbArray = hexToRgb(hex6);
  return rgb_array_to_LCH(hex6asRgbArray);
}

const hex8ToLch = (hex8: string): Array<number> => {
  const hex8asRgbArray = hex8ToRgba(hex8);
  let lch: Array<number> = rgb_array_to_LCH(hex8asRgbArray);
  // taking on the alpha value
  lch.push(hex8asRgbArray[3] * 100);
  return lch;
}

const hslToLch = (hsl: string): Array<number> => {
  const hslAsRgbArray = hslToRgb(hsl);
  return rgb_array_to_LCH(hslAsRgbArray);
}

const hslaToLch = (hsla: string): Array<number> => {
  const hslaAsRgbArray = hslaToRgba(hsla);
  let lch: Array<number> = rgb_array_to_LCH(hslaAsRgbArray);
  // taking on the alpha value
  lch.push(hslaAsRgbArray[3] * 100);
  return lch;
}

const rgbToLch = (rgb: string): Array<number> => {
  const rgbArray = colorStringToArray(rgb, true) as Array<number>;
  return rgb_array_to_LCH(rgbArray);
}

const rgbaToLch = (rgba: string): Array<number> => {
  const rgbaArray = colorStringToArray(rgba, false, 5) as Array<string>;

  const rgbNumberArray = [parseInt(rgbaArray[0]), parseInt(rgbaArray[1]), parseInt(rgbaArray[2])]

  let lch: Array<number> = rgb_array_to_LCH(rgbNumberArray);

  // taking on the alpha value
  lch.push(parseFloat(rgbaArray[3]) * 100);

  return lch;
}

export { hex6ToLch, hex8ToLch, hslToLch, hslaToLch, rgbaToLch, rgbToLch }
