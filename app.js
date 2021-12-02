const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// WebSocket initialize
const io = require('socket.io')();
const { setupIO } = require('./socket');
setupIO(io);

// express
const indexRouter = require('./routes/index');

const app = express();
const corsOptions = {

}
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = { app, io };
