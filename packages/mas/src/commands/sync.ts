import {Command, flags} from '@oclif/command'
import fs = require('fs');
const axios = require('axios')

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

    args[0] = 'https://api.nasa.gov'
    args[1] = '/planetary/apod?api_key=DEMO_KEY'

    //* The axios calls need to be done in a loop related to the endpoints input.
    // ? Should Endpoints List and fileNames be the same...?
    try {
      const response: JSON = await axios.get(`${args[0]}${args[1]}`)

      flags.fileName.forEach((fileName = `mock-${args[1]}`) => {
        fs.writeFile(fileName, JSON.stringify(response), (err, data) => {
          console.log(data)
        })
      })
    } catch (error) {
      console.log(error)
    }

    const name = flags.fileName ?? 'mock'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
