 
 

const { Sequelize,Op } = require('sequelize');
const Session = require('../models/sessionModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.viewSessions = async (req, res) => {
  try {
    // Fetch and return available sessions from the database
    const sessions = await Session.findAll({ where: { isApproved: true } });
    res.json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};

exports.bookSession = async (req, res) => {

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  // Split the Authorization header to get the token part
  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format.' });
  }
console.log('u am here');
  const token = tokenParts[1];

  
    const decoded = jwt.verify(token, config.jwtSecret);


    console.log('Decoded3 Token:', decoded); // Add this line for debugging


    try {
      // Get the student's ID from the decoded JWT token
      console.log('i am here1');
     // console.log('Decoded Token:', req.user);
     // const studentId = req.user.id;
      const studentId = decoded.id;
     console.log('Student Id:', studentId);

      //console.log('i am here2',studentId);
      // Parse session data from the request body
      const { deanId, startTime, endTime, topic, location,dayOfWeek } = req.body;
      console.log('i am here3');
      // Check if the session slot is available (not already booked)
      const isSlotAvailable = await Session.findOne({
        
        where: {
          deanId,
          startTime,
          endTime,
          isApproved: false, // Ensure the session is not already approved/booked
        },
      });
      console.log('i am here4');
      if (isSlotAvailable) {
        return res.status(400).json({ message: 'Session slot is not available' });
      }
  
      // Create a new session entry in the database
      await Session.create({
        deanId,
        studentId,
        startTime,
        endTime,
        topic,
        location,
        isApproved: false,
        dayOfWeek, // Set to false initially, as it's pending approval
      });
  
      res.status(201).json({ message: 'Session booked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Session booking failed' });
    }
  };
  


   

  exports.viewPendingSessions = async (req, res) => {
    try {
      // Fetch and return pending sessions for the dean
      const deanId = req.user.id; // Get dean's ID from the decoded JWT token
      const now = new Date();
  
      const pendingSessions = await Session.findAll({
        where: {
          deanId,
          isApproved: false,
          startTime: {
            [Op.gt]: now, // Filter for sessions with startTime greater than the current time
          },
        },
      });
  
      res.json({ pendingSessions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch pending sessions' });
    }
  };
  
  
exports.availabledeansessions = async (req, res) => {
  try {
    const availableSessions = await Session.findAll({
      where: {
        dayOfWeek: ['Thursday', 'Friday'], // Sessions on Thursday or Friday
        //startTime: '10:00:00', // Sessions at 10 AM
        startTime: {
          [Sequelize.Op.gt]: new Date(), //Use a valid date here, e.g., new Date() for the current date and time
        },
        isAvailable: true, // Only available sessions
      },
    });

    res.json({ availableSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch available dean sessions' });
  }
}