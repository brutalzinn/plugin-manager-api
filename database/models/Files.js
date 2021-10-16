const { Model, DataTypes } = require("sequelize");
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
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
}

module.exports = Files;
