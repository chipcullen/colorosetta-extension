import Color from 'colorjs.io';
import { ColorTypes } from './colorTypes';
import { calculateOverlay } from './calculateOverlay';
import { rgbToNamed, rgbaToNamed } from './toNamed';

const translatedColor = (
  color: string,
  startingColorType: ColorTypes,
  targetColorType: ColorTypes
): string => {
  if (startingColorType === targetColorType) {
    return color;
  }

  const hexTypes = [ColorTypes.hex6, ColorTypes.hex8];
  const normalizedColor =
    hexTypes.includes(startingColorType) && !color.startsWith('#')
      ? `#${color}`
      : color;

  let parsed: Color;
  try {
    parsed = new Color(normalizedColor);
  } catch {
    return 'none';
  }

  // For alpha-bearing types, flatten to RGB on white before converting
  // to formats that don't carry alpha (hex6, rgb, hsl, named)
  const hasAlpha = parsed.alpha < 1;
  const needsOverlay =
    hasAlpha &&
    [ColorTypes.hex6, ColorTypes.rgb, ColorTypes.hsl, ColorTypes.named].includes(targetColorType);

  const srgb = parsed.toGamut({space: 'srgb'}).to('srgb');
  const [r, g, b] = srgb.coords.map((v: number | null) => Math.round((v ?? 0) * 255));
  const a = parsed.alpha;

  const overlaid = needsOverlay ? calculateOverlay([r, g, b, a]) : null;

  switch (targetColorType) {
    case ColorTypes.hex6: {
      const [or, og, ob] = overlaid ?? [r, g, b];
      return `#${[or, og, ob].map(v => v.toString(16).padStart(2, '0')).join('')}`;
    }

    case ColorTypes.hex8: {
      const alpha255 = Math.round(a * 255);
      return `#${[r, g, b, alpha255].map(v => v.toString(16).padStart(2, '0')).join('')}`;
    }

    case ColorTypes.rgb: {
      const [or, og, ob] = overlaid ?? [r, g, b];
      return `rgb(${or} ${og} ${ob})`;
    }

    case ColorTypes.rgba:
      return `rgba(${r} ${g} ${b} / ${a})`;

    case ColorTypes.hsl: {
      const [or, og, ob] = overlaid ?? [r, g, b];
      const flat = new Color(`srgb`, [or / 255, og / 255, ob / 255]);
      const hsl = flat.to('hsl');
      const [h, s, l] = hsl.coords.map((v: number | null) => Math.round(v ?? 0));
      return `hsl(${h} ${s}% ${l}%)`;
    }

    case ColorTypes.hsla: {
      const hsl = srgb.to('hsl');
      const [h, s, l] = hsl.coords.map((v: number | null) => Math.round(v ?? 0));
      return `hsla(${h} ${s}% ${l}% / ${a})`;
    }

    case ColorTypes.lch: {
      const lch = parsed.to('lch');
      const [l, c, h] = lch.coords.map((v: number | null) => +((v ?? 0).toFixed(2)));
      const alphaStr = a < 1 ? ` / ${a}` : '';
      return `lch(${l}% ${c} ${h}${alphaStr})`;
    }

    case ColorTypes.named: {
      const [or, og, ob] = overlaid ?? [r, g, b];
      if (a === 1) return rgbToNamed([or, og, ob]);
      return rgbaToNamed([r, g, b, a]);
    }

    default:
      return 'none';
  }
};

export { translatedColor };
