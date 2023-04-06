const jwt = require("jsonwebtoken");
const JWT_RECEIVER_SECRET = process.env.JWT_RECEIVER_SECRET;
module.exports.authenticate = async (req, res, next) => {
  try {
    let header = req.headers["authorization"];
    if (!header) {
      return res
        .status(401)
        .send({ status: false, message: "Mandatory header is missing!" });
    } else {
      let decodedToken = jwt.verify(header, JWT_RECEIVER_SECRET);
      if (decodedToken) {
        req.receiverId = decodedToken.receiverId;
        next();
      } else {
        return res
          .status(401)
          .send({ status: false, message: "The token is invalid!" });
      }
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
