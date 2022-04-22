# ColoRosetta - the extension

This VS Code extension brings the one-to-many color translations of https://colorosetta.com/ to your editor!

## Features

- Translates selected text into 6 color spaces: Hex (6), Hex (8), RGB, RGBa, HSL, HSLa
- Can translate directly to each of those color spaces
- Note: if translating from a color space with an alpha channel (e.g. rgba) to one without an alpha channel (e.g. Hex 6), the translated color assumes a `#ffffff` background

## Known Issues

- No support for translating to named colors (e.g. `rebeccaPurple`), but you can start with a named color


