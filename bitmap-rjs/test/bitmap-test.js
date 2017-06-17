'use strict';

const expect = require('expect');
const bitmap = require('../model/bitmap.js');
const fs = require('fs');

let path = './assets/bitmap.bmp';

describe('testing bitmap.js', () => {
  it('should return identifier 16719924 from the toRed function and \'./assets/bitmap-toRed.bmp\' should exist.', (done) => {
    bitmap(path, 'toRed', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(16719924);
      expect(fs.existsSync('./assets/bitmap-toRed.bmp')).toExist();
      done();
    });
  });
  it('should not return verifier 16719924, since that verifier is specific to bitmap.bmp and \'./assets/finger-print-toRed.bmp\' should exist.', (done) => {
    bitmap('./assets/finger-print.bmp', 'toRed', (err, result) => {
      expect(err).toNotExist();
      expect(result).toNotEqual(16719924);
      expect(fs.existsSync('./assets/finger-print-toRed.bmp')).toExist();
      done();
    });
  });
  it('should return identifier 2293556 from the toGreen function and \'./assets/bitmap-toGreen.bmp\' should exist.', (done) => {
    bitmap(path, 'toGreen', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(2293556);
      expect(fs.existsSync('./assets/bitmap-toGreen.bmp')).toExist();
      done();
    });
  });
  it('should return identifier 2236671 from the toBlue function and \'./assets/bitmap-toBlue.bmp\' should exist.', (done) => {
    bitmap(path, 'toBlue', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(2236671);
      expect(fs.existsSync('./assets/bitmap-toBlue.bmp')).toExist();
      done();
    });
  });
  it('should return identifier 14540747 from the invert function and \'./assets/bitmap-invert.bmp\' should exist.', (done) => {
    bitmap(path, 'invert', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(14540747);
      expect(fs.existsSync('./assets/bitmap-invert.bmp')).toExist();
      done();
    });
  });
  it('should return identifier 2565927 from the grayscale function and \'./assets/bitmap-invert.bmp\' should exist.', (done) => {
    bitmap(path, 'grayscale', (err, result) => {
      if (err) return done(err);
      expect(result).toEqual(2565927);
      expect(fs.existsSync('./assets/bitmap-grayscale.bmp')).toExist();
      done();
    });
  });
  it('should return \'Error: toReds is an invalid argument\'.', (done) => {
    bitmap(path, 'toReds', (err, result) => {
      expect(err).toEqual('Error: toReds is an invalid argument');
      expect(result).toNotExist();
      done();
    });
  });
  it('should return \'Error: ENOENT: no such file or directory, open "./assets/null.bmp"\'.', (done) => {
    bitmap('./assets/null.bmp', 'toRed', (err, result) => {
      expect(err).toEqual('Error: Error: ENOENT: no such file or directory, open \'./assets/null.bmp\'');
      expect(result).toNotExist();
      done();
    });
  });
  it('should return \'Error: This app only handles Windows bitmap format: \'BM\'.\' when opening a jpg file.', (done) => {
    bitmap('./assets/sample.jpg', 'toRed', (err, result) => {
      expect(err).toEqual('Error: This app only handles Windows bitmap format: \'BM\'.');
      expect(result).toNotExist();
      done();
    });
  });
  it('should return \'Error: This file is too short to be a bitmap.\' for a file begining with ASCII \'BM\', but not long enough to contain offset data at byte 10.', (done) => {
    bitmap('./assets/test-short.txt', 'toRed', (err, result) => {
      expect(err).toEqual('Error: This file is too short to be a bitmap.');
      expect(result).toNotExist();
      done();
    });
  });
  it('should return \'Error: This app only handles Windows bitmap format.  Expected to see pixel array offset 1078 at byte 10.\' for a file beginning with ASCII \'BM\', but long enough to contain data at byte 10.', (done) => {
    bitmap('./assets/test-long.txt', 'toRed', (err, result) => {
      expect(err).toEqual('Error: This app only handles Windows bitmap format.  Expected to see pixel array offset 1078 at byte 10.');
      expect(result).toNotExist();
      done();
    });
  });
  it('should return \'Error: This app only handles Windows bitmap format: \'BM\'.\' for a file NOT beginning with ASCII \'BM\', but long enough to contain data at byte 10.', (done) => {
    bitmap('./assets/lorem.txt', 'toRed', (err, result) => {
      expect(err).toEqual('Error: This app only handles Windows bitmap format: \'BM\'.');
      expect(result).toNotExist();
      done();
    });
  });
});
