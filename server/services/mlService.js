const axios = require('axios');

// Dummy prediction logic to be replaced by actual ML model later
async function getPrediction(inputData) {
  
  try {
    // 1. Map React Form Data to Python Model Expected Format
    const pythonPayload = {
       age: inputData.age || 30,
       gender: inputData.gender === 'Male' ? 1 : 0, // Assuming 1=Male, 0=Female in your model
       bmi: inputData.bmi || 25,
       daily_steps: inputData.dailySteps || 5000,
       sleep_hours: inputData.sleepHours || 7,
       water_intake_l: inputData.waterIntake || 2,
       calories_consumed: 2000, 
       smoker: inputData.smoker === 'yes' ? 1 : 0,
       alcohol: 0,
       resting_hr: 75,
       systolic_bp: inputData.systolicBP || 120,
       diastolic_bp: 80, // Default if not in form
       cholesterol: inputData.cholesterol || 180,
       family_history: inputData.familyHistory === 'yes' ? 1 : 0
    };

    // 2. Make request to Python FastAPI Server
    console.log("Sending data to Python ML Server...");
    const response = await axios.post("http://127.0.0.1:8001/predict", pythonPayload);
    const pyData = response.data;
    console.log("ML Prediction Received:", pyData);

    // 3. Map Python Response back to Node.js schema
    return {
      riskLevel: pyData.risk, // "High" or "Low"
      riskPercentage: pyData.score, 
      possibleDiseaseCategory: pyData.risk === "High" ? "Lifestyle Risk Detected" : "General Health Good",
      suggestions: pyData.reasons && pyData.reasons.length > 0 ? pyData.reasons : ["Maintain your current healthy lifestyle.", "Keep up with regular checkups."]
    };

  } catch (error) {
    console.log("⚠️ Python ML Server is not running! Falling back to Rule-Based system.");
    
    // FALLBACK LOGIC IF PYTHON SERVER IS OFF:  const {
    bmi,
    sleepHours,
    dailySteps,
    waterIntake,
    stressLevel,
    systolicBP,
    cholesterol,
    glucose,
    smoker,
    familyHistory,
  } = inputData;

  let riskLevel = "Low";
  let riskPercentage = 15;
  let possibleDiseaseCategory = "General Health Good";
  let suggestions = [
    "Maintain your current healthy lifestyle.",
    "Keep up with regular checkups.",
  ];

  if (
    bmi > 30 ||
    systolicBP > 140 ||
    cholesterol > 240 ||
    glucose > 140 ||
    smoker === "yes" ||
    familyHistory === "yes"
  ) {
    riskLevel = "High";
    riskPercentage = Math.floor(Math.random() * (95 - 75 + 1)) + 75; // 75-95%
    
    if (glucose > 140) {
      possibleDiseaseCategory = "Diabetes Risk";
      suggestions = [
        "Consult a doctor immediately regarding your blood sugar levels.",
        "Reduce sugar and carbohydrate intake.",
        "Monitor your glucose levels daily.",
      ];
    } else if (systolicBP > 140 || cholesterol > 240 || smoker === "yes") {
      possibleDiseaseCategory = "Cardiovascular Disease Risk";
      suggestions = [
        "Consult a cardiologist.",
        "Stop smoking immediately.",
        "Adopt a heart-healthy diet rich in omega-3 and fiber.",
        "Engage in regular cardiovascular exercise under medical supervision.",
      ];
    } else if (bmi > 30) {
      possibleDiseaseCategory = "Obesity Related Risks";
      suggestions = [
        "Consult a dietitian for a structured weight loss plan.",
        "Gradually increase physical activity.",
        "Monitor caloric intake.",
      ];
    }
  } else if (
    (bmi >= 25 && bmi <= 30) ||
    sleepHours < 6 ||
    dailySteps < 4000 ||
    waterIntake < 2 ||
    stressLevel === "High"
  ) {
    riskLevel = "Medium";
    riskPercentage = Math.floor(Math.random() * (70 - 40 + 1)) + 40; // 40-70%
    
    if (stressLevel === "High" || sleepHours < 6) {
      possibleDiseaseCategory = "Stress & Sleep Disorder Risk";
      suggestions = [
        "Aim for 7-8 hours of sleep per night.",
        "Practice meditation or yoga to reduce stress.",
        "Limit screen time before bed.",
      ];
    } else if (dailySteps < 4000 || (bmi >= 25 && bmi <= 30)) {
      possibleDiseaseCategory = "Sedentary Lifestyle Risk";
      suggestions = [
        "Increase your daily steps to at least 8,000.",
        "Incorporate 30 minutes of moderate exercise into your routine.",
        "Choose healthier snack options.",
      ];
    } else if (waterIntake < 2) {
      possibleDiseaseCategory = "Dehydration Risk";
      suggestions = [
        "Drink at least 2.5-3 liters of water daily.",
        "Set reminders to drink water.",
        "Consume water-rich fruits and vegetables.",
      ];
    }
  }

    return {
      riskLevel,
      riskPercentage,
      possibleDiseaseCategory,
      suggestions,
    };
  }
}

module.exports = { getPrediction };
