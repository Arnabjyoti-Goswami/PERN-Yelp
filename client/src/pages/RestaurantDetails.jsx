import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useFetch from '../hooks/useFetch.js';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  
  const fetchUrl = `/api/v1/restaurants/${id}`;
  const { response, error, isFetching, refetch } = useFetch(fetchUrl);

  useEffect(() => {
    if (response) {
      setRestaurant(response.data.restaurant);
    }
  }, [response]);

  let returnMessage;
  if (isFetching || response === null) {
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
    {restaurant && (
      <div>
        <span>{restaurant.name}</span>
      </div>
    ) }
    {returnMessage}
    </>
  );
};

export default RestaurantDetails;