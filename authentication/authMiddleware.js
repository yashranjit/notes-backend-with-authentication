const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function auth(req, res, next) {
  const token = req.headers.authorization;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.json({
      message: "Invalid credentials",
    });
  }
}

module.exports = {
  auth,
};
