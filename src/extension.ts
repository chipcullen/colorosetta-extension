import * as vscode from 'vscode';
import { typeOfColor } from './utils/typeOfColor';
import { isValidColor } from './utils/isValidColor';
import { translatedColor } from './utils/translatedColor';
import { ColorTypes } from './utils/colorTypes';

export function activate(context: vscode.ExtensionContext) {

	interface ColorInput {
		text: string,
		colorType: ColorTypes,
	};

	const getValidInput = (): ColorInput | null => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the text within the selection
			const text = document.getText(selection);

			const colorType = typeOfColor(text);

			if (!colorType || !isValidColor(text, colorType)) {
				vscode.window.showErrorMessage('Please input a valid color - Hex, Hex8, RGB, RBGa, HSL, HSLa, or valid named color');
				return null;
			}

			return {
				text: text,
				colorType: colorType,
			};
		}

		return null;
	};

	const replaceEditorText = (input: string) => {
		const editor = vscode.window.activeTextEditor;
		// need to check for input undefined -
		// that can happen if the user escapes from the quick pick menu
		if (editor && input !== undefined) {
			const selection = editor.selection;

			editor.edit(editBuilder => {
				editBuilder.replace(selection, input);
			});
		}
	};

	const namedColorTranslation = (input: ColorInput): string | null => {
		return translatedColor(input.text, input.colorType, ColorTypes.named).toLowerCase();
	};

	let translateColor = vscode.commands.registerCommand('colorosetta.translateColor', () => {
		const input = getValidInput();
		if (input) {
			const qpChoices = [];

			for (const value in ColorTypes) {
				if (
				// Except for `none` and `named`
				(value !== ColorTypes.none && value !== ColorTypes.named)
				&&
				// and for not the input color space
				(input.colorType !== value)
				) {
					// offer a translated choice
					qpChoices.push(translatedColor(input.text, input.colorType, value as ColorTypes));
				}
			}

			const namedColor = namedColorTranslation(input);

			// if there is a valid named conversion, push that
			input.colorType !== ColorTypes.named && namedColor ? qpChoices.push(namedColor) : ``;

			vscode.window.showQuickPick(
				qpChoices
			).then(qpSelection => {
				replaceEditorText(qpSelection as string);
			});
		}
	});

	let toHex6 = vscode.commands.registerCommand('colorosetta.toHex6', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, ColorTypes.hex6));
		}
	});

	let toHex8 = vscode.commands.registerCommand('colorosetta.toHex8', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, ColorTypes.hex8));
		}
	});

	let toRgb = vscode.commands.registerCommand('colorosetta.toRgb', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, ColorTypes.rgb));
		}
	});

	let toRgba = vscode.commands.registerCommand('colorosetta.toRgba', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, ColorTypes.rgba));
		}
	});

	let toHsl = vscode.commands.registerCommand('colorosetta.toHsl', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, ColorTypes.hsl));
		}
	});

	let toHsla = vscode.commands.registerCommand('colorosetta.toHsla', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, ColorTypes.hsla));
		}
	});

	let toNamed = vscode.commands.registerCommand('colorosetta.toNamed', () => {
		const input = getValidInput();

		if (input) {
			const namedColor = namedColorTranslation(input);

			if (namedColor) {
				replaceEditorText(namedColor);
			} else {
				vscode.window.showWarningMessage(
					'There is no matching named color'
					);
			}
		}
	});

	context.subscriptions.push(translateColor, toHex6, toHex8, toRgb, toRgba, toHsl, toHsla, toNamed);
}

// this method is called when your extension is deactivated
export function deactivate() {}
