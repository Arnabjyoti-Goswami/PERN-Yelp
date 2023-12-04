-- psql CLI commands:
-- keep pressing enter on all the default settings that you setup while entering all the default settings in the installation of postgresql on your system. In the end, enter the password that you set for the super user (postgres) while installing postgresql on your system.
-- for listing all the available databases    
-- \l
-- for help    
-- \?
-- for connecting to a different db   
-- \c db_name
-- for creating a new db 
--  CREATE DATABASE db_name;
-- for dropping an existing db (must connect first to a different db for dropping the current db) 
-- DROP DATABASE practice;
-- list all tables in the db   
-- \d
-- see info about a specific table   
-- \d table_name

CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale BOOLEAN
);

-- Adding a new column to a table
ALTER TABLE products
ADD COLUMN featured BOOLEAN;

-- Dropping a column from a table
ALTER TABLE products
DROP COLUMN featured;

