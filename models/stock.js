const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({
    symbol: String
});

const Stock = mongoose.model('Stock', StockSchema);