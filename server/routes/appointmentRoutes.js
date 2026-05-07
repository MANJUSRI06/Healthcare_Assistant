const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/analyze', appointmentController.analyze);
router.post('/book', appointmentController.book);
router.get('/:id', appointmentController.getAppointment);
router.get('/user/:userId', appointmentController.getUserAppointments);
router.patch('/:id/cancel', appointmentController.cancelAppointment);

module.exports = router;
