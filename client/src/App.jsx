import {
  Home,
  UpdateRestaurant,
  RestaurantDetails,
  PageNotFound,
} from './pages/';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <div className='m-0 h-screen w-screen 
    bg-slate-100 bg-opacity-20'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/restaurant/:id/update' element={<UpdateRestaurant />} />
          <Route exact path='/restaurant/:id' element={<RestaurantDetails />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Router> 
    </div>
  );
};

export default App;