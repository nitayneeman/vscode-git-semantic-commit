<p align="center">
  <img src="https://github.com/nitayneeman/vscode-git-semantic-commit//blob/master/images/logo.png?raw=true" width="300" alt="Logo">
</p>

<h1 align="center">VS Code - Git Semantic Commit</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=nitayneeman.git-semantic-commit"><img src="https://vsmarketplacebadge.apphb.com/version/nitayneeman.git-semantic-commit.svg?label=Git%20-%20Semantic%20Commit&&color=eae9e1" alt="Marketplace"></a>
  <a href="https://travis-ci.com/nitayneeman/vscode-git-semantic-commit"><img src="https://travis-ci.com/nitayneeman/vscode-git-semantic-commit.svg?token=vHfpxFNvotCsScqrpvMs&branch=master" alt="Build"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nitayneeman.git-semantic-commit"><img src="https://vsmarketplacebadge.apphb.com/installs/nitayneeman.git-semantic-commit.svg?color=blue" alt="Installs"></a>
  <a href="https://github.com/nitayneeman/vscode-git-semantic-commit/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-lightgray.svg" alt="License"></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=nitayneeman.git-semantic-commit">Installation</a> ·
  <a href="https://github.com/nitayneeman/vscode-git-semantic-commit#-how-to-use">Usage</a> ·
  <a href="https://github.com/nitayneeman/vscode-git-semantic-commit#-settings">Settings</a> ·
  <a href="https://github.com/nitayneeman/vscode-git-semantic-commit/blob/master/CHANGELOG.md">CHANGELOG</a>
</p>

## ℹ️️ Description

This Visual Studio Code extension enables to commit simply by the semantic message conventions.

<p align="center">
  <img src="https://github.com/nitayneeman/vscode-git-semantic-commit/blob/master/images/examples/preview.gif?raw=true" alt="Preview">
</p>

<br>

## 👨🏻‍🏫 How to Use

The first thing you need to do is installing the [extension](https://marketplace.visualstudio.com/items?itemName=nitayneeman.git-semantic-commit).

Well, there are two ways to trigger the "Semantic Commit" command:

### 1. Command Palette

Open the Command Palette and start typing `Git: Semantic Commit`:

<p align="center">
  <img src="https://github.com/nitayneeman/vscode-git-semantic-commit/blob/master/images/examples/usage/command-palette.gif?raw=true" alt="Preview">
</p>

Then, choose the appropriate command and follow the steps.

### 2. View Actions

Alternatively, you can use the primary and secondary actions within the Source Control view:

<p align="center">
  <img src="https://github.com/nitayneeman/vscode-git-semantic-commit/blob/master/images/examples/usage/view-actions.gif?raw=true" alt="Preview">
</p>

<br>

## ⚙️ Settings

The extension allows you to customize the following configuration settings:

| Name                              | Description                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `gitSemanticCommit.commitOptions` | Specifies which [arguments](https://git-scm.com/docs/git-commit#_options) to be passed when the commit is executed |
| `gitSemanticCommit.preserveScope` | Determines whether to preserve the last message scope that was inserted                                            |
| `gitSemanticCommit.stageAll`      | Determines whether to stage all changes before the commit, in case the staging area (index) is empty               |
| `gitSemanticCommit.types`         | Specifies the supported message types                                                                              |

<br>

## 💁🏻 Contributing

This is an open source project. Any contribution would be greatly appreciated!
