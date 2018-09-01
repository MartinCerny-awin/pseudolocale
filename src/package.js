var pseudolocale = require("../index");

console.log(JSON.stringify({
  "name": "pseudolocale",
  "version": pseudolocale.version,
  "description": "Simple pseudolocale (psuedolocalization) for strings",
  "keywords": ["localization", "psuedoloc"],
  "author": "BunKat <bill@bunkat.com>",
  "repository" : {
    "type" : "git",
    "url" : "git://github.com/bunkat/pseudolocale.git"
  },
  "main": "index.js",
  "browserify": "index-browserify.js",
  "jam": {
    "main": "psuedoloc.js",
    "shim": {
      "exports": "pseudolocale"
    }
  },
  "dependencies": {
    "commander": "*"
  },
  "devDependencies": {
    "smash": "~0.0.8",
    "mocha": "*",
    "should": ">=0.6.3",
    "jslint": "*",
    "uglify-js": "*",
    "benchmark": "*"
  },
  "license": "MIT",
  "scripts": {
    "test": "./node_modules/.bin/mocha test/**/*-test.js"
  }
}, null, 2));