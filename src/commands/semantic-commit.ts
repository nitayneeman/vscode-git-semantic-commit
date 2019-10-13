import { window, workspace, ExtensionContext, QuickPickItem } from 'vscode';

import { getConfiguration, ConfigurationProperties } from '../config';
import { Git } from '../git';
import { workspaceStorageKey } from '../constants';
import { Command } from './common';

const enum ActionType {
  scope = 'scope',
  subject = 'subject'
}

const scopeStorageKey = `${workspaceStorageKey}:scope`;

export class SemanticCommitCommand extends Command {
  identifier = 'semanticCommit';

  context: ExtensionContext;
  scope: string;
  types: string[];

  constructor(context: ExtensionContext) {
    super();

    this.context = context;
    this.scope = this.context.workspaceState.get(scopeStorageKey, '');
    this.types = this.getTypes();

    workspace.onDidChangeConfiguration(() => {
      this.types = this.getTypes();
    });
  }

  async execute() {
    await Git.exists();

    const quickPick = this.createQuickPick(this.createQuickPickItems());

    quickPick.show();

    quickPick.onDidChangeSelection(async (items: any) => {
      const [{ actionType }] = items;

      quickPick.hide();

      if (actionType === ActionType.scope) {
        this.scope = quickPick.value;
        this.context.workspaceState.update(scopeStorageKey, this.scope);

        quickPick.value = '';
        quickPick.items = this.createQuickPickItems();

        quickPick.show();
      } else {
        const [{ type }] = items;
        const subject = quickPick.value;
        const commitMessage = `${type}${this.hasScope() ? `(${this.scope})` : ''}: ${subject}`;

        await Git.commit(commitMessage);

        window.showInformationMessage(commitMessage);
      }
    });
  }

  private hasScope() {
    return this.scope.length > 0;
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

  private createQuickPickItems(): QuickPickItem[] {
    const typeItems = this.types.map(type => ({
      label: `$(git-commit) Commit "${type}" type`,
      alwaysShow: true,
      actionType: ActionType.subject,
      type
    }));

    return [
      {
        label: this.hasScope()
          ? `$(gist-new) Change the message scope (current: "${this.scope}")`
          : `$(gist-new) Add a message scope`,
        alwaysShow: true,
        actionType: ActionType.scope,
        type: ''
      },
      ...typeItems
    ];
  }
}