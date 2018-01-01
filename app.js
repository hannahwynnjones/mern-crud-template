const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const errorHandler = require('./lib/errorHandler');
const customResponses = require('./lib/customResponses');

var path = require('path');
var favicon = require('serve-favicon');

const { port, env, dbURI } = require('./config/environment');

// mongoose.connect('mongodb://localhost/book-list-mern-crud', { useMongoClient: true, promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection succesful WHOOPPEE'))
//   .catch((err) => console.error(err));

const routes = require('./config/routes');
var app = express();

app.use(morgan('dev'));
mongoose.connect(dbURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use(customResponses);
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));


app.use(errorHandler);
app.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app;
