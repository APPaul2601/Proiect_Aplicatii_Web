// ============================================
// RESPONSES - Standard Response Format
// ============================================
// Standardized response wrapper functions
// Ensures consistent API response structure

// ===== SUCCESS RESPONSE =====
// Returns standardized success response
// Usage: res.json(successResponse(data, message))
const successResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

// ===== ERROR RESPONSE =====
// Returns standardized error response
// Usage: res.status(400).json(errorResponse(error, statusCode))
const errorResponse = (error, statusCode = 400) => {
  return {
    success: false,
    message: error || "An error occurred",
    statusCode,
  };
};

// ===== VALIDATION ERROR RESPONSE =====
// Returns validation-specific error response
const validationError = (errors) => {
  return {
    success: false,
    message: "Validation failed",
    errors: Array.isArray(errors) ? errors : [errors],
  };
};

// ===== UNAUTHORIZED RESPONSE =====
// Returns 401 unauthorized response
const unauthorizedResponse = (message = "Unauthorized") => {
  return {
    success: false,
    message,
    statusCode: 401,
  };
};

// ===== NOT FOUND RESPONSE =====
// Returns 404 not found response
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
