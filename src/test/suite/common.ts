import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { extensionIdentifier } from '../../constants';
import { Git } from '../../git';

export async function createGitDirectory() {
  const tmpDir = os.tmpdir();
  const dirPath = fs.mkdtempSync(path.join(tmpDir, `${extensionIdentifier}-`));

  await Git.init(dirPath);

  return dirPath;
}

export async function removeGitDirectory(dirPath: string) {
  return fs.rmdirSync(dirPath);
}
