const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const LessonSchema = new Schema({
    date: String,
    time: String,
    group: String,
    teacher: String,
    subject: String,
    theme: String,
    presentation: String,
    additional: String,
    link: String,
    homework: String,
}, {
    timestamps: true,
});

const LessonModel = model('Lesson', LessonSchema);

module.exports = LessonModel;