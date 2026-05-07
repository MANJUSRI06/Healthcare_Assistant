const doctors = require('../data/doctorData');

exports.getAllDoctors = (req, res) => {
  res.status(200).json(doctors);
};

exports.getDoctorsByDepartment = (req, res) => {
  const { department } = req.params;
  const filtered = doctors.filter(doc => doc.specialization.toLowerCase() === department.toLowerCase() || doc.specialization === 'Emergency Care' && department === 'Emergency Care');
  res.status(200).json(filtered);
};

exports.getDoctorsByHospitalAndDept = (req, res) => {
  const { hospitalName, department } = req.query;
  let filtered = doctors;
  
  if (hospitalName) {
    filtered = filtered.filter(doc => doc.hospital === hospitalName);
  }
  
  if (department) {
    filtered = filtered.filter(doc => doc.specialization.toLowerCase() === department.toLowerCase());
  }

  // If no doctors found for specific hospital, return department doctors as fallback
  if (filtered.length === 0 && department) {
    filtered = doctors.filter(doc => doc.specialization.toLowerCase() === department.toLowerCase());
  }

  res.status(200).json(filtered);
};

exports.getDoctorById = (req, res) => {
  const doctor = doctors.find(doc => doc.doctorId === req.params.doctorId);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.status(200).json(doctor);
};
