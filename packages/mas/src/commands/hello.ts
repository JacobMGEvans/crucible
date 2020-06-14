import {Command, flags} from '@oclif/command'

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ mock-res-sync hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-O, --name=VALUE)
    fileName: flags.string({char: 'O', description: 'file name output'}),
    // flag with no value (-F, --force)
    force: flags.boolean({char: 'F'}),
  }

  static args = [{name: 'fileName'}]

  async run() {
    const {args, flags} = this.parse(Hello)

    const name = flags.fileName ?? 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
