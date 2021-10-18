const es = require('../../config/elasticsearch')


const saveDocument = async (instance,data,models) => {
  
  const type = instance.name.toLowerCase();
  console.log('INTERNACENAME',type)
  let document = {}
  const regex = /[\s]/
  let salt = []
  let tags = []
  let result
  // Get nested data for document
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
    salt.map((item)=>{
      if(item.length !== 0){
        tags.push(...item.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase().trim().split(regex))
      }
    })
    document = {
      id:result.id,
      name:result.name,
      author:result.user.name,
      search:tags
    }
    
    break;
    
    default:
    include = [];
    break;
  };
  // Send document to Elasticsearch cluster
  return es.create({
    index: type,
    type: type,
    id: data.id,
    body:document,
  });
}

const destroyDocument = async (instance,data) => {
  return es.delete({
    index: type,
    type: type,
    id: data.id,
  });
};

module.exports ={destroyDocument,saveDocument}