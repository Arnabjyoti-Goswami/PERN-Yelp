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
    <div className='m-0 h-screen w-screen bg-slate-100'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/restaurants/:id/update' element={<UpdateRestaurant />} />
          <Route exact path='/restaurants/:id' element={<RestaurantDetails />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Router> 
    </div>
  );
};

export default App;