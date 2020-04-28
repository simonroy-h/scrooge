const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    url: String,
    month: String,
    day: String,
    hour: Number
});

var Analytics = new mongoose.model('Analytics', schema, 'Analytics');

module.exports = Analytics;