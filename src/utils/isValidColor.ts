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

const isValidRgb = (color: string): boolean => {
  return color.startsWith('rgb(') && canParseColor(color);
};

const isValidRgba = (color: string): boolean => {
  return color.startsWith('rgba(') && canParseColor(color);
};

const isValidHsl = (color: string): boolean => {
  return color.startsWith('hsl(') && canParseColor(color);
};

const isValidHsla = (color: string): boolean => {
  return color.startsWith('hsla(') && canParseColor(color);
};

const isValidLch = (color: string): boolean => {
  return color.startsWith('lch(') && canParseColor(color);
};

const isValidColor = (color: string, colorType: ColorTypes): boolean => {
  switch (colorType) {
    case ColorTypes.hex6:
      return isValidHex6(color);
    case ColorTypes.hex8:
      return isValidHex8(color);
    case ColorTypes.rgb:
      return isValidRgb(color);
    case ColorTypes.rgba:
      return isValidRgba(color);
    case ColorTypes.hsl:
      return isValidHsl(color);
    case ColorTypes.hsla:
      return isValidHsla(color);
    case ColorTypes.lch:
      return isValidLch(color);
    case ColorTypes.named:
      return lowerCaseNamedColors.includes(color.toLowerCase());
    default:
      return false;
  }
};

export { isValidColor, isValidHex6, isValidHex8, isValidRgb, isValidRgba, isValidHsl, isValidHsla, isValidLch };
