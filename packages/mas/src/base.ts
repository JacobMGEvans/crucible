const pkg = require('../package.json')
// const debug = require('debug')('mas')
import {cosmiconfig} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import {Command} from '@oclif/command'
import {IConfig} from '@oclif/config'
import * as updateNotifier from 'update-notifier'

const moduleName = 'mock-api-sync'
const explorer = cosmiconfig(moduleName, {
  searchPlaces: [
    'package.json',
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.yaml`,
    `.${moduleName}rc.yml`,
    `.${moduleName}rc.ts`,
    `.${moduleName}rc.js`,
    `${moduleName}.config.ts`,
    `${moduleName}.config.js`,
  ],
  loaders: {
    '.ts': TypeScriptLoader,
  },
})
export type ConfigType = {
    endpoint: string | string[]; //* Array if multiple is true
    baseUrl: string;
    multipleEndpoints?: boolean; // *  Default false
    mockDirectory?: string;//* Default will be __APIMocks__ (Working Name)

}
export abstract class Base extends Command {
  static config: ConfigType & IConfig

  async init() {
    const notifier = updateNotifier({
      pkg,
      updateCheckInterval: 1000,
      shouldNotifyInNpmScript: true,
    })
    notifier.notify()

    const {config, filepath} = await explorer
    .search()
    .catch(error => console.error(error, {config, filepath}))

    this.config = config as (ConfigType & IConfig)
  }
}
