const hospitals = require('../data/hospitalData');

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;  
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return Number(d.toFixed(1));
};

exports.getAllHospitals = (req, res) => {
  res.status(200).json(hospitals);
};

exports.getNearbyHospitals = (req, res) => {
  const { latitude, longitude, suggestedDepartment, priorityLevel } = req.body;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required" });
  }

  const isUrgent = priorityLevel === "Urgent Care Recommended";

  let results = hospitals.map(hospital => {
    const distance = calculateDistance(latitude, longitude, hospital.latitude, hospital.longitude);
    return { ...hospital, distance };
  });

  // Sort logic: 
  // 1. If urgent, emergencyAvailable=true goes first
  // 2. Department match
  // 3. Distance
  results.sort((a, b) => {
    if (isUrgent) {
      if (a.emergencyAvailable && !b.emergencyAvailable) return -1;
      if (!a.emergencyAvailable && b.emergencyAvailable) return 1;
    }
    
    const aHasDept = suggestedDepartment && a.departments.includes(suggestedDepartment);
    const bHasDept = suggestedDepartment && b.departments.includes(suggestedDepartment);
    
    if (aHasDept && !bHasDept) return -1;
    if (!aHasDept && bHasDept) return 1;

    return a.distance - b.distance;
  });

  res.status(200).json(results);
};
