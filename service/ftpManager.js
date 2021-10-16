const ftp = require("basic-ftp")
require("dotenv").config();
const path = require('path');

const tmpDirectory = path.join(path.dirname(require.main.filename),'uploads')

module.exports = {
  async upload (filename) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: process.env.FTPHOST,
            user: process.env.FTPUSER,
            password: process.env.FTPPASS,
            secure: false
        })
        await client.uploadFrom(path.join(tmpDirectory,filename), filename)
        //await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
},
async delete (filename) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: process.env.FTPHOST,
            user: process.env.FTPUSER,
            password: process.env.FTPPASS,
            secure: false
        })
        await client.remove(filename)
        //await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

}