import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CiLocationOn } from 'react-icons/ci';

import useFetch from '../hooks/useFetch.js';
import StarRating from '../components/StarRating.jsx';

const AddReview = ({ setNewReview }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const { id } = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchUrl = `/api/v1/restaurants/${id}/add-review`;
      const fetchOptions = {
        method: 'POST',
        body: {
          name: formData.username,
          rating: formData.rating,
          review_text: formData.review_text,
        }
      };
      const fetchData = useFetch(fetchUrl, fetchOptions);
      const response = await fetchData();
      const reviewAdded = response.data.review;
      setNewReview(reviewAdded);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex justify-between items-center
    mx-[10vw]'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between gap-x-[50vw]'>
          <div className='flex flex-col'>
            <label htmlFor='username'>
              Name
            </label>
            <input type='text'
            id='username' 
            className='
            border-2 border-slate-300 rounded
            focus:outline-none focus:border-slate-500'
            onChange={handleChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='rating'>
              Rating
            </label>
            <input type='number'
            min={1}
            max={5}
            id='rating'
            className='
            border-2 border-slate-300 rounded
            focus:outline-none focus:border-slate-500'
            onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-col mt-1'>
          <label htmlFor='review_text'>
            Review
          </label>
          <textarea
          id='review_text'
          className='
          border-2 border-slate-300 rounded
          focus:outline-none focus:border-slate-500
          h-[10vh]'
          onChange={handleChange}
          />
        </div>
        <button type='submit'
        className='border-[2px] border-slate-500 shadow-md
        mt-2 py-1 px-2 rounded-lg bg-green-500
        transition ease-in-out duration-300 hover:scale-110 hover:bg-green-600
        text-white'>
          Add review
        </button>
      </form>
    </div>
  );
};

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

const ReviewGrid = ({ newReview }) => {
  const { id } = useParams();
  
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const fetchUrl = `/api/v1/restaurants/${id}/reviews`;
      const fetchData = useFetch(fetchUrl);
      const response = await fetchData();
      setReviews(response.data.reviews);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (newReview) {
      setReviews(prevReviews => [...prevReviews, newReview]);
    }
  }, [newReview]);

  return (
    reviews.length !==0 ? (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center'>
    {
    reviews.map( (review, index) => (
      <ReviewCard
        key={index}
        username={review.name}
        rating={review.rating}
        text_review={review.review}
      />
    ) )
    }
    </div>
    )
    : <div className='text-slate-800 flex items-center justify-center text-3xl my-8' >
      No reviews yet
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

  const [newReview, setNewReview] = useState({});

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
        { Number(restaurant.avg_rating) !==0  && (
        <div className='flex items-center justify-center scale-125'>
          <StarRating rating={restaurant.avg_rating} />
          <span className='mx-[2px] text-yellow-300'>
            ({restaurant.num_reviews})
          </span>
        </div>
        ) }
        <div>
          <ReviewGrid newReview={newReview} />
        </div>
        <div>
          <AddReview setNewReview={setNewReview} />
        </div>
      </div>
    ) 
    }

    {returnMessage}
    </>
  );
};

export default RestaurantDetails;