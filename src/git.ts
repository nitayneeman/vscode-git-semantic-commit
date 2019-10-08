import * as execa from 'execa';

const execute = (command: string, options: string[] = []): Promise<any> => {
  return execa('git', [command, ...options]);
};

export class Git {
  static async exists() {
    try {
      await execute('--version');
    } catch {
      return false;
    }

    return false;
  }
}
