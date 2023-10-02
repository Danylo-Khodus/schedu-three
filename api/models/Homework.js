const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const HomeworkSchema = new Schema({
    status: String,
    user: String,
    group: String,
    subject: String,
    homework: String,
}, {
    timestamps: true,
});
const HomeworkModel = model('Homework', HomeworkSchema);

module.exports = HomeworkModel;