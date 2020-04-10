const mongoose = require('mongoose');
var Stock = mongoose.model('Stock');

exports.createStock = (data, callback) => {
    Stock.create(data).then((res) => {
        callback(null, res);
    }, (err) => {
        callback(err, null);
    });
};

exports.findStock = (query, callback) => {
    Stock.findOne(query, callback);
};

exports.findStocks = (callback) => {
    Stock.find({}, callback);
}

exports.updateStock = (symbol, data, callback) => {
    Stock.findByIdAndUpdate({
        symbol: symbol
    }, data, (err, res) => {
        callback(err, res);
    });
};

exports.deleteStock = (query, callback) => {
    Stock.deleteOne(query, callback);
};