const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/my-blog';

mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

const app = express();

app.use(morgan('dev'));


app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'))
app.get('/', function(req, res) {
  res.status(200).send('Hello World!');
});



module.exports = app;