var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
 
// set up a mongoose model
var UserSchema = new Schema({
  seatId: {
        type: String,
//        unique: true,
        required: true
    },
  userId: {
        type: String,
        required: true
    }
});
 
UserSchema.pre('save', function (next) {
    var tab = this;
    if (this.isModified('userId') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(tab.userId, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                tab.userId = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('user', UserSchema);