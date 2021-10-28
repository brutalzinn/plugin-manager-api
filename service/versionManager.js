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
       
            const {unique_id,sha,crc,file_version} = body
          
            let versionSelect = await Version.findOne({where:{unique_id},raw: true,nest: true})
             if(versionSelect){
            Version.update({sha,crc,file_version},{where:{unique_id}})
            return versionSelect.id
             }else{
                 return false
             }
               
       
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
    },
    async check(body){        
        if(Array.isArray(body)){
        let result = []
        await Promise.all(body.map(async(item)=>{
            let v = await Version.findOne({where:{...item}, raw: true, nest: true})
            if(v){
                result.push({...item,version:v.file_version})
            }
            }))
            return result
        }else{
         return await Version.findOne({where: { unique_id: body}}) || null
        }   
        }
    
}