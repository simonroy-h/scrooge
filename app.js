const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

const mongoDB = 'mongodb://127.0.0.1/scrooge';
mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(adminRoutes);

app.listen(PORT);