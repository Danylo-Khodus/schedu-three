const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ScheduleSchema = new Schema({
    group: String,
    date: String,
    lessonOne: {
        subject: String,
        presentation: String,
        link: String,
        homework: String,
    },
    lessonTwo: {
        subject: String,
        presentation: String,
        link: String,
        homework: String,
    },
    lessonThree: {
        subject: String,
        presentation: String,
        link: String,
        homework: String,
    },
    lessonFour: {
        subject: String,
        presentation: String,
        link: String,
        homework: String,
    },
    lessonFive: {
        subject: String,
        presentation: String,
        link: String,
        homework: String,
    },
    lessonSix: {
        subject: String,
        presentation: String,
        link: String,
        homework: String,
    },
}, {
    timestamps: true,
});

const ScheduleModel = model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;