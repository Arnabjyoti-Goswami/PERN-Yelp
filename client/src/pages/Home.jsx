import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { 
  DeleteTwoTone,
  EditTwoTone,
} from '@ant-design/icons';

import useFetch from '../hooks/useFetch.js';

const TableBody = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [restaurants, setRestaurants] = useState([]);

  const fetchAllRestaurants = async () => {
    try {
      const fetchUrl = '/api/v1/restaurants';
      const fetchData = useFetch(fetchUrl);
      const response = await fetchData();
      setRestaurants(response.data.restaurants);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <tbody>
      {restaurants.map((restaurant) => (
        <tr key={restaurant.id} className='text-center hover:bg-blue-300 transition duration-300 ease-in-out hover:bg-opacity-30 '>
          <td className='py-4 cursor-pointer
          hover:bg-opacity-70 hover:bg-blue-500' onClick={() => handleRestaurantClick(restaurant.id)}>
            {restaurant.name}
          </td>
          <td className='py-4'>
            {restaurant.location}
          </td>
          <td className='py-4'>
            {restaurant.price_range}
          </td>
          <td className='py-4'>
            reviews
          </td>
          <td className='py-4 pr-5 flex justify-center space-x-2'>
            <button className='rounded-full w-10 h-10 bg-yellow-200 hover:bg-yellow-300 flex items-center justify-center
            btn
            '>
              <EditTwoTone twoToneColor='#ebd831' style={{ fontSize: '1.5em' }} />
            </button>
            <button className='rounded-full w-10 h-10 bg-red-400 hover:bg-red-500 flex items-center justify-center
            btn
            '>
              <DeleteTwoTone twoToneColor='#b81212' style={{ fontSize: '1.5em' }} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Home = () => {
  const handleAddRestaurant = () => {

  };

  return (
    <div className='h-full w-full flex flex-col items-center justify-start pt-10 relative'>
      <div className='text-gray-700 font-medium text-5xl text-center mb-10'>
        Restaurants
      </div>
      <button
      onClick={handleAddRestaurant}
      className='
      w-12 h-12
      flex items-center justify-center
      rounded-full bg-green-500 bg-opacity-70 hover:bg-opacity-100 cursor-pointer 
      absolute top-[10%] right-[10%]
      btn
      text-white text-4xl
      '>
        <span>
          +
        </span>
      </button>
      <div className='max-w-[80%] w-full overflow-x-auto'>
        <table className='w-full bg-gray-800 text-white table-auto'>
          <thead className='bg-gray-700
          text-center text-gray-200'>
            <tr>
              <th className='py-4 px-2'>
                Name
              </th>
              <th className='py-4 px-2'>
                Location
              </th>
              <th className='py-4 px-2'>
                Price Range
              </th>
              <th className='py-4 px-2'>
                Ratings
              </th>
              <th className='w-1 pr-5 py-4'>
                
              </th>
            </tr>
          </thead>
          <TableBody />
        </table>
      </div>
    </div>
  );
};

export default Home;