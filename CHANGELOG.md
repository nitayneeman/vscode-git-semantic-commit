# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2024-08-24

### Added

- Add support for multiline commit messages
- Add new option to set a body message for the commit
- Add new option to set the `BREAKING CHANGE` flag after the type or add a `BREAKING CHANGE` footer

### Changed

- Changed the try-catch error handling to be compatible with current TypeScript version
- ESLint configuration updated to the current version of ESLint and VSCode. All style settings have been adopted as far as possible.


## [2.0.0] - 2020-02-06

### Added

- Add new types with helpful descriptions <p><img src="https://raw.githubusercontent.com/nitayneeman/vscode-git-semantic-commit/master/images/examples/usage/types-with-descriptions.png" width="600" alt="Improving default types"></p>
- Add new option to show description for types ([#de88ff6](https://github.com/nitayneeman/vscode-git-semantic-commit/commit/de88ff66cab1bc3788915aafc7b3756209f08dc2)) - thanks to [@balazsorban44](https://github.com/balazsorban44) <p><img src="https://user-images.githubusercontent.com/18369201/73666934-d8d9fe00-46a3-11ea-8206-eea54d72cc97.png" width="600" alt="Showing Descriptions for Types"></p>

## [1.1.0] - 2019-10-25

### Added

- Add new option to change the scope template through a placeholder ([#610a3fc](https://github.com/nitayneeman/vscode-git-semantic-commit/commit/610a3fc9550b4a88fcea06741c3cd6602a2051d3)) - thanks to [@axelprox](https://github.com/axelprox) <p><img src="https://github.com/nitayneeman/vscode-git-semantic-commit/blob/master/images/examples/settings/scope-template.gif?raw=true" width="600" alt="Changing the Scope Template"></p>

## [1.0.1] - 2019-10-22

### Changed

- Change to use `git diff` for checking the staging area

## [1.0.0] - 2019-10-21

- 🎉 Initial release
