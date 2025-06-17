const userService = require("../services/userService");

// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// POST /api/users
exports.createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await userService.createUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
