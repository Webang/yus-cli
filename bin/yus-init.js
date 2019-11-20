const download = require('download-git-repo')
const program = require('commander')
const exists = require('fs').existsSync
const path = require('path')
const ora = require('ora')
const home = require('user-home')
const tildify = require('tildify')
const chalk = require('chalk')
const inquirer = require('inquirer')
const rm = require('rimraf').sync

program.parse(process.argv)

// 模板名称
let template = program.args[0]

// 项目构建目录名
const rawName = program.args[1]
const inPlace = !rawName || rawName === '.' // 没写或者“.”，表示当前目录下构建项目
const name = inPlace ? path.relative('../', process.cwd()) : rawName // 如果在当前目录下构建项目,当前目录名为项目构建目录名，否则是当前目录下的子目录【rawName】为项目构建目录名
const to = path.resolve(rawName || '.')   // 项目构建目录的绝对路径

const templates = {
  ['h5-vue2-tpl']: 'github:Webang/h5-vue2-tpl',
  ['h5-vue3-tpl']: 'github:Webang/h5-vue3-tpl',
  ['h5-react-tpl']: 'github:Webang/h5-react-tpl'
}

function run() {
  const spinner = ora('downloading template')
  spinner.start()
  download(templates[template], to, err => {
    if (err) {
      console.log(chalk.err('Failed to download repo ' + template + ': ' + err.message.trim()))
      return
    }
    spinner.stop()
    console.log(chalk.green('下载模板成功～'))
  })
}

run();
