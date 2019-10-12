import { commands, window, Disposable, ExtensionContext } from 'vscode';

import { extensionIdentifier } from '../constants';
import { SemanticCommitCommand } from './semantic-commit';

const commandDefinitions = [SemanticCommitCommand];

const disposables: Disposable[] = commandDefinitions.map(CommandDefinition => {
  const command = new CommandDefinition();

  return commands.registerCommand(`${extensionIdentifier}.${command.identifier}`, async () => {
    try {
      await command.execute();
    } catch ({ message }) {
      window.showErrorMessage(message);
    }
  });
});

const registerCommands = async (context: ExtensionContext) => {
  context.subscriptions.push(...disposables);
};

export { registerCommands };
