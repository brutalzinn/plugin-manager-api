const es = require('../../config/elasticsearch')


const saveDocument = async (instance,data,models) => {

    // Get the type of instance we have (the model name)
    const type = instance.name.toLowerCase();
    console.log('INTERNACENAME',type)

    let document = {}
    let include;
    
    // Get nested data for document
    switch (type) {
      case 'files':
       let result = await instance.findOne({
          include: [{
            model: models.User,
            as: 'user'
          }],
            where: {
             id: data.id
            },
            raw: true,
            nest: true,
          })
          document = {
            id:result.id,
            name:result.name,
            author:result.user.name
          }

        break;
      default:
        include = [];
        break;
    };
    // Reload the instance with all nested data eager loaded
    console.log('new document',document)
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