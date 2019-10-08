import { commands, window, ExtensionContext } from 'vscode';

export const registerCommands = (context: ExtensionContext) => {
  let disposable = commands.registerCommand('extension.helloWorld', () => {
    window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
};
