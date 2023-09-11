const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const Session = require('../models/sessionModel');


router.use(jwtMiddleware);




 // Book a session
router.post('/book', sessionController.bookSession);






router.get('/availabledeansessions', sessionController.availabledeansessions);




// Get available sessions
router.get('/sessions', sessionController.viewSessions);

 

// Get pending sessions for dean
router.get('/pending-sessions', sessionController.viewPendingSessions);

module.exports = router;
