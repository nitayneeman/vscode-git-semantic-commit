import * as assert from 'assert';
import * as vscode from 'vscode';

import { createFile, clearDirectory, getLastMessage } from './common';

suite('Extension Test Suite', () => {
  const { workspaceFolders } = vscode.workspace;
  const directoryPath = workspaceFolders ? workspaceFolders[0].uri.fsPath : '';

  suiteTeardown(() => clearDirectory(directoryPath));

  test('should commit with "chore" type', async () => {
    const sampleSubject = 'add new file';
    const expectedMessage = `fake: ${sampleSubject}`;

    await createFile(directoryPath, 'Hello World');
    await vscode.env.clipboard.writeText(sampleSubject);
    await vscode.commands.executeCommand('gitSemanticCommit.semanticCommit');
    await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
    await vscode.commands.executeCommand('workbench.action.quickOpenSelectNext');
    await vscode.commands.executeCommand('workbench.action.acceptSelectedQuickOpenItem');
    await new Promise(resolve => setTimeout(resolve, 3000));
    const { stdout: message } = await getLastMessage(directoryPath);

    console.log('message', message);

    assert.equal(message.includes(expectedMessage), true);
  });
});
