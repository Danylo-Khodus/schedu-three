const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const NotificationSchema = new Schema({
    user_id: String,
    seen: String,
    subject: String,
    message: String,
    time: String,
    link: String,
}, {
    timestamps: true,
});
const NotificationModel = model('Notification', NotificationSchema);

module.exports = NotificationModel;