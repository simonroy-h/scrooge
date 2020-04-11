const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Models
require('./server/models/stock');

// Routes
const adminRoutes = require('./server/routes/admin');

// Configs
const connection = require('./server/config/connection');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(session({ secret: 'scrooge', resave: true, saveUninitialized: true, cookie: {} }));
app.use(flash());

app.use('/admin', adminRoutes);

app.listen(PORT);