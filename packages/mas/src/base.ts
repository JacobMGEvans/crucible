const pkg = require('../package.json')
const debug = require('debug')('mas')
import {cosmiconfig} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import {Command} from '@oclif/command'
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

type ConfigType = any
export default abstract class Base extends Command {
  static config: null | ConfigType;

  async init() {
    const notifier = updateNotifier({
      pkg,
      updateCheckInterval: 1000,
      shouldNotifyInNpmScript: true,
    })
    notifier.notify()

    const {config, filepath} = (await explorer.search()) || {}
    debug('parsing config', {config, filepath})
    this.config = config
  }
}
