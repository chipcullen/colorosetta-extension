import * as assert from 'assert';
import { translatedColor } from '../../utils/translatedColor';
import { typeOfColor } from '../../utils/typeOfColor';
import { isValidColor } from '../../utils/isValidColor';
import { ColorTypes } from '../../utils/colorTypes';

suite('typeOfColor', () => {
	test('detects hex6', () => {
		assert.strictEqual(typeOfColor('#ff0000'), ColorTypes.hex6);
		assert.strictEqual(typeOfColor('#fff'), ColorTypes.hex6);
		assert.strictEqual(typeOfColor('ff0000'), ColorTypes.hex6);
	});

	test('detects hex8', () => {
		assert.strictEqual(typeOfColor('#ff000080'), ColorTypes.hex8);
		assert.strictEqual(typeOfColor('ff000080'), ColorTypes.hex8);
	});

	test('detects rgb', () => {
		assert.strictEqual(typeOfColor('rgb(255 0 0)'), ColorTypes.rgb);
		assert.strictEqual(typeOfColor('rgb(255, 0, 0)'), ColorTypes.rgb);
		assert.strictEqual(typeOfColor('rgb(255 0 0 / 0.5)'), ColorTypes.rgb);
		assert.strictEqual(typeOfColor('rgba(255 0 0 / 0.5)'), ColorTypes.rgb);
		assert.strictEqual(typeOfColor('rgba(255, 0, 0, 0.5)'), ColorTypes.rgb);
	});

	test('detects hsl', () => {
		assert.strictEqual(typeOfColor('hsl(0 100% 50%)'), ColorTypes.hsl);
		assert.strictEqual(typeOfColor('hsl(0, 100%, 50%)'), ColorTypes.hsl);
		assert.strictEqual(typeOfColor('hsl(0 100% 50% / 0.5)'), ColorTypes.hsl);
		assert.strictEqual(typeOfColor('hsla(0 100% 50% / 0.5)'), ColorTypes.hsl);
		assert.strictEqual(typeOfColor('hsla(0, 100%, 50%, 0.5)'), ColorTypes.hsl);
	});

	test('detects lch', () => {
		assert.strictEqual(typeOfColor('lch(54.291% 106.837 40.858)'), ColorTypes.lch);
	});

	test('detects oklch', () => {
		assert.strictEqual(typeOfColor('oklch(62.8% 0.258 29.234)'), ColorTypes.oklch);
	});

	test('detects p3', () => {
		assert.strictEqual(typeOfColor('color(display-p3 1 0 0)'), ColorTypes.p3);
	});

	test('detects named', () => {
		assert.strictEqual(typeOfColor('red'), ColorTypes.named);
		assert.strictEqual(typeOfColor('RebeccaPurple'), ColorTypes.named);
	});

	test('returns none for invalid input', () => {
		assert.strictEqual(typeOfColor('notacolor'), ColorTypes.none);
		assert.strictEqual(typeOfColor(''), ColorTypes.none);
	});
});

