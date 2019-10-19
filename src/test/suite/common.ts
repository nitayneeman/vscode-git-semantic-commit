import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { extensionIdentifier } from '../../constants';

export async function createDirectory() {
  const tmpDir = os.tmpdir();

  return fs.mkdtempSync(path.join(tmpDir, `${extensionIdentifier}-`));
}

export async function removeDirectory(path: string) {
  return fs.rmdirSync(path);
}
