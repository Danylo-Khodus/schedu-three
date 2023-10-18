const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const NotificationSchema = new Schema({
    caller_id: String,
    user_id: String,
    seen: String,
    message: String,
    link: String,
}, {
    timestamps: true,
});
const NotificationModel = model('Notification', NotificationSchema);

module.exports = NotificationModel;