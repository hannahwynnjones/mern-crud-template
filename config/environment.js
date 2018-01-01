const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/book-list-mern-crud-${env}`;
const secret = process.env.SECRET || 'My super awesome secret';

module.exports = { port, env, dbURI, secret };
