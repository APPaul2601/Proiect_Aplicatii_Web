// ============================================
// AUTH MIDDLEWARE - JWT Token Verification
// ============================================
// Checks if request has valid JWT token
// Used on protected routes (need login)
// Extracts user ID from token for later use

const jwt = require("jsonwebtoken");

// ===== VERIFY JWT TOKEN =====
// Called before protected endpoints
// Pattern: authMiddleware in route definition
module.exports = function (req, res, next) {
  // STEP 1: Extract token from Authorization header
  // Format: "Authorization: Bearer <token>"
  // Split by space, take second part (token)
  const token = req.header("Authorization")?.split(" ")[1];

  // STEP 2: Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Nu esti logat" }); // No token = not logged in
  }

  try {
    // STEP 3: Verify token is valid and not expired
    // Checks signature matches process.env.JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // STEP 4: Extract user ID from token and attach to request
    // Now req.user = { id: userId }
    // Controllers can access: req.user.id
    req.user = { id: decoded.id };

    // STEP 5: Continue to next middleware/controller
    next(); // Allow request to proceed
  } catch (err) {
    // Token is invalid or expired
    res.status(401).json({ error: "Token invalid" });
  }
};
