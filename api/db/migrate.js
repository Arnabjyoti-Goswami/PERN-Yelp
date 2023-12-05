// Make a table in the database if it doesn't exist, and fill it with 2 rows of data.

import db from './connectDB.js';

const checkTableExists = async () => {
  try {
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'restaurants'
      );
    `;

    const result = await db.query(tableExistsQuery);
    const tableExists = result.rows[0].exists;
    console.log('Table exists:', tableExists);
    return tableExists;

  } catch (error) {
    console.error('Error checking table existence:', error);
    return;
  }
}

const createTable = async () => {
  try {
    const query = 
    `
      CREATE TABLE restaurants (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    const result = await db.query(query);
    const tableCreated = (result.command === 'CREATE');
    console.log('Table creation query result', tableCreated);
    return tableCreated;

  } catch (error) {
    console.error('Error creating table:', error);
    return;
  }
}

const insertData = async () => {
  try {
    const query1 = 
    `
      INSERT INTO restaurants (name, location, price_range)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const params1 = ['Sushi Place', 'Tokyo', 3];
    const result1 = await db.query(query1, params1);

    const query2 = 
    `
      INSERT INTO restaurants (name, location, price_range)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const params2 = ['Pizza Place', 'New York', 2];
    const result2 = await db.query(query2, params2);

    if (result1.rows[0] && result2.rows[0]) {
      console.log('Data inserted successfully!');
    }

  } catch (error) {
    console.log('Error inserting data:', error);
  }
}

const mainFunc = async () => {
  const tableExists = await checkTableExists();
  if (tableExists) {
    console.log('Table already exists!');
    return;
  } 

  const tableCreated = await createTable();
  if (tableCreated) {
    console.log("Table 'restaurants' created successfully!");
  }
  
  insertData();

  return;
}

mainFunc();