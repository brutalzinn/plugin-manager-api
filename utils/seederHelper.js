const {filenameExample,typesExample,urlRepoExample,descriptionExample,repoUsers} = require('../utils/seedModel/seeds.models')
const fileManager = require("../service/fileManager")

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const randomFile = () => {  
    let fileName = filenameExample[getRandomInt(0,filenameExample.length - 1)]
    let type = typesExample[getRandomInt(0,typesExample.length - 1)]
    return `${fileName}${type}`
}

const randomDescription = (tam) => {
    let description = ''
    for(var i = 0; i < tam; i++){
        description += descriptionExample[getRandomInt(0,descriptionExample.length - 1)] + ' '
    }
    return `Lorem Ipsum ${description.substring(0,description.lastIndexOf(" "))}`
}

const randomRepo = (filename) => {  
    let repo = urlRepoExample[getRandomInt(0,urlRepoExample.length - 1)]
    let users = repoUsers[getRandomInt(0,repoUsers.length - 1)]
    return `${repo}/${users}/${fileManager.getFileInfo(filename).name}`
}

const randomFilesModel = (tam) => {
    let filesModel = []
    for(var i =0 ; i < tam; i ++){
        let filename = randomFile()
        let file = {
            filename: fileManager.getFileInfo(filename).name,
            type: fileManager.getFileInfo(filename).type,
            description: randomDescription(7),
            name: fileManager.getFileInfo(filename).name,
            repo:randomRepo(filename),
            status:true,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: 1,
            url: fileManager.getFileUrl(filename)
        }
        filesModel.push(file)
    }
    return filesModel
}

module.exports = {
    randomFile,
    randomFilesModel
}