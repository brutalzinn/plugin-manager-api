
const versionManager = require("../service/versionManager")

module.exports = {
  async checkVersion(req,res) {
    const body =  req.params.id || req.body
    console.log(body, new Date().toLocaleString())
    let result = await versionManager.check(body)
    if(result){
      return res.status(200).send(result)
    }else{
      return res.sendStatus(404)
    }

  }
}