suite('isValidColor', () => {
	test('validates hex6', () => {
		assert.strictEqual(isValidColor('#ff0000', ColorTypes.hex6), true);
		assert.strictEqual(isValidColor('#fff', ColorTypes.hex6), true);
		assert.strictEqual(isValidColor('#gggggg', ColorTypes.hex6), false);
	});

	test('validates hex8', () => {
		assert.strictEqual(isValidColor('#ff000080', ColorTypes.hex8), true);
		assert.strictEqual(isValidColor('#ff0000', ColorTypes.hex8), false);
	});

	test('validates rgb', () => {
		assert.strictEqual(isValidColor('rgb(255 0 0)', ColorTypes.rgb), true);
		assert.strictEqual(isValidColor('rgb(255, 0, 0)', ColorTypes.rgb), true);
		assert.strictEqual(isValidColor('hsl(0 100% 50%)', ColorTypes.rgb), false);
	});

	test('validates legacy rgba/hsla aliases under consolidated types', () => {
		assert.strictEqual(isValidColor('rgba(255 0 0 / 0.5)', ColorTypes.rgb), true);
		assert.strictEqual(isValidColor('rgba(255, 0, 0, 0.5)', ColorTypes.rgb), true);
		assert.strictEqual(isValidColor('hsla(0 100% 50% / 0.5)', ColorTypes.hsl), true);
		assert.strictEqual(isValidColor('hsla(0, 100%, 50%, 0.5)', ColorTypes.hsl), true);
	});

	test('validates hsl', () => {
		assert.strictEqual(isValidColor('hsl(0 100% 50%)', ColorTypes.hsl), true);
		assert.strictEqual(isValidColor('hsl(0, 100%, 50%)', ColorTypes.hsl), true);
	});

	test('validates lch', () => {
		assert.strictEqual(isValidColor('lch(54.291% 106.837 40.858)', ColorTypes.lch), true);
	});

	test('validates oklch', () => {
		assert.strictEqual(isValidColor('oklch(62.8% 0.258 29.234)', ColorTypes.oklch), true);
	});

	test('validates p3', () => {
		assert.strictEqual(isValidColor('color(display-p3 1 0 0)', ColorTypes.p3), true);
	});

	test('validates named', () => {
		assert.strictEqual(isValidColor('red', ColorTypes.named), true);
		assert.strictEqual(isValidColor('notacolor', ColorTypes.named), false);
	});
});

