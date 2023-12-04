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

-- Make a test database and a table using similar commands as in the db.sql file before testing the following commands:

-- Altering table column type for a single column
ALTER TABLE table_name
ALTER COLUMN column_name1 TYPE new_data_type;

-- Altering table column type for multiple columns
ALTER TABLE table_name
ALTER COLUMN column_name1 TYPE new_data_type,
ALTER COLUMN column_name2 TYPE new_data_type,
...;

-- Note about postgresqltutorial.com:
-- The SET DATA TYPE and TYPE are equivalent
-- hence [SET DATA] TYPE is written in postgresqltutorial.com

-- Altering table column name for a single column
ALTER TABLE table_name 
RENAME COLUMN column_name TO new_column_name;

-- Adding a new column to a table
ALTER TABLE table_name
ADD COLUMN featured BOOLEAN;

-- Dropping a column from a table
ALTER TABLE table_name
DROP COLUMN featured;

-- If you want simplicity, better than altering columns, which is what is done in all of the above commands, is to drop the table and remake it from scratch by changing few words in the create table query.
DROP TABLE restaurants;

-- Selecting all columns from the table
SELECT * FROM restaurants;

-- Selecting specific columns from the table
SELECT name, price_range FROM restaurants;