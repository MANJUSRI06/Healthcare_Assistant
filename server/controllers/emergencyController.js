const Emergency = require('../models/Emergency');
const drivers = require('../services/driverDummyData');

exports.createEmergencyAlert = async (req, res) => {
  try {
    const { userId, name, phone, latitude, longitude, timestamp, emergencyType, status } = req.body;

    const availableDrivers = drivers.filter(d => d.availability);
    const assignedDriver = availableDrivers.length > 0 ? availableDrivers[Math.floor(Math.random() * availableDrivers.length)] : null;

    const newEmergency = new Emergency({
      userId: userId || null,
      name: name || 'Unknown User',
      phone: phone || '',
      latitude,
      longitude,
      timestamp: timestamp || new Date(),
      emergencyType: emergencyType || 'Medical Emergency',
      status: status || 'Assigned',
      assignedDriver: assignedDriver ? {
        driverId: assignedDriver.driverId,
        driverName: assignedDriver.driverName,
        phone: assignedDriver.phone,
        vehicleNumber: assignedDriver.vehicleNumber
      } : null
    });

    await newEmergency.save();

    res.status(201).json({
      success: true,
      message: 'Emergency alert sent successfully',
      emergencyId: newEmergency._id,
      assignedDriver
    });
  } catch (error) {
    console.error('Emergency alert error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
