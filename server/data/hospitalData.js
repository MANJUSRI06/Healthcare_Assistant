const hospitals = [
  {
    hospitalId: "HOSP-001",
    name: "City Care Hospital",
    type: "Multispeciality",
    address: "123 Main Street, Central District",
    latitude: 11.6643,
    longitude: 78.1460, // Base coordinates (can be adjusted to test near/far)
    rating: 4.6,
    openStatus: "Open 24/7",
    emergencyAvailable: true,
    departments: ["General Medicine", "Cardiology", "Emergency Care"],
    phone: "1800-123-4567"
  },
  {
    hospitalId: "HOSP-002",
    name: "MedLife Multispeciality Hospital",
    type: "Multispeciality",
    address: "45 West Avenue, North Zone",
    latitude: 11.6750,
    longitude: 78.1500,
    rating: 4.4,
    openStatus: "Open 8 AM - 10 PM",
    emergencyAvailable: false,
    departments: ["General Medicine", "Pediatrics", "Orthopedics"],
    phone: "1800-987-6543"
  },
  {
    hospitalId: "HOSP-003",
    name: "Green Valley Clinic",
    type: "Clinic",
    address: "78 Park Road, East Side",
    latitude: 11.6500,
    longitude: 78.1400,
    rating: 4.8,
    openStatus: "Open 9 AM - 8 PM",
    emergencyAvailable: false,
    departments: ["Dermatology", "Dentistry"],
    phone: "1800-111-2222"
  },
  {
    hospitalId: "HOSP-004",
    name: "Apollo Emergency Care",
    type: "Emergency Care",
    address: "Ring Road Junction",
    latitude: 11.6800,
    longitude: 78.1600,
    rating: 4.9,
    openStatus: "Open 24/7",
    emergencyAvailable: true,
    departments: ["Emergency Care", "Trauma", "Cardiology"],
    phone: "108"
  },
  {
    hospitalId: "HOSP-005",
    name: "LifeLine Medical Center",
    type: "Multispeciality",
    address: "South Cross Street",
    latitude: 11.6400,
    longitude: 78.1300,
    rating: 4.5,
    openStatus: "Open 24/7",
    emergencyAvailable: true,
    departments: ["General Medicine", "Gastroenterology", "Ophthalmology"],
    phone: "1800-555-6666"
  },
  {
    hospitalId: "HOSP-006",
    name: "HopeWell Hospital",
    type: "Clinic",
    address: "Lakeview Layout",
    latitude: 11.6700,
    longitude: 78.1350,
    rating: 4.3,
    openStatus: "Open 10 AM - 6 PM",
    emergencyAvailable: false,
    departments: ["General Medicine", "ENT"],
    phone: "1800-777-8888"
  }
];

module.exports = hospitals;
