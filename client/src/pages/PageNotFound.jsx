import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='text-5xl text-red-700 font-normal capitalize
    h-full w-full
    flex justify-center flex-col items-center'>
      page not found
    <div>
      <span className='text-2xl text-slate-700 font-normal'>
        Go back to &nbsp;
      </span>
      <Link to='/' className='text-2xl text-blue-700 font-normal capitalize'>
        home
      </Link>
    </div>
    </div>
  );
};

export default PageNotFound;