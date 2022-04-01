import * as vscode from 'vscode';
import { typeOfColor } from './utils/typeOfColor';
import { isValidColor } from './utils/isValidColor';

export function activate(context: vscode.ExtensionContext) {

	let translateColor = vscode.commands.registerCommand('colorosetta-extension.translateColor', () => {

		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the text within the selection
			const text = document.getText(selection);

			if (!text) {
				vscode.window.showInformationMessage('Make a selection first');
				return;
			}

			const colorType = typeOfColor(text);

			if (!colorType || !isValidColor(text, colorType)) {
				vscode.window.showInformationMessage('Please input a valid color');
				return;
			}

			vscode.window.showQuickPick(
				[
					'bar',
					'foo'
		  	]
			).then(qpSelection => {


				editor.edit(editBuilder => {
					editBuilder.replace(selection, qpSelection as string);
				});

				vscode.window.showInformationMessage(qpSelection as string);
			});


		}
	});

	context.subscriptions.push(translateColor);
}

// this method is called when your extension is deactivated
export function deactivate() {}
