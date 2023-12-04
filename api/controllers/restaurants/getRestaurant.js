import db from "../../db/connectDB.js";

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

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant,
      },
    });

  } catch (error) {
    next(error);
  }
};

export default getRestaurant;