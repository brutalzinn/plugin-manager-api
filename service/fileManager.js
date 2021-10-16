require("dotenv").config();
const path = require('path');
const fs = require('fs');

const tmpDirectory = path.join(path.dirname(require.main.filename),'uploads')

module.exports = {
     getExtension (filename)  { return filename.slice(filename.lastIndexOf("."))},
     getFileUrl  (filename) { return `${process.env.URL}/${filename}`},

     delFile (filename) { return fs.unlinkSync(path.join(tmpDirectory,filename)) }
}