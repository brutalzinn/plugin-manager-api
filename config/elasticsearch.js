require("dotenv").config();
const {  DB_HOST } =process.env;
const elastic = require('elasticsearch');

elasticClient = elastic.Client({
    host: `${DB_HOST}:9200`
});

module.exports = elasticClient;