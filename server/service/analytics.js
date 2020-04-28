const mongoose = require('mongoose');
var Analytics = mongoose.model('Analytics');

exports.findAnalytics = () => {
    let getTotalRequests = Analytics.countDocuments();
    let getStatsPerRoute = Analytics.aggregate([
        {
            $group: {
                _id: { url: '$url' },
                numberOfRequests: { $sum: 1 },
            }
        },
        { $sort: { numberOfRequests: 1 } }
    ]);
    let getRequestsPerMonth = Analytics.aggregate([
        {
            $group: {
                _id: '$month',
                numberOfRequests: { $sum: 1 }
            }
        },
        { $sort: { numberOfRequests: 1 } }
    ]);
    let getRequestsPerDay = Analytics.aggregate([
        {
            $group: {
                _id: '$day',
                numberOfRequests: { $sum: 1 }
            }
        },
        { $sort: { numberOfRequests: 1 } }
    ]);
    let getRequestsPerHour = Analytics.aggregate([
        {
            $group: {
                _id: '$hour',
                numberOfRequests: { $sum: 1 }
            }
        },
        { $sort: { numberOfRequests: 1 } }
    ]);
    return Promise.all([
        getStatsPerRoute,
        getRequestsPerMonth,
        getRequestsPerDay,
        getRequestsPerHour,
        getTotalRequests
    ]).then(results => {
        return {
            statsPerRoute: results[0],
            requestsPerMonth: results[1],
            requestsPerDay: results[2],
            requestsPerHour: results[3],
            totalRequests: results[4],
        };
    });
};