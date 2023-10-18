const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const HomeworkSchema = new Schema({
    status: String,
    group: String,
    student_id: String,
    student: String,
    teacher_id: String,
    teacher: String,
    subject: String,
    homework: String,
    link: String,
}, {
    timestamps: true,
});
const HomeworkModel = model('Homework', HomeworkSchema);

module.exports = HomeworkModel;