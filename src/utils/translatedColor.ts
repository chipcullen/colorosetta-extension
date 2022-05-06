import { ColorTypes } from './colorTypes';
import { hexToRgb, rgbToRgb, hslToRgb, namedToRgb } from './toRgb';
import { rgbaToRgba, hex8ToRgba, hslaToRgba } from './toRgba';
import { rgbToHex, hslToHex, rgbArrayToHex } from './toHex';
import { rgbaToHex8, hslaToHex8 } from './toHex8';
import { rgbToHsl, hex6ToHsl, hslToHsl, rgbArrayToHsl } from './toHsl';
import { rgbaToHsla, hex8ToHsla } from './toHsla';
import { rgbToNamed, rgbaToNamed } from './toNamed';
import { calculateOverlay } from './calculateOverlay';

const formatHex6AsHex8 = (hex: string) => {
  // normalizing the presence of a hex value
  // by removing it if it's there
  const hexstring = hex.indexOf(`#`) === 0 ? hex.slice(1): hex;
  if (hexstring.length === 3){
    return `#${hexstring.toLowerCase()}f`;
  } else {
    return `#${hexstring.toLowerCase()}ff`;
  }
};

const formatRgb = (rgb:Array<Number>) => {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

const formatRgba = (rgba:Array<Number>) => {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
};

const formatRgbAsRgba = (rgb:Array<Number>) => {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
};

const formatHsl = (hsl:Array<Number>) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

const formatHsla = (hsla:Array<Number>) => {
  return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`;
};

const formatHslAsHsla = (hsl:Array<Number>) => {
  return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, 1)`;
};

const translatedColor = (
  color: string,
  startingColorType: ColorTypes,
  targetColorType: ColorTypes): string => {

  switch(true) {
    // Hex 6
    case startingColorType === ColorTypes.hex6:
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return color;
        case targetColorType === ColorTypes.hex8:
          return formatHex6AsHex8(color);
        case targetColorType === ColorTypes.rgb:
          return formatRgb(hexToRgb(color));
        case targetColorType === ColorTypes.rgba:
          return formatRgbAsRgba(hexToRgb(color));
        case targetColorType === ColorTypes.hsl:
          return formatHsl(hex6ToHsl(color));
        case targetColorType === ColorTypes.hsla:
          return formatHslAsHsla(hex6ToHsl(color));
        case targetColorType === ColorTypes.named:
          return rgbToNamed(hexToRgb(color));
        default:
          break;
      }
      break;
    // Hex 8
    case startingColorType === ColorTypes.hex8:
      const hex8AsRgbaArray = hex8ToRgba(color);
      const hex8Overlay = calculateOverlay(hex8AsRgbaArray);
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return rgbArrayToHex(hex8Overlay);
        case targetColorType === ColorTypes.rgb:
          return formatRgb(hex8Overlay);
        case targetColorType === ColorTypes.rgba:
          return formatRgba(hex8AsRgbaArray);
        case targetColorType === ColorTypes.hsl:
          return formatHsl(rgbArrayToHsl(hex8Overlay));
        case targetColorType === ColorTypes.hsla:
          return formatHsla(hex8ToHsla(color));
        case targetColorType === ColorTypes.named:
          return rgbaToNamed(hex8AsRgbaArray);
        default:
          break;
      }
      break;
    // RGB
    case startingColorType === ColorTypes.rgb:
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return rgbToHex(color);
        case targetColorType === ColorTypes.hex8:
          return formatHex6AsHex8(rgbToHex(color));
        case targetColorType === ColorTypes.rgba:
          return formatRgbAsRgba(rgbToRgb(color));
        case targetColorType === ColorTypes.hsl:
          return formatHsl(rgbToHsl(color));
        case targetColorType === ColorTypes.hsla:
          return formatHslAsHsla(rgbToHsl(color));
        case targetColorType === ColorTypes.named:
          return rgbToNamed(rgbToRgb(color));
        default:
          break;
      }
      break;
    // RGBA
    case startingColorType === ColorTypes.rgba:
      const rgbaAsRgbaArray = rgbaToRgba(color);
      const rgbaOverlay = calculateOverlay(rgbaAsRgbaArray);
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return rgbArrayToHex(rgbaOverlay);
        case targetColorType === ColorTypes.hex8:
          return rgbaToHex8(color);
        case targetColorType === ColorTypes.rgb:
          return formatRgb(rgbaOverlay);
        case targetColorType === ColorTypes.hsl:
          return formatHsl(rgbArrayToHsl(rgbaOverlay));
        case targetColorType === ColorTypes.hsla:
          return formatHsla(rgbaToHsla(color));
        case targetColorType === ColorTypes.named:
          return rgbaToNamed(rgbaAsRgbaArray);
        default:
          break;
      }
      break;
    // HSL
    case startingColorType === ColorTypes.hsl:
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return hslToHex(color);
        case targetColorType === ColorTypes.hex8:
          return formatHex6AsHex8(hslToHex(color));
        case targetColorType === ColorTypes.rgb:
          return formatRgb(hslToRgb(color));
        case targetColorType === ColorTypes.rgba:
          return formatRgbAsRgba(hslToRgb(color));
        case targetColorType === ColorTypes.hsla:
          return formatHslAsHsla(hslToHsl(color));
        case targetColorType === ColorTypes.named:
          return rgbToNamed(hslToRgb(color));
        default:
          break;
      }
      break;
    // HSLA
    case startingColorType === ColorTypes.hsla:
      const hslaAsRgbArray = hslaToRgba(color);
      const hslaOverlay = calculateOverlay(hslaAsRgbArray);
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return rgbArrayToHex(hslaOverlay);
        case targetColorType === ColorTypes.hex8:
          return hslaToHex8(color);
        case targetColorType === ColorTypes.rgb:
          return formatRgb(hslaOverlay);
        case targetColorType === ColorTypes.rgba:
          return formatRgba(hslaAsRgbArray);
        case targetColorType === ColorTypes.hsl:
          return formatHsl(rgbArrayToHsl(hslaOverlay));
        case targetColorType === ColorTypes.named:
          return rgbaToNamed(hslaAsRgbArray);
        default:
          break;
      }
      break;
    // Named
    case startingColorType === ColorTypes.named:
      const namedAsRgbArray = namedToRgb(color);
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return rgbArrayToHex(namedAsRgbArray);
        case targetColorType === ColorTypes.hex8:
          return formatHex6AsHex8(rgbArrayToHex(namedAsRgbArray));
        case targetColorType === ColorTypes.rgb:
          return formatRgb(namedAsRgbArray);
        case targetColorType === ColorTypes.rgba:
          return formatRgbAsRgba(namedAsRgbArray);
        case targetColorType === ColorTypes.hsl:
          return formatHsl(rgbArrayToHsl(namedAsRgbArray));
        case targetColorType === ColorTypes.hsla:
          return formatHslAsHsla(rgbArrayToHsl(namedAsRgbArray));
        default:
          break;
      }
      break;
  }

  return `none`;
};

export { translatedColor };
