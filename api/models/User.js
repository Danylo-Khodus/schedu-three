const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
    group: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;