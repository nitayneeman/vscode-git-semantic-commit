import { workspace } from 'vscode';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export class Git {
  static exists() {
    return this.execute('--version');
  }

  static commit(message: string) {
    return this.execute(`commit -m "${message}"`);
  }

  private static execute(command: string) {
    const { rootPath: cwd } = workspace;

    return exec(`git ${command}`, { cwd });
  }
}
