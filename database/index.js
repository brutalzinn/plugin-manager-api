const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Files = require("./models/Files");
const User = require("./models/User");

const connection = new Sequelize(dbConfig["development"]);

User.init(connection);

Files.init(connection);

User.associate(connection.models);
Files.associate(connection.models);

module.exports = connection;
