CREATE DATABASE yelp;

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert a new restaurant (new row) into the table
INSERT INTO restaurants 
(name, location, price_range)
VALUES ('mcdonalds', 'New York', 4);
-- Insert atleast 2 new restaurants into the table if dropping and making it again, so that you can see the functioning of the apis immediately.
INSERT INTO restaurants
(name, location, price_range)
VALUES ('burger king', 'New York', 3);

CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
);