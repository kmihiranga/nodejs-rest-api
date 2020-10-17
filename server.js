const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const logger = require('./middleware/logger.js');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/errors.js');
const connectDB = require('./config/database.js');

// load env vars
dotenv.config({path: './config/config.env'});

// import routes file
const bootcamps = require('./routes/router.js');

// connect to the database
connectDB();

const app = express();

app.use(bodyParser.json());
// use middleware we create
// app.use(logger);

// body parser
app.use(express.json());

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routes
app.use('/api/v1/bootcamps', bootcamps);

// error middleware
// middlewares work in a linear order so we use this after mount the controller
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close the server & exit process
  server.close(() => process.exit(1));
});
