import {Command} from '@oclif/command'
import {cosmiconfig} from 'cosmiconfig'
const explorer = cosmiconfig('mock-api-sync')
const debug = require('debug')('mas:base')
type ConfigType = any

const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

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
