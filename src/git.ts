const execa = require('execa');

export class Git {
  static async exists() {
    try {
      await execa('git', ['--version']);
    } catch {
      return false;
    }

    return true;
  }
}
