const Version = require("../database/models/Version");

module.exports = {
    
    create (body) {
        return new Promise((resolve, reject) => {
            Version.create(body).then((data)=>{
                resolve(data.id)
            })
        })
    },
   async update (body) {
        return new Promise((resolve, reject) => {
            const {unique_id,sha,crc,file_version} = body
            Version.update({sha,crc,file_version},{where:{unique_id}}).finally(()=>{
                Version.findOne({where:{unique_id},raw: true,nest: true}).then((data)=>{
                    resolve(data.id)
                  })
            })
     
       //      Version.update({sha,crc,file_version},{where:{unique_id}})
        
            
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