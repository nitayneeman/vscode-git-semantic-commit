import { commands, window, ExtensionContext } from 'vscode';

import { Git } from '../git';

export const registerCommands = async (context: ExtensionContext) => {
  let disposable = commands.registerCommand('gitSemanticCommitMessage.featCommit', async () => {
    try {
      await Promise.all([Git.exists(), Git.commit('feat')]);
    } catch ({ message }) {
      window.showErrorMessage(message);
    }
  });

  context.subscriptions.push(disposable);
};
