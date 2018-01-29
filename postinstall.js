"use strict"

const http = require('https')
const fs = require('fs')
const git = require('gift')

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest)
  var request = http.get(url, function(response) {
    response.pipe(file)
    file.on('finish', function() {
      file.close(cb)  // close() is async, call cb after close completes.
    })
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest) // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message)
  })
}

git.clone('https://github.com/bonzaiferroni/Traveler.git', './src/utils/repos/Traveler', null, 'master', (err, repo) => {
  if(err) {
    console.log(`Error installing Traveler: ${err} ${JSON.stringify(repo)}`)
  }
})

git.clone('https://github.com/screepers/screeps-typescript-profiler.git', './src/utils/repos/Profiler', null, 'master', (err, repo) => {
  if(err) {
    console.log(`Error installing Profiler: ${err} ${JSON.stringify(repo)}`)
  }
})
