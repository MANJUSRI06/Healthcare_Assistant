const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getAllDoctors);
router.get('/search', doctorController.getDoctorsByHospitalAndDept);
router.get('/department/:department', doctorController.getDoctorsByDepartment);
router.get('/:doctorId', doctorController.getDoctorById);

module.exports = router;
