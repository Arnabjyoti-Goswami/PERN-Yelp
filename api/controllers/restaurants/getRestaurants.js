import db from '../../db/connectDB.js';

const getRestaurants = async (req, res, next) => {
  try {
    const results = await db.query(`
    SELECT * FROM restaurants
    ;`);
    const numResults = results.rowCount;
    const queryRows = results.rows;

    res.status(200).json({
      status: 'success',
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