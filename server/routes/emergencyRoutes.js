const express = require('express');
const router = express.Router();
const { createEmergencyAlert } = require('../controllers/emergencyController');

router.post('/alert', createEmergencyAlert);

module.exports = router;
