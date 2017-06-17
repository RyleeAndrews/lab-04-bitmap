'use strict';

const expect = require('expect');
const bitmap = require('../model/bitmap.js');

let path = './assets/bitmap.bmp';
let xform = 'toRed';

describe('testing main', () => {
  it('should return identifier 16719924 from the toRed function', (done) => {
    bitmap(path, xform, (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(16719924);
      done();
    });
  });
});
