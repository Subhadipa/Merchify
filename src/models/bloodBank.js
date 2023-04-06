const mongoose = require('mongoose')
const objectId=mongoose.Schema.Types.ObjectId
const bloodBankSchema = new mongoose.Schema(
      {
            hospitalname:{
                  type: String
            },
            bloodgroup:
            {
                  type: String,
                  enum: ["A+","B+","AB+","O+","A-","B-","AB-","O-"],
                  trim: true,
                  required: true
            },
            bloodInfo:{
                  type: String,
                  required: true   
            },
            status:
            {
                  type: String,
                  enum: ["Available", "Not available"],
                  trim: true,
                  required: true
            },
            isDeleted:
            {
                  type: Boolean,
                  default: false
            }
           
             
      },

      { timestamps: true }

)

module.exports = mongoose.model('Blood Bank Model', bloodBankSchema)
