import { ColorTypes } from './colorTypes';
import { lowerCaseNamedColors } from "./namedColors";

const typeOfColor = (color: string): ColorTypes => {
  switch (true) {
    // https://stackoverflow.com/a/8027444/1173898
    case /^(#)?[0-9A-F]{3}$/i.test(color):
    case /^(#)?[0-9A-F]{6}$/i.test(color):
      return ColorTypes.hex6;

    case /^(#)?[0-9A-F]{4}$/i.test(color):
    case /^(#)?[0-9A-F]{8}$/i.test(color):
      return ColorTypes.hex8;

    case color.indexOf("rgba") === 0 && color.indexOf(")") !== -1:
      return ColorTypes.rgba;

    case color.indexOf("rgb") === 0 && color.indexOf(")") !== -1:
      return ColorTypes.rgb;

    case color.indexOf("hsla") === 0 && color.indexOf(")") !== -1:
      return ColorTypes.hsla;

    case color.indexOf("hsl") === 0 && color.indexOf(")") !== -1:
      return ColorTypes.hsl;

    case color.indexOf("lch") === 0 && color.indexOf(")") !== -1:
      return ColorTypes.lch;

    // converting user input to lowercase so the input
    // can be "rebeccapurple" or "RebeccaPurple"
    case lowerCaseNamedColors.includes(color.toLowerCase()):
      return ColorTypes.named;

    default:
      return ColorTypes.none;
  }
};

export { typeOfColor };
