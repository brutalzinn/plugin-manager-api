const Version = require("../database/models/Version");
const Files = require("../database/models/Files");

module.exports = {
    
    create (body) {
        return new Promise((resolve, reject) => {
            Version.create(body).then((data)=>{
                resolve(data.id)
            })
        })
    },
   async update (id,body) {   
            const {sha,crc,file_version} = body          
            let versionSelect = await Version.findOne({where:{id},raw: true,nest: true})
             if(versionSelect){
            await Version.update({sha,crc,file_version},{where:{id}})
            return true
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
            let v = await Files.findOne({include: [
                {
                  model: Version,
                  as: 'version',
                  where: {...item}
                }]});
            if(v){
                result.push({...item,version:v.version.file_version,url:v.url,status:true})
            }else{
                result.push({...item,status:false})
            }
            }))
            return result.sort((a, b) =>{
                if(a.status == true && b.status == false){
                    return -1
                }
                if(a.status == false && b.status == true){
                    return 1
                }
                return 0
            })
        }else{
            return await Files.findOne({include: [
                {
                  model: Version,
                  as: 'version',
                  where: { unique_id: body}
                }]}) || null

        }   
        }
    
}