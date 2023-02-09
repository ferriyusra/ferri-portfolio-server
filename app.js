const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const projectRouter = require('./app/api/project/router');
const uploadRouter = require('./app/api/uploads/router');
const URL = '/api/v1/'

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.get('/', (req, res) => {
    res.json({
        message: "welcome"
    })
});
app.use(`${URL}`, projectRouter);
app.use(`${URL}`, uploadRouter);

module.exports = app;
