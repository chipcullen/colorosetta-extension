import { rgbWithNames } from './namedColors';

const rgbToNamed = (rgb: Array<number>): string => {
  let color = ``;

  for (let index = 0; index < rgbWithNames.length; index++) {
    const colorObj = rgbWithNames[index];
    if (colorObj.rgb.every((val, index) => val === rgb[index])) {
      color = colorObj.name;
      break;
    }
  }

  return color;
}

const rgbaToNamed = (rgba: Array<number>): string => {
  if (rgba[3] === 1) {
    return rgbToNamed([rgba[0], rgba[1], rgba[2]])
  }

  return ``;
}

export { rgbToNamed, rgbaToNamed }
