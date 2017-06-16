'use strict';

const fs = require('fs');

module.exports = () => {
  fs.readFile('../assets/bitmap.bmp', (err, data) => {

    if (err)
      console.error(err);

    let headerOffset = data.slice(10,13).readUInt16LE(0);
    let header = data.slice(0,headerOffset - 1);

    function Headers (header) {
      this.headerField = header.slice(0,2).toString(); //offset at 02
      this.size = header.slice(2,5).readUInt16LE(0); //offset 02-06
      this.width = header.slice(18,21).readUInt16LE(0);// 18-21
      this.height = header.slice(22,25).readUInt16LE(0);// 22-25
      this.bitDepth = header.slice(22,25).readUInt16LE(0);// 28-29
    }

    let newImgHeader = new Headers(header);
    console.log(newImgHeader);
    
  });
};
