var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    p_name : String,
    p_details : String,
    p_price : String,
    p_img : String,
    p_qty : String,
    _subcategory:{
        type: mongoose.Schema.Types.ObjectId, 
          ref: 'subcategory'
    }
});

module.exports = mongoose.model('product', myschema);