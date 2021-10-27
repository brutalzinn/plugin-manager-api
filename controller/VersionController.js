
const versionManager = require("../service/versionManager")

module.exports = {
  async checkVersion(req,res) {
    return res.status(200).json(await versionManager.check(req.body))
  }
}