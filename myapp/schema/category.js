var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    c_name: String
});

module.exports = mongoose.model('category', myschema);