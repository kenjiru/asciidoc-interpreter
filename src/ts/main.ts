///<reference path='../def/node.d.ts'/>
var fs = require('fs');

import parser = module('parser');

var lines = fs.readFileSync('samples/minimal.txt', 'utf8'),
    parser = new parser.Parser(lines);

