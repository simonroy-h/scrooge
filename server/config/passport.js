const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin');

module.exports = (passport) => {

    passport.serializeUser((admin, done) => {
        done(null, admin.id);
    });

    passport.deserializeUser((id, done) => {
        Admin.findById(id, (err, admin) => {
            done(err, admin);
        });
    })

    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        Admin.findOne({ 'local.username' : username }, (err, admin) => {
            if (err) return done(err);
            if (!admin) return done(null, false, req.flash('info', 'No user found with those credentials!'));
            if (!(admin.local.password === password)) return done(null, false, req.flash('info', 'No user found with those credentials!'));
            return done(null, admin);
        });
    }));

};