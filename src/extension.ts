import * as vscode from 'vscode';

import { registerCommands } from './commands/index';

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
}

export function deactivate() {}
