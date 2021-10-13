var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    a_name: String,
    _city:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'city'
        }
      
}); 

module.exports = mongoose.model('area', myschema);