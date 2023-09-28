const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ScheduleSchema = new Schema({
    group: String,
    date: String,
    lessonOne: {
        status: String,
        subject: String,
        files: String,
        link: String,
        homework: String,
    },
    lessonTwo: {
        status: String,
        subject: String,
        files: String,
        link: String,
        homework: String,
    },
    lessonThree: {
        status: String,
        subject: String,
        files: String,
        link: String,
        homework: String,
    },
    lessonFour: {
        status: String,
        subject: String,
        files: String,
        link: String,
        homework: String,
    },
    lessonFive: {
        status: String,
        subject: String,
        files: String,
        link: String,
        homework: String,
    },
    lessonSix: {
        status: String,
        subject: String,
        files: String,
        link: String,
        homework: String,
    },
}, {
    timestamps: true,
});

const ScheduleModel = model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;