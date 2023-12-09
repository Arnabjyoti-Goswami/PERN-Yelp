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
    return tableExists;

  } catch (error) {
    console.log('Error checking restaurants table existence:', error);
    return;
  }
};

const checkReviewsTableExists = async () => {
  try {
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'reviews'
      );
    `;

    const result = await db.query(tableExistsQuery);
    const tableExists = result.rows[0].exists;
    return tableExists;
  } catch (error) {
    console.log('Error checking reviews table existence:', error);
    return;
  }
};

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
    return tableCreated;

  } catch (error) {
    console.log('Error creating restaurants table:', error);
    return;
  }
}

const createReviewsTable = async () => {
  try {
    const query = 
    `
      CREATE TABLE reviews (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
        name VARCHAR(50) NOT NULL,
        review TEXT NOT NULL,
        rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    const result = await db.query(query);
    const tableCreated = (result.command === 'CREATE');
    return tableCreated;

  } catch (error) {
    console.log('Error creating reviews table:', error);
    return;
  }
};

const insertData = async () => {
  try {
    const query = 
    `
      INSERT INTO restaurants 
        (name, location, price_range)
      VALUES 
        ($1, $2, $3), 
        ($4, $5, $6)
      RETURNING *;
    `;
    const params1 = ['Sushi Place', 'Tokyo', 3];
    const params2 = ['Burger King', 'New York', 1];
    const params = [...params1, ...params2];
    const result = await db.query(query, params);
    if (result.rows[0]) {
      console.log('Data inserted successfully!');
    }

  } catch (error) {
    console.log('Error inserting data:', error);
  }
}

const mainFunc = async () => {
  const tableExists = await checkTableExists();
  if (tableExists) {
    console.log('Restaurants table already exists!');
    return;
  } 

  const tableCreated = await createTable();
  if (tableCreated) {
    console.log("Table 'restaurants' created successfully!");
  }
  
  await insertData();

  const reviewsTableExists = await checkReviewsTableExists();
  if (reviewsTableExists) {
    console.log('Reviews table already exists!');
    return;
  }

  const reviewsTableCreated = await createReviewsTable();
  if (reviewsTableCreated) {
    console.log("Table 'reviews' created successfully!");
  }

  return;
}

mainFunc();