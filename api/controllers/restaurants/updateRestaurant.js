import db from '../../db/connectDB.js';
import errorHandler from '../../utils/error.js';

const updateRestaurant = async (req, res, next) => {
  const restaurantId = req.params.id;

  const { name, location, price_range } = req.body;
  if (!name || !location || !price_range) {
    return next(errorHandler(400, 'Please provide name, location, and price_range'));
  }

  try {
    const query = `
    UPDATE restaurants
    SET name = $2, location = $3, price_range = $4, updated_at = NOW()
    WHERE id = $1
    RETURNING *
    ;`;
    const queryParams = [restaurantId, name, location, price_range];
    const results = await db.query(query, queryParams);
    const restaurant = results.rows[0];

    if (!restaurant) {
      return next(errorHandler(404, 'Restaurant with this ID does not exist!'));
    }
    
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

export default updateRestaurant;