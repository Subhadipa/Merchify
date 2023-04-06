const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
      {
           patientName:{
                  type: String,
                  required: true
           },
           patientAge:{
                  type: Number,
                  required: true
           },
           reason:{
                  type: String,
                  required: true
           },
           unit:{
                  type: Number,
                  required: true
           }, 
            bloodgroup:
            {
                  type: String,
                  enum: ["A+","B+","AB+","O+","A-","B-","AB-","O-"],
                  trim: true,
                  required: true
            },
            hospitalName:{
              type:String,
              required:true
           },
            receiverName:{
                  type: String,
           },
          
      },

      { timestamps: true }

)

module.exports = mongoose.model('Patient Model', patientSchema)
