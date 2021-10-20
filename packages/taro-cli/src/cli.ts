import * as path from 'path'
import * as minimist from 'minimist'
import { Kernel } from '@tarojs/service'

import init from './commands/init'

export default class CLI {
  appPath: string

  constructor (appPath) {
    this.appPath = appPath || process.cwd()
  }

  run () {
    this.parseArgs()
  }

  parseArgs () {
    const args = minimist(process.argv.slice(2))
    const _ = args._
    const command = _[0]
    if (!command) return
    const kernel = new Kernel({
      appPath: this.appPath,
      presets: [
        path.resolve(__dirname, '.', 'presets', 'index.js')
      ]
    })

    switch (command) {
      case 'init': {
        const projectName = _[1] || args.name
        init(kernel, {
          appPath: this.appPath,
          projectName,
          typescript: args.typescript,
          templateSource: args['template-source'],
          clone: !!args.clone,
          template: args.template,
          css: args.css,
          isHelp: args.h
        })
        break
      }
      default:
        break
    }
  }
}