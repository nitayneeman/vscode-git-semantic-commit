import { commands, window, ExtensionContext } from 'vscode';

import { extensionIdentifier } from '../constants';
import { Configuration, ConfigurationProperties } from '../config';
import { Git } from '../git';

export const registerCommands = async (context: ExtensionContext) => {
  let disposable = commands.registerCommand(`${extensionIdentifier}.featCommit`, async () => {
    try {
      const [, message] = await Promise.all([Git.exists(), window.showInputBox()]);

      if (message) {
        await Git.commit(`${Configuration[ConfigurationProperties.customFeatCommit]}: ${message}`);
      }
      await window.createQuickPick();
    } catch ({ message }) {
      window.showErrorMessage(message);
    }
  });

  context.subscriptions.push(disposable);
};
