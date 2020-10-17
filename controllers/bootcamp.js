/*
    @desc       get all bootcamps
    @route      GET /api/v1/bootcamps
    @access     public
*/
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Show all bootcamps'});
};

/*
    @desc       get single bootcamp
    @route      GET /api/v1/bootcamp/:id
    @access     public
*/
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({success: true, msg: `show bootcamp ${req.params.id}`});
};

/*
    @desc       create a bootcamp
    @route      POST /api/v1/bootcamps
    @access     private
*/
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Create new bootcamp'});
};

/*
    @desc       update a bootcamp
    @route      PUT /api/v1/bootcamps/:id
    @access     private
*/
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({success: true, msg: `Update bootcamp ${req.params.id}`});
};

/*
    @desc       delete a bootcamp
    @route      DELETE /api/v1/bootcamps/:id
    @access     private
*/
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({success: true, msg: `Delete bootcamp ${req.params.id}`});
};