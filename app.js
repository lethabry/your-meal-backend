const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const checkAccessCors = require('./middlewares/cors');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const checkSessionId = require('./middlewares/session');

const app = express();
const { PORT = 3001 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAccessCors);

mongoose.connect('mongodb://127.0.0.1:27017/yourmealdb');

app.use(checkSessionId);
app.use('/products', require('./routers/product'));
app.use('/shopping-cart', require('./routers/shoppingCart'));
app.use('/category', require('./routers/category'));

app.use(centralErrorHandler);

app.listen(PORT);
