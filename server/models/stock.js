const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    createdAt: Date,
    updatedAt: Date,
    symbol: String,
    name: String,
    exchange: String,
    currency: String,
    sector: String,
    industry: String,
    commonSharesOutstanding: Number,
    marketPricePerShare: Number,
    marketCapitalization: Number,
    beta: Number,
    currentAnnualDividendPerShare: Number,
    currentAnnualEarningsPerShare: Number,
    projectedAnnualDividend: Number,
    dividendYield: Number,
    averageAnnualSharePriceGrowth: Number,
    annualizedTotalReturn: Number,
    consecutiveDividend: Number,
    averageAnnualDividendGrowth: Number,
    averageAnnualEarningsGrowth: Number,
    dividendPayoutRatio: Number,
    priceEarningsRatio: Number,
    netProfitMargin: Number,
    returnOnEquityRatio: Number,
    quickRatio: Number,
    debtCoveringRatio: Number,
    freeCashFlow: Boolean
});

var Stock = new mongoose.model('Stock', schema, 'Stock');

module.exports = Stock;