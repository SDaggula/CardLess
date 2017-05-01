var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
 
// set up a mongoose model
var DrinkSchema = new Schema({
  tabId: {
        type: String,
        required: true
    },
  name: {
        type: String,
        required: true
    },
  price: {
        type: String,
        required: true
    },
  quantity: {
        type: String,
        required: true
  }
});

 
module.exports = mongoose.model('drink', DrinkSchema);