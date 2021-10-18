const Sequelize = require("sequelize");
const program = require('commander');
const es = require('./config/elasticsearch')
const glob = require('glob')
const path = require('path');
const dbConfig = require("./config/database");
const connection = new Sequelize(dbConfig["development"]);
let normalizedPath = require("path").join(__dirname, "database","models");

program.command('del:db [todo]')
.description('Del all data from elastic search that exists in database')
.action(async (todo) => {
    glob.sync( path.join(normalizedPath,'**/*.js') ).forEach( async function( file ) {
        const model = require(file)
        const type = model.name.toLowerCase();
        model.init(connection)
        let result = await model.findAll({raw: true,
            nest: true,})
            let ids = []
            result.map((v)=>{
                ids.push(v.id)
            })
            ids.map((id)=>{
                es.delete({
                    index: type,
                    type,
                    id
                }).catch(()=>console.log(`cant find elastic search index of ${model.name}`))
            })
        });
    });
    // thanks to https://stackoverflow.com/questions/31926785/how-do-you-delete-all-indexes-in-elastic-search-using-node-js
    program.command('del:all [todo]')
    .description('Del all data in elastic search')
    .action(async (todo) => {
        es.indices.delete({
            index: '_all'
        }, function(err, res) {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Indexes have been deleted!');
            }
        });
    });
    program.command('del [todo]')
    .description('Del all data in elastic search with especify index')
    .option('-i, --index [index]', 'Index elastic search')
    .action(async (todo,options) => {
        es.indices.delete({
            index: options.index
        }, function(err, res) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(` All ${options.index} have been deleted!`);
            }
        });
    });
    
    program.parse(process.argv);