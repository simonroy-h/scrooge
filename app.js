const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

// Models
require('./server/models/stock');

// Routes
const adminRoutes = require('./server/routes/admin');
const clientRoutes = require('./server/routes/client');

// Error
const errorController = require('./server/controllers/error');

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

app.use('/', clientRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get400);
app.use(errorController.get404);

app.listen(PORT);