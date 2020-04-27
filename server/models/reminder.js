const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    symbol: String,
    reminder: String,
    notes: String,
    url: String,
    dueDate: Date
});

var Reminder = new mongoose.model('Reminder', schema, 'Reminder');

module.exports = Reminder;