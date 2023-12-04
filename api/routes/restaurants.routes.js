import express from 'express';
const router = express.Router();

import getRestaurants from '../controllers/restaurants/getRestaurants.js';
import createRestaurant from '../controllers/restaurants/createRestaurant.js';
import getRestaurant from '../controllers/restaurants/getRestaurant.js';
import updateRestaurant from '../controllers/restaurants/updateRestaurant.js';

router.get('/restaurants', getRestaurants);
router.post('/restaurants', createRestaurant);
router.get('/restaurants/:id', getRestaurant);
router.put('/restaurants/:id', updateRestaurant);

export default router;