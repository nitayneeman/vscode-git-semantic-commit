import { commands, window, ExtensionContext } from 'vscode';

import { Git } from '../git';

export const registerCommands = (context: ExtensionContext) => {
  let disposable = commands.registerCommand('extension.helloWorld', async () => {
    if (await Git.exists()) {
      window.showInformationMessage('Hello World!');
    } else {
      window.showErrorMessage('Please install Git!');
    }
  });

  context.subscriptions.push(disposable);
};
