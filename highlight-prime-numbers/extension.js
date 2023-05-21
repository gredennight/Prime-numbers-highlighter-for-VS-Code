// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "highlight-prime-numbers" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('highlight-prime-numbers.Highlight', function () {
		// The code you place here will be executed every time your command is executed
		function IsNumber(c) { return /\d/.test(c); }
		function IsPrime(number_string){
			var number = Number(number_string);
			//https://www.programiz.com/javascript/examples/prime-number
			// program to check if a number is prime or not
			let isPrime = true;

			// check if number is equal to 1
			if (number === 1) {
				return true;
			}

			// check if number is greater than 1
			else if (number > 1) {

				// looping through 2 to number-1
				for (let i = 2; i < number; i++) {
					if (number % i == 0) {
						isPrime = false;
						break;
					}
				}

				if (isPrime) {
					return true;
				} else {
					return false;
				}
			}
			return false;
		}
		function SetColor(color,start_index,end_index){
			const start=editor.document.positionAt(start_index)
			const end = editor.document.positionAt(end_index)
			const decorationRange={range: new vscode.Range(start,end),color: color}
			const decorationType =vscode.window.createTextEditorDecorationType({ color: color})
			editor.setDecorations(decorationType,[decorationRange])

		}
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		const text_content = editor.document.getText();
		var string_of_numbers;
		for(var i=0; i<=text_content.length;i++){
			var current_char=text_content[i];
			if(IsNumber(current_char))
				string_of_numbers+=current_char;
			else{
				if(string_of_numbers){
					if(IsPrime(string_of_numbers))
						SetColor('green',i-string_of_numbers.length,i)
					else
						SetColor('red',	i-string_of_numbers.length,i)
				}
				string_of_numbers = new String();
			}
		}
		//vscode.window.showInformationMessage('Hello World from Highlight Prime Numbers!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
