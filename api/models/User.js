const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, max: 20, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    group: String,
    image: String,
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;