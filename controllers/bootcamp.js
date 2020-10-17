const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp.js');

/*
    @desc       get all bootcamps
    @route      GET /api/v1/bootcamps
    @access     public
*/
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
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
