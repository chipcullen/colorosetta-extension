import { colorStringToArray } from './colorStringToArray';
import { isLCH_within_sRGB } from './w3conversions';

const isLchOutOfRgbGamut = (lch: string): boolean => {
  const lchArray = colorStringToArray(lch) as Array<string>;

  const l = lchArray[0].replace("%","");
  const c = lchArray[1];
  const h = lchArray[2];

  return !isLCH_within_sRGB(+l, +c, +h);
}

export { isLchOutOfRgbGamut }
