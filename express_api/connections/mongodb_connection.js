const mongoose = require('mongoose');
URI = 'mongodb://localhost:27017/test';

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`The database is connected to ${URI}`);
});