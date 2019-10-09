import { commands, window, Disposable, ExtensionContext } from 'vscode';

import { extensionIdentifier } from './constants';
import { Configuration, ConfigurationProperties } from './config';
import { Git } from './git';

enum Commands {
  featCommit = 'featCommit'
}

const enum ActionType {
  scope = 'scope',
  subject = 'subject'
}

const disposables: Disposable[] = [
  commands.registerCommand(`${extensionIdentifier}.${Commands.featCommit}`, async () => {
    try {
      await Git.exists();

      const types = ['feat', 'fix', 'chore'];
      const quickPick = window.createQuickPick();
      const quickPickItems = types.map(type => ({
        label: `$(git-commit) Commit "${type}" type`,
        alwaysShow: true,
        actionType: ActionType.subject,
        type
      }));

      let scope: string;

      quickPick.items = [
        {
          label: `$(gist-new) Add a message scope`,
          alwaysShow: true,
          actionType: ActionType.scope,
          type: ''
        },
        ...quickPickItems
      ];
      quickPick.placeholder = 'Type a value (scope or subject)';
      quickPick.ignoreFocusOut = true;

      quickPick.show();

      quickPick.onDidChangeSelection(async (items: any) => {
        const [{ actionType }] = items;

        quickPick.hide();

        if (actionType === ActionType.scope) {
          scope = quickPick.value;

          quickPick.value = '';
          quickPick.items = [
            {
              label: `$(gist-new) Change the message scope (current: "${scope}")`,
              alwaysShow: true,
              actionType: ActionType.scope,
              type: ''
            },
            ...quickPickItems
          ];
          quickPick.placeholder = 'Type a value (scope or subject)';
          quickPick.ignoreFocusOut = true;

          quickPick.show();
        } else {
          const [{ type }] = items;
          const subject = quickPick.value;

          scope = scope ? `(${scope})` : '';
          const commitMessage = `${type}${scope}: ${subject}`;

          await Git.commit(commitMessage);
          window.showInformationMessage(commitMessage);
        }
      });
    } catch ({ message }) {
      window.showErrorMessage(message);
    }
  })
];

const registerCommands = async (context: ExtensionContext) => {
  context.subscriptions.push(...disposables);
};

export { registerCommands };
