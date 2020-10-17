const ErrorResponse = require('../utils/errorResponse');
//  in here we use express default error handler
// @url: https://expressjs.com/en/guide/error-handling.html
const errorHandler = (err, req, res, next) => {
  let error = {...err};

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  //   console.log(err.name);
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // split all error into a array and show as a list
  if (err.name === 'ValidationError') {
    let errors = error.message.split(',');
    for (let i = 0; i < errors.length; i++) {
      console.log('....' + errors[i] + '...');
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message.split(',') || 'Server error',
  });
};

module.exports = errorHandler;
