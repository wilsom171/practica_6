const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
const PORT = process.env.PORT || 5000;
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'bb55e1d94e36a2',
  password: '144b506e',
  port: 3306,
  database: 'heroku_a688a892ce4b6c2'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(process.env.PORT || 5000, () => {
  //const port = app.address().port;
  //console.log(`Express is working on port ${port}`);
});
//app.listen(process.env.PORT || 5000)
