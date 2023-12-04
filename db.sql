CREATE DATABASE restaufinder;

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

-- ALTER TABLE table_name
-- ALTER COLUMN column_name1 TYPE new_data_type;

-- ALTER TABLE table_name
-- ALTER COLUMN column_name1 TYPE new_data_type,
-- ALTER COLUMN column_name2 TYPE new_data_type,
-- ...;

-- The SET DATA TYPE and TYPE are equivalent
-- hence [SET DATA] TYPE is written in postgresqltutorial.com

-- ALTER TABLE table_name 
-- RENAME COLUMN column_name TO new_column_name;

-- or just drop the table and remake from scratch by changing few words in the written query above
DROP TABLE restaurants;


INSERT INTO restaurants (name, location, price_range)
VALUES ('mcdonalds', 'New York', 500);

SELECT * FROM restaurants;

SELECT name, price_range FROM restaurants;

