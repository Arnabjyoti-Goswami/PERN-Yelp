import db from '../../db/connectDB.js';
import errorHandler from '../../utils/error.js';

const addReview = async (req, res, next) => {
  const { id } = req.params;
  const { name, rating, review_text } = req.body;

  if (!name || !rating || !review_text) {
    return next(errorHandler(400, 'Please provide name, rating and review'));
  }

  try {
    const query = `
      INSERT INTO reviews (restaurant_id, name, rating, review)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    ;`;
    const queryParams = [id, name, rating, review_text];
    const result = await db.query(query, queryParams);

    res.status(201).json({
      success: true,
      data: {
        review: result.rows[0],
      },
    });

  } catch (error) {
    next(error);
  }
};

export default addReview;