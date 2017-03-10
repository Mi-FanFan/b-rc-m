#!/usr/bin/env node

/* eslint-disable */
'use strict'

// Build a entry js file to
var fs = require('fs')
var path = require('path')

console.log('Building a entry less file to build/index.js')
var componentsPath = path.join(process.cwd(), 'components')
var componentsLessContent = ''

// Build components in one file:
fs.readdir(componentsPath, function (err, files) {
  files.forEach(function (file) {
    if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
      componentsLessContent += `import "../components/${path.join(file, 'style', 'index.less')}";\n`
    }
  })

  //
  fs.writeFileSync(
    path.join(process.cwd(), 'build', 'index.js'),
    `import '../components/index';\nimport '../components/style/index.less';\n${componentsLessContent}`
  )
})

