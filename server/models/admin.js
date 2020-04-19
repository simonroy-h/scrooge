const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    local: {
        username: String,
        password: String
    }
});

var Admin = new mongoose.model('Admin', schema, 'Admin');

module.exports = Admin;