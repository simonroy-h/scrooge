const mongoose = require('mongoose');
var Reminder = mongoose.model('Reminder');

exports.getReminderCount = () => {
    let getCount = Reminder.countDocuments();
    return Promise.all([
        getCount
    ]).then(results => {
        return results[0];
    });
};

exports.createReminder = (data, callback) => {
    Reminder.create(data).then((res) => {
        callback(null, res);
    }, (err) => {
        callback(err, null);
    });
};

exports.findReminder = (query, callback) => {
    Reminder.findOne(query, callback);
};

exports.findReminders = (callback) => {
    Reminder.find({}, callback);
};

exports.updateReminder = (symbol, data, callback) => {
    Reminder.findOneAndUpdate({
        symbol: symbol
    }, data, (err, res) => {
        callback(err, res);
    });
};

exports.deleteReminder = (query, callback) => {
    Reminder.deleteOne(query, callback);
};