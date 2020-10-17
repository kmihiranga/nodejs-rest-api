const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp.js');

/*
    @desc       get all bootcamps
    @route      GET /api/v1/bootcamps
    @access     public
*/
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({success: true, data: bootcamps, count: bootcamps.length});
  } catch (err) {
    // res.status(400).json({success: false, message: err.message});
    next(err);
  }
};

/*
    @desc       get single bootcamp
    @route      GET /api/v1/bootcamp/:id
    @access     public
*/
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      // return res.status(400).json({success: false});
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({success: true, data: bootcamp});
  } catch (err) {
    // res.status(400).json({success: false, message: err.message});
    // next(
    //   new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    // );
    next(err);
  }
};

/*
    @desc       create a bootcamp
    @route      POST /api/v1/bootcamps
    @access     private
*/
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    // res.status(400).json({success: false, message: err.message});
    next(err);
  }
};

/*
    @desc       update a bootcamp
    @route      PUT /api/v1/bootcamps/:id
    @access     private
*/
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    // res.status(400).json({success: false, message: err.message});
    next(400);
  }
};

/*
    @desc       delete a bootcamp
    @route      DELETE /api/v1/bootcamps/:id
    @access     private
*/
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({success: true});
  } catch (err) {
    // res.status(400).json({success: false, message: err.message});
    next(400);
  }
};
