const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// import routes file
const bootcamps = require('./routes/router.js');

// load env vars
dotenv.config({path: './config/config.env'});

const app = express();
app.use(bodyParser.json());

// mount routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
