const { Model, DataTypes } = require("sequelize");
//filename, filepath
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        rank: DataTypes.INTEGER,
      },
      {
        tableName: "users", 
        sequelize,
      
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Files, {
        foreignKey: "user_id",
      });
  }
}

module.exports = User;
