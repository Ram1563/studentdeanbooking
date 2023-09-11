const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

 

exports.registerUser = async (req, res) => {
  try {
    const { universityId, password, role } = req.body;
    // Ensure you hash the password securely before storing it in the database
    // Replace this with proper password hashing, e.g., bcrypt
    const hashedPassword = password; // Replace with actual hashing

    const user = await User.create({ universityId, password: hashedPassword, role });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: '1h',
    });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};







exports.loginUser = async (req, res) => {
  try {
    const { universityId, password } = req.body;
    const user = await User.findOne({ where: { universityId, password } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: '1h',
  });
}


exports.loginDean = async (req, res) => {
    try {
      const { universityId, password } = req.body;
      // Verify dean's credentials
      const dean = await User.findOne({ where: { universityId, password } });
  
      if (!dean) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token for dean
      const token = jwt.sign({ id: dean.id, role: dean.role }, config.jwtSecret, {
        expiresIn: '1h',
      });
  
      res.json({ dean, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
  };
  
  exports.registerDean = async (req, res) => {
    try {
      const { universityId, password } = req.body;
      // Ensure you hash the password securely before storing it in the database
      // Replace this with proper password hashing, e.g., bcrypt
      const hashedPassword = password; // Replace with actual hashing
  
      const dean = await User.create({ universityId, password: hashedPassword, role: 'dean' });
  
      // Generate JWT token
      const token = generateToken(dean);
  
      res.status(201).json({ dean, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
  };
  