var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    s_name: String
});

module.exports = mongoose.model('state', myschema);