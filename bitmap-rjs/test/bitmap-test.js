'use strict';

const expect = require('expect');
const bitmap = require('../model/bitmap.js');

let path = './assets/bitmap.bmp';

describe('testing main', () => {
  it('should return identifier 16719924 from the toRed function', (done) => {
    bitmap(path, 'toRed', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(16719924);
      done();
    });
  });
  it('should return identifier 2293556 from the toGreen function', (done) => {
    bitmap(path, 'toGreen', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(2293556);
      done();
    });
  });
  it('should return identifier 2236671 from the toBlue function', (done) => {
    bitmap(path, 'toBlue', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(2236671);
      done();
    });
  });
  it('should return identifier 14540747 from the invert function', (done) => {
    bitmap(path, 'invert', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(14540747);
      done();
    });
  });
  it('should return identifier 2565927 from the greyscale function', (done) => {
    bitmap(path, 'greyscale', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(2565927);
      done();
    });
  });
});
