const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const config = require('./config');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('./middleware/jwtMiddleware'); 




const app = express();

app.use(bodyParser.json());

// Routes
 
app.use('/user',  userRoutes);
app.use('/session',  sessionRoutes);

// Error handling middleware (should come after routes)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized access.' });
  } else {
    next(err);
  }
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database is connected.');
}).catch(err => {
  console.error('Database connection error:', err);
});

const port = config.server.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
