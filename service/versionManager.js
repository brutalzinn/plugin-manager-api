const Version = require("../database/models/Version");

module.exports = {

   create (body,result) {
        return new Promise((resolve, reject) => {
             Version.create(body).then((data)=>{
                 resolve(data.id)
             })
          })
     
    }

}