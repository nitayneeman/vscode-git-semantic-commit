import { commands, window, Disposable, ExtensionContext } from 'vscode';

import { extensionIdentifier } from './constants';
import { Configuration, ConfigurationProperties } from './config';
import { Git } from './git';

enum Commands {
  featCommit = 'featCommit'
}

const disposables: Disposable[] = [
  commands.registerCommand(`${extensionIdentifier}.${Commands.featCommit}`, async () => {
    try {
      const [, subject] = await Promise.all([Git.exists(), window.showInputBox()]);

      if (subject) {
        const type = Configuration[ConfigurationProperties.customFeatCommit];

        await Git.commit(`${type}: ${subject}`);
      }
    } catch ({ message }) {
      window.showErrorMessage(message);
    }
  })
];

const registerCommands = async (context: ExtensionContext) => {
  context.subscriptions.push(...disposables);
};

export { registerCommands };
