const doctors = [
  {
    doctorId: "DOC-001",
    name: "Dr. Priya Sharma",
    specialization: "General Medicine",
    qualification: "MBBS, MD",
    experience: "8 years",
    fee: 500,
    languages: ["English", "Hindi", "Tamil"],
    hospital: "City Care Hospital",
    rating: 4.7,
    totalReviews: 124,
    availableToday: true,
    availableSlots: ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM"],
    image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=0D8ABC&color=fff",
    about: "Dr. Priya Sharma is a highly experienced general physician with a focus on holistic healthcare and preventive medicine.",
    bestFor: "Fever, Cold, Body Pain, General Checkup",
    reviews: [
      { patientName: "Rahul", rating: 5, text: "Doctor explained everything clearly and was very patient.", visitReason: "Fever", date: "2024-05-01" },
      { patientName: "Anjali", rating: 4, text: "Good consultation and short waiting time.", visitReason: "General Checkup", date: "2024-04-28" },
      { patientName: "Vikas", rating: 5, text: "Helpful advice and friendly approach.", visitReason: "Body Pain", date: "2024-04-15" }
    ]
  },
  {
    doctorId: "DOC-002",
    name: "Dr. Karthik Raman",
    specialization: "General Medicine",
    qualification: "MBBS",
    experience: "6 years",
    fee: 400,
    languages: ["English", "Tamil", "Malayalam"],
    hospital: "MedLife Multispeciality Hospital",
    rating: 4.5,
    totalReviews: 89,
    availableToday: true,
    availableSlots: ["10:30 AM", "01:00 PM", "04:00 PM", "06:00 PM"],
    image: "https://ui-avatars.com/api/?name=Karthik+Raman&background=0D8ABC&color=fff",
    about: "Dr. Karthik is known for his accurate diagnoses and friendly demeanor.",
    bestFor: "Cough, Infections, General Wellness",
    reviews: [
      { patientName: "Suresh", rating: 4, text: "Very knowledgeable doctor.", visitReason: "Cough", date: "2024-05-02" },
      { patientName: "Divya", rating: 5, text: "Listens carefully to all issues.", visitReason: "Fever", date: "2024-04-20" }
    ]
  },
  {
    doctorId: "DOC-003",
    name: "Dr. Arjun Mehta",
    specialization: "Cardiology",
    qualification: "MD Cardiology",
    experience: "12 years",
    fee: 1000,
    languages: ["English", "Hindi", "Gujarati"],
    hospital: "City Care Hospital",
    rating: 4.8,
    totalReviews: 215,
    availableToday: true,
    availableSlots: ["09:00 AM", "11:00 AM", "03:00 PM"],
    image: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=0D8ABC&color=fff",
    about: "Dr. Arjun Mehta is a senior cardiologist specializing in non-invasive cardiology and preventive heart care.",
    bestFor: "Chest Pain, High BP, Heart Palpitations",
    reviews: [
      { patientName: "Manoj", rating: 5, text: "Saved my life, brilliant doctor.", visitReason: "Chest Pain", date: "2024-04-10" },
      { patientName: "Pooja", rating: 5, text: "Very experienced and calm.", visitReason: "High BP", date: "2024-03-25" }
    ]
  },
  {
    doctorId: "DOC-004",
    name: "Dr. Kavya Nair",
    specialization: "Dermatology",
    qualification: "MD Dermatology",
    experience: "7 years",
    fee: 600,
    languages: ["English", "Malayalam", "Hindi"],
    hospital: "Green Valley Clinic",
    rating: 4.7,
    totalReviews: 156,
    availableToday: true,
    availableSlots: ["04:00 PM", "05:00 PM", "06:30 PM"],
    image: "https://ui-avatars.com/api/?name=Kavya+Nair&background=0D8ABC&color=fff",
    about: "Dr. Kavya offers modern treatments for all skin, hair, and nail problems.",
    bestFor: "Skin Rash, Acne, Hair Fall",
    reviews: [
      { patientName: "Sneha", rating: 5, text: "My acne cleared up in 2 weeks!", visitReason: "Acne", date: "2024-05-05" },
      { patientName: "Rahul", rating: 4, text: "Good treatment for hair fall.", visitReason: "Hair Fall", date: "2024-04-12" }
    ]
  },
  {
    doctorId: "DOC-005",
    name: "Emergency Duty Doctor",
    specialization: "Emergency Care",
    qualification: "MBBS, MEM",
    experience: "5+ years",
    fee: 800,
    languages: ["English", "Local Languages"],
    hospital: "Apollo Emergency Care",
    rating: 4.9,
    totalReviews: 320,
    availableToday: true,
    availableSlots: ["IMMEDIATE", "09:00 AM", "10:00 AM", "11:00 AM"],
    image: "https://ui-avatars.com/api/?name=Emergency+Care&background=dc2626&color=fff",
    about: "24/7 Emergency response team ready to handle all urgent medical situations.",
    bestFor: "Accidents, Severe Pain, Trauma, Unconsciousness",
    reviews: [
      { patientName: "Karan", rating: 5, text: "Very fast response, handled emergency well.", visitReason: "Accident", date: "2024-05-01" },
      { patientName: "Anita", rating: 5, text: "Lifesavers.", visitReason: "Severe breathing issue", date: "2024-04-18" }
    ]
  }
];

module.exports = doctors;
