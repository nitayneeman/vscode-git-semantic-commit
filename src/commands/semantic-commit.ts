import { window, workspace, ExtensionContext, QuickPickItem } from 'vscode';

import { getConfiguration, ConfigurationProperties } from '../config';
import { Git } from '../git';
import { workspaceStorageKey } from '../constants';
import { Command } from './common';

const enum ActionType {
  scope = 'scope',
  subject = 'subject'
}

export class SemanticCommitCommand extends Command {
  identifier = 'semanticCommit';

  scope: string;

  types: string[];

  constructor(context: ExtensionContext) {
    super();

    this.scope = context.workspaceState.get(`${workspaceStorageKey}:scope`, '');

    this.types = this.getTypes();

    workspace.onDidChangeConfiguration(() => {
      this.types = this.getTypes();
    });
  }

  async execute() {
    await Git.exists();

    const quickPickItems = this.types.map(type => ({
      label: `$(git-commit) Commit "${type}" type`,
      alwaysShow: true,
      actionType: ActionType.subject,
      type
    }));

    const quickPick = this.createQuickPick([
      {
        label: `$(gist-new) Add a message scope`,
        alwaysShow: true,
        actionType: ActionType.scope,
        type: ''
      },
      ...quickPickItems
    ]);

    quickPick.show();

    quickPick.onDidChangeSelection(async (items: any) => {
      const [{ actionType }] = items;

      quickPick.hide();

      if (actionType === ActionType.scope) {
        this.scope = quickPick.value;

        quickPick.value = '';
        quickPick.items = [
          {
            label: `$(gist-new) Change the message scope (current: "${this.scope}")`,
            alwaysShow: true,
            actionType: ActionType.scope,
            type: ''
          },
          ...quickPickItems
        ];

        quickPick.show();
      } else {
        const [{ type }] = items;
        const subject = quickPick.value;

        this.scope = this.scope ? `(${this.scope})` : '';
        const commitMessage = `${type}${this.scope}: ${subject}`;

        await Git.commit(commitMessage);
        window.showInformationMessage(commitMessage);
      }
    });
  }

  private getTypes() {
    return [...getConfiguration()[ConfigurationProperties.types].sort()];
  }

  private createQuickPick(items: QuickPickItem[]) {
    const quickPick = window.createQuickPick();

    quickPick.items = [...items];
    quickPick.placeholder = 'Type a value (scope or subject)';
    quickPick.ignoreFocusOut = true;

    return quickPick;
  }
}
