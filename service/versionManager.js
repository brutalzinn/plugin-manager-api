const Version = require("../database/models/Version");

module.exports = {
    
    create (body) {
        return new Promise((resolve, reject) => {
            Version.create(body).then((data)=>{
                resolve(data.id)
            })
        })
    },
    delete(id){
        return new Promise((resolve, reject) => {
            Version.destroy({where: { id}}).then((data)=>{
                resolve(true)
            })
        })
    },
    async checkUniqueID(unique_id){
        let version = await Version.findOne({where: { unique_id}})
        if(version){
            return true
        }else{
            return false
        }
        
    }
    
}