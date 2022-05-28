// @ts-nocheck

// taken from
// https://drafts.csswg.org/css-color-4/multiply-matrices.js
// https://drafts.csswg.org/css-color-4/conversions.js
// https://drafts.csswg.org/css-color-4/utilities.js
// https://github.com/LeaVerou/css.land/blob/master/lch/lch.js

/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 * @author Lea Verou 2020 MIT License
 */
// A is m x n. B is n x p. product is m x p.
function multiplyMatrices(A, B) {
	let m = A.length;

	if (!Array.isArray(A[0])) {
		// A is vector, convert to [[a, b, c, ...]]
		A = [A];
	}

	if (!Array.isArray(B[0])) {
		// B is vector, convert to [[a], [b], [c], ...]]
		B = B.map(x => [x]);
	}

	let p = B[0].length;
	let B_cols = B[0].map((_, i) => B.map(x => x[i])); // transpose B
	let product = A.map(row => B_cols.map(col => {
		if (!Array.isArray(row)) {
			return col.reduce((a, c) => a + c * row, 0);
		}

		return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
	}));

	if (m === 1) {
		product = product[0]; // Avoid [[a, b, c, ...]]
	}

	if (p === 1) {
		return product.map(x => x[0]); // Avoid [[a], [b], [c], ...]]
	}

	return product;
}

// Sample code for color conversions
// Conversion can also be done using ICC profiles and a Color Management System
// For clarity, a library is used for matrix multiplication (multiply-matrices.js)

// standard white points, defined by 4-figure CIE x,y chromaticities
const D50 = [0.3457 / 0.3585, 1.00000, (1.0 - 0.3457 - 0.3585) / 0.3585];

// sRGB-related functions

function lin_sRGB(RGB) {
	// convert an array of sRGB values
	// where in-gamut values are in the range [0 - 1]
	// to linear light (un-companded) form.
	// https://en.wikipedia.org/wiki/SRGB
	// Extended transfer function:
	// for negative values,  linear portion is extended on reflection of axis,
	// then reflected power function is used.
	return RGB.map(function (val) {
		let sign = val < 0? -1 : 1;
		let abs = Math.abs(val);

		if (abs < 0.04045) {
			return val / 12.92;
		}

		return sign * (Math.pow((abs + 0.055) / 1.055, 2.4));
	});
}

function gam_sRGB(RGB) {
	// convert an array of linear-light sRGB values in the range 0.0-1.0
	// to gamma corrected form
	// https://en.wikipedia.org/wiki/SRGB
	// Extended transfer function:
	// For negative values, linear portion extends on reflection
	// of axis, then uses reflected pow below that
	return RGB.map(function (val) {
		let sign = val < 0? -1 : 1;
		let abs = Math.abs(val);

		if (abs > 0.0031308) {
			return sign * (1.055 * Math.pow(abs, 1/2.4) - 0.055);
		}

		return 12.92 * val;
	});
}

function lin_sRGB_to_XYZ(rgb) {
	// convert an array of linear-light sRGB values to CIE XYZ
	// using sRGB's own white, D65 (no chromatic adaptation)

	var M = [
		[ 0.41239079926595934, 0.357584339383878,   0.1804807884018343  ],
		[ 0.21263900587151027, 0.715168678767756,   0.07219231536073371 ],
		[ 0.01933081871559182, 0.11919477979462598, 0.9505321522496607  ]
	];
	return multiplyMatrices(M, rgb);
}

function XYZ_to_lin_sRGB(XYZ) {
	// convert XYZ to linear-light sRGB

	var M = [
		[  3.2409699419045226,  -1.537383177570094,   -0.4986107602930034  ],
		[ -0.9692436362808796,   1.8759675015077202,   0.04155505740717559 ],
		[  0.05563007969699366, -0.20397695888897652,  1.0569715142428786  ]
	];

	return multiplyMatrices(M, XYZ);
}

// Chromatic adaptation

function D65_to_D50(XYZ) {
	// Bradford chromatic adaptation from D65 to D50
	// The matrix below is the result of three operations:
	// - convert from XYZ to retinal cone domain
	// - scale components from one reference white to another
	// - convert back to XYZ
	// http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
	var M =  [
		[  1.0479298208405488,    0.022946793341019088,  -0.05019222954313557 ],
		[  0.029627815688159344,  0.990434484573249,     -0.01707382502938514 ],
		[ -0.009243058152591178,  0.015055144896577895,   0.7518742899580008  ]
	];

	return multiplyMatrices(M, XYZ);
}

function D50_to_D65(XYZ) {
	// Bradford chromatic adaptation from D50 to D65
	var M = [
		[  0.9554734527042182,   -0.023098536874261423,  0.0632593086610217   ],
		[ -0.028369706963208136,  1.0099954580058226,    0.021041398966943008 ],
		[  0.012314001688319899, -0.020507696433477912,  1.3303659366080753   ]
	];

	return multiplyMatrices(M, XYZ);
}

