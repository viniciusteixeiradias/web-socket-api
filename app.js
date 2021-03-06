const express = require('express');
 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
 
const app = express();
 
app.use(cors('*'));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

module.exports = app;