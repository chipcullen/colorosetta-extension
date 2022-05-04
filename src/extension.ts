import * as vscode from 'vscode';
import { typeOfColor } from './utils/typeOfColor';
import { isValidColor } from './utils/isValidColor';
import { translatedColor } from './utils/translatedColor';
import { colorTypes } from './utils/colorTypes';

export function activate(context: vscode.ExtensionContext) {

	interface ColorInput {
		text: string,
		colorType: colorTypes,
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
		return translatedColor(input.text, input.colorType, colorTypes.named).toLowerCase();
	};

	let translateColor = vscode.commands.registerCommand('colorosetta-extension.translateColor', () => {
		const input = getValidInput();
		if (input) {
			const qpChoices = [];

			for (const value in colorTypes) {
				if (
				// Except for `none` and `named`
				(value !== colorTypes.none && value !== colorTypes.named)
				&&
				// and for not the input color space
				(input.colorType !== value)
				) {
					// offer a translated choice
					qpChoices.push(translatedColor(input.text, input.colorType, value as colorTypes));
				}
			}

			const namedColor = namedColorTranslation(input);

			// if there is a valid named conversion, push that
			input.colorType !== colorTypes.named && namedColor ? qpChoices.push(namedColor) : ``;

			vscode.window.showQuickPick(
				qpChoices
			).then(qpSelection => {
				replaceEditorText(qpSelection as string);
			});
		}
	});

	let toHex6 = vscode.commands.registerCommand('colorosetta-extension.toHex6', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, colorTypes.hex6));
		}
	});

	let toHex8 = vscode.commands.registerCommand('colorosetta-extension.toHex8', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, colorTypes.hex8));
		}
	});

	let toRgb = vscode.commands.registerCommand('colorosetta-extension.toRgb', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, colorTypes.rgb));
		}
	});

	let toRgba = vscode.commands.registerCommand('colorosetta-extension.toRgba', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, colorTypes.rgba));
		}
	});

	let toHsl = vscode.commands.registerCommand('colorosetta-extension.toHsl', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, colorTypes.hsl));
		}
	});

	let toHsla = vscode.commands.registerCommand('colorosetta-extension.toHsla', () => {
		const input = getValidInput();

		if (input) {
			replaceEditorText(translatedColor(input.text, input.colorType, colorTypes.hsla));
		}
	});

	let toNamed = vscode.commands.registerCommand('colorosetta-extension.toNamed', () => {
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
