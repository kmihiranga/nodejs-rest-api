const express = require('express');
const router = express.Router();

// get all bootcamps
router.get('/', (req, res) => {
  // res.send('Hello from express');
  res.status(200).json({success: true, msg: 'Show all bootcamps'});
});

// get single bootcamps
router.get('/:id', (req, res) => {
  res.status(200).json({success: true, msg: `show bootcamp ${req.params.id}`});
});

// save a bootcamp
router.post('/', (req, res) => {
  res.status(200).json({success: true, msg: 'Create new bootcamp'});
});

// update bootcamp
router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({success: true, msg: `Update bootcamp ${req.params.id}`});
});

// delete bootcamp
router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({success: true, msg: `Delete bootcamp ${req.params.id}`});
});

module.exports = router;
