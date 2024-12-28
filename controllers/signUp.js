const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  console.log("signup");
  try {
    const { name, email, password, organizationName } = req.body;

    // Validate input
    if (!name || !email || !password || !organizationName) {
      return res.status(400).json({
        error: "Name, email, password, and organizationName are required.",
      });
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Find or create the organization
    let organization = await Organization.findOne({ name: organizationName });
    if (!organization) {
      organization = new Organization({ name: organizationName });
      await organization.save();
    }

    // Check if this is the first user in the organization
    const existingOrgUsers = await User.find({
      organization: organization._id,
    });
    const role = existingOrgUsers.length === 0 ? "admin" : "viewer";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      organization: organization._id,
      role,
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        organization: organization.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
