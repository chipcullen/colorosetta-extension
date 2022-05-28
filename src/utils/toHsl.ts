import { colorStringToArray } from './colorStringToArray';
import { hexToRgb } from './toRgb';

const rgbArrayToHsl = (rgb: Array<number>): Array<number> => {
  // Make r, g, and b fractions of 1
  const r: number = rgb[0] / 255;
  const g: number = rgb[1] / 255;
  const b: number = rgb[2] / 255;


  // Find greatest and smallest channel values
  const cmin: number = Math.min(r,g,b);
  const cmax: number = Math.max(r,g,b);
  const delta: number = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  // No difference
  if (delta === 0)
    h = 0;
  // Red is max
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

const rgbToHsl = (rgb: string): Array<number> => {
  const rgbArray = colorStringToArray(rgb, true) as Array<number>;
  return rgbArrayToHsl(rgbArray);
}

const hslToHsl = (hsl: string): Array<number> => {
  const hslArray = colorStringToArray(hsl) as Array<string>;

  const h = parseInt(hslArray[0]);
  const s = parseInt(hslArray[1].substr(0, hslArray[1].length - 1));
  const l = parseInt(hslArray[2].substr(0, hslArray[2].length - 1));

  // @todo add support for deg, rad, turn
  return [h, s, l];
};

const hex6ToHsl = (hex:string) => {
  // Then to HSL
  return rgbArrayToHsl(hexToRgb(hex));
}

export { rgbToHsl, hex6ToHsl, hslToHsl, rgbArrayToHsl };
