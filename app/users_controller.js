var mongoose = require('mongoose');
var UserSchema_Login = new mongoose.Schema({
    mobi: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    },
    ID_Device: {
        type: String,
        required: true,
        unique: true,
    }
},
    {
        collection: 'user_dbs'
});

UserSchema_Login.statics.authenticate = function (email, password, callback) {
    User_Login.findOne({ mobi: mobi })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

// hashing a password before saving it to the database
UserSchema_Login.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User_Login = mongoose.model('User_Login', UserSchema_Login);
module.exports = User_Login;