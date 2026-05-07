const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.age = req.body.age || user.age;
      user.gender = req.body.gender || user.gender;
      user.height = req.body.height || user.height;
      user.weight = req.body.weight || user.weight;
      if (req.body.bloodGroup !== undefined) {
        user.bloodGroup = req.body.bloodGroup;
      }
      if (req.body.profileImage !== undefined) {
        user.profileImage = req.body.profileImage;
      }

      if (req.body.height || req.body.weight) {
        user.bmi = (user.weight / ((user.height / 100) * (user.height / 100))).toFixed(2);
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        gender: updatedUser.gender,
        height: updatedUser.height,
        weight: updatedUser.weight,
        bmi: updatedUser.bmi,
        bloodGroup: updatedUser.bloodGroup,
        profileImage: updatedUser.profileImage,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateLanguage = async (req, res) => {
  try {
    const { language } = req.body;
    
    if (!["en", "ta", "hi", "te", "ml", "kn"].includes(language)) {
      return res.status(400).json({ message: "Invalid language code" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.languagePreference = language;
    await user.save();

    res.json({
      success: true,
      message: "Language preference updated",
      language: user.languagePreference
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile, updateLanguage };
