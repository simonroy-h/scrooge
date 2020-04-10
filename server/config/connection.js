const mongoose = require('mongoose');

const URL = process.env.URL || 'mongodb://127.0.0.1/scrooge';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(URL, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('Success in db connection');
});