// middleware/roleMiddleware.js
module.exports = function (roles = []) {
  // roles can be a single role string or an array of roles
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};
