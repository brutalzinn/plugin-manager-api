const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Files = require("./models/Files");
const User = require("./models/User");
const Version = require("./models/Version");



const connection = new Sequelize(dbConfig["development"]);

User.init(connection);
Version.init(connection);
Files.init(connection);


User.associate(connection.models);
Version.associate(connection.models);
Files.associate(connection.models);


Version.Hooks(connection.models)
Files.Hooks(connection.models)

module.exports = connection;
