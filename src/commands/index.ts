import { commands, window, ExtensionContext } from 'vscode';

import { Configuration, Properties } from '../config';
import { Git } from '../git';

export const registerCommands = async (context: ExtensionContext) => {
  let disposable = commands.registerCommand('gitSemanticCommitMessage.featCommit', async () => {
    try {
      const [, message] = await Promise.all([Git.exists(), window.showInputBox()]);

      if (message) {
        await Git.commit(`${Configuration[Properties.customFeatCommit]}: ${message}`);
      }
    } catch ({ message }) {
      window.showErrorMessage(message);
    }
  });

  context.subscriptions.push(disposable);
};
