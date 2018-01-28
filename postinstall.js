"use strict";

const http = require('https');
const fs = require('fs');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

download('https://raw.githubusercontent.com/bonzaiferroni/Traveler/master/Traveler.ts',
  './src/utils/Traveler.ts',
  (error) => {
    if(error) {
      console.log(`Failed to download Traveler.ts: ${error}`)
    }
  })
