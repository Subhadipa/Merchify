const express = require('express');
const router = express.Router();

const hospitalController = require("../controllers/hospitalController")
const BloodBankController = require("../controllers/bloodBankController")
const receiverController = require("../controllers/receiverController")
const patientController=require("../controllers/patientController")
const hospitalAuthentication=require("../middleware/hospitalAuthentication")
const receiverAuthentication=require("../middleware/receiverAuthentication")
router.post('/register-hospital',hospitalController.registerHospital);
router.post('/login-hospital',hospitalController.loginHospital);

router.get('/get-all-blood-info',BloodBankController.getAllBloodInfo);
router.post('/create-blood-info',hospitalAuthentication.authenticate,BloodBankController.createBloodInfo);
router.put('/update-blood-info/:bloodBankId',hospitalAuthentication.authenticate,BloodBankController.updateBloodInfo);
router.delete('/delete-blood-info/:bloodBankId',hospitalAuthentication.authenticate,BloodBankController.deleteBloodInfo);
router.get('/get-blood-info',hospitalAuthentication.authenticate,BloodBankController.getBloodInfo);

router.post('/register-receiver',receiverController.registerReceiver);
router.post('/login-receiver',receiverController.loginReceiver);

router.post("/create-request",receiverAuthentication.authenticate,patientController.createRequest)
router.get("/get-all-patient-details",hospitalAuthentication.authenticate,BloodBankController.getAllPatientDetails)
module.exports = router;