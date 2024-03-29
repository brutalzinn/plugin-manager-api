const { Model, DataTypes } = require("sequelize");
//const es = require('../../config/elasticsearch')
// const saveDocument = (instance) => {
//   return es.create({
//       index: 'files',
//       type: 'files',
//       id: instance.dataValues.id,
//       body: { name: instance.dataValues.name },
//   });
// }

// const deleteDocument = (instance) => {
//   return es.delete({
//       index: 'files',
//       type: 'files',
//       id: instance.dataValues.id,
//   });
//}

const helper = require('../../utils/elasticsearch/helper')
//filename, filepath
class Files extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: DataTypes.STRING,
        type: DataTypes.STRING,
        url: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        repo: DataTypes.STRING,
        description: DataTypes.STRING,
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
      },
      {
        tableName: "files", 
        sequelize,
        
      }
      );
      
      //  this.addHook('afterDestroy', destroyDocument(this))
    }
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: "user_id"
      });
    }
    static Hooks(models){
      
      this.afterCreate(async (data, options) => {
        await helper.saveDocument(this,data,models)
      });
      this.afterUpdate(async (data, options) => {
        await helper.saveDocument(this,data,models)
      });
      this.afterDestroy(async (data, options) => {
        await helper.destroyDocument(this,data,models)
      });
      
    }
  }
  
  module.exports = Files;
  