const receiverModel = require("../models/receiver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_RECEIVER_SECRET = process.env.JWT_RECEIVER_SECRET;
const exportFunc = {
  registerReceiver: async (req, res) => {
    try {
      let receiverDetails = req.body;
      let saltRounds = 10;
      let hasedPassword = await bcrypt.hash(
        receiverDetails.password,
        saltRounds
      );
      let receiverData = await receiverModel.create({
        ...receiverDetails,
        password: hasedPassword,
      });
      return res
        .status(200)
        .send({
          status: true,
          message: "receiver registered successfully!",
          data: receiverData,
        });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  },
  loginReceiver: async (req, res) => {
    try {
      let { email, password } = req.body;
     
      let receiverDetails = await receiverModel.findOne({ email });
      if (receiverDetails) {
        let passwordCheck = await bcrypt.compare(
          password,
          receiverDetails.password
        );
        if (passwordCheck) {
          let generatedToken = jwt.sign(
            { receiverId: receiverDetails._id },
            JWT_RECEIVER_SECRET
          );
          return res.status(200).send({
            status: true,
            message: `${receiverDetails.name} is logged in successfully!`,
            data: {
              receiverId: receiverDetails._id,
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
          .send({ status: false, message: "No receiver exist!" });
      }
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  },
  
 
};

module.exports = exportFunc;
