import errorHandler from '../../utils/error.js';
import db from '../../db/connectDB.js';

const createRestaurant = async (req, res, next) => {
  const { name, location, price_range } = req.body;
  if (!name || !location || !price_range) {
    return next(errorHandler(400, 'Please provide name, location, and price_range'));
  }

  try {
    const query = `
    INSERT INTO restaurants (name, location, price_range)
    VALUES ($1, $2, $3)
    RETURNING *
    ;`;
    const queryParams = [name, location, price_range];
    const results = await db.query(query, queryParams);
    const restaurant = results.rows[0];

    res.status(201).json({
      success: true,
      data: {
        restaurant: restaurant,
      },
    });

  } catch (error) {
    next(error);
  }
};

export default createRestaurant;