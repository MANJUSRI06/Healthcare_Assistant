const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bmi: { type: Number, required: true },
    dailySteps: { type: Number, required: true },
    sleepHours: { type: Number, required: true },
    waterIntake: { type: Number, required: true },
    caloriesConsumed: { type: Number, required: true },
    stressLevel: { type: String, required: true },
    restingHeartRate: { type: Number, required: true },
    systolicBP: { type: Number, required: true },
    diastolicBP: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    glucose: { type: Number, required: true },
    familyHistory: { type: String, required: true },
    smoker: { type: String, required: true },
    alcohol: { type: String, required: true },
    exerciseFrequency: { type: String, required: true },
    dietType: { type: String, required: true },
    riskLevel: { type: String },
    riskPercentage: { type: Number },
    possibleDiseaseCategory: { type: String },
    suggestions: [{ type: String }],
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
