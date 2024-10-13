const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { models } = require("../config/database");
const { User } = require("../models/index");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = await User.save().then((result));
    // const user = {username, password: hashedPassword};
    // user.save().then(result=>result);

    const user = new User({ username, password: hashedPassword });
    await user.save();  // Save the user to MongoDB

    res.status(201).json({ message: "User created successfully" });
    return user;
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userData.id, {
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
