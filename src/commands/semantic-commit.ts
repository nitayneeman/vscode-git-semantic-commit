import { window, workspace } from 'vscode';

import { getConfiguration, ConfigurationProperties } from '../config';
import { Git } from '../git';
import { Command } from './common';

const enum ActionType {
  scope = 'scope',
  subject = 'subject'
}

const getTypes = () => [...getConfiguration()[ConfigurationProperties.types]];

class SemanticCommitCommand extends Command {
  identifier = 'semanticCommit';

  types = getTypes();

  constructor() {
    super();

    workspace.onDidChangeConfiguration(() => {
      this.types = getTypes();
    });
  }

  async execute() {
    await Git.exists();

    const quickPick = window.createQuickPick();
    const quickPickItems = this.types.map(type => ({
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
  }
}
