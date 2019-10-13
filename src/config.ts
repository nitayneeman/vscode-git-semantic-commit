import { workspace } from 'vscode';

import { extensionIdentifier } from './constants';

const getConfiguration = () => workspace.getConfiguration(extensionIdentifier);

enum ConfigurationProperties {
  preserveScope = 'preserveScope',
  types = 'types'
}

export { getConfiguration, ConfigurationProperties };
