require("dotenv").config();
const path = require('path');
const fs = require('fs');

const tmpDirectory = path.join(path.dirname(require.main.filename),'uploads')

module.exports = {
     getFileInfo (filename) {
          let data = filename.split(".")
          return {name:data[0],type:data[1]}
      },
     getFileUrl  (filename) { return `${process.env.URL}/${filename}`},
     delFile (filename) { return fs.unlinkSync(path.join(tmpDirectory,filename)) }
}