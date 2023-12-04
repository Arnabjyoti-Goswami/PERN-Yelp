import db from "../../db/connectDB.js";
import errorHandler from "../../utils/error.js";

const getRestaurant = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const query = `
    SELECT * FROM restaurants
    WHERE id = $1
    ;`;
    const queryParams = [restaurantId];
    const results = await db.query(query, queryParams);
    const restaurant = results.rows[0];

    if (!restaurant) {
      return next(errorHandler(404, "Restaurant with this ID does not exist!"));
    }

    res.status(200).json({
      success: true,
      data: {
        restaurant: restaurant,
      },
    });

  } catch (error) {
    next(error);
  }
};

export default getRestaurant;