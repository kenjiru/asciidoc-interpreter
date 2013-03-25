///<reference path='../def/node.d.ts'/>
var fs = require('fs');

import parserModule = module('parser');

var lines = fs.readFileSync('samples/minimal.txt', 'utf8'),
    parser = new parserModule.Parser(lines);

parser.printTree();

