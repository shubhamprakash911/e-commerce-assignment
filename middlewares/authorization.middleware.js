const authorize = (permittedRole) => {
  return (req, res, next) => {
    try {
      if (permittedRole.includes(req.body.role)) {
        next();
      } else {
        throw new Error("not authorized");
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
