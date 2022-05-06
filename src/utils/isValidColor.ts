import { ColorTypes } from './colorTypes';
import { lowerCaseNamedColors } from  './namedColors';

const isValidHex6 = (color: string): boolean => {
  // https://stackoverflow.com/a/8027444/1173898
  if (/^(#)?[0-9A-F]{3}$/i.test(color) || /^(#)?[0-9A-F]{6}$/i.test(color)) {
    return true;
  } else {
    return false;
  }
};

const isValidHex8 = (color: string): boolean => {
  // https://stackoverflow.com/a/8027444/1173898
  if (/^(#)?[0-9A-F]{4}$/i.test(color) || /^(#)?[0-9A-F]{8}$/i.test(color)) {
    return true;
  } else {
    return false;
  }
};

const isValidRgba = (color: string): boolean => {
  // https://rgxdb.com/r/GFYPX74
  // @todo make sure values are 0-100 for % or 0-255 for unitless
  if (/rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/.test(color)) {
    return true;
  } else {
    return false;
  }
};

const isValidRgb = (color: string): boolean => {
  // https://rgxdb.com/r/4LS1LCA
  // @todo make sure values are 0-100 for % or 0-255 for unitless
  if (/rgb\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*\)/.test(color)) {
    return true;
  } else {
    return false;
  }
};

const isValidHsla = (color: string): boolean => {
  // https://rgxdb.com/r/6KT5NBF
  // @todo make sure % are 0-100,
  // add support for `deg` and `rad` and `turn`
  if (/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/.test(color)) {
    return true;
  } else {
    return false;
  }
};

const isValidHsl = (color: string): boolean => {
  // https://rgxdb.com/r/6KT5NBF
  // @todo make sure % are 0-100,
  // add support for `deg` and `rad` and `turn`
  if (/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/.test(color)) {
    return true;
  } else {
    return false;
  }
};

const isValidColor = (color: string, colorType: ColorTypes): boolean => {
  switch (true) {
    // @todo need more robust validation of these colors
    case colorType === ColorTypes.hex6 && isValidHex6(color):
    case colorType === ColorTypes.hex8 && isValidHex8(color):
    case colorType === ColorTypes.rgba && isValidRgba(color):
    case colorType === ColorTypes.rgb  && isValidRgb(color):
    case colorType === ColorTypes.hsla && isValidHsla(color):
    case colorType === ColorTypes.hsl  && isValidHsl(color):
    case colorType === ColorTypes.named &&
      lowerCaseNamedColors.includes(color.toLowerCase()):
      return true;
    default:
      return false;
  }
};

export { isValidColor, isValidHex6, isValidHex8, isValidRgb, isValidRgba, isValidHsl, isValidHsla };
