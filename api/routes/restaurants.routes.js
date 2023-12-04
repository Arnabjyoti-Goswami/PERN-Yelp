import express from 'express';
const router = express.Router();

import { 
  getRestaurants, 
  createRestaurant,
  getRestaurant, 
  updateRestaurant ,
  deleteRestaurant,
} from '../controllers/restaurants/index.js';

router.get('/restaurants', getRestaurants);
router.post('/restaurants', createRestaurant);
router.get('/restaurants/:id', getRestaurant);
router.put('/restaurants/:id', updateRestaurant);
router.delete('/restaurants/:id', deleteRestaurant);

export default router;