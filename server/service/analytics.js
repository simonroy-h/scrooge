const mongoose = require('mongoose');
var Analytics = mongoose.model('Analytics');

exports.findAnalytics = () => {
    let getTotalRequests = Analytics.count();
    let getStatsPerIP = Analytics.aggregate([
        {
            $group: {
                _id: '$ip',
                numberOfRequests: { $sum: 1 },
            }
        },
        { $sort: { numberOfRequests: 1 } }
    ]);
    let getStatsPerRoute = Analytics.aggregate([
        {
            $group: {
                _id: { url: '$url' },
                numberOfRequests: { $sum: 1 },
            }
        }
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
        getStatsPerIP,
        getRequestsPerDay,
        getRequestsPerHour,
        getTotalRequests
    ]).then(results => {
        return {
            statsPerRoute: results[0],
            statsPerIP: results[1],
            requestsPerDay: results[2],
            requestsPerHour: results[3],
            totalRequests: results[4],
        };
    });
};