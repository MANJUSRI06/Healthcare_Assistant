const express = require("express");
const { getUserProfile, updateUserProfile, updateLanguage } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.patch("/language", protect, updateLanguage);

module.exports = router;
