const moment = require('moment');
const nodemailer = require('nodemailer');

const Analytics = require('../models/analytics');
const stockService = require('../service/stock');

exports.getSearch = (req, res, next) => {
    let requestTime = Date.now();
    Analytics.create({
        url: req.path,
        month: moment(requestTime).format("MMMM"),
        day: moment(requestTime).format("dddd"),
        hour: moment(requestTime).hour(),
        ip: req.connection.remoteAddress
    });
    res.render('client/search');
};

exports.postSearch = (req, res, next) => {
    res.redirect('/stock/' + req.body.symbol);
};

exports.getStock = (req, res, next) => {
    let requestTime = Date.now();
    Analytics.create({
        url: req.path,
        month: moment(requestTime).format("MMMM"),
        day: moment(requestTime).format("dddd"),
        hour: moment(requestTime).hour(),
        ip: req.connection.remoteAddress
    });
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.locals.message = req.flash('info', 'Bad request!');
        res.status(400).redirect('/400');
        return;
    }
    stockService.findStock(query, (err, stock) => {
        if (err) {
            res.status(404).redirect('/404');
            return;
        }
        if (stock) {
            res.status(200).render('client/stock', {
                stock: stock
            });
            return;
        }
        if (!stock) {
            res.locals.message = req.flash('info', 'No stock found for that symbol!');
            res.status(204).redirect('/');
        }
    });
};

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

exports.postContact = (req, res, next) => {
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });

    // Specify what the email will look like
    const mailOpts = {
        from: req.body.email,
        to: GMAIL_USER,
        subject: 'NEW MESSAGE FROM CONTACT FORM AT SCROOGE.COM',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };

    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (err, info) => {
        if (err) {
            res.render('client/search');
        } else {
            res.render('client/search');
        }
    });
};