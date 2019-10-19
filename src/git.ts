import { workspace } from 'vscode';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export class Git {
  static exists() {
    return this.execute(this.getWorkspaceFolder(), '', ['--version']);
  }

  static async init(cwd: string) {
    return this.execute(cwd, 'init', ['--quiet']);
  }

  static async status(cwd: string, options: string[] = []) {
    return this.execute(cwd, 'status', [...options]);
  }

  static async add() {
    const { stdout: hasStaged } = await this.status(this.getWorkspaceFolder(), [
      '--porcelain',
      '--untracked-files=no'
    ]);

    if (!hasStaged) {
      return this.execute(this.getWorkspaceFolder(), 'add', [`--all`]);
    }
  }

  static async commit(message: string, options: string[]) {
    return this.execute(this.getWorkspaceFolder(), 'commit', [
      `--message="${message}"`,
      ...options
    ]);
  }

  private static execute(cwd: string, command?: string, options: string[] = []) {
    return exec(`git ${command} ${options.join(' ')}`, { cwd });
  }

  private static getWorkspaceFolder(): string {
    const { workspaceFolders } = workspace;
    return workspaceFolders ? workspaceFolders[0].uri.fsPath : '';
  }
}
