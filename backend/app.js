// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const initdb = require('./database').initdb;
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.use((error, req, res, next) => {
  return res
    .status(error.statusCode || 500).json({
      message: error.message || 'Internal Server Error!',
      data: error || null
    });
});

app.use((req, res, next) => {
  return res.status(404).json({
    message: 'Not Found!'
  });
});

initdb((error, database) => {
  if (error)
    console.log(error)
  else {
    app.listen(process.env.PORT);
    console.log('Server Started!');
  }
});