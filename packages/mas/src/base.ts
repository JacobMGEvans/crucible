const pkg = require('../package.json')
import {cosmiconfig} from 'cosmiconfig'
import {Command} from '@oclif/command'
import * as updateNotifier from 'update-notifier'

const debug = require('debug')('mas')
const explorer = cosmiconfig('mock-api-sync')

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
