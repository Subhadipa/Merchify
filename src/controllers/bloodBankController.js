const hospitalModel = require("../models/hospital");
const bloodBankModel=require("../models/bloodBank")
const patientModel = require("../models/patient");


const exportFunc = {
 
  getAllBloodInfo:async(req,res)=>{
    try{
    let bloodBankDetails=await bloodBankModel.find({status:"Available",isDeleted:false})
    if(bloodBankDetails){
      return res
            .status(200)
            .send({
              status: true,
              message: "Blood data fetched successfully!",
              data: bloodBankDetails,
            });
    }else{
      return res.status(400).send({ status: false, message:"No details found!" });
    }
  }catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }

  },
  createBloodInfo:async(req,res)=>{
    try{
        let bloodBankDetails=req.body
        let hospitalDetails=await hospitalModel.findById(req.hospitalId);
        if(hospitalDetails){
          let bloodBankData = await bloodBankModel.create({...bloodBankDetails,hospitalname:hospitalDetails.name});
          return res
            .status(200)
            .send({
              status: true,
              message: "Blood data created successfully!",
              data: bloodBankData,
            });
        }else{
          return res.status(400).send({ status: false, message: "Hospital doesn't exist!" });
        }
        
    }catch (error) {
        return res.status(500).send({ status: false, message: error.message });
      }
   
  },
  updateBloodInfo:async(req,res)=>{
    try{
      let bloodBankDetails=req.body
      let bloodBankId=req.params.bloodBankId
      let hospitalDetails=await hospitalModel.findById(req.hospitalId);
      let bloodBankData=await bloodBankModel.findById(bloodBankId);
      if(hospitalDetails.name===bloodBankData.hospitalname){
        let updatedbloodBankData = await bloodBankModel.findOneAndUpdate({_id:bloodBankId},bloodBankDetails,{ new: true })
        return res
          .status(200)
          .send({
            status: true,
            message: "Blood data updated successfully!",
            data: updatedbloodBankData,
          });
      }else{
        return res.status(400).send({ status: false, message: "You are not authorize to update details!" });
      }
      
  }catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
 

  },
  deleteBloodInfo:async(req,res)=>{
    try{
      let bloodBankId=req.params.bloodBankId
      let hospitalDetails=await hospitalModel.findById(req.hospitalId);
      let bloodBankData=await bloodBankModel.findById(bloodBankId);
      if(hospitalDetails.name===bloodBankData.hospitalname){
        let updatedbloodBankData = await bloodBankModel.findOneAndUpdate({_id:bloodBankId},{isDeleted:true},{ new: true })
        return res
          .status(200)
          .send({
            status: true,
            message: "Blood data deleted successfully!",
            data: updatedbloodBankData,
          });
      }else{
        return res.status(400).send({ status: false, message: "You are not authorize to delete details!" });
      }
      
  }catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
 
    
  },
  getBloodInfo:async(req,res)=>{
    try{
      let hospitalDetails=await hospitalModel.findById(req.hospitalId);

      let fetchedbloodBankData = await bloodBankModel.find({hospitalname:hospitalDetails.name,isDeleted:false})
        return res
          .status(200)
          .send({
            status: true,
            message: "Blood data fetched successfully!",
            data: fetchedbloodBankData,
          });
    }catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  },
  getAllPatientDetails:async(req,res)=>{
    try{
     
      let hospitalDetails=await hospitalModel.findById(req.hospitalId);
      let fetchedPatientData = await patientModel.find({hospitalName:hospitalDetails.name})
      return res
          .status(200)
          .send({
            status: true,
            message: "Blood data fetched successfully!",
            data: fetchedPatientData,
          });
        
    }catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }

  }
};

module.exports = exportFunc;
