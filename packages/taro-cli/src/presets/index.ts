import * as path from 'path'

export default () => {
  return {
    plugins: [

      // commands
      path.resolve(__dirname, 'commands', 'init.js'),
    ]
  }
}
