const es = require('../../config/elasticsearch')
const tagsGenerator = (model = []) =>{
  const regex = /[\s]/
  let tags = []
  model.map((item)=>{
      tags.push(...item.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase().trim().split(regex))
  })
  for(var i = 0;i < tags.length; i++){
      if(tags[i].includes(tags[i+1])){
         tags.splice(i,1)
      }
  }
  return tags
}
const createDocument = async (type,instance,data,models) => {
  let salt = []
  let tags = []
  let result = {}
  switch (type) {
    case 'files':
    result = await instance.findOne({
      include: [{
        model: models.User,
        as: 'user'
      }, 
      {
        model: models.Version,
        as: 'version'
      }],
      where: {
        id: data.id
      },
      raw: true,
      nest: true
    })
    salt = [result.name,result.user.name,result.version.file_version]
    tags = tagsGenerator(salt)
    return {
      id:result.id,
      name:result.name,
      author:result.user.name,
      search:tags
    }
   
    default:
    include = [];
    break;
  }
}
const saveDocument = async (instance,data,models) => {
  const type = instance.name.toLowerCase();
  let document =  await createDocument(type,instance,data,models)
  return es.create({
    index: type,
    type: type,
    id: data.id,
    body: document
  });
}
const updateDocument = async (instance,data,models) => {
  const type = instance.name.toLowerCase();
  let document = await createDocument(type,instance,data,models)
  return es.update({
    index: type,
    type: type,
    id: data.id,
    body: {doc : document}
  });
}

const destroyDocument = async (instance,data) => {
  const type = instance.name.toLowerCase();
  return es.delete({
    index: type,
    type: type,
    id: data.id,
  });
};

module.exports ={destroyDocument,saveDocument,updateDocument}