import db from "../../db/connectDB.js";
import errorHandler from "../../utils/error.js";

const getRestaurant = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const query = `
      SELECT r.*,
        COALESCE(review_counts.count, 0) AS num_reviews,
        COALESCE(review_counts.average_rating, 0.00) AS avg_rating
      FROM restaurants r

      LEFT JOIN (
        SELECT
          restaurant_id,
          COUNT(*) AS count,
          TRUNC(AVG(rating), 2) AS average_rating
        FROM reviews
        GROUP BY restaurant_id
        )
      AS review_counts

      ON r.id = review_counts.restaurant_id

      WHERE r.id = $1
      ;
    `;
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