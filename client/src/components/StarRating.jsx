import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i=1; i<=5; i++) {
    if (i <= rating) {
      stars.push(<FaStar className='fill-yellow-300' />);
    }
  }
  if (rating % 1 !== 0) {
    stars.push(<FaStarHalfAlt className='fill-yellow-300' />);
  }
  if (stars.length < 5) {
    for (let i=stars.length+1; i<=5; i++) {
      stars.push(<FaRegStar className='fill-yellow-300' />);
    }
  }

  return (
    <div className='flex gap-x-[2px] items-center justify-center'>
      {stars}
    </div>
  );
};

export default StarRating;