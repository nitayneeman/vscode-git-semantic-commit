import { workspace } from 'vscode';

import { extensionIdentifier } from './constants';

const Configuration = workspace.getConfiguration(extensionIdentifier);

enum ConfigurationProperties {
  customFeatCommit = 'customFeatCommit'
}

export { Configuration, ConfigurationProperties };
