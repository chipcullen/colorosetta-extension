import { colorTypes } from './colorTypes';
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
}

const formatRgb = (rgb:Array<Number>) => {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

const formatRgba = (rgba:Array<Number>) => {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}

const formatRgbAsRgba = (rgb:Array<Number>) => {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
}

const formatHsl = (hsl:Array<Number>) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

const formatHsla = (hsla:Array<Number>) => {
  return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`;
}

const formatHslAsHsla = (hsl:Array<Number>) => {
  return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, 1)`;
}

const translatedColor = (
  color: string,
  startingColorType: colorTypes,
  targetColorType: colorTypes): string => {

  switch(true) {
    // Hex 6
    case startingColorType === colorTypes.hex6:
    case startingColorType === colorTypes.picker:
      switch(true) {
        // because pickers use hex 6, we need to include these both
        // in their own case
        case targetColorType === colorTypes.hex6:
        case targetColorType === colorTypes.picker:
          return color;
        case targetColorType === colorTypes.hex8:
          return formatHex6AsHex8(color);
        case targetColorType === colorTypes.rgb:
          return formatRgb(hexToRgb(color));
        case targetColorType === colorTypes.rgba:
          return formatRgbAsRgba(hexToRgb(color));
        case targetColorType === colorTypes.hsl:
          return formatHsl(hex6ToHsl(color));
        case targetColorType === colorTypes.hsla:
          return formatHslAsHsla(hex6ToHsl(color));
        case targetColorType === colorTypes.named:
          return rgbToNamed(hexToRgb(color));
        default:
          break;
      }
      break;
    // Hex 8
    case startingColorType === colorTypes.hex8:
      const hex8AsRgbaArray = hex8ToRgba(color);
      const hex8Overlay = calculateOverlay(hex8AsRgbaArray);
      switch(true) {
        case targetColorType === colorTypes.hex6:
        case targetColorType === colorTypes.picker:
          return rgbArrayToHex(hex8Overlay);
        case targetColorType === colorTypes.rgb:
          return formatRgb(hex8Overlay);
        case targetColorType === colorTypes.rgba:
          return formatRgba(hex8AsRgbaArray);
        case targetColorType === colorTypes.hsl:
          return formatHsl(rgbArrayToHsl(hex8Overlay));
        case targetColorType === colorTypes.hsla:
          return formatHsla(hex8ToHsla(color));
        case targetColorType === colorTypes.named:
          return rgbaToNamed(hex8AsRgbaArray);
        default:
          break;
      }
      break;
    // RGB
    case startingColorType === colorTypes.rgb:
      switch(true) {
        case targetColorType === colorTypes.hex6:
        case targetColorType === colorTypes.picker:
          return rgbToHex(color);
        case targetColorType === colorTypes.hex8:
          return formatHex6AsHex8(rgbToHex(color));
        case targetColorType === colorTypes.rgba:
          return formatRgbAsRgba(rgbToRgb(color));
        case targetColorType === colorTypes.hsl:
          return formatHsl(rgbToHsl(color));
        case targetColorType === colorTypes.hsla:
          return formatHslAsHsla(rgbToHsl(color));
        case targetColorType === colorTypes.named:
          return rgbToNamed(rgbToRgb(color));
        default:
          break;
      }
      break;
    // RGBA
    case startingColorType === colorTypes.rgba:
      const rgbaAsRgbaArray = rgbaToRgba(color);
      const rgbaOverlay = calculateOverlay(rgbaAsRgbaArray);
      switch(true) {
        case targetColorType === colorTypes.hex6:
        case targetColorType === colorTypes.picker:
          return rgbArrayToHex(rgbaOverlay);
        case targetColorType === colorTypes.hex8:
          return rgbaToHex8(color);
        case targetColorType === colorTypes.rgb:
          return formatRgb(rgbaOverlay);
        case targetColorType === colorTypes.hsl:
          return formatHsl(rgbArrayToHsl(rgbaOverlay));
        case targetColorType === colorTypes.hsla:
          return formatHsla(rgbaToHsla(color));
        case targetColorType === colorTypes.named:
          return rgbaToNamed(rgbaAsRgbaArray);
        default:
          break;
      }
      break;
    // HSL
    case startingColorType === colorTypes.hsl:
      switch(true) {
        case targetColorType === colorTypes.hex6:
        case targetColorType === colorTypes.picker:
          return hslToHex(color);
        case targetColorType === colorTypes.hex8:
          return formatHex6AsHex8(hslToHex(color));
        case targetColorType === colorTypes.rgb:
          return formatRgb(hslToRgb(color));
        case targetColorType === colorTypes.rgba:
          return formatRgbAsRgba(hslToRgb(color));
        case targetColorType === colorTypes.hsla:
          return formatHslAsHsla(hslToHsl(color));
        case targetColorType === colorTypes.named:
          return rgbToNamed(hslToRgb(color));
        default:
          break;
      }
      break;
    // HSLA
    case startingColorType === colorTypes.hsla:
      const hslaAsRgbArray = hslaToRgba(color);
      const hslaOverlay = calculateOverlay(hslaAsRgbArray)
      switch(true) {
        case targetColorType === colorTypes.hex6:
        case targetColorType === colorTypes.picker:
          return rgbArrayToHex(hslaOverlay);
        case targetColorType === colorTypes.hex8:
          return hslaToHex8(color);
        case targetColorType === colorTypes.rgb:
          return formatRgb(hslaOverlay);
        case targetColorType === colorTypes.rgba:
          return formatRgba(hslaAsRgbArray);
        case targetColorType === colorTypes.hsl:
          return formatHsl(rgbArrayToHsl(hslaOverlay));
        case targetColorType === colorTypes.named:
          return rgbaToNamed(hslaAsRgbArray);
        default:
          break;
      }
      break;
    // Named
    case startingColorType === colorTypes.named:
      const namedAsRgbArray = namedToRgb(color);
      switch(true) {
        case targetColorType === colorTypes.hex6:
        case targetColorType === colorTypes.picker:
          return rgbArrayToHex(namedAsRgbArray);
        case targetColorType === colorTypes.hex8:
          return formatHex6AsHex8(rgbArrayToHex(namedAsRgbArray));
        case targetColorType === colorTypes.rgb:
          return formatRgb(namedAsRgbArray);
        case targetColorType === colorTypes.rgba:
          return formatRgbAsRgba(namedAsRgbArray);
        case targetColorType === colorTypes.hsl:
          return formatHsl(rgbArrayToHsl(namedAsRgbArray));
        case targetColorType === colorTypes.hsla:
          return formatHslAsHsla(rgbArrayToHsl(namedAsRgbArray));
        default:
          break;
      }
      break;
  }

  return `none`;
}


export { translatedColor }
