const hospitalModel = require("../models/hospital");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const exportFunc = {
  registerHospital: async (req, res) => {
    try {
      let hospitalDetails = req.body;
      let saltRounds = 10;
      let hasedPassword = await bcrypt.hash(
        hospitalDetails.password,
        saltRounds
      );
      let hospitalData = await hospitalModel.create({
        ...hospitalDetails,
        password: hasedPassword,
      });
      return res
        .status(200)
        .send({
          status: true,
          message: "Hospital registered successfully!",
          data: hospitalData,
        });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  },
  loginHospital: async (req, res) => {
    try {
      let { email, password } = req.body;
     
      let hospitalDetails = await hospitalModel.findOne({ email });
      if (hospitalDetails) {
        let passwordCheck = await bcrypt.compare(
          password,
          hospitalDetails.password
        );
        if (passwordCheck) {
          let generatedToken = jwt.sign(
            { hospitalId: hospitalDetails._id },
            JWT_SECRET
          );
          return res.status(200).send({
            status: true,
            message: `${hospitalDetails.name} is logged in successfully!`,
            data: {
              hospitalId: hospitalDetails._id,
              token: generatedToken,
            },
          });
        } else {
          return res
            .status(400)
            .send({ status: false, message: "Invalid credentials!" });
        }
      } else {
        return res
          .status(400)
          .send({ status: false, message: "No hospital exist!" });
      }
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  },
  
 
};

module.exports = exportFunc;
