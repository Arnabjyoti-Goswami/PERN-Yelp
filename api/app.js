import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT_NUMBER;

app.listen(port, () => console.log(`Server is listening to port ${port}!`));