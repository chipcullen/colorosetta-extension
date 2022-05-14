# ColoRosetta - the extension

This VS Code extension brings the one-to-many color translations of https://colorosetta.com/ to your editor!

![A color translated from the editor into seven color formats](/images/translating-color.gif)
## Features

- Translates selected text into 7 color formats: Hex (6), Hex (8), RGB, RGBa, HSL, HSLa and Named Colors
- Can translate directly to each of those color formats.
![A color translated from the editor into seven color formats](/images/direct-translating-color.gif)
(If you choose named, and there is no matching named color, you get a warning instead.)
- Note: if translating from a color space with an alpha channel (e.g. rgba) to one without an alpha channel (e.g. Hex 6), the translated color assumes a `#ffffff` background

## Installation

- You can install through the extensions menu ()
- Or, in the command palette, `install extension` then look for `colorosetta`
- Or, download from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=chipcullen.colorosetta)

## Usage

- Select the color string you want to translate
- Command Palette > "Translate", then choose your desired command
- You can also right click on a selection and translate from there to a particular color format
## Known Issues / @TODO's

- Add support for the [modern color syntax](https://twitter.com/mathias/status/1253242715304857601) without commas
- Add support for [LCH](https://css.land/lch/)




