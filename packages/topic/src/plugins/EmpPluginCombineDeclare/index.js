const fs = require('fs')
const path = require('path')
const getContent = () => {
  const relativePath = '../../types'
  const destPath = '../../../dist/index.d.ts'
  let dir = fs.readdirSync(path.resolve(__dirname, relativePath))

  let contentStr = fs.readFileSync(path.resolve(__dirname, destPath))
  dir = dir.filter(name => name.indexOf('d.ts') !== -1)
  // console.log('dir===========', dir)
  const length = (dir && dir.length) || 0
  dir.map((name, index) => {
    const fileName = relativePath + '/' + name
    const content = fs.readFileSync(path.resolve(__dirname, fileName))
    if (content.toString().trim()) {
      contentStr += content.toString() + (index < length - 1 ? '\n' : '')
    }
  })
  // fs.writeFileSync(path.resolve(__dirname, destPath), contentStr)
  return contentStr
}
const writeEmpTS = () => {
  const relativePath = '../../types'
  const destPath = '../../../dist/emp.d.ts'
  let dir = fs.readdirSync(path.resolve(__dirname, relativePath))

  let contentStr = ''
  dir = dir.filter(name => name.indexOf('d.ts') !== -1)
  // console.log('dir', dir)
  const length = (dir && dir.length) || 0
  dir.map((name, index) => {
    const fileName = relativePath + '/' + name
    const content = fs.readFileSync(path.resolve(__dirname, fileName))
    if (content.toString().trim()) {
      contentStr += content.toString() + (index < length - 1 ? '\n' : '')
    }
  })

  fs.writeFileSync(path.resolve(__dirname, destPath), contentStr)
}
const writeEmpTypeFile = () => {
  const relativePath = '../../types'
  const destPath = '../../../dist/emptype.ts'
  let dir = fs.readdirSync(path.resolve(__dirname, relativePath))

  let contentStr = ''
  dir = dir.filter(name => name.indexOf('d.ts') === -1)
  // console.log('dir', dir)
  const length = (dir && dir.length) || 0
  dir.map((name, index) => {
    const fileName = relativePath + '/' + name
    const content = fs.readFileSync(path.resolve(__dirname, fileName))
    if (content.toString().trim()) {
      contentStr += content.toString() + (index < length - 1 ? '\n' : '')
    }
  })

  fs.writeFileSync(path.resolve(__dirname, destPath), contentStr)
}

const writeFile = () => {
  writeEmpTS()
  writeEmpTypeFile()
}
module.exports = {
  getContent,
  writeEmpTS,
  writeEmpTypeFile,
  writeFile,
}
