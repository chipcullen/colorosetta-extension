// Turn "rgb(r,g,b)" into [r,g,b]
const colorStringToArray = (colorString: string, returnNum=false, index=4): Array<string> | Array<number> => {
  let sep = colorString.indexOf(",") > -1 ? ", " : " ";

  let colorArray: Array<string> = colorString
    .substring(index)
    .split(")")[0]
    .split(sep);

  if (returnNum) {
    const colorIntArray = colorArray.map(x => parseInt(x));
    return colorIntArray;
  } else {
    return colorArray;
  }
};

export { colorStringToArray };
