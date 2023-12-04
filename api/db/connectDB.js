import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const port = process.env.POSTGRES_PORT_NUMBER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE_NAME;
const user = process.env.POSTGRES_USER_NAME;
const host = process.env.POSTGRES_HOST_NAME;

const connectionSettings = {
  port,
  password,
  database,
  user,
  host,
};

const pool = new Pool(connectionSettings);

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;