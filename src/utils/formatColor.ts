import { ColorTypes } from "./colorTypes";

const formatColor = (arr: Array<number>, formatColorType: ColorTypes): string => {
  switch (true) {
    case formatColorType === ColorTypes.rgb:
      return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
    case formatColorType === ColorTypes.rgba:
      return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3] ? arr[3] : 1})`;
    case formatColorType === ColorTypes.hsl:
      return `hsl(${arr[0]}, ${arr[1]}%, ${arr[2]}%)`;
    case formatColorType === ColorTypes.hsla:
      return `hsla(${arr[0]}, ${arr[1]}%, ${arr[2]}%, ${arr[3] ? arr[3] : 1})`;
    case formatColorType === ColorTypes.lch:
      return `lch(${arr[0]}% ${arr[1]} ${arr[2]}${arr[3] && arr[3] !== 100 ? ` / ${arr[3]}%` : ''})`;
    default:
      break;
  }
  return `none`;
};

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

export { formatColor, formatHex6AsHex8 };
