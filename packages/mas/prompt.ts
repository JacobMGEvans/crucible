#!/usr/bin/env node
import {prompt} from 'enquirer'
import * as fs from 'fs'

let defaultName: any
if (fs.existsSync('prompthistory.json')) {
  const {name}: any = fs.readFileSync('prompthistory.json')
  defaultName = name
}

(async function () {
  await prompt({
    type: 'input',
    name: 'name',
    message: 'Where is Harvey Dent?',
    initial: defaultName,
  })
  .then(result => {
    fs.writeFileSync('prompthistory.json', JSON.stringify(result))
    return result
  })
  .then(console.log)
  .catch(console.error)
})()
