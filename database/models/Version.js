const { Model, DataTypes } = require("sequelize");
const helper = require('../../utils/elasticsearch/helper')
class Version extends Model {
  static init(sequelize) {
    super.init(
      {
        file_version: DataTypes.STRING,
        unique_id: DataTypes.STRING,
        sha: DataTypes.STRING,
        crc: DataTypes.STRING,
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
      },
      {
        tableName: "versions", 
        sequelize
      }
      );
    }
    static associate(models) {
      this.hasMany(models.Files, {
        as: 'version',
        foreignKey: "version_id"
      });
    }
    static Hooks(models){
      
      // this.afterCreate(async (data, options) => {
      //   await helper.saveDocument(this,data,models)
      // });
      // this.afterUpdate(async (data, options) => {
      //   await helper.updateDocument(this,data,models)
      // });
      // this.afterDestroy(async (data, options) => {
      //   await helper.destroyDocument(this,data,models)
      // });
      
    }
    
  }
  
  module.exports = Version;
  