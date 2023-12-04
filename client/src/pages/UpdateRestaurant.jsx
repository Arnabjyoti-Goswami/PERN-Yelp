import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.priceRange < 1 || formData.priceRange > 5) {
      setError('Price range must be between 1 and 5');
      return;
    }

    if (!formData.location || !formData.name || !formData.priceRange) {
      setError('Please fill out all fields');
      return;
    }

    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        location: formData.location,
        price_range: formData.priceRange,
      }),
    };

    const fetchUrl = `api/v1/restaurants/${id}`;

    const { response, error, isFetching } = useFetch(fetchUrl, fetchOptions);

    console.log(response);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='mb-4'>
      <form onSubmit={handleSubmit}
      className='max-w-[1000px]'>
        <input type='text' 
        required
        id='name'
        value={formData.name}
        onChange={handleChange}
        />
        <input type='text' 
        required
        id='location'
        value={formData.location}
        onChange={handleChange}
        />
        <input type='number' 
        max={5}
        min={1}
        required
        id='priceRange'
        onChange={handleChange}
        value={formData.priceRange}
        />
      </form>
    </div>
  );
};

export default UpdateRestaurant;