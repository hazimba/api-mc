import express from "express";
import User from "../model/user.js";
import e from "express";

const router = express.Router();

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.post("/addUser", async (req, res) => {
  const user = new User(req.body);

  const { username, password, email, age, address } = user;
  console.log("Received user data:", user);
  console.log("password:", password, username, email, age, address);
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required." });
  }

  try {
    const newUser = new User({
      username,
      password,
      email,
      age,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});

export default router;
