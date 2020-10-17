const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const logger = require('./middleware/logger.js');
const morgan = require('morgan');
const connectDB = require('./config/database.js');

// load env vars
dotenv.config({path: './config/config.env'});

// import routes file
const bootcamps = require('./routes/router.js');

// connect to the database
connectDB();

const app = express();

// app.use(bodyParser.json());
// use middleware we create
// app.use(logger);

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