// CIE Lab and LCH

function XYZ_to_Lab(XYZ) {
	// Assuming XYZ is relative to D50, convert to CIE Lab
	// from CIE standard, which now defines these as a rational fraction
	var Îµ = 216/24389;  // 6^3/29^3
	var Îº = 24389/27;   // 29^3/3^3

	// compute xyz, which is XYZ scaled relative to reference white
	var xyz = XYZ.map((value, i) => value / D50[i]);

	// now compute f
	var f = xyz.map(value => value > Îµ ? Math.cbrt(value) : (Îº * value + 16)/116);

	return [
		(116 * f[1]) - 16, 	 // L
		500 * (f[0] - f[1]), // a
		200 * (f[1] - f[2])  // b
	];
	// L in range [0,100]. For use in CSS, add a percent
}

function Lab_to_XYZ(Lab) {
	// Convert Lab to D50-adapted XYZ
	// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
	var Îº = 24389/27;   // 29^3/3^3
	var Îµ = 216/24389;  // 6^3/29^3
	var f = [];

	// compute f, starting with the luminance-related term
	f[1] = (Lab[0] + 16)/116;
	f[0] = Lab[1]/500 + f[1];
	f[2] = f[1] - Lab[2]/200;

	// compute xyz
	var xyz = [
		Math.pow(f[0],3) > Îµ ?   Math.pow(f[0],3)            : (116*f[0]-16)/Îº,
		Lab[0] > Îº * Îµ ?         Math.pow((Lab[0]+16)/116,3) : Lab[0]/Îº,
		Math.pow(f[2],3)  > Îµ ?  Math.pow(f[2],3)            : (116*f[2]-16)/Îº
	];

	// Compute XYZ by scaling xyz by reference white
	return xyz.map((value, i) => value * D50[i]);
}

function Lab_to_LCH(Lab) {
	// Convert to polar form
	var hue = Math.atan2(Lab[2], Lab[1]) * 180 / Math.PI;
	return [
		Lab[0], // L is still L
		Math.sqrt(Math.pow(Lab[1], 2) + Math.pow(Lab[2], 2)), // Chroma
		hue >= 0 ? hue : hue + 360 // Hue, in degrees [0 to 360)
	];
}

function LCH_to_Lab(LCH) {
	// Convert from polar form
	return [
		LCH[0], // L is still L
		LCH[1] * Math.cos(LCH[2] * Math.PI / 180), // a
		LCH[1] * Math.sin(LCH[2] * Math.PI / 180) // b
	];
}

// Premultiplied alpha conversions

// utility functions for color conversions
// needs conversions.js

function sRGB_to_LCH(RGB) {
    // convert an array of gamma-corrected sRGB values
    // in the 0.0 to 1.0 range
    // to linear-light sRGB, then to CIE XYZ,
    // then adapt from D65 to D50,
    // then convert XYZ to CIE Lab
    // and finally, convert to CIE LCH

    return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB)))));
}

function LCH_to_sRGB(LCH) {
    // convert an array of CIE LCH values
    // to CIE Lab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light sRGB
    // and finally to gamma corrected sRGB
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)

    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

function LCH_to_RGB_array(l, c, h) {
  [l, c, h] = force_into_gamut(l, c, h, isLCH_within_sRGB);

  let rgbArray = [];

	LCH_to_sRGB([+l, +c, +h]).map(x => {
		return rgbArray.push(parseInt(Math.round(x * 255)));
	})

  return rgbArray;
}

function force_into_gamut(l, c, h, isLCH_within) {
	// Moves an lch color into the sRGB gamut
	// by holding the l and h steady,
	// and adjusting the c via binary-search
	// until the color is on the sRGB boundary.
	if (isLCH_within(l, c, h)) {
		return [l, c, h];
	}

	let hiC = c;
	let loC = 0;
	const ε = .0001;
	c /= 2;

	// .0001 chosen fairly arbitrarily as "close enough"
	while (hiC - loC > ε) {
		if (isLCH_within(l, c, h)) {
			loC = c;
		}
		else {
			hiC = c;
		}
		c = (hiC + loC)/2;
	}

	return [l, c, h];
}

function isLCH_within_sRGB(l, c, h) {
	var rgb = LCH_to_sRGB([+l, +c, +h]);
	const ε = .000005;
	return rgb.reduce((a, b) => a && b >= (0 - ε) && b <= (1 + ε), true);
}

const rgb_array_to_LCH = (rgb: Array<number>): Array<number> => {
  let params = rgb.map((x, i) => i < 3? x/255 : x);
  var lch = sRGB_to_LCH(params.slice(0, 3));

	return lch.map((x) => parseFloat(x.toFixed(3)));
}

export { LCH_to_RGB_array, isLCH_within_sRGB, rgb_array_to_LCH }
