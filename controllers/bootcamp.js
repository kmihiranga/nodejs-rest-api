const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp.js');
const geocoder = require('../utils/geocoder.js');

/*
    @desc       get all bootcamps
    @route      GET /api/v1/bootcamps
    @access     public
*/
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // @desc: query parameters search
  let query;

  // copy req.query
  const reqQuery = {...req.query};

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Executing query
  const bootcamps = await query;
  res
    .status(200)
    .json({success: true, data: bootcamps, count: bootcamps.length});
});

/*
    @desc       get single bootcamp
    @route      GET /api/v1/bootcamp/:id
    @access     public
*/
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    // return res.status(400).json({success: false});
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({success: true, data: bootcamp});
});

/*
    @desc       create a bootcamp
    @route      POST /api/v1/bootcamps
    @access     private
*/
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

/*
    @desc       update a bootcamp
    @route      PUT /api/v1/bootcamps/:id
    @access     private
*/
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({success: true, data: bootcamp});
});

/*
    @desc       delete a bootcamp
    @route      DELETE /api/v1/bootcamps/:id
    @access     private
*/
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({success: true});
});

/*
    @desc       Get bootcamps within a radius
    @route      DELETE /api/v1/bootcamps/radius/:zipcode/:distance
    @access     private
*/
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const {zipcode, distance} = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radians
  // divide dist by radius of earth
  // earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {$geoWithin: {$centerSphere: [[lng, lat], radius]}},
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
