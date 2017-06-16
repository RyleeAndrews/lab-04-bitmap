'use strict';

const fs = require('fs');

module.exports = (path, xform, callback) => {
  fs.readFile(path, (err, data) => {

    if (err)
      return callback(err);

    if (data.slice(0,2).toString() != 'BM')
      return callback(new Error('This app only handles Windows bitmap format: \'BM\'.'));
    if (data.length < 1081)
      return callback(new Error('This file is too short to be a bitmap.'));
    if (data.readUInt16LE(10) != 1078)
      return callback(new Error('This app only handles Windows bitmap format.  Expected to see pixel array offset at byte 1078.'));

    function MetaData (data) {
      this.headerField = data.slice(0,2).toString(); // 02
      this.size = data.readUInt16LE(2); //02-06
      this.width = data.readUInt16LE(18);// 18-21
      this.height = data.readUInt16LE(22);// 22-25
      this.bitDepth = data.readUInt16LE(28);// 28-29
    }

    let fileData = new MetaData(data);
    console.log(fileData);

    let arrayOffset = data.readUInt16LE(10);

    let headerBuf = data.slice(0,14);
    let DIBBuf = data.slice(14, 54);
    let colorTableBuf = data.slice(54, arrayOffset);
    let pixMapBuf = data.slice(arrayOffset);

    //Extract Color Table from Buffer to Array
    let colorTableArr = Array.prototype.slice.call(colorTableBuf);

    let toRed = function () {
      for (var i = 2; i < colorTableArr.length; i) {
        colorTableArr[i] = 255;
        i = i + 4;
      }
    };

    let invert = function () {
      for (var i = 0; i < colorTableArr.length; i) {
        colorTableArr[i] = 255 - colorTableArr[i];
        colorTableArr[i+1] = 255 - colorTableArr[i+1];
        colorTableArr[i+2] = 255 - colorTableArr[i+2];
        i = i + 4;
      }
    };
    xform();

    //Push colorTableArr back into colorTableBuf
    let newColorTableBuf = Buffer.from(colorTableArr);

    //Recombine all four buffers
    let newImgBuf = Buffer.concat([headerBuf, DIBBuf, newColorTableBuf, pixMapBuf], data.length);

    fs.writeFile(path + '.new.bmp', newImgBuf, (err) => {if (err) {return callback(err);} });

    return callback('done');

  });
};
