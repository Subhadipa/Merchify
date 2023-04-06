const patientModel = require("../models/patient");
const receiverModel = require("../models/receiver");

const exportFunc = {

     createRequest:async(req,res)=>{
        try{
        let patientData=req.body
        let receiverDetails=await receiverModel.findById(req.receiverId)
        if(receiverDetails){
        let patientDetails=await patientModel.create({...patientData,receiverName:receiverDetails.name})
        return res
            .status(200)
            .send({
              status: true,
              message: "Blood data created successfully!",
              data: patientDetails,
            });
        }else{
          return res.status(400).send({ status: false, message: "Receiver doesn't exist!" });
        }
    }catch(error){
            return res.status(500).send({ status: false, message: error.message });
        }


     }







}
module.exports = exportFunc;