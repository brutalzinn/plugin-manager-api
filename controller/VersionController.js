const Version = require("../database/models/Version");

module.exports = {
    //need refactor this.
  async check(req,res){
    const body = req.body
    let result = []
   await Promise.all(body.map(async(item)=>{
         console.log(item)
     let v = await Version.findOne({where:{...item},raw: true,nest: true})
     if(v){
        result.push({...item,version:v.file_version})
     }
    }))
    return res.send(result)
    
      

    }
}