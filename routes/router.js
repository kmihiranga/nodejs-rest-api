const express = require('express');
// destructure controller methods
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamp.js');
const router = express.Router();

// geocode
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// get all urls for same parameters
router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
