import {Command, flags} from '@oclif/command'
import fs = require('fs');
import {spawn} from 'child_process'

export default class Sync extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ mas hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // * flag with a value (-O, --fileName=VALUE)
    fileName: flags.string({char: 'O', description: 'file name output', multiple: true}),
    // * flag with a value (-D, --dirName=VALUE)
    dirName: flags.string({char: 'D', description: 'directory name containing files'}),
    // * flag with no value (-F, --force)
    force: flags.boolean({char: 'F'}),
  }

  // ? So the args need to likely be flexible for baseURL of API and many endpoints.
  static args = [{name: 'api'}, {name: 'endpoint'}]

  async run() {
    const {args, flags} = this.parse(Sync)
    console.log(args, 'ARGS PIRATES')
    console.log(flags, 'JOLLY ROGER ')

    flags.fileName.forEach(fileName => {
      fs.writeFile(fileName, 'abc',  (err: NodeJS.ErrnoException | null): void => {
        if (err) {
          console.log(err)
        }
        // console.log(data)
      })
    })

    const name = flags.fileName ?? 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
