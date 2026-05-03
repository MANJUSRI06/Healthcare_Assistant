const express = require("express");
const {
  createPrediction,
  getPredictionHistory,
  getPredictionById,
  deletePrediction,
} = require("../controllers/predictionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(protect, createPrediction);
router.route("/history").get(protect, getPredictionHistory);
router.route("/:id").get(protect, getPredictionById).delete(protect, deletePrediction);

module.exports = router;
