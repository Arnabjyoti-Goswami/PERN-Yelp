import express from 'express';
const router = express.Router();

import { 
  getRestaurants, 
  createRestaurant,
  getRestaurant, 
  updateRestaurant ,
  deleteRestaurant,
  addReview,
  getReviews,
} from '../controllers/restaurants/index.js';

import checkRestaurantExists from '../utils/checkRestaurantExists.js';

router.get('/restaurants', getRestaurants);
router.post('/restaurants', createRestaurant);
router.get('/restaurants/:id', getRestaurant);
router.put('/restaurants/:id', updateRestaurant);
router.delete('/restaurants/:id', checkRestaurantExists, deleteRestaurant);
router.post('/restaurants/:id/add-review', checkRestaurantExists, addReview);
router.get('/restaurants/:id/reviews', checkRestaurantExists, getReviews);

export default router;