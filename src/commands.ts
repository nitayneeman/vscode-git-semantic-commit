import { commands, window, Disposable, ExtensionContext } from 'vscode';

import { extensionIdentifier } from './constants';
import { Configuration, ConfigurationProperties } from './config';
import { Git } from './git';

const disposables: Disposable[] = [
  commands.registerCommand(`${extensionIdentifier}.featCommit`, async () => {
    try {
      const [, message] = await Promise.all([Git.exists(), window.showInputBox()]);

      if (message) {
        await Git.commit(`${Configuration[ConfigurationProperties.customFeatCommit]}: ${message}`);
      }
      await window.createQuickPick();
    } catch ({ message }) {
      window.showErrorMessage(message);
    }
  })
];

const registerCommands = async (context: ExtensionContext) => {
  context.subscriptions.push(...disposables);
};

export { registerCommands };
