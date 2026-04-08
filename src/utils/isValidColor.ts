import Color from 'colorjs.io';
import { ColorTypes } from './colorTypes';
import { lowerCaseNamedColors } from './namedColors';

const canParseColor = (color: string): boolean => {
  try {
    new Color(color);
    return true;
  } catch {
    return false;
  }
};

const isValidHex6 = (color: string): boolean => {
  return /^(#)?[0-9A-F]{3}$/i.test(color) || /^(#)?[0-9A-F]{6}$/i.test(color);
};

const isValidHex8 = (color: string): boolean => {
  return /^(#)?[0-9A-F]{4}$/i.test(color) || /^(#)?[0-9A-F]{8}$/i.test(color);
};

// accepts either modern rgb/rgba syntax
const isValidRgb = (color: string): boolean => {
  return (color.startsWith('rgb(') || color.startsWith('rgba(')) && canParseColor(color);
};

// accepts either modern hsl/hsla syntax
const isValidHsl = (color: string): boolean => {
  return (color.startsWith('hsl(') || color.startsWith('hsla(')) && canParseColor(color);
};

const isValidLch = (color: string): boolean => {
  return color.startsWith('lch(') && canParseColor(color);
};

const isValidOklch = (color: string): boolean => {
  return color.startsWith('oklch(') && canParseColor(color);
};

const isValidP3 = (color: string): boolean => {
  return color.startsWith('color(display-p3') && canParseColor(color);
};

const isValidColor = (color: string, colorType: ColorTypes): boolean => {
  switch (colorType) {
    case ColorTypes.hex6:
      return isValidHex6(color);
    case ColorTypes.hex8:
      return isValidHex8(color);
    case ColorTypes.rgb:
      return isValidRgb(color);
    case ColorTypes.hsl:
      return isValidHsl(color);
    case ColorTypes.lch:
      return isValidLch(color);
    case ColorTypes.oklch:
      return isValidOklch(color);
    case ColorTypes.p3:
      return isValidP3(color);
    case ColorTypes.named:
      return lowerCaseNamedColors.includes(color.toLowerCase());
    default:
      return false;
  }
};

export { isValidColor, isValidHex6, isValidHex8, isValidRgb, isValidHsl, isValidLch, isValidOklch, isValidP3 };