suite('translatedColor', () => {
	test('hex6 to all targets', () => {
		assert.strictEqual(translatedColor('#ff0000', ColorTypes.hex6, ColorTypes.rgb), 'rgb(255 0 0)');
		assert.strictEqual(translatedColor('#ff0000', ColorTypes.hex6, ColorTypes.hex8), '#ff0000ff');
		assert.strictEqual(translatedColor('#ff0000', ColorTypes.hex6, ColorTypes.hsl), 'hsl(0 100% 50%)');
		assert.strictEqual(translatedColor('#ff0000', ColorTypes.hex6, ColorTypes.named), 'Red');
	});

	test('hex6 without # prefix', () => {
		assert.strictEqual(translatedColor('ff0000', ColorTypes.hex6, ColorTypes.rgb), 'rgb(255 0 0)');
		assert.strictEqual(translatedColor('fff', ColorTypes.hex6, ColorTypes.rgb), 'rgb(255 255 255)');
	});

	test('hex6 to named - well-known colors', () => {
		assert.strictEqual(translatedColor('#ffffff', ColorTypes.hex6, ColorTypes.named), 'White');
		assert.strictEqual(translatedColor('#000000', ColorTypes.hex6, ColorTypes.named), 'Black');
		assert.strictEqual(translatedColor('#ff00ff', ColorTypes.hex6, ColorTypes.named), 'Fuchsia');
	});

	test('hex8 with alpha flattens to hex6, preserves alpha in rgb/hsl', () => {
		assert.strictEqual(translatedColor('#ff000080', ColorTypes.hex8, ColorTypes.hex6), '#ff7f7f');
		assert.strictEqual(translatedColor('#ff000080', ColorTypes.hex8, ColorTypes.rgb), 'rgb(255 0 0 / 50.2%)');
	});

	test('rgb to targets', () => {
		assert.strictEqual(translatedColor('rgb(255 0 0)', ColorTypes.rgb, ColorTypes.hex6), '#ff0000');
		assert.strictEqual(translatedColor('rgb(255 0 0)', ColorTypes.rgb, ColorTypes.hsl), 'hsl(0 100% 50%)');
		assert.strictEqual(translatedColor('rgb(255 0 0)', ColorTypes.rgb, ColorTypes.named), 'Red');
		assert.strictEqual(translatedColor('rgb(255, 0, 0)', ColorTypes.rgb, ColorTypes.hex6), '#ff0000');
	});

	test('rgb with alpha flattens to hex6, preserves alpha in rgb/hsl', () => {
		assert.strictEqual(translatedColor('rgb(255 0 0 / 0.5)', ColorTypes.rgb, ColorTypes.hex6), '#ff7f7f');
		assert.strictEqual(translatedColor('rgb(255 0 0 / 0.5)', ColorTypes.rgb, ColorTypes.hex8), '#ff000080');
		assert.strictEqual(translatedColor('rgb(255 0 0 / 0.5)', ColorTypes.rgb, ColorTypes.hsl), 'hsl(0 100% 50% / 50%)');
	});

	test('normalizes legacy rgba/hsla aliases to canonical form', () => {
		assert.strictEqual(translatedColor('rgba(255 0 0 / 0.5)', ColorTypes.rgb, ColorTypes.rgb), 'rgb(255 0 0 / 50%)');
		assert.strictEqual(translatedColor('rgba(255, 0, 0, 1)', ColorTypes.rgb, ColorTypes.rgb), 'rgb(255 0 0)');
		assert.strictEqual(translatedColor('hsla(0 100% 50% / 0.5)', ColorTypes.hsl, ColorTypes.hsl), 'hsl(0 100% 50% / 50%)');
		assert.strictEqual(translatedColor('hsla(0, 100%, 50%, 1)', ColorTypes.hsl, ColorTypes.hsl), 'hsl(0 100% 50%)');
	});

	test('hsl to targets', () => {
		assert.strictEqual(translatedColor('hsl(0 100% 50%)', ColorTypes.hsl, ColorTypes.hex6), '#ff0000');
		assert.strictEqual(translatedColor('hsl(0 100% 50%)', ColorTypes.hsl, ColorTypes.rgb), 'rgb(255 0 0)');
		assert.strictEqual(translatedColor('hsl(0, 100%, 50%)', ColorTypes.hsl, ColorTypes.hex6), '#ff0000');
	});

	test('lch to hex6', () => {
		assert.strictEqual(translatedColor('lch(54.291% 106.837 40.858)', ColorTypes.lch, ColorTypes.hex6), '#ff0000');
	});

	test('oklch to targets', () => {
		assert.strictEqual(translatedColor('oklch(62.8% 0.258 29.234)', ColorTypes.oklch, ColorTypes.hex6), '#ff0000');
		assert.strictEqual(translatedColor('oklch(100% 0 0)', ColorTypes.oklch, ColorTypes.hex6), '#ffffff');
		assert.strictEqual(translatedColor('oklch(0% 0 0)', ColorTypes.oklch, ColorTypes.hex6), '#000000');
	});

	test('oklch same-type returns unchanged', () => {
		assert.strictEqual(
			translatedColor('oklch(62.8% 0.258 29.234)', ColorTypes.oklch, ColorTypes.oklch),
			'oklch(62.8% 0.258 29.234)'
		);
	});

	test('p3 to targets', () => {
		assert.strictEqual(translatedColor('color(display-p3 1 1 1)', ColorTypes.p3, ColorTypes.hex6), '#ffffff');
		assert.strictEqual(translatedColor('color(display-p3 0 0 0)', ColorTypes.p3, ColorTypes.hex6), '#000000');
		assert.strictEqual(translatedColor('color(display-p3 1 1 1)', ColorTypes.p3, ColorTypes.rgb), 'rgb(255 255 255)');
	});

	test('p3 same-type returns unchanged', () => {
		assert.strictEqual(
			translatedColor('color(display-p3 1 0 0)', ColorTypes.p3, ColorTypes.p3),
			'color(display-p3 1 0 0)'
		);
	});

	test('named to targets', () => {
		assert.strictEqual(translatedColor('red', ColorTypes.named, ColorTypes.hex6), '#ff0000');
		assert.strictEqual(translatedColor('red', ColorTypes.named, ColorTypes.rgb), 'rgb(255 0 0)');
		assert.strictEqual(translatedColor('white', ColorTypes.named, ColorTypes.hex6), '#ffffff');
	});

	test('invalid input returns none', () => {
		assert.strictEqual(translatedColor('notacolor', ColorTypes.hex6, ColorTypes.rgb), 'none');
	});
});
