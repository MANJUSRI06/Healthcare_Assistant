const Prediction = require("../models/Prediction");
const { getPrediction } = require("../services/mlService");

const createPrediction = async (req, res) => {
  try {
    const inputData = req.body;

    const mlResult = await getPrediction(inputData);

    const prediction = new Prediction({
      userId: req.user._id,
      ...inputData,

      riskLevel: mlResult.riskLevel,
      riskPercentage: mlResult.riskPercentage,
      predictionLabel: mlResult.predictionLabel,
      modelSource: mlResult.modelSource || "Random Forest",
      targetLabel: mlResult.targetLabel || "disease_risk",
      possibleDiseaseCategory: mlResult.possibleDiseaseCategory,
      diseaseRisks: mlResult.diseaseRisks,
      detectedDiseaseRisks: mlResult.detectedDiseaseRisks,
      suggestions: mlResult.suggestions,
    });

    const createdPrediction = await prediction.save();

    res.status(201).json(createdPrediction);
  } catch (error) {
    console.error("Create Prediction Error:", error);
    res.status(500).json({
      message: "Failed to generate prediction",
      error: error.message,
    });
  }
};

const getPredictionHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(predictions);
  } catch (error) {
    console.error("Get Prediction History Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (
      prediction &&
      prediction.userId.toString() === req.user._id.toString()
    ) {
      res.json(prediction);
    } else {
      res.status(404).json({
        message: "Prediction not found or not authorized",
      });
    }
  } catch (error) {
    console.error("Get Prediction By ID Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (
      prediction &&
      prediction.userId.toString() === req.user._id.toString()
    ) {
      await Prediction.deleteOne({ _id: req.params.id });

      res.json({
        message: "Prediction removed",
      });
    } else {
      res.status(404).json({
        message: "Prediction not found or not authorized",
      });
    }
  } catch (error) {
    console.error("Delete Prediction Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPrediction,
  getPredictionHistory,
  getPredictionById,
  deletePrediction,
};