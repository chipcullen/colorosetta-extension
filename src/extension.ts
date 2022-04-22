import * as vscode from 'vscode';
import { typeOfColor } from './utils/typeOfColor';
import { isValidColor } from './utils/isValidColor';
import { translatedColor } from './utils/translatedColor';
import { colorTypes } from './utils/colorTypes';

export function activate(context: vscode.ExtensionContext) {

	const getValidInput = () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the text within the selection
			const text = document.getText(selection);

			// @TODO the menu/commands in package.json now have
			// "when": "editorHasSelection"
			// ... I _think_ I can get rid of this check
			if (!text) {
				vscode.window.showErrorMessage('Make a selection first');
				return null;
			}

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
	};

	const replaceEditorText = (input: string) => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const selection = editor.selection;

			editor.edit(editBuilder => {
				editBuilder.replace(selection, input);
			});
		}
	};

	let translateColor = vscode.commands.registerCommand('colorosetta-extension.translateColor', () => {
		const input = getValidInput();
		if (input) {
			vscode.window.showQuickPick(
				[
					translatedColor(input.text, input.colorType, colorTypes.hex6),
					translatedColor(input.text, input.colorType, colorTypes.hex8),
					translatedColor(input.text, input.colorType, colorTypes.rgb),
					translatedColor(input.text, input.colorType, colorTypes.rgba),
					translatedColor(input.text, input.colorType, colorTypes.hsl),
					translatedColor(input.text, input.colorType, colorTypes.hsla),
		  	]
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

	context.subscriptions.push(translateColor, toHex6, toHex8, toRgb, toRgba, toHsl, toHsla);
}

// this method is called when your extension is deactivated
export function deactivate() {}
