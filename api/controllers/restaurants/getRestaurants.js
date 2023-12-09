import db from '../../db/connectDB.js';

const getRestaurants = async (req, res, next) => {
  try {
    const query = `
      SELECT restaurants.*, 
        COALESCE(review_counts.count, 0) AS num_reviews, 
        COALESCE(review_counts.average_rating, 0.00) AS avg_rating
      FROM restaurants

      LEFT JOIN (
        SELECT 
          restaurant_id, 
          COUNT(*) AS count, 
          TRUNC(AVG(rating), 2) AS average_rating
        FROM reviews
        GROUP BY restaurant_id
        )
      AS review_counts 
      
      ON restaurants.id = review_counts.restaurant_id
      ;
    `;
    const results = await db.query(query);
    const numResults = results.rowCount;
    const queryRows = results.rows;

    res.status(200).json({
      sucess: true,
      data: {
        numRestaurants: numResults,
        restaurants: queryRows,
      },
    });

  } catch (error) {
    return next(error);
  }
};

export default getRestaurants;