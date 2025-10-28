const vscode = require('vscode');

function activate(context) {
  console.log('Word Counter extension is now active!');

  let disposable =
      vscode.commands.registerCommand('word-counter.count', function() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showInformationMessage(
              'Откройте файл перед использованием команды.');
          return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
          vscode.window.showInformationMessage('Выделите текст для подсчёта.');
          return;
        }

        const lines = text.split(/\r\n|\r|\n/).length;
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const chars = text.length;

        vscode.window.showInformationMessage(
            `Строк: ${lines}, Слов: ${words}, Символов: ${chars}`);
      });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
