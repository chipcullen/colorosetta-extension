import { ColorTypes } from './colorTypes';
import { hexToRgb, rgbToRgb, hslToRgb, namedToRgb } from './toRgb';
import { rgbaToRgba, hex8ToRgba, hslaToRgba, lchToRgba } from './toRgba';
import { rgbToHex, hslToHex, rgbArrayToHex } from './toHex';
import { rgbaArrayToHex8, rgbaToHex8, hslaToHex8 } from './toHex8';
import { rgbToHsl, hex6ToHsl, hslToHsl, rgbArrayToHsl } from './toHsl';
import { rgbaArrayToHsla, rgbaToHsla, hex8ToHsla } from './toHsla';
import { hex6ToLch, hex8ToLch, hslToLch, hslaToLch, rgbaToLch, rgbToLch } from './toLch';
import { rgbToNamed, rgbaToNamed } from './toNamed';
import { calculateOverlay } from './calculateOverlay';
import { rgb_array_to_LCH } from './w3conversions';
import { formatColor, formatHex6AsHex8 } from './formatColor';

const translatedColor = (
  color: string,
  startingColorType: ColorTypes,
  targetColorType: ColorTypes): string => {

  switch(true) {
    // Hex 6
    case startingColorType === ColorTypes.hex6:
      switch(true) {
        // because pickers use hex 6, we need to include these both
        // in their own case
        case targetColorType === ColorTypes.hex6:
          return color;
        case targetColorType === ColorTypes.hex8:
          return formatHex6AsHex8(color);
        case targetColorType === ColorTypes.rgb:
          return formatColor(hexToRgb(color), ColorTypes.rgb);
        case targetColorType === ColorTypes.rgba:
          return formatColor(hexToRgb(color), ColorTypes.rgba);
        case targetColorType === ColorTypes.hsl:
          return formatColor(hex6ToHsl(color), ColorTypes.hsl);
        case targetColorType === ColorTypes.hsla:
          return formatColor(hex6ToHsl(color), ColorTypes.hsla);
        case targetColorType === ColorTypes.lch:
          return formatColor(hex6ToLch(color), ColorTypes.lch);
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
          return formatColor(hex8Overlay, ColorTypes.rgb);
        case targetColorType === ColorTypes.rgba:
          return formatColor(hex8AsRgbaArray, ColorTypes.rgba);
        case targetColorType === ColorTypes.hsl:
          return formatColor(rgbArrayToHsl(hex8Overlay), ColorTypes.hsl);
        case targetColorType === ColorTypes.hsla:
          return formatColor(hex8ToHsla(color), ColorTypes.hsla);
        case targetColorType === ColorTypes.lch:
          return formatColor(hex8ToLch(color), ColorTypes.lch);
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
          return formatColor(rgbToRgb(color), ColorTypes.rgba);
        case targetColorType === ColorTypes.hsl:
          return formatColor(rgbToHsl(color), ColorTypes.hsl);
        case targetColorType === ColorTypes.hsla:
          return formatColor(rgbToHsl(color), ColorTypes.hsla);
        case targetColorType === ColorTypes.lch:
          return formatColor(rgbToLch(color), ColorTypes.lch);
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
          return formatColor(rgbaOverlay, ColorTypes.rgb);
        case targetColorType === ColorTypes.hsl:
          return formatColor(rgbArrayToHsl(rgbaOverlay), ColorTypes.hsl);
        case targetColorType === ColorTypes.hsla:
          return formatColor(rgbaToHsla(color), ColorTypes.hsla);
        case targetColorType === ColorTypes.lch:
          return formatColor(rgbaToLch(color), ColorTypes.lch);
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
          return formatColor(hslToRgb(color), ColorTypes.rgb);
        case targetColorType === ColorTypes.rgba:
          return formatColor(hslToRgb(color), ColorTypes.rgba);
        case targetColorType === ColorTypes.hsla:
          return formatColor(hslToHsl(color), ColorTypes.hsla);
        case targetColorType === ColorTypes.lch:
          return formatColor(hslToLch(color), ColorTypes.lch);
        case targetColorType === ColorTypes.named:
          return rgbToNamed(hslToRgb(color));
        default:
          break;
      }
      break;
    // HSLA
    case startingColorType === ColorTypes.hsla:
      const hslaAsRgbaArray = hslaToRgba(color);
      const hslaOverlay = calculateOverlay(hslaAsRgbaArray)
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return rgbArrayToHex(hslaOverlay);
        case targetColorType === ColorTypes.hex8:
          return hslaToHex8(color);
        case targetColorType === ColorTypes.rgb:
          return formatColor(hslaOverlay, ColorTypes.rgb);
        case targetColorType === ColorTypes.rgba:
          return formatColor(hslaAsRgbaArray, ColorTypes.rgba);
        case targetColorType === ColorTypes.hsl:
          return formatColor(rgbArrayToHsl(hslaOverlay), ColorTypes.hsl);
        case targetColorType === ColorTypes.lch:
          return formatColor(hslaToLch(color), ColorTypes.lch);
        case targetColorType === ColorTypes.named:
          return rgbaToNamed(hslaAsRgbaArray);
        default:
          break;
      }
      break;
    // LCH
    case startingColorType === ColorTypes.lch:
      const lchAsRgbaArray = lchToRgba(color);
      const lchOverlay = calculateOverlay(lchAsRgbaArray)
      switch(true) {
        case targetColorType === ColorTypes.hex6:
          return rgbArrayToHex(lchOverlay);
        case targetColorType === ColorTypes.hex8:
          return rgbaArrayToHex8(lchAsRgbaArray);
        case targetColorType === ColorTypes.rgb:
          return formatColor(lchOverlay, ColorTypes.rgb);
        case targetColorType === ColorTypes.rgba:
          return formatColor(lchAsRgbaArray, ColorTypes.rgba);
        case targetColorType === ColorTypes.hsl:
          return formatColor(rgbArrayToHsl(lchOverlay), ColorTypes.hsl);
        case targetColorType === ColorTypes.hsla:
          return formatColor(rgbaArrayToHsla(lchAsRgbaArray), ColorTypes.hsla);
        case targetColorType === ColorTypes.named:
          return rgbaToNamed(lchAsRgbaArray);
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
          return formatColor(namedAsRgbArray, ColorTypes.rgb);
        case targetColorType === ColorTypes.rgba:
          return formatColor(namedAsRgbArray, ColorTypes.rgba);
        case targetColorType === ColorTypes.hsl:
          return formatColor(rgbArrayToHsl(namedAsRgbArray), ColorTypes.hsl);
        case targetColorType === ColorTypes.hsla:
          return formatColor(rgbArrayToHsl(namedAsRgbArray), ColorTypes.hsla);
        case targetColorType === ColorTypes.lch:
          return formatColor(rgb_array_to_LCH(namedAsRgbArray), ColorTypes.lch);
        default:
          break;
      }
      break;
  }

  return `none`;
}

export { translatedColor }
