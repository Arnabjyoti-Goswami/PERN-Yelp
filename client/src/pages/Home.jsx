import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { 
  DeleteTwoTone,
  EditTwoTone,
} from '@ant-design/icons';

import useFetch from '../hooks/useFetch.js';

import StarRating from '../components/StarRating.jsx';

const TableBody = ({ restaurantAdded }) => {
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
  
  useEffect(() => {
    if (restaurantAdded) {
      setRestaurants(prevRestaurants => [...prevRestaurants, restaurantAdded]);
    }
  }, [restaurantAdded]);

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const fetchUrl = `/api/v1/restaurants/${id}`;
      const fetchOptions = {
        method: 'DELETE',
      };
      const fetchData = useFetch(fetchUrl, fetchOptions);
      const response = await fetchData();

      const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
      setRestaurants(updatedRestaurants);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/restaurant/${id}/update`);
  };

  return (
    restaurants.length !== 0 &&
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
            <div className='flex'>
              <StarRating rating={restaurant.avg_rating} />
              <span className='mx-[2px] text-yellow-300'>
                ({restaurant.num_reviews})
              </span>
            </div>
          </td>
          <td className='py-4 pr-5 flex justify-center space-x-2'>
            <button className='rounded-full w-10 h-10 bg-yellow-200 hover:bg-yellow-300 flex items-center justify-center
            btn'
            onClick={() => handleUpdate(restaurant.id)}>
              <EditTwoTone twoToneColor='#ebd831' style={{ fontSize: '1.5em' }} />
            </button>
            <button className='rounded-full w-10 h-10 bg-red-400 hover:bg-red-500 flex items-center justify-center
            btn'
            onClick={() => handleDelete(restaurant.id)}>
              <DeleteTwoTone twoToneColor='#b81212' style={{ fontSize: '1.5em' }} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Home = () => {
  const [formData, setFormData] = useState({});
  
  const [newRestaurant, setNewRestaurant] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.price_range) {
      return;
    }

    try {
      const fetchUrl = '/api/v1/restaurants';
      const fetchOptions = {
        method: 'POST',
        body: {
          name: formData.name,
          location: formData.location,
          price_range: formData.price_range,
        },
      };
      const fetchData = useFetch(fetchUrl, fetchOptions);
      const response = await fetchData();
      const newRestau = response.data.restaurant;
      response.data.restaurant.avg_rating = 0;
      response.data.restaurant.num_reviews = 0;
      setNewRestaurant(newRestau);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='h-full w-full flex flex-col items-center justify-start pt-10 relative'>
      <div className='text-gray-700 font-medium text-5xl text-center mb-10'>
        Restaurants
      </div>
      <form className='flex items-center mb-4
      justify-between w-[80%]'
      onSubmit={handleSubmit}>
        <input
        type='text'
        placeholder='Restaurant Name'
        className='p-2 rounded border-slate-300 w-[40%] border-2
        focus:outline-none focus:border-slate-700 focus:border-2'
        id='name'
        onChange={handleChange}
        />
        <input
        type='text'
        placeholder='Location'
        className='p-2 rounded border-slate-300 w-[40%] border-2
        focus:outline-none focus:border-slate-700 focus:border-2'
        id='location'
        onChange={handleChange}
        />
        <select
        className='p-2 rounded border-slate-300 w-[10%] border-2
        focus:outline-none focus:border-slate-700 focus:border-2'
        id='price_range'
        onChange={handleChange}
        defaultValue='0'
        >
          <option value='0' disabled>
            Price Range
          </option>
          <option value='1'>
            $
          </option>
          <option value='2'>
            $$
          </option>
          <option value='3'>
            $$$
          </option>
          <option value='4'>
            $$$$
          </option>
          <option value='5'>
            $$$$$
          </option>
        </select>
        <button
        className='
        w-12 h-12 cursor-pointer
        flex items-center justify-center
        rounded-full bg-green-500 bg-opacity-70 hover:bg-opacity-100 
        btn
        text-white text-4xl
        '
        type='submit'>
          <span>
            +
          </span>
        </button>
      </form>
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
          <TableBody restaurantAdded={newRestaurant} />
        </table>
      </div>
    </div>
  );
};

export default Home;