'use strict';

const bitmap = require('./model/bitmap.js');

let args = process.argv.splice(2);
let path = args[0];
let xform = args[1];

let main = module.exports = (path, xform) => {

  bitmap(path, xform, (err, result) => {
    if (err) console.log(err);
    console.log('verifier#: ' + result);
    return(err, result);
  });
};

main(path, xform);
