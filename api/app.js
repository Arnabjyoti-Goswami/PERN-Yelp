import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT_NUMBER;

app.listen(port, () => console.log(`Server is listening to port ${port}!`));
app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
  try {
  const frontEndUrl = process.env.FRONT_END_URL;
  res.setHeader('Access-Control-Allow-Origin', frontEndUrl);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow only JSON content type
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).json({});
  }

  } catch (error) {
    next(error);
  }
  
  next();
});

import restauRouter from './routes/restaurants.routes.js';
app.use('/api/v1', restauRouter);

// Error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error!';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});