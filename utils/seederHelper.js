const RandomSeederArray = require('../utils/seedModel/seeds.models')
const fileManager = require("../service/fileManager")

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
 randomFile = () => {  
 let fileName = RandomSeederArray.filenameExample[getRandomInt(0,RandomSeederArray.filenameExample.length - 1)]
 let type = RandomSeederArray.typesExample[getRandomInt(0,RandomSeederArray.typesExample.length - 1)]
 return `${fileName}${type}`
},
 randomDescription = (tam) => {
  let description = ''
  for(var i = 0; i < tam; i++){
    description += RandomSeederArray.descriptionExample[getRandomInt(0,RandomSeederArray.descriptionExample.length - 1)] + ' '
  }
   return `Lorem Ipsum ${description.substring(0,description.lastIndexOf(" "))}`
},
 randomRepo = (filename) => {  
 let repo = RandomSeederArray.urlRepoExample[getRandomInt(0,RandomSeederArray.urlRepoExample.length - 1)]
 let users = RandomSeederArray.repoUsers[getRandomInt(0,RandomSeederArray.repoUsers.length - 1)]
 return `${repo}/${users}/${filename}`
},
 randomFilesModel = (tam = 1) => {
    let filesModel = []
    for(var i = 0 ; i < tam; i ++){
      let filename = this.randomFile()
        let file = {
                  filename: fileManager.getFileInfo(filename).name,
                  type: fileManager.getFileInfo(filename).type,
                  url: fileManager.getFileUrl(filename),
                  repo: this.randomRepo(filename),
                  name: fileManager.getFileInfo(filename).name,
                  description: this.randomDescription(7),
                  status: true,
                  user_id: 1,
                  created_at: new Date(),
                  updated_at: new Date()
              }
        filesModel.push(file)
    }
    return filesModel
  }

}