const express = require("express");
const glob = require('glob')
const path = require('path');
var routes = express.Router();
const auth = require('./middlewares/auth')
let normalizedPath = require("path").join(__dirname, "routes");
glob.sync( path.join(normalizedPath,'**/*.js') ).forEach( function( file ) {
    let dir = path.basename(path.dirname(file))
    if(dir == 'public'){
        require(path.resolve(file))(routes);
    }
  });
  routes.use(auth);
  glob.sync( path.join(normalizedPath,'**/*.js') ).forEach( function( file ) {
    let dir = path.basename(path.dirname(file))
    if(dir == 'private'){
        require(path.resolve(file))(routes);
    }
  });
module.exports = routes;
