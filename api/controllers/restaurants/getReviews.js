import db from '../../db/connectDB.js';

const getReviews = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    const query = `
      SELECT * FROM reviews
      WHERE restaurant_id = $1
      ;
    `;
    const queryParams = [restaurantId];
    const result = await db.query(query, queryParams);
    console.log(result);

    if (result.rows.length === 0) {
      res.status(200)
      .json({
        success: true,
        data: {
          reviews: [],
        }
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        reviews: result.rows,
      }
    });

  } catch (error) {
    next(error);
  }
};

export default getReviews;