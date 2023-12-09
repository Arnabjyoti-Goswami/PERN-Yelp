import db from '../../db/connectDB.js';
import errorHandler from '../../utils/error.js';

const deleteRestaurant = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const query = `
      DELETE FROM restaurants
      WHERE id = $1
    ;`;
    const queryParams = [restaurantId];
    await db.query(query, queryParams);

    res.status(204).json({
      success: true,
      data: null,
    });

  } catch (error) {
    next(error);
  }
};

export default deleteRestaurant;