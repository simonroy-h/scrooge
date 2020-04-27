const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');

module.exports = (app, passport) => {

    app.get('/admin/', adminController.getLogin);
    app.post('/admin/', passport.authenticate('login', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/',
        failureFlash: true
    }));

    app.get('/admin/logout', adminController.getLogout);

    app.get('/admin/dashboard', isLoggedIn, adminController.getDashboard);

    app.get('/admin/stock/create', isLoggedIn, adminController.getStockCreate);
    app.post('/admin/stock/create', isLoggedIn, adminController.postStockCreate);
    app.get('/admin/stock/:symbol/update', isLoggedIn, adminController.getStockUpdate);
    app.post('/admin/stock/:symbol/update', isLoggedIn, adminController.postStockUpdate);
    app.get('/admin/stock/:symbol/delete', isLoggedIn, adminController.getStockDelete);
    app.get('/admin/stocks', isLoggedIn, adminController.getStocks);

    app.get('/admin/reminder/create', isLoggedIn, adminController.getReminderCreate);
    app.post('/admin/reminder/create', isLoggedIn, adminController.postReminderCreate);
    app.get('/admin/reminder/:symbol/update', isLoggedIn, adminController.getReminderUpdate);
    app.post('/admin/reminder/:symbol/update', isLoggedIn, adminController.postReminderUpdate);
    app.get('/admin/reminder/:symbol/delete', isLoggedIn, adminController.getReminderDelete);
    app.get('/admin/reminders', isLoggedIn, adminController.getReminders);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/');
    };

};