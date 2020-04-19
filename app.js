const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');

// Models
require('./server/models/stock');

// Error
const errorController = require('./server/controllers/error');

// Configs
const connection = require('./server/config/connection');
require('./server/config/passport')(passport);

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(session({ secret: 'scrooge', resave: true, saveUninitialized: true, cookie: {} }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./server/routes/admin')(app, passport);
const clientRoutes = require('./server/routes/client');

app.use('/', clientRoutes);

app.use(errorController.get400);
app.use(errorController.get404);

app.listen(PORT);