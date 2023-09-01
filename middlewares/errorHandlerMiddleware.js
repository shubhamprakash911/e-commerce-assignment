function errorHandler(err, req, res, next) {
  // Check if the error has a status code, default to 500 if not provided
  const statusCode = err.statusCode || 500;

  // Set the response status code and send a JSON response with the error message
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });

  console.log();
}

module.exports = errorHandler;
