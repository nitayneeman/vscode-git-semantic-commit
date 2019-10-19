import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
const fsExtra = require('fs-extra');

import { extensionIdentifier } from '../../constants';
import { Git } from '../../git';

function getRandomName() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 10);
}

export async function createGitDirectory() {
  const directory = os.tmpdir();
  const directoryPath = fs.mkdtempSync(path.join(directory, `${extensionIdentifier}-`));

  await Git.init(directoryPath);

  return directoryPath;
}

export async function createFile(directoryPath: string, content = '', extension = 'txt') {
  const filePath = path.join(directoryPath, `${getRandomName()}.${extension}`);

  return fs.writeFileSync(filePath, content);
}

export async function checkStatus(directoryPath: string) {
  return await Git.status(directoryPath);
}

export async function removeDirectory(directoryPath: string) {
  return fsExtra.remove(directoryPath);
}
