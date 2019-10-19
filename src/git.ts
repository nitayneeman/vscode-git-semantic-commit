const util = require('util');
const exec = util.promisify(require('child_process').exec);

import { getWorkspaceFolder } from './workspace';

export class Git {
  static exists() {
    return this.execute(getWorkspaceFolder(), '', ['--version']);
  }

  static async add() {
    const { stdout: hasStaged } = await this.status(['--porcelain', '--untracked-files=no']);

    if (!hasStaged) {
      return this.execute(getWorkspaceFolder(), 'add', [`--all`]);
    }
  }

  static async commit(message: string, options: string[]) {
    return this.execute(getWorkspaceFolder(), 'commit', [`--message="${message}"`, ...options]);
  }

  static execute(cwd: string, command?: string, options: string[] = []) {
    return exec(`git ${command} ${options.join(' ')}`, { cwd });
  }

  private static async status(options: string[] = []) {
    return this.execute(getWorkspaceFolder(), 'status', [...options]);
  }
}
