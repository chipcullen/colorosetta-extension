import { colorTypes } from './colorTypes';
import { lowerCaseNamedColors } from "./namedColors";

const typeOfColor = (color: string): colorTypes => {
  switch (true) {
    // https://stackoverflow.com/a/8027444/1173898
    case /^(#)?[0-9A-F]{3}$/i.test(color):
    case /^(#)?[0-9A-F]{6}$/i.test(color):
      return colorTypes.hex6;

    case /^(#)?[0-9A-F]{4}$/i.test(color):
    case /^(#)?[0-9A-F]{8}$/i.test(color):
      return colorTypes.hex8;

    case color.indexOf("rgba") === 0 && color.indexOf(")") !== -1:
      return colorTypes.rgba;

    case color.indexOf("rgb") === 0 && color.indexOf(")") !== -1:
      return colorTypes.rgb;

    case color.indexOf("hsla") === 0 && color.indexOf(")") !== -1:
      return colorTypes.hsla;

    case color.indexOf("hsl") === 0 && color.indexOf(")") !== -1:
      return colorTypes.hsl;

    // converting user input to lowercase so the input
    // can be "rebeccapurple" or "RebeccaPurple"
    case lowerCaseNamedColors.includes(color.toLowerCase()):
      return colorTypes.named;

    default:
      return colorTypes.none;
  }
};

export { typeOfColor };
