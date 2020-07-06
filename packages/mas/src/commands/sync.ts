/* eslint-disable no-warning-comments */
import * as fs from 'fs'
import {flags} from '@oclif/command'
import Base from '../base'
import axios, {AxiosResponse} from 'axios'

export default class Sync extends Base {
  // TODO DESCRIPTION
  static description = 'describe the command here'

  static examples = [
    '$ mas sync "https://api.nasa.gov" "/planetary/apod?api_key=DEMO_KEY" -O ./nasa.json ',
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
  // TODO: For that flexibility there will be a config file
  // ? Is there a way to created computed inputs from CLI
  // ! CLI inputs will likely be one API first ARGS endpoints all following ARGS
  static args = [{name: 'api'}, {name: 'endpoint'}]

  async run() {
    const localConfig = this.config
    const {args, flags} = this.parse(Sync)

    //! Directory creation Default __APIMocks__ or User Input
    if (this.config.mockDirectory)

    //* The axios calls need to be done in a loop related to the endpoints input.
    // ? Should Endpoints List and fileNames be the same...? Probably default to fileName === endpoint
      console.info('parsing config', localConfig)
    try {
      const {api, endpoint} = args
      // ? How to handle API keys, maybe a gitignored config or additionally peek .env
      // TODO: Create interceptor that injects Headers as needed from config
      const response: AxiosResponse<JSON> = await axios.get(`${api}${endpoint}`)

      //! Config fileName and Folder name outputs
      flags.fileName.forEach((fileName = `mock-${endpoint}`) => {
        fs.writeFile(fileName, JSON.stringify(response.data), () => {
          console.log('API Call Successful')
        })
      })
    } catch (error) {
      // console.log(error)
    }

    if (flags.dirName && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
