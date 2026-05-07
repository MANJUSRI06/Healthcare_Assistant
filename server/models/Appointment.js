const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  symptoms: { type: String, required: true },
  hospital: { type: String, required: true },
  hospitalId: String,
  hospitalAddress: String,
  hospitalDistance: Number,
  selectedDepartment: { type: String, required: true },
  suggestedDepartment: String,
  doctorName: String,
  doctorId: String,
  doctorSpecialization: String,
  doctorFee: Number,
  appointmentType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  priorityLevel: String,
  emergencyDetected: { type: Boolean, default: false },
  aiSummary: String,
  tokenNumber: String,
  appointmentId: { type: String, unique: true },
  status: { type: String, default: 'Booked' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
