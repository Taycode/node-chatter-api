const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
       type: String,
       required: true
    } ,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {type: String},
    last_name: {type: String}
});

UserSchema.pre('save', function (next) {


    let user = this;
    bcrypt.hash(user.password, 10, (err, hash)=>{
        if (err){
            return console.log(err)
        }
        user.password = hash;
        next();
    });
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
