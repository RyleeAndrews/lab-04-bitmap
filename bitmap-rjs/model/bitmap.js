'use strict';

const fs = require('fs');

module.exports = () => {
  fs.readFile('../assets/bitmap.bmp', (err, data) => {

    if (err)
      console.error(err);

    let arrayOffset = data.readUInt16LE(10);

    let headerBuf = data.slice(0,14);
    let DIBBuf = data.slice(14, 54);
    let colorTableBuf = data.slice(54, arrayOffset);
    let pixMapBuf = data.slice(arrayOffset);

    //Extract Color Table from Buffer to Array
    let colorTableArr = Array.prototype.slice.call(colorTableBuf);

    for (var i = 1; i < colorTableArr.length; i) {
      colorTableArr[i] = 255;
      i = i + 4;
    }

    //Push colorTableArr back into colorTableBuf
    let newColorTableBuf = Buffer.from(colorTableArr);

    //Recombine all four buffers
    let newImgBuf = Buffer.concat([headerBuf, DIBBuf, newColorTableBuf, pixMapBuf], data.length);

    fs.writeFile('../assets/bitmap-new.bmp', newImgBuf, (err) => {if (err) {console.error(err);} });

    function Headers (header) {
      this.headerField = header.slice(0,2).toString(); // 02
      this.size = header.readUInt16LE(2); //02-06
      this.width = header.readUInt16LE(18);// 18-21
      this.height = header.readUInt16LE(22);// 22-25
      this.bitDepth = header.readUInt16LE(28);// 28-29
    }

    let newImgHeader = new Headers(headerBuf);
    console.log(newImgHeader);

  });
};
