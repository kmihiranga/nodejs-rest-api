const express = require('express');
const dotenv = require('dotenv');

// load env vars
dotenv.config({path: './config/config.env'});

const app = express();

// get all bootcamps
app.get('/api/v1/bootcamps', (req, res) => {
  // res.send('Hello from express');
  res.status(200).json({success: true, msg: 'Show all bootcamps'});
});

// get single bootcamps
app.get('api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, msg: `show bootcamp ${req.params.id}`});
});

// save a bootcamp
app.post('api/v1/bootcamps', (req, res) => {
  res.status(200).json({success: true, msg: 'Create new bootcamp'});
});

// update bootcamp
app.put('api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({success: true, msg: `Update bootcamp ${req.params.id}`});
});

// delete bootcamp
app.delete('api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({success: true, msg: `Delete bootcamp ${req.params.id}`});
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
