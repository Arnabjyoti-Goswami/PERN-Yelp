-- psql CLI commands:
-- for help    \?
-- for connecting to a different db    \c db_name
-- for creating a new db    CREATE DATABASE db_name;
-- for dropping an existing db (must be connected to a different db)     DROP DATABASE practice;
-- list all tables in the db     \d
-- see info about a specific table     \d table_name

CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale BOOLEAN
);

ALTER TABLE products
ADD COLUMN featured BOOLEAN;

ALTER TABLE products
DROP COLUMN featured;

DROP TABLE products;

