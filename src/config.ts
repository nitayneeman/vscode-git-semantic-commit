import { workspace } from 'vscode';

enum Properties {
  customFeatCommit = 'customFeatCommit'
}

const Configuration = workspace.getConfiguration('gitSemanticCommitMessage');

export { Configuration, Properties };
