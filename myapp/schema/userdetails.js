var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    user_name : String,
    user_gender : String,
    user_email : String,
    user_password : String,
    user_mobile : Number,
    user_address : String,
    user_file : String,
    _area:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'area'
        }
});

module.exports = mongoose.model('users',myschema);