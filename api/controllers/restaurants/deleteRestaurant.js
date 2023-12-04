import db from '../../db/connectDB.js';
import errorHandler from '../../utils/error.js';

const deleteRestaurant = async (req, res, next) => {
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