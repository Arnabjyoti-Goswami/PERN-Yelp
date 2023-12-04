CREATE DATABASE yelp;

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

-- Insert a new restaurant (new row) into the table
INSERT INTO restaurants 
(name, location, price_range)
VALUES ('mcdonalds', 'New York', 4);