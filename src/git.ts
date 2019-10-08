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
    return exec(`git ${command}`);
  }
}
