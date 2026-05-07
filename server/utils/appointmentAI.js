exports.analyzeSymptoms = (symptoms) => {
  const text = symptoms.toLowerCase();
  
  let suggestedDepartment = "General Medicine";
  let priorityLevel = "Normal Checkup";
  let emergencyDetected = false;

  const emergencies = ["chest pain", "breathing difficulty", "severe pain", "unconscious", "accident", "bleeding"];
  const cardiology = ["heart pain", "high bp", "chest tightness", "blood pressure"];
  const general = ["fever", "cough", "cold", "body pain", "headache"];
  const dermatology = ["skin rash", "itching", "allergy", "pimples"];
  const ophthalmology = ["eye pain", "blurry vision", "eye redness"];
  const dentistry = ["tooth pain", "gum pain", "tooth ache"];
  const gastroenterology = ["stomach pain", "vomiting", "digestion problem", "loose motion"];

  if (emergencies.some(keyword => text.includes(keyword))) {
    suggestedDepartment = "Emergency Care";
    priorityLevel = "Urgent Care Recommended";
    emergencyDetected = true;
  } else if (cardiology.some(keyword => text.includes(keyword))) {
    suggestedDepartment = "Cardiology";
    priorityLevel = "Urgent Care Recommended";
  } else if (ophthalmology.some(keyword => text.includes(keyword))) {
    suggestedDepartment = "Ophthalmology";
    priorityLevel = "Soon Required";
  } else if (gastroenterology.some(keyword => text.includes(keyword))) {
    suggestedDepartment = "Gastroenterology";
    priorityLevel = "Soon Required";
  } else if (general.some(keyword => text.includes(keyword))) {
    suggestedDepartment = "General Medicine";
    priorityLevel = "Soon Required";
  } else if (dermatology.some(keyword => text.includes(keyword))) {
    suggestedDepartment = "Dermatology";
    priorityLevel = "Normal Checkup";
  } else if (dentistry.some(keyword => text.includes(keyword))) {
    suggestedDepartment = "Dentistry";
    priorityLevel = "Normal Checkup";
  }

  const aiSummary = `Patient reports symptoms: ${symptoms}. Suggested department: ${suggestedDepartment}. Priority: ${priorityLevel}.`;

  return { suggestedDepartment, priorityLevel, emergencyDetected, aiSummary };
};
