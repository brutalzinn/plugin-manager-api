const { Model, DataTypes } = require("sequelize");
const helper = require('../../utils/elasticsearch/helper')
class Files extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: DataTypes.STRING,
        type: DataTypes.STRING,
        url: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        version_id: DataTypes.INTEGER,
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
    }
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: "user_id"
      });
      this.belongsTo(models.Version, {
        as: 'version',
        foreignKey: "version_id"
      });
    }
    static Hooks(models){
      
      this.afterCreate(async (data, options) => {
        await helper.saveDocument(this,data,models)
      });
      this.afterUpdate(async (data, options) => {
        await helper.updateDocument(this,data,models)
      });
      this.afterDestroy(async (data, options) => {
        await helper.destroyDocument(this,data,models)
      });
      
    }
  }
  
  module.exports = Files;
  