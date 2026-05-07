const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: String,
  phone: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  emergencyType: String,
  status: {
    type: String,
    default: 'Pending'
  },
  assignedDriver: {
    driverId: String,
    driverName: String,
    phone: String,
    vehicleNumber: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Emergency', EmergencySchema);
