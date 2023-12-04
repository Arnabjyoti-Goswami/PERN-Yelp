CREATE DATABASE restaufinder;

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

-- Altering table column type for a single column
-- ALTER TABLE table_name
-- ALTER COLUMN column_name1 TYPE new_data_type;

-- Altering table column type for multiple columns
-- ALTER TABLE table_name
-- ALTER COLUMN column_name1 TYPE new_data_type,
-- ALTER COLUMN column_name2 TYPE new_data_type,
-- ...;

-- Note about postgresqltutorial.com:
-- The SET DATA TYPE and TYPE are equivalent
-- hence [SET DATA] TYPE is written in postgresqltutorial.com

-- Altering table column name for a single column
-- ALTER TABLE table_name 
-- RENAME COLUMN column_name TO new_column_name;

-- Better than altering columns is to drop the table and remake it from scratch by changing few words in the written query above, as this keeps it simple.
DROP TABLE restaurants;


INSERT INTO restaurants (name, location, price_range)
VALUES ('mcdonalds', 'New York', 500);

SELECT * FROM restaurants;

SELECT name, price_range FROM restaurants;

