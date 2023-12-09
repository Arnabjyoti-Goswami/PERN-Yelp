import db from '../db/connectDB.js';
import errorHandler from './error.js';

const checkRestaurantExists = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const checkIdQuery = `
      SELECT EXISTS(SELECT 1 FROM restaurants WHERE id = $1)
    ;`;
    const checkIdQueryParams = [restaurantId];
    const checkIdResult = await db.query(checkIdQuery, checkIdQueryParams);
    
    const exists = checkIdResult.rows[0].exists;
    if (!exists) {
      return next(errorHandler(404, 'Restaurant with this ID does not exist!'));
    }

    next();

  } catch (error) {
    next(error)
  }
};

export default checkRestaurantExists;