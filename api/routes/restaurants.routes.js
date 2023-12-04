import express from 'express';
const router = express.Router();

import getRestaurants from '../controllers/restaurants/getRestaurants.js';
import createRestaurant from '../controllers/restaurants/createRestaurant.js';

router.get('/restaurants', getRestaurants);
router.post('/restaurants', createRestaurant);

export default router;