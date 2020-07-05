/* eslint-disable no-warning-comments */
import {flags} from '@oclif/command'
import Base from '../base'
import * as fs from 'fs'
import axios, {AxiosResponse} from 'axios'

export default class Sync extends Base {
  static description = 'describe the command here'

  static examples = [
    '$ mas sync -O ./nasa.json',
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
  // TODO: For that flexibility there will be a config file but also allow for computed names in an array
  static args = [{name: 'api'}, {name: 'endpoint'}]

  async run() {
    const {args, flags} = this.parse(Sync)

    args[0] = 'https://api.nasa.gov'
    args[1] = '/planetary/apod?api_key=DEMO_KEY'

    //* The axios calls need to be done in a loop related to the endpoints input.
    // ? Should Endpoints List and fileNames be the same...? Probably default to fileName === endpoint
    console.log(args, 'ARGS PIRATES')
    console.log(flags, 'JOLLY ROGER ')
    try {
      // ? How to handle API keys, maybe a gitignored config or additionally peek .env
      // TODO: Create interceptor that injects Headers as needed from config
      const response: AxiosResponse<JSON> = await axios.get(`${args[0]}${args[1]}`)

      flags.fileName.forEach((fileName = `mock-${args[1]}`) => {
        fs.writeFile(fileName, JSON.stringify(response.data), () => {
          console.log('API Call Successful')
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
