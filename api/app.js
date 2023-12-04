import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT_NUMBER;

app.listen(port, () => console.log(`Server is listening to port ${port}!`));
app.use(express.json());

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