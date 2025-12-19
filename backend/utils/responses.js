const successResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

const errorResponse = (error, statusCode = 400) => {
  return {
    success: false,
    message: error || "An error occurred",
    statusCode,
  };
};

const validationError = (errors) => {
  return {
    success: false,
    message: "Validation failed",
    errors: Array.isArray(errors) ? errors : [errors],
  };
};

const unauthorizedResponse = (message = "Unauthorized") => {
  return {
    success: false,
    message,
    statusCode: 401,
  };
};

const notFoundResponse = (resource = "Resource") => {
  return {
    success: false,
    message: `${resource} not found`,
    statusCode: 404,
  };
};

module.exports = {
  successResponse,
  errorResponse,
  validationError,
  unauthorizedResponse,
  notFoundResponse,
};
