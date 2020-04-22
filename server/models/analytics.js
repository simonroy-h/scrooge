const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    url: String,
    day: String,
    hour: Number,
    ip: String
});

var Analytics = new mongoose.model('Analytics', schema, 'Analytics');

module.exports = Analytics;