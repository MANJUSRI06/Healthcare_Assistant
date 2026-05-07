const Appointment = require('../models/Appointment');
const { analyzeSymptoms } = require('../utils/appointmentAI');

const getDoctorForDepartment = (dept) => {
  const doctors = {
    "General Medicine": "Dr. Priya Sharma",
    "Cardiology": "Dr. Arjun Mehta",
    "Dermatology": "Dr. Kavya Nair",
    "Ophthalmology": "Dr. Rahul Verma",
    "Dentistry": "Dr. Sneha Iyer",
    "Gastroenterology": "Dr. Nithin Rao",
    "Emergency Care": "Emergency Duty Doctor"
  };
  return doctors[dept] || "Dr. Assigned Doctor";
};

exports.analyze = async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) return res.status(400).json({ message: "Symptoms are required" });

    const analysis = analyzeSymptoms(symptoms);
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ message: "Error analyzing symptoms", error: error.message });
  }
};

exports.book = async (req, res) => {
  try {
    const { 
      userId, patientName, age, gender, phone, symptoms, 
      hospital, hospitalId, hospitalAddress, hospitalDistance,
      selectedDepartment, appointmentType, date, time,
      doctorId, doctorName, doctorSpecialization, doctorFee
    } = req.body;

    if (!patientName || !age || !phone || !symptoms || !date || !time || !hospital || !selectedDepartment) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const analysis = analyzeSymptoms(symptoms);
    
    // Generate IDs
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `APT-${dateStr}-${randomId}`;
    const tokenNumber = `TOKEN-${randomId}`;

    const newAppointment = new Appointment({
      userId: userId || null,
      patientName, age, gender, phone, symptoms, 
      hospital, hospitalId, hospitalAddress, hospitalDistance,
      selectedDepartment,
      suggestedDepartment: analysis.suggestedDepartment,
      doctorName, doctorId, doctorSpecialization, doctorFee,
      appointmentType, date, time,
      priorityLevel: analysis.priorityLevel,
      emergencyDetected: analysis.emergencyDetected,
      aiSummary: analysis.aiSummary,
      tokenNumber, appointmentId
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findOne({ appointmentId: req.params.id });
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appt);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(appts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.id },
      { status: 'Cancelled' },
      { new: true }
    );
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment cancelled successfully", appointment: appt });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
