import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useFetch from '../hooks/useFetch.js';

const TableBody = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  const fetchUrl = '/api/v1/restaurants';
  const { response, error, isFetching, refetch } = useFetch(fetchUrl);

  useEffect(() => {
    if (response) {
      setRestaurants(response.data.restaurants);
    }
  }, [response]);

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return restaurants.map((restaurant) => {
    return (
      restaurants.length > 0 &&
      <tr key={restaurant.id} 
      className='text-center'>
        <td className='border px-4 py-2
        cursor-pointer hover:bg-slate-200'
        onClick={() => handleRestaurantClick(restaurant.id)}>
          {restaurant.name}
        </td>
        <td className='border px-4 py-2'>
          {restaurant.location}
        </td>
        <td className='border px-4 py-2'>
          {restaurant.price_range}
        </td>
        <td className='border px-4 py-2'>
          reviews
        </td>
        <td className='border px-1 py-2'>
          <button className='bg-blue-200 hover:bg-blue-300 text-slate-500 font-medium py-2 px-2 mr-2
          rounded-full cursor-pointer'>
            Update
          </button>
          <button className='bg-red-200 hover:bg-red-300 
          text-slate-500 font-medium py-2 px-2
          rounded-full cursor-pointer'>
            Delete
          </button>
        </td>
      </tr>
    );
  });
};

const Home = () => {
  return (
  <div className='h-full w-full flex flex-col items-center justify-start pt-10 relative'>
    <div className='text-gray-700 font-medium text-5xl text-center mb-10'>
      Restaurants
    </div>
    <div className='max-w-[80%] w-full overflow-x-auto'>
      <table className='w-full table-auto border-collapse border-2 border-gray-300 bg-white'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Location</th>
            <th className='px-4 py-2'>Price Range</th>
            <th className='px-4 py-2'>Ratings</th>
            <th className='px-2 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          <TableBody />
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Home;