import * as vscode from 'vscode';

import { registerCommands } from './commands/index';

export async function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
}

export function deactivate() {}
