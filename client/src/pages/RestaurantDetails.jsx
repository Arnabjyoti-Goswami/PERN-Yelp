import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CiLocationOn } from 'react-icons/ci';

import useFetch from '../hooks/useFetch.js';
import StarRating from '../components/StarRating.jsx';

const ReviewCard = ({ username, rating, text_review }) => {
  return (
    <div className='max-w-[25rem] 
    rounded overflow-hidden 
    shadow-lg 
    m-4 bg-slate-200 bg-opacity-40
    transform transition-transform hover:scale-105
    '>
      <div className='flex justify-between items-center
      px-6 pt-4 pb-4'>
        <div className='font-bold text-xl'>
          {username}
        </div>
        <div className='flex items-center'>
          <StarRating rating={rating} />
        </div>
      </div>
      <div className='pb-4 bg-white'>
        <div className='border-t-2 border-slate-400 max-w-[90%] mx-auto'>
          {/* Border line */}
        </div>
      </div>
      <p className='text-gray-700 text-base
      px-6 pb-2 bg-white'>
        {text_review}
      </p>
    </div>
  );
};

const ReviewGrid = () => {
  const reviews = [
    {
      text: 'Some food review text',
      rating: 3,
      username: 'John',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center'>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          username={review.username}
          rating={review.rating}
          text_review={review.text}
        />
      ))}
    </div>
  );
};

const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurant = async () => {
    setIsLoading(true);
    try {
      const fetchUrl = `/api/v1/restaurants/${id}`;
      const fetchData = useFetch(fetchUrl);
      const response = await fetchData();
      setRestaurant(response.data.restaurant);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  let returnMessage;
  if (isLoading) {
    returnMessage =
    <div className='text-slate-800 text-5xl text-center
    pt-20'>
      Loading...
    </div>;
  } else if (error) {
    returnMessage =
    <div className='text-red-800 text-5xl text-center
    pt-20'>
      Error: {error}
    </div>;
  }

  return (
    <>
    {
    restaurant && (
      <div className='flex flex-col justify-center'>
        <div className='flex justify-center 
        text-slate-800 text-center
        pt-10 gap-10 mb-5'>
          <div className='text-5xl'>
            {restaurant.name}
          </div>
          <div className='text-3xl
          flex items-center'>
            <CiLocationOn className='mr-2' />
            {restaurant.location}
          </div>
        </div>
        <div>
          <ReviewGrid />
        </div>
        <div>
          {/* Add a review */}
        </div>
      </div>
    ) 
    }

    {returnMessage}
    </>
  );
};

export default RestaurantDetails;