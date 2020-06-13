mock-res-sync
=============

tooling for syncing your responses from API to your mock JSON for utilizing in tests and simple backup servers

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mock-res-sync.svg)](https://npmjs.org/package/mock-res-sync)
[![CircleCI](https://circleci.com/gh/JacobMGEvans/mock-res-sync/tree/master.svg?style=shield)](https://circleci.com/gh/JacobMGEvans/mock-res-sync/tree/master)
[![Codecov](https://codecov.io/gh/JacobMGEvans/mock-res-sync/branch/master/graph/badge.svg)](https://codecov.io/gh/JacobMGEvans/mock-res-sync)
[![Downloads/week](https://img.shields.io/npm/dw/mock-res-sync.svg)](https://npmjs.org/package/mock-res-sync)
[![License](https://img.shields.io/npm/l/mock-res-sync.svg)](https://github.com/JacobMGEvans/mock-res-sync/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mock-res-sync
$ mock-res-sync COMMAND
running command...
$ mock-res-sync (-v|--version|version)
mock-res-sync/0.0.1 darwin-x64 node-v14.2.0
$ mock-res-sync --help [COMMAND]
USAGE
  $ mock-res-sync COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mock-res-sync hello [FILE]`](#mock-res-sync-hello-file)
* [`mock-res-sync help [COMMAND]`](#mock-res-sync-help-command)

## `mock-res-sync hello [FILE]`

describe the command here

```
USAGE
  $ mock-res-sync hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ mock-res-sync hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/JacobMGEvans/mock-res-sync/blob/v0.0.1/src/commands/hello.ts)_

## `mock-res-sync help [COMMAND]`

display help for mock-res-sync

```
USAGE
  $ mock-res-sync help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_
<!-- commandsstop -->
