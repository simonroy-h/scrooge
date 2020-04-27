const analyticsService = require('../service/analytics');
const reminderService = require('../service/reminder');
const stockService = require('../service/stock');

exports.getLogin = (req, res, next) => {
    res.render('admin/login');
};

exports.getLogout = (req, res, next) => {
    req.logout();
    res.locals.message = req.flash('info', 'You have successfully logged out!');
    res.redirect('/admin/')
};

exports.getDashboard = (req, res, next) => {
    analyticsService.findAnalytics().then(analytics => {
        reminderService.getReminderCount().then(count => {
            res.render('admin/dashboard', {
                analytics: analytics,
                reminders: count
            });
        });
    });
};

exports.getStockCreate = (req, res, next) => {
    res.status(200).render('admin/stock_create_update', {
        path: '/create'
    });
};

exports.postStockCreate = (req, res, next) => {
    var body = req.body;
    body.updatedAt = Date.now();
    if (!body.symbol) {
        res.locals.message = req.flash('info', 'Stock symbol is missing! Stock creation was unsuccessful!');
        res.status(400).redirect('/admin/stocks');
        return;
    }
    stockService.createStock(body, (err, stock) => {
        if (stock) {
            res.locals.message = req.flash('info', 'Stock: ' + body.symbol + ' has successfully been created!')
            res.status(201).redirect('/admin/stocks');
        } else if (err) {
            res.locals.message = req.flash('info', 'Stock creation was unsuccessful!');
            res.status(400).redirect('/admin/stocks');;
        }
    });
};

exports.getStockUpdate = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.locals.message = req.flash('info', 'Bad request!');
        res.status(400).redirect('/admin/stocks');
        return;
    }
    stockService.findStock(query, (err, stock) => {
        if (err) {
            res.locals.message = req.flash('info', 'There was an error retrieving the update page!');
            res.status(404).redirect('/admin/stocks');
            return;
        }
        if (stock) {
            res.status(200).render('admin/stock_create_update', {
                path: '/update',
                stock: stock
            });
            return;
        }
        if (!stock) {
            res.locals.message = req.flash('info', 'No data found!');
            res.status(204).redirect('/admin/stocks');
        }
    });
};

exports.postStockUpdate = (req, res, next) => {
    var body = req.body;
    body.updatedAt = Date.now();
    if (!body.symbol) {
        res.locals.message = req.flash('info', 'Symbol is missing!');
        res.status(400).redirect('/admin/stocks');
        return;
    }
    stockService.updateStock(body.symbol, body, (err, response) => {
        if (response) {
            res.locals.message = req.flash('info', 'Stock: ' + body.symbol + ' has successfully been updated!')
            res.status(200).redirect('/admin/stocks');
        } else if (err) {
            res.locals.message = req.flash('info', 'Stock update was unsuccessful!');
            res.status(400).redirect('/admin/stocks');;
        }
    });
};

exports.getStockDelete = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.locals.message = req.flash('info', 'Bad request!');
        res.status(400).redirect('/admin/stocks');
        return;
    }
    stockService.deleteStock(query, (err, response) => {
        if (err) {
            res.locals.message = req.flash('info', 'Stock deletion was unsuccessful!');
            res.status(400).redirect('/admin/stocks');;
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.locals.message = req.flash('info', 'Stock: ' + query.symbol + " has successfully been deleted!");
                res.status(202).redirect('/admin/stocks');
            }
            if (response.n === 0 && response.ok === 1) {
                res.locals.message = req.flash('info', 'No data found!');
                res.status(204).redirect('/admin/stocks');
            }
        }
    });
};

exports.getStocks = (req, res, next) => {
    stockService.findStocks((err, stocks) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        if (stocks) {
            res.status(200).render('admin/stocks', {
                stocks: stocks
            });
            return;
        }
        if (!stocks) {
            res.status(204).send('No data found');
        }
    });
};

exports.getReminderCreate = (req, res, next) => {
    res.status(200).render('admin/reminder_create_update', {
        path: '/create'
    });
};

exports.postReminderCreate = (req, res, next) => {
    var body = req.body;
    if (!body.symbol) {
        res.locals.message = req.flash('info', 'Reminder symbol is missing! Reminder creation was unsuccessful!');
        res.status(400).redirect('/admin/reminders');
        return;
    }
    reminderService.createReminder(body, (err, reminder) => {
        if (reminder) {
            res.locals.message = req.flash('info', 'Reminder: ' + body.symbol + ' has successfully been created!')
            res.status(201).redirect('/admin/reminders');
        } else if (err) {
            res.locals.message = req.flash('info', 'Reminder creation was unsuccessful!');
            res.status(400).redirect('/admin/reminders');;
        }
    });
};

exports.getReminderUpdate = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.locals.message = req.flash('info', 'Bad request!');
        res.status(400).redirect('/admin/reminders');
        return;
    }
    reminderService.findReminder(query, (err, reminder) => {
        if (err) {
            res.locals.message = req.flash('info', 'There was an error retrieving the update page!');
            res.status(404).redirect('/admin/reminders');
            return;
        }
        if (reminder) {
            res.status(200).render('admin/reminder_create_update', {
                path: '/update',
                reminder: reminder
            });
            return;
        }
        if (!reminder) {
            res.locals.message = req.flash('info', 'No data found!');
            res.status(204).redirect('/admin/reminders');
        }
    });
};

exports.postReminderUpdate = (req, res, next) => {
    var body = req.body;
    if (!body.symbol) {
        res.locals.message = req.flash('info', 'Symbol is missing!');
        res.status(400).redirect('/admin/reminders');
        return;
    }
    reminderService.updateReminder(body.symbol, body, (err, response) => {
        if (response) {
            res.locals.message = req.flash('info', 'Reminder: ' + body.symbol + ' has successfully been updated!')
            res.status(200).redirect('/admin/reminders');
        } else if (err) {
            res.locals.message = req.flash('info', 'Reminder update was unsuccessful!');
            res.status(400).redirect('/admin/reminders');;
        }
    });
};

exports.getReminderDelete = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.locals.message = req.flash('info', 'Bad request!');
        res.status(400).redirect('/admin/reminders');
        return;
    }
    reminderService.deleteReminder(query, (err, response) => {
        if (err) {
            res.locals.message = req.flash('info', 'Reminder deletion was unsuccessful!');
            res.status(400).redirect('/admin/reminders');;
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.locals.message = req.flash('info', 'Reminder: ' + query.symbol + " has successfully been deleted!");
                res.status(202).redirect('/admin/reminders');
            }
            if (response.n === 0 && response.ok === 1) {
                res.locals.message = req.flash('info', 'No data found!');
                res.status(204).redirect('/admin/reminders');
            }
        }
    });
};

exports.getReminders = (req, res, next) => {
    reminderService.findReminders((err, reminders) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        if (reminders) {
            res.status(200).render('admin/reminders', {
                reminders: reminders
            });
            return;
        }
        if (!reminders) {
            res.status(204).send('No data found');
        }
    });
};